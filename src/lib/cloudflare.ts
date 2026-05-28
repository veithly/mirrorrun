type D1StatementLike = {
  bind: (...values: unknown[]) => D1StatementLike;
  run: () => Promise<unknown>;
  first: <T = Record<string, unknown>>() => Promise<T | null>;
  all: <T = Record<string, unknown>>() => Promise<{ results?: T[] }>;
};

export type D1DatabaseLike = {
  prepare: (query: string) => D1StatementLike;
};

type R2ObjectLike = {
  arrayBuffer: () => Promise<ArrayBuffer>;
  httpMetadata?: {
    contentType?: string;
  };
};

export type R2BucketLike = {
  put: (
    key: string,
    value: ArrayBuffer | Uint8Array,
    options?: { httpMetadata?: { contentType?: string }; customMetadata?: Record<string, string> },
  ) => Promise<unknown>;
  get: (key: string) => Promise<R2ObjectLike | null>;
};

export type MirrorRunBindings = {
  MIRRORRUN_DB?: D1DatabaseLike;
  MIRRORRUN_MEDIA?: R2BucketLike;
};

export async function getMirrorRunBindings(): Promise<MirrorRunBindings> {
  if (process.env.MIRRORRUN_STORAGE !== "cloudflare") return {};
  try {
    const mod = await import("@opennextjs/cloudflare");
    const context = await mod.getCloudflareContext({ async: true });
    return context.env as MirrorRunBindings;
  } catch {
    return {};
  }
}
