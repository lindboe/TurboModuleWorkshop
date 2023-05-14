import NativeOrientation, {Spec} from './NativeOrientation';
import type {TurboModule} from 'react-native';

function isNum(input: unknown) {
  return typeof input === 'number';
}

export type OrientationData = {
  yaw: number,
  pitch: number,
  roll: number
}

export interface PreciseSpec extends TurboModule {
  startSensor(): Promise<void>;
  stopSensor(): Promise<void>;
  getLastRecordedOrientation(): Promise<OrientationData>;
}


function verifyData(data: any): data is OrientationData {
  return isNum(data?.['yaw']) && isNum(data?.['pitch']) && isNum(data?.['roll']);
}

export async function getLastRecordedOrientationTypeChecked() {
    const result = await NativeOrientation.getLastRecordedOrientation();
    if (!verifyData(result)) {
      throw new Error(`Data from NativeOrientation could not be validated: ${result}`);
    } else {
      return result;
    }
}

let RTNOrientation: PreciseSpec;

if (NativeOrientation === null) {
   console.error("NativeOrientation module could not be loaded.");
   // cast so we don't have to keep using safe access in the app; assigning it to be an empty object will prevent access errors
   RTNOrientation = {} as PreciseSpec;
} else {
  // cast so we don't have to keep using safe access
  RTNOrientation = {
    startSensor: NativeOrientation.startSensor,
    stopSensor: NativeOrientation.stopSensor,
    getLastRecordedOrientation: getLastRecordedOrientationTypeChecked,
  } as PreciseSpec;
}

export default RTNOrientation;
