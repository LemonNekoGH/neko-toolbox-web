import { EnvDetector, RunningEnv, Storage } from '../src/utils/util'

test('it should get and set data', async () => {
  const key = 'test-key'
  const value = 'test-value'

  await Storage.setItem(key, value)
  const getValue = await Storage.getItem(key, 'default')
  expect(getValue).toBe(value)
})

test('it should get env', () => {
  const env = EnvDetector.detectEnv()
  expect(env).toBe(RunningEnv.common)
})
