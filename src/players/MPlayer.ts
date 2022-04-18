import PlayOptions, { PlayOptionKey } from "../PlayOptions"
import SoundPlayer from "./SoundPlayer"

export default class MPlayer extends SoundPlayer {
  command: string = "mplayer"
  supportedOptions: PlayOptionKey[] = ["volume", "loop", "duration", "seek", "rate"]

  optionsToArgs(path: string, options: PlayOptions): string[] {
    const args: string[] = [path]

    if (options.volume) {
      args.unshift("-volume", (options.volume * 100).toString())
    }

    if (options.loop) {
      args.unshift("-loop", "0")
    }

    if (options.duration) {
      args.unshift("-endpos", options.duration.toString())
    }

    if (options.seek) {
      args.unshift("-ss", options.seek.toString())
    }

    if (options.rate) {
      args.unshift("-af", "scaletempo", "-speed", options.rate.toFixed(1))
    }

    return args
  }

  supportsFileExtension(ext: string): boolean {
    return true
  }
}