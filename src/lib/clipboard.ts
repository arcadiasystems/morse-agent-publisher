/** The older way to copy, for a browser or a context without the Clipboard API: select a field and ask the document to copy it. */
function copyFromField(text: string): boolean {
  const focused = document.activeElement
  const field = document.createElement('textarea')
  field.value = text
  field.readOnly = true
  field.style.position = 'fixed'
  field.style.top = '0'
  field.style.left = '0'
  field.style.opacity = '0'
  document.body.append(field)
  field.select()
  try {
    return document.execCommand('copy')
  } catch {
    return false
  } finally {
    field.remove()
    if (focused instanceof HTMLElement) focused.focus()
  }
}

/**
 * Puts text on the clipboard. Resolves to false when the browser refuses both
 * the Clipboard API and the older command, so the caller can say so.
 */
export async function copyText(text: string): Promise<boolean> {
  /* Undefined outside a secure context, whatever the type says. */
  const clipboard: Clipboard | undefined = navigator.clipboard
  if (clipboard !== undefined) {
    try {
      await clipboard.writeText(text)
      return true
    } catch {
      /* Permission denied or the document lost focus: try the older way. */
    }
  }
  return copyFromField(text)
}

/** Selects everything inside an element, so the reader can copy it by hand. */
export function selectContents(element: HTMLElement): void {
  const selection = window.getSelection()
  if (selection === null) return
  const range = document.createRange()
  range.selectNodeContents(element)
  selection.removeAllRanges()
  selection.addRange(range)
}
