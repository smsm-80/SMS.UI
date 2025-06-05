import {BaseModule} from '../../Common/BaseModule';

export interface SysScreen extends BaseModule<number> {
    name: string | null;
    name2: string | null;
    systemID: number | null;
    parentID: number | null;
    sortNo: number | null;
    path: string | null;
    uRL: string | null;
    isActive: boolean | null;
}