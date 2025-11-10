interface IContext {
  userId?: string;
  email?: string;
  name?: string;
  role?: string;
  [key: string]: any; // Allow additional properties from decodedToken (e.g., iat, exp)
}

declare namespace Express {
  interface Request {
    ctx?: IContext;
  }
}

declare namespace NZ {
  interface IBase {
    createdAt?: Date;
    updateAt?: Date;
  }

  interface IUser extends IBase {
    id?: string;
    name: string;
    profileImage?: string;
    password?: string;
    phoneNumber: string;
    email: string;
    role: string;
    isActive?: boolean;
  }

  interface IEmailData {
    subject: string;
    recipientName?: string;
    senderName?: string;
    bodyMessage: string;
  }
}
