import { SaveHelper } from "./save-helper";
import { getOffsets } from "./offsets";

const saveHelper = new SaveHelper("save");
saveHelper.loadAll();

const offsets = getOffsets(1); // TODO dynamic version
saveHelper.villagerSaves[0].personalData[offsets.personalID];
