import { parsePath } from './PathUtils'

export const createLocation = (path, state, key) => {
  let location
  if (typeof path === 'string') {
    // Two-arg form: push(path, state)
    location = parsePath(path)
    location.state = state
  } else {
    // One-arg form: push(location)
    location = { ...path }

    if (!location.pathname)
      location.pathname = '/'

    if (location.search && location.search.charAt(0) !== '?')
      location.search = '?' + location.search

    if (location.hash && location.hash.charAt(0) !== '#')
      location.hash = '#' + location.hash

    if (state !== undefined && location.state === undefined)
      location.state = state
  }

  location.key = key

  return location
}

const looseEqual = (a, b) => {
  if (a == null)
    return a == b

  const typeofA = typeof a
  const typeofB = typeof b

  if (typeofA !== typeofB)
    return false

  if (Array.isArray(a)) {
    if (!Array.isArray(b) || a.length !== b.length)
      return false

    return a.every((item, index) => looseEqual(item, b[index]))
  } else if (typeofA === 'object') {
    const keysOfA = Object.keys(a)
    const keysOfB = Object.keys(b)

    if (keysOfA.length !== keysOfB.length)
      return false

    return keysOfA.every(key => looseEqual(a[key], b[key]))
  }

  return a === b
}

export const locationsAreEqual = (a, b) =>
  a.pathname === b.pathname &&
  a.search === b.search &&
  a.hash === b.hash &&
  a.key === b.key &&
  looseEqual(a.state, b.state)
