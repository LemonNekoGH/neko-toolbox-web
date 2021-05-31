import * as localforage from 'localforage'
import Vue from 'vue'

export enum RunningEnv {
  extension,
  common
}

export class EnvDetector {
  static detectEnv (): RunningEnv {
    try {
      if (browser.storage) {
        return RunningEnv.extension
      }
      return RunningEnv.common
    } catch (e) {
      return RunningEnv.common
    }
  }
}

export class Storage {
  static async getItem (key: string, defaultValue: string): Promise<string> {
    if (EnvDetector.detectEnv() === RunningEnv.common) {
      const res = await localforage.getItem(key)
      if (!res) {
        return defaultValue
      }
      return res as string
    } else {
      return new Promise<string>((resolve) => {
        chrome.storage.local.get((it) => {
          if (it[key]) {
            resolve(it[key])
          } else {
            resolve(defaultValue)
          }
        })
      })
    }
  }

  static async setItem (key: string, value: string): Promise<void> {
    if (EnvDetector.detectEnv() === RunningEnv.common) {
      await localforage.setItem(key, value)
    } else {
      return new Promise<void>((resolve, reject) => {
        const obj: any = {}
        obj[key] = value
        chrome.storage.local.set(obj, () => {
          const error = chrome.runtime.lastError
          if (error) {
            reject(error)
          } else {
            resolve()
          }
        })
      })
    }
  }
}

export const HookedVue = Vue.extend({
  mounted () {
    Storage.getItem('app-lang', 'zh').then((lang) => {
      this.$i18n.locale = lang
    })
  }
})

export class TypeCast {
  static stringToBoolean (str: string): boolean {
    return str === 'true'
  }
}

export class Tool {
  to: string
  title: string
  isFavorite: boolean
  isPinned: boolean

  constructor (to: string, title: string, isFavorite: boolean, isPinned: boolean) {
    this.to = to
    this.isFavorite = isFavorite
    this.isPinned = isPinned
    this.title = title
  }

  setFavorite (isFavorite: boolean) {
    this.isFavorite = isFavorite
    Storage.setItem(`${this.to}:isFavorite`, String(isFavorite)).then()
  }

  setPinned (isPinned: boolean) {
    this.isPinned = isPinned
    Storage.setItem(`${this.to}:isPinned`, String(isPinned)).then()
  }
}

export const tools: Tool[] = [
  new Tool('/http-client', 'httpClient.title', false, false)
]
