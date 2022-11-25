export interface IUserSchema {
  name: string;
  password: string;
  profilePicture: string;
  activeStreamKey?: string;
  streamKeysHistory: Array<string>;
  emailAddress: string;
  hashedRt?: string;
  blacklistedRt: Array<string>;
}
