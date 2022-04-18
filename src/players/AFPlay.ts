import SoundPlayer from "./SoundPlayer"
import PlayOptions, { PlayOptionKey } from "../PlayOptions"

export default class AFPlay extends SoundPlayer {
  command: string = "afplay"
  supportedOptions: PlayOptionKey[] = ["volume", "duration", "rate"]

  optionsToArgs(path: string, options: PlayOptions): string[] {
    const args: string[] = [path]

    if (options.volume) {
      args.unshift("-v", (options.volume * 255).toString())
    }

    if (options.duration) {
      args.unshift("-t", options.duration.toString())
    }

    if (options.rate) {
      args.unshift("-r", options.rate.toFixed(1))
    }

    return args
  }

  supportsFileExtension(ext: string): boolean {
    return true
  }
}