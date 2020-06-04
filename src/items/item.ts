export interface Item {
  itemID: number;
  flags0: number;
  flags1: number;
  flags2: number;
  flags3: number;
  uses: number; // TODO remaining or performed?
}

export const NULL_ITEM: Item = {
  itemID: 0xfffe,
  flags0: 0,
  flags1: 0,
  flags2: 0,
  flags3: 0,
  uses: 0,
};
