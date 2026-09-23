import { reactive, computed } from 'vue'

// One audio element for the whole site, so playback survives page changes.
// Nothing is fetched until the first play (preload = "none").
const state = reactive({
  album: null,
  index: -1,
  playing: false,
  time: 0,
  duration: 0
})

let audio = null

function ensureAudio() {
  if (audio) return audio
  audio = new Audio()
  audio.preload = 'none'
  audio.addEventListener('timeupdate', () => { state.time = audio.currentTime })
  audio.addEventListener('loadedmetadata', () => { state.duration = audio.duration || 0 })
  audio.addEventListener('play', () => { state.playing = true })
  audio.addEventListener('pause', () => { state.playing = false })
  audio.addEventListener('ended', () => next(true))
  return audio
}

function trackUrl(album, track) {
  return `/music/${album.id}/${track.file}`
}

function load(album, index, autoplay = true) {
  const a = ensureAudio()
  const track = album.tracks[index]
  state.album = album
  state.index = index
  state.time = 0
  state.duration = track.duration || 0
  a.src = trackUrl(album, track)
  if (autoplay) a.play().catch(() => { state.playing = false })
  if ('mediaSession' in navigator) {
    navigator.mediaSession.metadata = new window.MediaMetadata({ title: track.title, artist: 'Federico Cunico', album: album.title })
    navigator.mediaSession.setActionHandler('previoustrack', prev)
    navigator.mediaSession.setActionHandler('nexttrack', () => next())
  }
}

function play(album, index) {
  if (state.album === album && state.index === index) return toggle()
  load(album, index)
}

function toggle() {
  if (!audio || state.index < 0) return
  if (audio.paused) audio.play().catch(() => {})
  else audio.pause()
}

function next(fromEnd = false) {
  if (!state.album) return
  const last = state.index >= state.album.tracks.length - 1
  if (fromEnd && last) { state.playing = false; return }
  load(state.album, last ? 0 : state.index + 1)
}

function prev() {
  if (!state.album) return
  if (audio && audio.currentTime > 3) { audio.currentTime = 0; return }
  load(state.album, Math.max(0, state.index - 1))
}

function seek(fraction) {
  if (!audio || !state.duration) return
  audio.currentTime = Math.min(Math.max(fraction, 0), 1) * state.duration
}

function stop() {
  if (audio) { audio.pause(); audio.removeAttribute('src'); audio.load() }
  state.album = null
  state.index = -1
  state.time = 0
  state.duration = 0
}

export function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds <= 0) return '0:00'
  const s = Math.floor(seconds)
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

export function usePlayer() {
  const current = computed(() => (state.album && state.index >= 0 ? state.album.tracks[state.index] : null))
  return { state, current, play, toggle, next: () => next(), prev, seek, stop }
}
