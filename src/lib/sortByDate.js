/**
 * Newest first. Prefer `date` (YYYY-MM-DD from EXIF), then `year`.
 * Items without a date sink to the end (stable among themselves).
 */
export function sortByDateDesc(items) {
  return [...items].sort((a, b) => {
    const da = dateKey(a)
    const db = dateKey(b)
    if (da && db) return db.localeCompare(da)
    if (da && !db) return -1
    if (!da && db) return 1
    return 0
  })
}

function dateKey(item) {
  if (item?.date && /^\d{4}/.test(String(item.date))) return String(item.date).slice(0, 10)
  if (item?.year && /^\d{4}/.test(String(item.year))) return `${String(item.year).slice(0, 4)}-01-01`
  return ''
}
