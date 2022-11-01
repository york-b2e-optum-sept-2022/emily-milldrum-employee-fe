export interface Employee {
    id?: number,
    name: string,
    role: string,
    manager?: boolean;
}

export interface Manager {
  id?: number,
  name: string,
}
