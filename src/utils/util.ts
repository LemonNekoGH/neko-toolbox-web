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
      console.log(lang)
      this.$i18n.locale = lang
    })
  }
})
