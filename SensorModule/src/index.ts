import NativeOrientation, {OrientationData as Data, Spec} from './NativeOrientation';

function isNum(input: unknown) {
  return typeof input === 'number';
}

function verifyData(data: any): data is Data {
  return isNum(data?.['yaw']) && isNum(data?.['pitch']) && isNum(data?.['roll']);
}

let RTNOrientation: Spec;

if (NativeOrientation === null) {
   console.error("NativeOrientation module could not be loaded.");
   // cast so we don't have to keep using safe access in the app; assigning it to be an empty object will prevent access errors
   RTNOrientation = {} as Spec;
} else {
  // cast so we don't have to keep using safe access
  RTNOrientation = NativeOrientation as Spec;
}

export default RTNOrientation;

export type OrientationData = Data;

export async function getLastRecordedOrientationTypeChecked() {
    const result = await NativeOrientation.getLastRecordedOrientation();
    if (!verifyData(result)) {
      throw new Error(`Data from NativeOrientation could not be validated: ${result}`);
    } else {
      return result;
    }
}
