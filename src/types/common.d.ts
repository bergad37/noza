declare namespace Main {
  interface IBase {
    createdAt?: Date;
    updateAt?: Date;
  }

  interface IUser extends IBase {
    id?: string;
    name: string;
    profileImage?: string;
    phoneNumber: string;
    email: string;
    role: string;
    isActive?: boolean;
  }
}
