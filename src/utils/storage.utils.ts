const isStorageAvailable = (): boolean => typeof Storage !== 'undefined'

export const setStorage = (key: string, value: string): void => {
  if (isStorageAvailable()) {
    window.localStorage.setItem(key, value)
  }
}

export const getStorage = (key: string): string | null => {
  if (isStorageAvailable()) {
    return window.localStorage.getItem(key)
  }
  return null
}

export const removeStorage = (key: string): void => {
  if (isStorageAvailable()) {
    window.localStorage.removeItem(key)
  }
}
