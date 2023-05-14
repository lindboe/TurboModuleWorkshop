import NativeOrientation, {OrientationData as Data, Spec} from './NativeOrientation';

function isNum(input: unknown) {
  return typeof input === 'number';
}

function verifyData(data: any): data is Data {
  return isNum(data?.['yaw']) && isNum(data?.['pitch']) && isNum(data?.['roll']);
}

export default NativeOrientation;

export type OrientationData = Data;

export async function getLastRecordedOrientationTypeChecked() {
    const result = await NativeOrientation.getLastRecordedOrientation();
    if (!verifyData(result)) {
      throw new Error(`Data from NativeOrientation could not be validated: ${result}`);
    } else {
      return result;
    }
}
