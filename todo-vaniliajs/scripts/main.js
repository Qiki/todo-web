/**
 * Global variables
 */

let filter = 'all';

/**
 * Views
 */

function renderTodo(items) {
  if (filter === 'active') {
    items = getActiveItems();
  } else if (filter === 'completed') {
    items = getCompletedItems();
  }

  // get current div
  let container = window.document.getElementById('to-do-list');

  // clear the child node before append new ones
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  const listArr = items.lists;

  // insert div into current div
  for (let i = 0; i < listArr.length; i++) {
    let listItem = window.document.createElement('div');
    listItem.className = 'item-row';

    listItem.appendChild(checkbox(listArr[i]));
    listItem.appendChild(titleContent(listArr[i]));
    listItem.appendChild(deleteButton(listArr[i]));
    container.appendChild(listItem);
  }

  document.getElementById('to-do-item-left-text').innerHTML =
    generateLeftItemNum(items) + ' items left';
}

function deleteButton(currentItem) {
  let button = window.document.createElement('BUTTON');
  button.classList.add('delete-button');
  button.id = currentItem.id;
  button.onclick = deleteItem;
  let buttonTitle = window.document.createTextNode('X');
  button.appendChild(buttonTitle);

  return button;
}

function checkbox(currentItem) {
  let checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'to-do-checkbox';
  checkbox.id = currentItem.id;
  checkbox.checked = !currentItem.active;

  checkbox.onchange = markCompleted;

  return checkbox;
}

function titleContent(currentItem) {
  let textDiv = window.document.createElement('input');
  textDiv.className = 'to-do-title';
  textDiv.id = currentItem.id;
  textDiv.readOnly = true;
  textDiv.value = currentItem.title;
  textDiv.ondblclick = function(e) {
    textDiv.readOnly = false;
    textDiv.style.textDecoration = 'none';
    textDiv.style.color = 'black';
  };

  textDiv.onkeydown = updateItemName;

  if (!currentItem.active) {
    textDiv.style.textDecoration = 'line-through';
    textDiv.style.color = '#d9d9d9';
  }

  return textDiv;
}

/**
 * Actions
 */

window.onload = function() {
  // Render todo list from local storage when page load
  const itemsObj = getToDoItemsObj();
  if (itemsObj) {
    renderTodo(itemsObj);
  }
};

function addToDo(e) {
  // Add To Do Item
  if (e.keyCode == 13) {
    const input = document.getElementById('to-do-input');
    // save the item
    setToDoItem(input.value);

    // re-render to do
    renderTodo(getToDoItemsObj());

    // clear text field
    input.value = '';
  }
}

function filterAll() {
  filter = 'all';
  renderTodo(getToDoItemsObj());
}

function filterActive() {
  filter = 'active';
  renderTodo(getActiveItems());
}

function filterComplete() {
  filter = 'completed';
  renderTodo(getCompletedItems());
}

function clearComplete() {
  let itemsObj = getToDoItemsObj();
  itemsObj.lists = itemsObj.lists.filter(list => list.active === true);
  saveToDoItem(itemsObj);
  renderTodo(itemsObj);
}

function markCompleted(e) {
  let itemsObj = getToDoItemsObj();
  itemsObj.lists.forEach(item => {
    if (item.id === e.srcElement.id) {
      item.active = !e.srcElement.checked;
    }
  });
  saveToDoItem(itemsObj);
  renderTodo(itemsObj);
}

function deleteItem(e) {
  let itemsObj = getToDoItemsObj();

  for (let i = 0; i < itemsObj.lists.length; i++) {
    if (itemsObj.lists[i].id === e.srcElement.id) {
      itemsObj.lists.splice(i, 1);
    }
  }

  saveToDoItem(itemsObj);
  renderTodo(itemsObj);
}

function updateItemName(e) {
  if (e.keyCode == 13) {
    let itemsObj = getToDoItemsObj();
    itemsObj.lists.forEach(item => {
      if (item.id + '' === e.srcElement.id) {
        item.title = e.srcElement.value;
      }
    });

    saveToDoItem(itemsObj);
    renderTodo(itemsObj);
  }
}

/**
 *  Data
 */

function getActiveItems() {
  let itemsObj = getToDoItemsObj();

  itemsObj.lists = itemsObj.lists.filter(list => list.active === true);

  return itemsObj;
}

function getCompletedItems() {
  let itemsObj = getToDoItemsObj();
  itemsObj.lists = itemsObj.lists.filter(list => list.active === false);
  return itemsObj;
}

function generateLeftItemNum(items) {
  let count = 0;

  items.lists.forEach(element => {
    if (element.active === true) {
      count++;
    }
  });

  return count;
}

/*
 * Helpers
 */
function getToDoItemsObj() {
  let itemsObj;
  const itemsString = localStorage.getItem('items');

  if (itemsString) {
    itemsObj = JSON.parse(itemsString);
  }
  return itemsObj;
}

function saveToDoItem(itemsObj) {
  // Change to do obj into string
  // Save into web storage
  localStorage.setItem('items', JSON.stringify(itemsObj));
}

function setToDoItem(value) {
  // Save to do item
  // create an object
  // active true false and an id
  let currentItems = getToDoItemsObj();
  if (currentItems) {
    let itemsArr = currentItems.lists;
    itemsArr.push({
      title: value,
      active: true,
      id: new Date().getTime() + ''
    });
    currentItems.lists = itemsArr;
  } else {
    currentItems = {
      lists: [
        {
          title: value,
          active: true,
          id: new Date().getTime() + ''
        }
      ]
    };
  }

  saveToDoItem(currentItems);
}
