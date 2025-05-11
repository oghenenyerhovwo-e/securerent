import { NigerianStateJSON } from './NigerianStateJSON';

export interface LGAOption {
    label: string;
    value: string;
  }
  
  export interface StateOption {
    label: string;
    value: string;
    options: LGAOption[];
}

export const NigerianStates: StateOption[] = NigerianStateJSON.map((stateObj: any) => ({
        label: stateObj.state,
        value: stateObj.state,
        options: stateObj.lgas.map((lga: string) => ({
        label: lga,
        value: lga,
        })),
}));

