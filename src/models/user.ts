import { Task } from "./task";

export class User {
  name?: string;
  password: string;
  email: string;
  gender?: string;
  age?: number;
  // tasks: Task[];

  constructor(
    username: string,
    password: string,
    email: string,
    gender: string,
    age: number
    // tasks: Task[] = []
  ) {
    this.name = username;
    this.password = password;
    this.email = email;
    this.gender = gender;
    this.age = age;
    // this.tasks = tasks;
  }
}
