import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import QRCode from "qrcode";
import { publicBaseUrl } from "./config";
import { getMirrorRunBindings, type D1DatabaseLike, type R2BucketLike } from "./cloudflare";
import type { LaunchSession, TimelineEvent } from "./types";

const STORAGE_ENGINE = "local-json-sqlite-ready";
const dataDir = path.join(process.cwd(), ".local-data");
const mediaDir = path.join(dataDir, "media");
const dbFile = path.join(dataDir, "sessions.json");

type DatabaseShape = {
  sessions: Record<string, LaunchSession>;
};

async function ensureDb(): Promise<DatabaseShape> {
  await mkdir(mediaDir, { recursive: true });
  if (!existsSync(dbFile)) {
    const seed: DatabaseShape = { sessions: {} };
    await writeFile(dbFile, JSON.stringify(seed, null, 2), "utf8");
    return seed;
  }
  const text = await readFile(dbFile, "utf8");
  return JSON.parse(text) as DatabaseShape;
}

async function saveDb(db: DatabaseShape) {
  await mkdir(dataDir, { recursive: true });
  await writeFile(dbFile, JSON.stringify(db, null, 2), "utf8");
}

async function cloudDb(): Promise<D1DatabaseLike | null> {
  const bindings = await getMirrorRunBindings();
  return bindings.MIRRORRUN_DB || null;
}

async function cloudMedia(): Promise<R2BucketLike | null> {
  const bindings = await getMirrorRunBindings();
  return bindings.MIRRORRUN_MEDIA || null;
}

async function ensureCloudDb(db: D1DatabaseLike) {
  await db
    .prepare(
      "CREATE TABLE IF NOT EXISTS sessions (id TEXT PRIMARY KEY, created_at TEXT NOT NULL, payload TEXT NOT NULL)",
    )
    .run();
}

async function putCloudSession(db: D1DatabaseLike, session: LaunchSession) {
  await ensureCloudDb(db);
  await db
    .prepare(
      "INSERT INTO sessions (id, created_at, payload) VALUES (?, ?, ?) ON CONFLICT(id) DO UPDATE SET created_at = excluded.created_at, payload = excluded.payload",
    )
    .bind(session.id, session.createdAt, JSON.stringify(session))
    .run();
}

async function readCloudSession(db: D1DatabaseLike, id: string): Promise<LaunchSession | null> {
  await ensureCloudDb(db);
  const row = await db.prepare("SELECT payload FROM sessions WHERE id = ?").bind(id).first<{ payload: string }>();
  return row?.payload ? (JSON.parse(row.payload) as LaunchSession) : null;
}

async function listCloudSessions(db: D1DatabaseLike): Promise<LaunchSession[]> {
  await ensureCloudDb(db);
  const rows = await db
    .prepare("SELECT payload FROM sessions ORDER BY created_at DESC LIMIT 50")
    .all<{ payload: string }>();
  return (rows.results || []).map((row) => JSON.parse(row.payload) as LaunchSession);
}

function event(title: string, detail: string, state: TimelineEvent["state"] = "ready"): TimelineEvent {
  return {
    id: randomUUID(),
    title,
    detail,
    state,
    createdAt: new Date().toISOString(),
  };
}

export async function createLaunchSession(name = "Spring Launch"): Promise<LaunchSession> {
  const id = `MR-${Math.floor(100 + Math.random() * 900)}-${randomUUID().slice(0, 4).toUpperCase()}`;
  const mobileUrl = `${publicBaseUrl()}/m/${encodeURIComponent(id)}`;
  const qrDataUrl = await QRCode.toDataURL(mobileUrl, { margin: 1, width: 240 });
  const session: LaunchSession = {
    id,
    name,
    createdAt: new Date().toISOString(),
    mobileUrl,
    qrDataUrl,
    status: "active",
    styleBrief: "launch look",
    timeline: [
      event("Launch session created", "The shopper path and proof receipt are ready."),
      event("Proof timeline opened", `Storage engine: ${STORAGE_ENGINE}.`),
    ],
  };
  const d1 = await cloudDb();
  if (d1) {
    await putCloudSession(d1, session);
    return session;
  }
  const db = await ensureDb();
  db.sessions[id] = session;
  await saveDb(db);
  return session;
}

export async function listSessions(): Promise<LaunchSession[]> {
  const d1 = await cloudDb();
  if (d1) return listCloudSessions(d1);
  const db = await ensureDb();
  return Object.values(db.sessions).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getSession(id: string): Promise<LaunchSession | null> {
  const d1 = await cloudDb();
  if (d1) return readCloudSession(d1, id);
  const db = await ensureDb();
  return db.sessions[id] || null;
}

export async function updateSession(id: string, patch: Partial<LaunchSession>): Promise<LaunchSession> {
  const d1 = await cloudDb();
  if (d1) {
    const current = await readCloudSession(d1, id);
    if (!current) {
      throw new Error(`Session ${id} does not exist`);
    }
    const next = { ...current, ...patch, timeline: patch.timeline || current.timeline };
    await putCloudSession(d1, next);
    return next;
  }
  const db = await ensureDb();
  const current = db.sessions[id];
  if (!current) {
    throw new Error(`Session ${id} does not exist`);
  }
  const next = {
    ...current,
    ...patch,
    timeline: patch.timeline || current.timeline,
  };
  db.sessions[next.id] = next;
  await saveDb(db);
  return next;
}

export async function appendEvent(
  id: string,
  title: string,
  detail: string,
  state: TimelineEvent["state"] = "ready",
): Promise<LaunchSession> {
  const current = await getSession(id);
  if (!current) {
    throw new Error(`Session ${id} does not exist`);
  }
  return updateSession(id, {
    timeline: [...current.timeline, event(title, detail, state)],
    status: state === "recovered" ? "recovered" : current.status,
  });
}

export async function saveMedia(file: File): Promise<{ id: string; url: string; bytes: number }> {
  const id = `${randomUUID()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "-")}`;
  const bytes = Buffer.from(await file.arrayBuffer());
  const bucket = await cloudMedia();
  if (bucket) {
    await bucket.put(id, bytes, {
      httpMetadata: { contentType: file.type || "application/octet-stream" },
      customMetadata: { source: "mirrorrun-shopper-upload" },
    });
    return { id, url: `/api/media/${encodeURIComponent(id)}`, bytes: bytes.length };
  }
  await mkdir(mediaDir, { recursive: true });
  await writeFile(path.join(mediaDir, id), bytes);
  return { id, url: `/api/media/${encodeURIComponent(id)}`, bytes: bytes.length };
}

export async function readMedia(id: string): Promise<{ body: Buffer; contentType: string } | null> {
  const safe = id.replace(/[\\/]/g, "");
  const bucket = await cloudMedia();
  if (bucket) {
    const object = await bucket.get(safe);
    if (!object) return null;
    return {
      body: Buffer.from(await object.arrayBuffer()),
      contentType: object.httpMetadata?.contentType || "application/octet-stream",
    };
  }
  const file = path.join(mediaDir, safe);
  if (!existsSync(file)) return null;
  const contentType = safe.toLowerCase().endsWith(".jpg") || safe.toLowerCase().endsWith(".jpeg") ? "image/jpeg" : "image/png";
  return { body: await readFile(file), contentType };
}
