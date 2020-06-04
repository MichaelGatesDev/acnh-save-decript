interface SEADRandomParams {
  seed?: number;
  seeds?: number[];
}

/**
 * SEAD likely stands for Software Entertainment Analysis & Development
 */
export class SEADRandom {
  public readonly state: Uint32Array = new Uint32Array(4);

  public constructor(params: SEADRandomParams) {
    if (params.seed !== undefined) {
      for (let i = 0; i < 4; i++) {
        this.state[i] = (Math.imul(0x6c078965, params.seed ^ (params.seed >>> 30)) >>> 0) + i + 1;
        params.seed = this.state[i];
      }
    }
  }

  public GetU32(): number {
    const v1: number = this.state[0] ^ (this.state[0] << 11);
    this.state[0] = this.state[1];
    this.state[1] = this.state[2];
    this.state[2] = this.state[3];
    return (this.state[3] = v1 ^ (v1 >>> 8) ^ this.state[3] ^ (this.state[3] >>> 19));
  }

  public GetU64(): bigint {
    const v1: number = (this.state[0] ^ (this.state[0] << 11)) >>> 0;
    const v2: number = this.state[1] >>> 0;
    const v3: number = v1 ^ (v1 >>> 8) ^ this.state[3];

    this.state[0] = this.state[2];
    this.state[1] = this.state[3];
    this.state[2] = v3 ^ (this.state[3] >>> 19);
    this.state[3] = v2 ^ (v2 << 11) ^ ((v2 ^ (v2 << 11)) >>> 8) ^ this.state[2] ^ (v3 >>> 19);
    const result = (BigInt.asUintN(64, BigInt(this.state[2])) << BigInt(32)) | BigInt(this.state[3]);
    return BigInt(result);
  }
}
