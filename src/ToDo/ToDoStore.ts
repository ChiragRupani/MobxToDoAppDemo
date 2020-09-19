import { action, configure, observable } from 'mobx';
import ToDoModel from './ToDoModel';

configure({ enforceActions: 'always' });

export default class ToDoStore {
  @observable
  ToDos: ToDoModel[] = [];

  private todoAPI = 'https://localhost:44308/api/ToDo';

  @action.bound
  async init() {
    let response = await fetch(this.todoAPI);
    let newToDos: ToDoModel[] = await response.json();
    this.addToDoToStore(newToDos);
  }

  @action.bound
  addToDoToStore(ToDos: ToDoModel[]) {
    this.ToDos.length = 0;
    for (let todo of ToDos) {
      this.ToDos.push(todo);
    }
  }

  @action.bound
  getToDos() {
    return this.ToDos;
  }

  @action.bound
  async addToDo(title, isCompleted) {
    let response = await fetch(this.todoAPI, {
      method: 'Post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ title, isCompleted }),
    });
    let createdToDo = await response.json();
    this.addNewToDoToStore(createdToDo);
  }

  @action.bound
  async addNewToDoToStore(todo: ToDoModel) {
    this.ToDos.push(todo);
  }
}
