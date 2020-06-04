export type UintArray = Uint8Array | Uint16Array | Uint32Array;
export type IntArray = Int8Array | Int16Array | Int32Array;

export class DataUtils {
  public static bufferToUint32Array(buffer: Buffer, offset?: number, size?: number): Uint32Array {
    return new Uint32Array(buffer.buffer, offset ?? 0, size);
  }

  public static uint32ArrayToBuffer(decrypted: Uint8Array): Buffer {
    return Buffer.from(decrypted);
  }

  public static numberArrayToStringArray(arr: number[] | UintArray | IntArray) {
    const result = [];
    for (const num of arr) {
      result.push(num.toString(16).toUpperCase());
    }
    return result;
  }
}
