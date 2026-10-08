/**
 * Keep the aesthetic slot rhythm [wide, tall, third, third, third]
 * while preferring landscape for wide and portrait for tall/third.
 */
const PATTERN = ['wide', 'tall', 'third', 'third', 'third']

export function slotKind(index) {
  return PATTERN[index % PATTERN.length]
}

export function layoutByOrientation(items) {
  const landscape = []
  const portrait = []
  const other = []
  for (const item of items) {
    if (item.orientation === 'landscape') landscape.push(item)
    else if (item.orientation === 'portrait') portrait.push(item)
    else other.push(item)
  }

  const out = []
  const n = items.length
  for (let i = 0; i < n; i++) {
    const kind = slotKind(i)
    const preferLandscape = kind === 'wide'
    let next = null
    if (preferLandscape) {
      next = landscape.shift() || other.shift() || portrait.shift()
    } else {
      next = portrait.shift() || other.shift() || landscape.shift()
    }
    if (next) out.push(next)
  }
  return out
}
