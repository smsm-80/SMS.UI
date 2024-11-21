export class UserInfo {
    iD?: number;
    username?: string | null;
    empName?: string | null;
    empName2?: string | null;
    email?: string | null;
    empID?: number | null;
    empCode?: string | null;
    groupID?: number | null;
    language?: number;
    periodID?: number;
    token?: string ;
    tokenExpires?: string ;
  }
  

  export enum UserInfoEnum {
    ID = 'iD',
    USERNAME = 'username',
    EMP_NAME = 'empName',
    EMP_NAME2 = 'empName2',
    EMAIL = 'email',
    EMP_ID = 'empID',
    EMP_CODE = 'empCode',
    GROUP_ID = 'groupID',
    LANGUAGE = 'language',
    PERIOD_ID = 'periodID',
    TOKEN = 'token',
    TOKEN_EXPIRES = 'tokenExpires'
  }
  