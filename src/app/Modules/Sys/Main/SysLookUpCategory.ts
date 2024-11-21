import {BaseModule} from '../../Common/BaseModule';

export interface SysLookUpCategory extends BaseModule<number> {
    name: string | null;
    name2: string | null;
    systemID: number | null;
    isEditable: boolean;
    isDeletable: boolean;
}