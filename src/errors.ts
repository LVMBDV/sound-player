import PlayOptions from "./PlayOptions"

type FeatureKey = keyof PlayOptions

export class MissingFeatureError extends Error {
  constructor(feature: FeatureKey | FeatureKey[]) {
    if (!Array.isArray(feature)) {
      feature = [feature]
    }

    super(`Missing feature: ${feature.join(", ")}`)
  }
}