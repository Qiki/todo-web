import { Component, NgModule } from '@angular/core';
import { ToDoModel } from './services/model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public inputValue = '';
  public activeItems;

  constructor(public todoModel: ToDoModel) {}

  // Actions

  public addToDo(event) {
    // Add To Do Item
    if (event.keyCode == 13) {
      // save the item
      //setToDoItem(input.value);
      if (event.target.value.length) {
        this.todoModel.setToDoItem(event.target.value);
      }
      // clear text field
      this.inputValue = null;
    }
  }

  // Delete
  public deleteItem(item) {
    this.todoModel.deleteItem(item);
  }

  public markCompleted(item, e) {
    this.todoModel.markCompleted(item, e.srcElement.checked);
  }

  public editTitle(item) {
    this.todoModel.editing(item, true);
  }

  public cancelEditing(item) {
    this.todoModel.editing(item, false);
  }

  public updateTitle(item, e) {
    this.todoModel.updateTitle(item, e.srcElement.value);
  }

  public filterAll() {
    this.todoModel.filter = 'all';
    this.todoModel.getAllItems();
  }

  public filterActive() {
    this.todoModel.filter = 'active';
    this.todoModel.filterActiveItems();
  }

  public filterComplete() {
    this.todoModel.filter = 'completed';
    this.todoModel.filterComplete();
  }

  public clearComplete() {
    this.todoModel.clear();
  }

  /*
  * Update styles
  */

  public updateTitleStyle(item) {
    let styles = {
      color: item.active || item.editing ? 'black' : '#d9d9d9',
      'text-decoration': item.active || item.editing ? 'none' : 'line-through'
    };
    return styles;
  }

  public clearStyle() {
    let styles = {
      color: 'black',
      'text-decoration': 'none'
    };
    return styles;
  }
}
