import path from "path";
import fs from "fs-extra";

import { IOUtils } from "./io-utils";
import { Encryption } from "./encryption";

const VillagerDirPattern = /Villager([0-9]{1})/;

export interface SaveRevision {
  headerRev: number;
  fileRev: number;
  major: number;
  minor: number;
  unk1: number;
  unk2: number;
}

export interface VillagerSave {
  index: number;
  personalData: Buffer;
  photoStudioIslandData: Buffer;
  postboxData: Buffer;
  profileData: Buffer;
}

export class SaveHelper {
  private readonly baseDir: string;

  public mainData?: Buffer;
  public villagerSaves: VillagerSave[];

  constructor(baseDir: string) {
    this.baseDir = baseDir;
    this.villagerSaves = [];
  }

  public loadAll() {
    this.mainData = SaveHelper.decryptSaveFile(path.join(this.baseDir, "main.dat"));
    this.loadVillagerSaves();
  }

  private loadVillagerSaves() {
    const files = fs.readdirSync(this.baseDir);
    for (const file of files) {
      const stat = fs.lstatSync(path.join(this.baseDir, file));
      if (stat.isDirectory()) {
        const match = file.match(VillagerDirPattern);
        if (match) {
          const villagerIndex = parseInt(match[1]);
          const save = {
            index: villagerIndex,
            personalData: SaveHelper.decryptSaveFile(path.join(this.baseDir, file, "personal.dat")),
            photoStudioIslandData: SaveHelper.decryptSaveFile(path.join(this.baseDir, file, "photo_studio_island.dat")),
            postboxData: SaveHelper.decryptSaveFile(path.join(this.baseDir, file, "postbox.dat")),
            profileData: SaveHelper.decryptSaveFile(path.join(this.baseDir, file, "profile.dat")),
          };
          this.villagerSaves[villagerIndex] = save;
        }
      }
    }
  }

  public static decryptSaveFile(saveFilePath: string): Buffer {
    const fileExt = path.extname(saveFilePath);
    const headerFile = saveFilePath.replace(fileExt, `Header${fileExt}`);

    const bytes = IOUtils.readFileBytes(saveFilePath);
    const headerBytes = IOUtils.readFileBytes(headerFile);
    return Encryption.decrypt(bytes, headerBytes);
  }
}
