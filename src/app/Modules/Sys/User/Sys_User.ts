import {BaseModule} from '../../Common/BaseModule';
import { BaseSearchRequest } from '../../Common/BaseSearchRequest';

export interface Sys_User extends BaseModule<number> {
    email: string | null;
    emailConfirmed: boolean | null;
    phoneNumber: string | null;
    phoneConfirmed: boolean | null;
    userName: string | null;
    password: string | null;
    userPassword: string | null;
    isPassUpdated: boolean;
    lastPasswordChangeDate: string | null;
    typeID: number | null;
    branchsID: string | null;
    empID: number | null;
    branchID: number | null;
    enable: boolean;
    groupID: number | null;
    allowedFromTime: string | null;
    allowedToTime: string | null;
    isSuperAdmin: boolean;
    userPhoto: string | null;
    isAgree: boolean | null;
    enableTwoFactorAuth: boolean;
    twoFactorAuthType: number | null;
    oTP: string | null;
    oTPExpiry: string | null;
    lastLogin: string | null;
    sSOToken: string | null;
    sSOTokenExpiryDate: string | null;
    loginAttemptCount: number;
    accountLockout: boolean;
    accountLockoutEnd: string | null;
}

export class Sys_UserSearchDto extends BaseSearchRequest {
    ID?: number;
    NameAr?: string;
    NameEn?: string;
    Email?: string;
    UserName?: string;
    TypeID?: number;
    BranchID?: number;
    EmpID?: number;
    Enable?: boolean;
    GroupID?: number;
}
