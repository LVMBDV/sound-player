import { ChildProcess, spawn } from 'child_process'
import PlayOptions from './PlayOptions'

const THRASHING_THRESHOLD = 100

export enum SoundState {
  Playing = "playing",
  Failed = "failed",
  Done = "done"
}

export default class Sound {
  process?: ChildProcess
  state?: SoundState
  startedAt: number
  restartedAt: number

  constructor(readonly command: string, readonly args: string[], readonly options: PlayOptions = {}) {
    this.startedAt = Date.now()
    this.restartedAt = this.startedAt
    this.start()
  }

  start() {
    this.state = SoundState.Playing
    this.process = spawn(this.command, this.args, { stdio: "ignore" })

    this.process.on("error", () => {
      this.process = undefined
      this.state = SoundState.Failed
    })

    this.process.on("exit", (code, signal) => {
      if (this.state !== SoundState.Playing) {
        return
      }

      const playedFor = Date.now() - this.restartedAt
      const timeLeft = (this.options.duration ?? 0) * 1000 - (Date.now() - this.startedAt)

      if ((this.options.duration === undefined || timeLeft > 0) && this.options.loop) {
        if (playedFor < THRASHING_THRESHOLD) {
          this.state = SoundState.Failed
        } else {
          this.restart()
          if (this.options.duration !== undefined && timeLeft < playedFor) {
            setTimeout(() => this.stop(), timeLeft)
          }
        }
      } else {
        this.state = SoundState.Done
      }
    })
  }

  restart(stop = false) {
    this.stop()
    this.restartedAt = Date.now()
    this.start()
  }

  stop() {
    if (this.state === SoundState.Playing) {
      this.state = SoundState.Done
      this.process?.kill()
    }
  }

  get isPlaying() {
    return this.process?.exitCode == null
  }
}