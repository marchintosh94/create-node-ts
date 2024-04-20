import {  type JestConfigWithTsJest } from 'ts-jest'
import { defaults as tsjPreset } from 'ts-jest/presets'

const config: JestConfigWithTsJest = {
  verbose: true,
  transform: {
    ...tsjPreset.transform,
  },
};

export default config