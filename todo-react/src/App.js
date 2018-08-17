import React, { Component } from 'react';
import Todoitems from './todoitems';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: (this.getToDoItemsObj() && this.getToDoItemsObj().lists) || [],
      filter: 'all'
    };
  }

  render() {
    return (
      <div className="content">
        <h1 className="App-title">todos</h1>
        <input
          className="to-do-input"
          type="text"
          placeholder="What needs to be done?"
          onKeyDown={this.addTodo.bind(this)}
          autoComplete="off"
        />
        {this.renderList()}
        {this.renderFooter()}
      </div>
    );
  }

  renderList() {
    let lists;

    if (this.state.filter === 'all') {
      lists = this.state.lists;
    } else if (this.state.filter === 'active') {
      lists = this.getActiveItems();
    } else {
      lists = this.getCompletedItems();
    }
    const content = lists.map(list => {
      return (
        <Todoitems
          key={list.id}
          list={list}
          onMarkCompleted={() => {
            this.markCompleted(list);
          }}
          onDelete={() => {
            this.deleteItem(list);
          }}
          onUpdateTitle={title => {
            this.updateTitle(list, title);
          }}
        />
      );
    });
    return <div className="to-do-list">{content}</div>;
  }

  renderFooter() {
    return (
      <div className="to-do-footer ">
        <div className="to-do-item-left-text ">
          {this.getActiveItems().length} items left
        </div>
        <div>
          <button
            className="filter-all-button"
            onClick={() => this.filterAll()}
          >
            All
          </button>
          <button
            className="filter-active-button"
            onClick={() => this.filterActiveItems()}
          >
            Active
          </button>
          <button
            className="filter-completed-button"
            onClick={() => this.filterComplete()}
          >
            Completed
          </button>
        </div>
        <div>
          <button
            className="clear-completed-button"
            onClick={() => this.clear()}
          >
            Clear completed
          </button>
        </div>
      </div>
    );
  }

  // Helper & Actions
  addTodo(e) {
    if (e.keyCode === 13) {
      this.setToDoItem(e.target.value);
    }
  }

  updateToDoLists() {
    this.setState({
      lists: (this.getToDoItemsObj() && this.getToDoItemsObj().lists) || []
    });
  }

  getToDoItemsObj() {
    let itemsObj;
    const itemsString = localStorage.getItem('items');

    if (itemsString) {
      itemsObj = JSON.parse(itemsString);
    }
    return itemsObj;
  }

  setToDoItem(value) {
    // Save to do item
    // create an object
    // active true false and an id
    let currentItems = this.getToDoItemsObj();
    if (currentItems) {
      let itemsArr = currentItems.lists;
      itemsArr.push({
        title: value,
        active: true,
        id: new Date().getTime() + '',
        editing: false
      });
      currentItems.lists = itemsArr;
    } else {
      currentItems = {
        lists: [
          {
            title: value,
            active: true,
            id: new Date().getTime() + '',
            editing: false
          }
        ]
      };
    }

    this.saveToDoItem(currentItems);
    this.updateToDoLists();
  }

  saveToDoItem(itemsObj) {
    // Change to do obj into string
    // Save into web storage
    localStorage.setItem('items', JSON.stringify(itemsObj));
  }

  deleteItem(item) {
    let itemsObj = this.getToDoItemsObj();

    for (let i = 0; i < itemsObj.lists.length; i++) {
      if (itemsObj.lists[i].id === item.id) {
        itemsObj.lists.splice(i, 1);
      }
    }

    this.saveToDoItem(itemsObj);
    this.updateToDoLists();
  }

  markCompleted(item, e) {
    let itemsObj = this.getToDoItemsObj();
    itemsObj.lists.forEach(currentItem => {
      if (currentItem.id === item.id) {
        currentItem.active = !currentItem.active;
      }
    });
    this.saveToDoItem(itemsObj);
    this.updateToDoLists();
  }

  clear() {
    let items = localStorage.getItem('items');
    let itemsObj = this.getToDoItemsObj();
    itemsObj.lists = itemsObj.lists.filter(list => list.active === true);
    this.saveToDoItem(itemsObj);
    this.updateToDoLists();
  }

  updateTitle(item, title) {
    let itemsObj = this.getToDoItemsObj();
    itemsObj.lists.forEach(currentItem => {
      if (currentItem.id + '' === item.id) {
        currentItem.title = title;
        currentItem.editing = false;
      }
    });
    this.saveToDoItem(itemsObj);
    this.updateToDoLists();
  }

  filterActiveItems() {
    this.setState({
      filter: 'active'
    });
  }

  filterComplete() {
    this.setState({
      filter: 'completed'
    });
  }

  filterAll() {
    this.setState({
      lists: this.getToDoItemsObj().lists || [],
      filter: 'all'
    });
  }

  getActiveItems() {
    return this.state.lists.filter(list => list.active === true);
  }

  getCompletedItems() {
    return this.state.lists.filter(list => list.active === false);
  }
}

export default App;
