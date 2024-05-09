import React, { useState } from 'react';
import './App.css';
import sound1 from './sounds/tenge-tenge.mp3'
import sound2 from './sounds/sus.mp3'
import sound3 from './sounds/sad.mp3'

function App() {
  const [slam, setSlam] = useState(false);
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  //adding todos to list

  function play1(){
    new Audio(sound1).play()
  }
  function play2(){
    new Audio(sound2).play()
  }
  function play3(){
    new Audio(sound3).play()
  }

  const triggerRainbowBackground = () => {
    const appElement = document.querySelector('.App');
    appElement.classList.add('rainbow-background');
    setTimeout(() => {
      appElement.classList.remove('rainbow-background');
    }, 12000); 
  };

  const addTodo = (event) => {
    event.preventDefault();
    setTodos([...todos, {id: Date.now(), text: input, completed: false, slam: true}]);
    setInput('');
    play2()
  }

  //removing todos from lsit
  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
    play3()
  }
  //displayig todos as finished
  const completeTodo = (id) => {
    setTodos(todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo));
    play1()
    triggerRainbowBackground();
  }

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
              <button id = 'c_r_btn' onClick={() => completeTodo(todo.id)}>Complete</button>
              <button id = 'c_r_btn' onClick={() => removeTodo(todo.id)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;
