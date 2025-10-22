export type PersonType = {
  id: number;
  name: string;
  age: number;
  profession: string;
  workStatus: string;
};

export type NewPerson = Omit<PersonType, "id">;

export interface SocketEvent {
  type: string;
  key: string; // queryKey koji treba invalidirati
  payload?: unknown; // opcionalni dodatni podaci
}
