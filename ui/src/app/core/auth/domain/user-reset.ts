export class UserReset {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public password: string,
    public confirmPassword: string,
    public code: string
  ) {}
}
