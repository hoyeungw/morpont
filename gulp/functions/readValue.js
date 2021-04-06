import { DecoPale } from '@spare/deco-pale'

export const OBJECTIFY = {
  get std () {
    return {
      read: DecoPale({ loose: false }),
      objectify: true
    }
  },
  get blank () {
    return {
      read: x => x,
      objectify: true
    }
  },
  get loose () {
    return {
      read: DecoPale({ loose: true }),
      objectify: true
    }
  }
}
