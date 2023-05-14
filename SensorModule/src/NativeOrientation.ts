import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  startSensor(): Promise<void>;
  stopSensor(): Promise<void>;
  getLastRecordedOrientation(): Promise<{[key: string]: any}>;
}

export default TurboModuleRegistry.get<Spec>('RTNOrientation');