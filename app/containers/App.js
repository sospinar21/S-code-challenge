import React from 'react';
import { connect } from 'react-redux';

import './App.css';

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      todos:[]
    }
  }

  async componentDidMount() {
    const todos = await this.getTodos();
  }

  getTodos = async () => {
    const response = await fetch('https://api.awc.dance/codechallenge')
    const data = await response.json();
    await this.addTodosToState(data)
    return await data
  }

  addTodosToState = (data) => {
    const todos = data.map(todo => todo)
    this.setState({todos})
  }

  displayTodos = () => {
    const todos = this.state.todos.map((todo, index) => {
      return (
        <div key={'todo' + index} className='todo-div'>
        <h1>{todo.id}</h1>
        <h1>{todo.name}</h1>
        <h1>{todo.url}</h1>
        <h1>{todo.completed}</h1>
      </div>
      )
    }) 
    return todos;
  }

  render() {
    const { swagger } = this.props;
    const todos = this.displayTodos()

    return (
      <div className={style.App}>
        <div className='todos'>{todos}</div>
        <pre className={style.SwaggerDebug}>
        </pre>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { swagger: state.swagger };
}

export default connect(mapStateToProps)(App);
