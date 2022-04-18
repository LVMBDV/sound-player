import findExec from "find-exec"
import { MissingFeatureError } from "../errors"
import PlayOptions, { PlayOptionKey } from "../PlayOptions"
import Sound from "../Sound"

export default abstract class SoundPlayer {
  abstract readonly command: string
  abstract readonly supportedOptions: PlayOptionKey[]

  abstract optionsToArgs(path: string, options: PlayOptions): string[]
  abstract supportsFileExtension(ext: string): boolean

  play(path: string, options: PlayOptions): Sound {
    return new Sound(
      this.command,
      this.optionsToArgs(path, options),
      options)
  }

  supportsOptions(options: PlayOptions, throwOnMissingFeature?: boolean): boolean {
    const missingFeatures: PlayOptionKey[] = Object.entries(options)
      .filter(([key, value]) => value !== undefined && !["loop", "duration", ...this.supportedOptions].includes(key))
      .map(([key, _]) => key as PlayOptionKey)

    if (missingFeatures.length > 0 && throwOnMissingFeature) {
      throw new MissingFeatureError(missingFeatures)
    } else {
      return missingFeatures.length === 0
    }
  }


  get isAvailable(): boolean {
    return findExec(this.command) !== null
  }
}