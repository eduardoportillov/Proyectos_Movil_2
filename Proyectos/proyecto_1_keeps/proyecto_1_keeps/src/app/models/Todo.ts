export interface Todo {
  id?: number;
  content: string;
  checked: boolean;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  note_id?: number;
}
