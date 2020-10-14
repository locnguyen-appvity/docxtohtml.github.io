export class DataResult<T>{
  constructor(public data: Array<T>, public total: number, public nextLink?: string) {
  }
}

export class DataItem<T> {
  constructor(public key: string, public data: T[]) {
  }
}