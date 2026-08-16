// lib/sites/youtube/features/codec/types.ts

export interface CodecConfig {
  blockVp9: boolean;
  blockAv1: boolean;
  blockVp8: boolean;
  blockAvc: boolean;
}

export const STORAGE_KEY = "codec_config";

export const DEFAULT_CONFIG: CodecConfig = {
  blockVp9: false,
  blockAv1: false,
  blockVp8: false,
  blockAvc: false,
};

const BOOLEAN_KEYS = ["blockVp9", "blockAv1", "blockVp8", "blockAvc"] as const;

export function sanitizeCodecConfig(input: unknown): CodecConfig {
  if (!input || typeof input !== "object") return { ...DEFAULT_CONFIG };

  const raw = input as Record<string, unknown>;
  const config = { ...DEFAULT_CONFIG };

  for (const key of BOOLEAN_KEYS) {
    config[key] = typeof raw[key] === "boolean" ? raw[key] : DEFAULT_CONFIG[key];
  }

  return config;
}