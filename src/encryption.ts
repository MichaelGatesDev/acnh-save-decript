import aesjs from "aes-js";

import { SEADRandom } from "./sead-random";
import { UintArray, DataUtils } from "./data-utils";

export class Encryption {
  public static getParam(data: UintArray, index: number): Buffer {
    const sead = new SEADRandom({
      seed: data[data[index] & 0x7f],
    });
    const prms = data[data[index + 1] & 0x7f] & 0x7f;
    const rndRollCount = (prms & 0xf) + 1;
    for (let i = 0; i < rndRollCount; i++) sead.GetU64();
    const result = Buffer.alloc(0x10);
    for (let i = 0; i < result.length; i++) result[i] = sead.GetU32() >> 24;

    return result;
  }

  public static decrypt(headerData: Buffer, encData: Buffer): Buffer {
    // First 0x100 (256) bytes of the header are unused
    const importantData: Uint32Array = DataUtils.bufferToUint32Array(headerData, 0x100, 0x80);

    // Set up Key
    const key: Buffer = Encryption.getParam(importantData, 0);

    // Set up counter
    // Has to be of type 'any' because typings are not updated
    const counter: any = Encryption.getParam(importantData, 2);

    // Do the AES
    const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(counter));
    const decrypted = aesCtr.decrypt(encData);
    return DataUtils.uint32ArrayToBuffer(decrypted);
  }
}
