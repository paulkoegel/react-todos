import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = { todos: [], filter: 'all' };

    this.bindThis([
      "inputRefCb",
      "handleKeyDown",
      "handleItemClick",
      "handleSubmit",
      "handleAllFilterClick",
      "handleTodoFilterClick",
      "handleDoneFilterClick"
    ]);
  }

  bindThis(functionNames) {
    functionNames.forEach((name) => {
      this[name] = this[name].bind(this);
    });
  }

  filteredTodos() {
    console.log('filteredTodos', this.state.filter, this.state.todos);
    if (this.state.filter === 'all') {
      return this.state.todos;
    } else {
      return this.state.todos.filter(el => {
        return el.done === (this.state.filter === 'done') ;
      });
    }
  }

  renderTodos() {
    return this.filteredTodos().map((el, i) => {
      const cssClasses = `item${el.done ? " done" : ""}`;
      return(
        <li key={i} onClick={this.handleItemClick.bind(null, i)} className={cssClasses}>
          {el.title}
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
        this.addTodoToState(this._inputEl.value);
        break;
      default:
        break;
    }
  }

  addTodoToState() {
    const value = this._inputEl.value;
    const slug = this.generateSlug(value);
    this.setState({ todos: this.state.todos.concat([{ title: value, done: false, slug }]) });
    this._inputEl.value = null;
  }

  handleItemClick(i) {
    this.setState({ todos: [...this.state.todos.slice(0,i), { ...this.state.todos[i], done: !this.state.todos[i].done }, ...this.state.todos.slice(i + 1)] });
  }

  handleSubmit() {
    this.addTodoToState();
    this._inputEl.value = null;
    this._inputEl.focus();
  }

  handleAllFilterClick() {
    this.setState({ filter: 'all' });
  }

  handleTodoFilterClick() {
    this.setState({ filter: 'todo' });
  }

  handleDoneFilterClick() {
    this.setState({ filter: 'done' });
  }

  render() {
    return (
      <div className="App">
        <h1>Todos</h1>

        { /* https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes */ }
        <input type='text' onKeyDown={this.handleKeyDown} ref={this.inputRefCb} autoFocus />
        <input type='button' value='Add Todo' onClick={this.handleSubmit} />

        <p>
          <strong>Filter:</strong>&nbsp;
          <span className={`filter allFilter${this.state.filter === 'all' ? ' is-active' : ''}`} onClick={this.handleAllFilterClick}>
            all ({ this.state.todos.length })
          </span> &bull;&nbsp;
          <span className={`filter todoFilter${this.state.filter === 'todo' ? ' is-active' : ''}`} onClick={this.handleTodoFilterClick}>
            todo ({ this.state.todos.filter(el => el.done === false).length })
          </span> &bull;&nbsp;
          <span className={`filter doneFilter${this.state.filter === 'done' ? ' is-active' : ''}`} onClick={this.handleDoneFilterClick}>
            done ({ this.state.todos.filter(el => el.done === true).length })
          </span>
        </p>

        <ul className='todosList'>
          { this.renderTodos() }
        </ul>
      </div>
    );
  }
}

export default App;
