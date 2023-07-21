
export type DefiStore = {
    lightPool: any,
    heavyPool: any,
    protocols: any,
    tokens: any,
    intents: any,
    dexKeys: any,
    tokenKeys: any,
    _hasHydrated: boolean,
    setLightPool: (protocols: any) => void;
    setHasHydrated: (state: any) => void;
}
  
  