export class User {
  constructor(
    public email: string,
    public name: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {}

  gettoken() {
    console.log(this._tokenExpirationDate);
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }

    return this._token;
  }
}
