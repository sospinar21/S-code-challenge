import React from 'react';
import { connect } from 'react-redux';
import style from './App.css';

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      todos:[]
    };
  }

  async componentDidMount() {
    const todos = await this.getTodos();
  };

  getTodos = async () => {
    const response = await fetch('https://api.awc.dance/codechallenge')
    const data = await response.json();
    await this.addTodosToState(data);
    return await data;
  };

  addTodosToState = (data) => {
    const todos = data.map(todo => todo);
    this.setState({todos});
  }

  displayTodos = () => {
    const todos = this.state.todos.map((todo, index) => {
      const completed = todo.completed !== null ? style.tododiv : style.completed;
      const completedText = todo.completed !== null ? style.completedText : style.noCompleted;
      return (
      <div>
        <div key={'todo' + index} className={completed}>
          <h2 className={completedText}>Name: {todo.name}</h2>
          <p className={style.id}>Project's Id: {todo.id}</p>
          <a href={style.url} className={style.url}>Link {todo.url}</a>
        </div>
        <hr/>
      </div>
      )
    }) 
    return todos;
  }

  render() {
    const { swagger } = this.props;
    const todos = this.displayTodos();
    return (
      <div className={style.App}>
        <div className={style.header}>
          <h1 className={style.mainTitle}>ToDos</h1>
        </div>
        <div className={style.todos}>
          {todos}
        </div>
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
