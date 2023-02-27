/**
 * Errors.
 */

export class PSLoginError extends Error {
  name: string;
  constructor(message: string) {
    super(message);
    this.name = "PSLoginError";
  }
}
