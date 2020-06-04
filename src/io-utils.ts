import fs from "fs-extra";

export class IOUtils {
  public static readFileBytes(path: string, start?: number, end?: number): Buffer {
    const length = fs.statSync(path).size;
    const fd = fs.openSync(path, "r");
    const buffer = Buffer.alloc(length);
    fs.readSync(fd, buffer, start ?? 0, end ?? length, 0);
    return buffer;
  }
}
