import { PocketsAMaxSize } from "./inventories/inventory";

abstract class PersonalOffsetsBase {
  public personalID!: number;
  public eventFlags!: number;
  public activity!: number;
  public nookMiles!: number;
  public photo!: number;
  public pocketsA!: number;
  public pocketsB!: number;
  public wallet!: number;
  public storage!: number;
  public receivedItems!: number;
  public bank!: number;
  public recipes!: number;
}

export class PersonalOffsetsV0 extends PersonalOffsetsBase {
  constructor() {
    super();
    this.personalID = 0xb0a0;
    this.eventFlags = this.personalID + 0x38;
    this.activity = 0xcf6c;
    this.nookMiles = 0x11570;
    this.photo = 0x11594;
    this.pocketsA = 0x35bd4;
    this.pocketsB = this.pocketsA + 8 * PocketsAMaxSize + 0x18;
    this.wallet = 0x35d44;
    this.storage = 0x35d50;
    this.bank = 0x68be4;
  }
}

export class PersonalOffsetsV1 extends PersonalOffsetsBase {
  constructor() {
    super();
    this.personalID = 0xb0b8;
    this.nookMiles = 0x11588;
    this.photo = 0x115c0;
    this.pocketsA = 0x35c20;
    this.wallet = 0x35d90;
    this.storage = 0x35d9c;
    this.bank = 0x68c34;
  }
}

export function getOffsets(rev: number) {
  switch (rev) {
    case 0:
      return new PersonalOffsetsV0();
    case 1:
      return new PersonalOffsetsV1();
    default:
      throw new Error("Unknown save revision!");
  }
}
