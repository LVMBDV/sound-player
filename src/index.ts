import defaultPlayers from "./players";
import SoundPlayer from "./players/SoundPlayer";
import PlayOptions from "./PlayOptions";
import Sound from "./Sound";
import SoundPlayerFactory from "./SoundPlayerFactory";

export { SoundPlayer };
export { PlayOptions };
export { Sound };
export { SoundPlayerFactory };

export default new SoundPlayerFactory(defaultPlayers)