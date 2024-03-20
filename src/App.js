import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [todos, setTodos] = useState([]); // Estado para almacenar las tareas
  const [todoEditing, setTodoEditing] = useState(null); // Estado para la tarea que se está editando

  function handleSubmit(e) { // Maneja el envío del formulario para agregar una nueva tarea
    e.preventDefault();

    // Obtener el valor del campo de texto para la nueva tarea
    let todo = document.getElementById('todoAdd').value;
    const newTodo = {
      id: new Date().getTime(), // Asigna un ID único basado en la marca de tiempo
      text: todo.trim(), // Elimina los espacios en blanco al principio y al final del texto
      completed: false, // Por defecto, la tarea no está completada
    };
    if (newTodo.text.length > 0) { // Verifica si el texto de la tarea no está vacío
        setTodos([...todos].concat(newTodo)); // Agrega la nueva tarea al estado de las tareas
    } else {
        alert("Enter Valid Task"); // Muestra una alerta si la tarea está vacía
    }
    document.getElementById('todoAdd').value = ""; // Limpia el campo de texto después de agregar la tarea
  }

  function deleteTodo(id) { // Elimina una tarea de la lista
    let updatedTodos = [...todos].filter((todo) => todo.id !== id); // Filtra las tareas para eliminar la tarea con el ID proporcionado
    setTodos(updatedTodos); // Actualiza el estado de las tareas con las tareas filtradas
  }

  function toggleComplete(id) { // Cambia el estado de completado de una tarea
    let updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed; // Cambia el estado de completado de la tarea actual
      }
      return todo;
    });
    setTodos(updatedTodos); // Actualiza el estado de las tareas con las tareas actualizadas
  }

  useEffect(() => { // Efecto secundario para cargar las tareas almacenadas al montar el componente
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  useEffect(() => { // Efecto secundario para guardar las tareas en el almacenamiento local cuando hay cambios
    if(todos.length > 0) {
        const json = JSON.stringify(todos);
        localStorage.setItem("todos", json);
    }
  }, [todos]);

  function submitEdits(newtodo) { // Envía las ediciones de una tarea
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === newtodo.id) {
        todo.text = document.getElementById(newtodo.id).value; // Actualiza el texto de la tarea con el valor del campo de texto
        }
        return todo;
      });
      setTodos(updatedTodos); // Actualiza el estado de las tareas con las tareas actualizadas
      setTodoEditing(null); // Restablece el estado de edición a nulo después de enviar las ediciones
    }

    return (
        <div id="todo-list">
          <h1>Todo List</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id='todoAdd' // Identificador único para el campo de entrada de nuevas tareas
            />
            <button type="submit">Add Todo</button>
          </form>
    {todos.map((todo) => (

  <div key={todo.id} className="todo">
    <div className="todo-text">
      <input
        type="checkbox"
        id="completed"
        checked={todo.completed}
        onChange={() => toggleComplete(todo.id)}
      />
      {todo.id === todoEditing ?
        (<input
          type="text"
          id={todo.id} // Identificador único para el campo de edición de tareas
          defaultValue={todo.text} // Establece el valor predeterminado del campo de edición como el texto actual de la tarea
        />) :
        (<div>{todo.text}</div>) // Muestra el texto de la tarea si no está en modo de edición
      }
    </div>
    <div className="todo-actions">
      {todo.id === todoEditing ?
      (
        // Botón para enviar las ediciones de la tarea
        <button onClick={() => submitEdits(todo)}>Submit Edits</button> 
      ) :
      (
        // Botón para activar el modo de edición de la tarea
        <button onClick={() => setTodoEditing(todo.id)}>Edit</button> 
      )
      }
      {/* Botón para eliminar la tarea */}
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>  
     </div>
  </div>
))}
        </div>
      );
    };

export default App;
