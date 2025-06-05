import {BaseModule} from '../../Common/BaseModule';


export interface SysGroup extends BaseModule<number> {
    name: string | null;
    name2: string | null;
    time_From: string | null;
    time_To: string | null;
}