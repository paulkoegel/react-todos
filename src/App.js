import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = { todos: [], filter: 'all' };
    this.inputRefCb = this.inputRefCb.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  renderTodos() {
    return this.state.todos.map((el, i) => {
      return(
        // <li key={el.slug} onClick={this.handleItemClick.bind(null, i)}>
        <li key={i} onClick={this.handleItemClick.bind(null, i)} className={el.done ? "done" : null}>
          {el.title} ({el.done ? "0" : "1"})
        </li>
      );
    });
  }

  inputRefCb(c) {
    this._inputEl = c;
  }

  generateSlug(value) {
    if (this.state.todos.map(el => el.slug).indexOf(value) < 0) {
      return value;
    } else {
      return this.generateSlug(`${value}@`);
    }
  }

  // receives a synthetic React keyboard event
  // see: https://facebook.github.io/react/docs/events.html#keyboard-events
  handleKeyDown({ key }) {
    switch (key) {
      case "Enter":
        const value = this._inputEl.value;
        const slug = this.generateSlug(value);
        this.setState({ todos: this.state.todos.concat([{ title: this._inputEl.value, done: false, slug }]) });
        break;
      default:
        break;
    }
  }

  handleItemClick(i) {
    // const items = [1,2,3];
    // console.log([...items, 4, 5, 6]);
    this.setState({ todos: [...this.state.todos.slice(0,i), { ...this.state.todos[i], done: !this.state.todos[i].done }, ...this.state.todos.slice(i + 1)] });
    //this.setState({ todos: [...this.state.todos.slice(0,i), { active: !this.state.todos[i].active } ] }); //, ...this.state.todos.slice(i + 1)]);
  }

  render() {
    return (
      <div className="App">
        <h1>Todos</h1>
        <input type="text" onKeyDown={this.handleKeyDown} ref={this.inputRefCb} />
        <ul>
          { this.renderTodos() }
        </ul>
      </div>
    );
  }
}

export default App;
