// lib/core/types/feature.ts
//
// Site-agnostic feature contract. Every site registers its own features with
// the shared FeatureController, so this type must not depend on a specific
// site's data shapes.

export interface Feature {
  match: (path: string) => boolean;
  init?: () => Promise<(() => void) | undefined>;
  destroy?: () => void;
}
