export class ToDoModel {
  public lists: any[];
  public activelists: any[];
  public filter = 'all';

  constructor() {
    this.lists = (this.getToDoItemsObj() && this.getToDoItemsObj().lists) || [];
    this.activelists = this.getActiveItems() || [];
  }

  public getToDoItemsObj() {
    let itemsObj;
    const itemsString = localStorage.getItem('items');

    if (itemsString) {
      itemsObj = JSON.parse(itemsString);
    }
    return itemsObj;
  }

  public saveToDoItem(itemsObj) {
    // Change to do obj into string
    // Save into web storage
    localStorage.setItem('items', JSON.stringify(itemsObj));
  }

  public setToDoItem(value) {
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

  public updateToDoLists() {
    if (this.filter === 'all') {
      this.lists =
        (this.getToDoItemsObj() && this.getToDoItemsObj().lists) || [];
    } else if (this.filter === 'active') {
      this.lists = this.getActiveItems();
    } else if (this.filter === 'completed') {
      this.lists = this.getCompletedItems();
    }
    this.activelists = this.getActiveItems() || [];
  }

  public clear() {
    let items = localStorage.getItem('items');
    let itemsObj = this.getToDoItemsObj();
    itemsObj.lists = itemsObj.lists.filter(list => list.active === true);
    this.saveToDoItem(itemsObj);
    this.updateToDoLists();
  }

  public editing(item, isEditing) {
    let itemsObj = this.getToDoItemsObj();
    itemsObj.lists.forEach(list => {
      if (list.id === item.id) {
        list.editing = isEditing;
      }
    });
    this.saveToDoItem(itemsObj);
    this.updateToDoLists();
  }

  public updateTitle(item, title) {
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

  public deleteItem(item) {
    let itemsObj = this.getToDoItemsObj();

    for (let i = 0; i < itemsObj.lists.length; i++) {
      if (itemsObj.lists[i].id === item.id) {
        itemsObj.lists.splice(i, 1);
      }
    }

    this.saveToDoItem(itemsObj);
    this.updateToDoLists();
  }

  public markCompleted(item, checked) {
    let itemsObj = this.getToDoItemsObj();
    itemsObj.lists.forEach(currentItem => {
      if (currentItem.id === item.id) {
        currentItem.active = !checked;
      }
    });
    this.saveToDoItem(itemsObj);
    this.updateToDoLists();
  }

  public filterActiveItems() {
    this.lists = this.getActiveItems();
  }

  public filterComplete() {
    this.lists = this.getCompletedItems();
  }

  public getActiveItems() {
    let itemsObj = this.getToDoItemsObj();

    if (itemsObj) {
      itemsObj.lists = itemsObj.lists.filter(list => list.active === true);
      return itemsObj.lists;
    } else {
      return [];
    }
  }

  public getCompletedItems() {
    let itemsObj = this.getToDoItemsObj();
    itemsObj.lists = itemsObj.lists.filter(list => list.active === false);
    return itemsObj.lists || [];
  }

  public getAllItems() {
    this.lists = this.getToDoItemsObj().lists || [];
  }
}
