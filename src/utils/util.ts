import * as localforage from 'localforage'

export enum RunningEnv {
  extension,
  common
}

export class EnvDetector {
  static detectEnv (): RunningEnv {
    if (browser.storage) {
      return RunningEnv.extension
    }
    return RunningEnv.common
  }
}

export class Storage {
  static async getItem (key: string, defaultValue: string): Promise<string> {
    if (EnvDetector.detectEnv() === RunningEnv.common) {
      const res = await localforage.getItem(key)
      if (res === undefined) {
        return defaultValue
      }
      return res as string
    } else {
      const res = await browser.storage.local.get(key)
      if (res === undefined) {
        return defaultValue
      }
      return res.key
    }
  }

  static async setItem (key: string, value: string) {
    if (EnvDetector.detectEnv() === RunningEnv.common) {
      await localforage.setItem(key, value)
    } else {
      await browser.storage.local.set({
        key: value
      })
    }
  }
}
