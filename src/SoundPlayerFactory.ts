import { extname } from 'path'
import SoundPlayer from './players/SoundPlayer'
import PlayOptions, { PlayOptionKey } from './PlayOptions'
import Sound from './Sound'

interface FactoryPlayOptions extends PlayOptions {
  throwOnMissingFeature?: boolean
}

function pickPlayOptions(options: FactoryPlayOptions): PlayOptions {
  return Object.fromEntries(Object.entries(options)
    .filter(([key, value]) => key !== "throwOnMissingFeature" && value !== undefined)
    .map(([key, value]) => [key as PlayOptionKey, value]))
}

type MaybeSound = Sound | undefined

export default class SoundPlayerFactory {
  constructor(private players: SoundPlayer[] = []) {}

  get availablePlayers() {
    return this.players
      .filter((player) => player.isAvailable)
      .sort((a, b) => a.supportedOptions.length - b.supportedOptions.length)
  }

  registerPlayer(player: SoundPlayer) {
    this.players.push(player)
  }

  play(filepath: string | string[], options: FactoryPlayOptions = {}): MaybeSound | MaybeSound[] {
    if (!Array.isArray(filepath)) {
      filepath = [filepath]
    }

    const playOptions = pickPlayOptions(options)

    const sounds = filepath.map((fp) => {
      const player = this.availablePlayers
        .find((p) => {
          return p.supportsOptions(playOptions)
            && p.supportsFileExtension(extname(fp))
        })

      return player?.play(fp, options)
    })

    return (sounds.length === 1) ? sounds[0] : sounds
  }
}