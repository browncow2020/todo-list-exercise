import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  listTitle = 'Important things to do:';
  todoItems = [];
  newTodoItem = '';
  existingTodoItem = {};
  existingTodoItemIndex = -1;
  existingTodoItemDesc = '';
  editMode: Boolean = false;

  constructor() { }

  ngOnInit() {
    this.retrieveTodoList();
  }

  addTodoItem() {
    // console.log('item added: ' + this.newTodoItem);
    const obj = {desc: this.newTodoItem, state: 'new'};
    this.todoItems.push(obj);
    this.newTodoItem = '';
    this.storeTodoList();
  }

  storeTodoList() {
    localStorage.setItem('todolist', JSON.stringify(this.todoItems));
  }

  retrieveTodoList() {
    const storedList = localStorage.getItem('todolist');
    if (storedList) {
      this.todoItems = JSON.parse(storedList);
    }
  }

  deleteTodoItem(itemIndex) {
    // console.log('going to delete: ' + itemIndex);
    if ( confirm('Are you sure you want to delete this todo?')) {
      this.todoItems.splice(itemIndex, 1);
      this.storeTodoList();
    }
  }

  editTodoItem(itemIndex) {
    this.existingTodoItem = this.todoItems[itemIndex];
    this.existingTodoItemIndex = itemIndex;
    this.existingTodoItemDesc = this.todoItems[itemIndex].desc;
    this.editMode = true;
  }

  SaveEditTodoItem() {
    console.log('editing: ' + this.existingTodoItemIndex);
    this.todoItems[this.existingTodoItemIndex].desc = this.existingTodoItemDesc;
    this.todoItems[this.existingTodoItemIndex].state = 'edited';
    this.existingTodoItemIndex = -1;
    this.editMode = false;
    this.storeTodoList();
  }

  toggleTodoItem(event) {
    const elem = event.target;
    const parent = elem.parentNode;
    const elemValue = elem.value;
    let itemState = '';
    if (elem.checked) {
      parent.classList.add('completed');
      itemState = 'completed';
    } else {
      parent.classList.remove('completed');
      itemState = 'active';
    }

    for (const i in this.todoItems) {
      if (this.todoItems[i].desc === elemValue) {
        this.todoItems[i].state = itemState;
        break;
      }
    }
    this.storeTodoList();
  }
}
