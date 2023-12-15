export interface IProfile {
  id: string;
  firstname: string;
  lastname: string;
  avatar: string | null;
  birthdate: Date;
  role: EnumRole;
  sex: EnumGender;
  updated: Date | null;
  created: Date;
}

export enum EnumGender {
  male = 0,
  female = 1
}

export enum EnumRole {
  client = 'client',
  admin = 'admin'
}