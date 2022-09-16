export class RefreshTokenError extends Error {
  constructor(message) {
    super(message);
    this.name = "RefreshTokenError";
  }
}
