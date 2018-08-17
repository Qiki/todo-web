import React, { Component } from 'react';
import './App.css';

class Todoitems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    };
  }

  render() {
    return (
      <div className="item-row" key={this.props.list.id}>
        <input
          className="to-do-checkbox"
          type="checkbox"
          checked={!this.props.list.active}
          onChange={this.props.onMarkCompleted}
        />
        <input
          className="to-do-title"
          defaultValue={this.props.list.title}
          style={{
            color: this.props.list.active ? 'black' : '#d9d9d9',
            textDecoration: this.props.list.active ? 'none' : 'line-through'
          }}
          readOnly={this.state.editing ? false : true}
          onDoubleClick={() => {
            this.setState({
              editing: true
            });
          }}
          onChange={() => {
            // does nothing
          }}
          onKeyDown={this.handleUpdate.bind(this)}
        />
        <button
          className="delete-button"
          onClick={this.props.onDelete} // why need to do this way
        >
          X
        </button>
      </div>
    );
  }

  handleUpdate(event) {
    if (event.keyCode === 13) {
      this.setState({
        editing: false
      });
      this.props.onUpdateTitle(event.target.value);
    }
  }
}

export default Todoitems;
