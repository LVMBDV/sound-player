# sound-player

Node.js wrapper for CLI sound players.

## Installation

sound-player is not on npm yet.

## Usage

```javascript
import soundPlayer from 'sound-player'

const sound = soundPlayer.play('/path/to/sound.mp3', { loop: true })

// The player runs in a separate process, so you can do other things while the
// sound is playing. You can kill the process by calling `sound.stop()`.

setTimeout(() => {
  sound.stop()
}, 5000)
```

You can also register your own player by extending the
[`SoundPlayer` class](src/players/SoundPlayer.ts) and
registering it with the `SoundPlayer.registerPlayer(player)` method.

```javascript
import SoundPlayer from 'sound-player'

class MyPlayer extends SoundPlayer {
  command = "my-player"
  supportedOptions = ["volume", "loop"]

  optionsToArgs(path, options) {
    const args = [path]

    if (options.volume) {
      args.unshift("-volume", (options.volume * 100).toString())
    }

    if (options.loop) {
      args.unshift("-loop", "0")
    }

    return args
  }

  supportsFileExtension(ext: string): boolean {
    return ["mp3", "mp4"].includes(ext)
  }
}

soundPlayer.registerPlayer(new MyPlayer())
```

### Disclaimer

sound-player is [fair-code](http://faircode.io) distributed under the
[**Sustainable Use License**](https://github.com/lvmbdv/sound-player/blob/master/LICENSE.md).