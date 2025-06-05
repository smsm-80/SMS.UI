import {BaseModule} from '../../Common/BaseModule';

export interface SysSystem extends BaseModule<number> {
    name: string | null;
    name2: string | null;
    sortNo: number | null;
    description: string | null;
    description2: string | null;
    iconCss: string | null;
    isActive: boolean;
    shortName: string | null;
    shortName2: string | null;
    path: string | null;
}