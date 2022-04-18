import PlayOptions, { PlayOptionKey } from "../PlayOptions"
import SoundPlayer from "./SoundPlayer"

export default class APlay extends SoundPlayer {
  command: string = "aplay"
  supportedOptions: PlayOptionKey[] = []

  optionsToArgs(path: string, options: PlayOptions): string[] {
    return [path]
  }

  supportsFileExtension(ext: string): boolean {
    return ext === "wav"
  }
}
