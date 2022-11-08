export class BaseError extends Error {
  public name: string;
  public statusCode: number;
  public isOperational: boolean;
  public description: string;

  constructor(
    name: string,
    statusCode: number,
    isOperational: boolean,
    description: string
  ) {
    super();
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.description = description;
    Error.captureStackTrace(this);
  }
}
