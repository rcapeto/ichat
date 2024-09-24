export class Logger {
  constructor(
    public action: string,
    public type: string,
    public payload: string,
    public createdAt: string,
    public id: string,
  ) {}
}
