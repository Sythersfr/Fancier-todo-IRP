import React, { useState } from 'react';
import useSound from 'use-sound';
import './App.css';

function App() {
  const [slam, setSlam] = useState(false);
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  //adding todos to list

  const addTodo = (event) => {
    event.preventDefault();
    setTodos([...todos, {id: Date.now(), text: input, completed: false, slam: true}]);
    setInput('');
  }

  //removing todos from lsit
  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  }
  //displayig todos as finished
  const completeTodo = (id) => {
    setTodos(todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo));
  
  }

  const [playSound] = useSound('/sounds/sus.mp3');

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setTodos(todos.map(todo => ({...todo, slam: false})));
    }, 1000);
  
    return () => clearTimeout(timer); 
  }, [todos]);

  return (
    <div className="App">
      <h1>To-Do List</h1>

  
      <form>
        <input value={input} onChange={event => setInput(event.target.value)} />
        <button id = 'add-btn' type="submit" onClick={addTodo}>Add To-Do</button>
      </form>

      <ul>
        {todos.map(todo => (
          <li key={todo.id} className={todo.slam ? 'slam' : ''} style={{textDecoration: todo.completed ? 'line-through' : 'none'}}>
            <div>{todo.text}</div>
            <div>
              <button id = 'c_r_btn' onClick={playSound}>Complete</button>
              <button id = 'c_r_btn' onClick={() => removeTodo(todo.id)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;
