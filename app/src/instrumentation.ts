// Next.js instrumentation — runs once before any rendering on the server.
// Patches a broken `localStorage` object that can appear in some Node.js
// environments where `--localstorage-file` is passed with an invalid path.
// In that case localStorage exists as an object but .getItem is not a function,
// which crashes SSR. Setting it to undefined restores normal SSR behavior.
export async function register() {
  if (
    typeof globalThis.localStorage !== 'undefined' &&
    typeof (globalThis.localStorage as Storage | null)?.getItem !== 'function'
  ) {
    Object.defineProperty(globalThis, 'localStorage', {
      value: undefined,
      writable: true,
      configurable: true,
    })
  }
}
