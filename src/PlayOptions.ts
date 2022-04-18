export default interface PlayOptions {
  volume?: number
  loop?: boolean
  duration?: number
  seek?: number
  rate?: number
}

export type PlayOptionKey = keyof PlayOptions