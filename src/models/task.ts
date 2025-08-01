export class Task {
  description: string;
  completed: boolean;
  id: number;

  constructor(description: string, completed: boolean = false, id: number) {
    this.description = description;
    this.completed = completed;
    this.id = id;
  }
}
