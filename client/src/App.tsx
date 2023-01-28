import React, { useState } from 'react';
import './App.css';
import Todo from './components/Todo';
import { useQuery, useMutation } from 'react-query';
import axios from 'axios';

interface newTodoI {
  data: string
}
interface TodoI {
  _id: any,
  data: string
}

function App() {

  const [newTodo, setNewTodo] = useState<string>("");

  const { mutate: createTodo } = useMutation( async () => {
    return await axios.post("http://localhost:4000/todo", {
      data: newTodo
    })
  })

  const getTodo = async () => {
    const response = await axios.get("http://localhost:4000/todo")
    console.log(response);
    return response.data.data;  
  }

  function createNewTodo() {
    // e.preventDefault();
    try{
      createTodo();
    }
    catch(error) {
      // throw new Error(error);
      console.log(error);
    }
  }

  const { data, isLoading, error } = useQuery("todo", getTodo);

  if(isLoading) return <p>Loading...</p>
  if(error) return <p>Something went wrong</p>



  return (
    <div className="App h-screen w-full flex-col">
      <div className='h-[80%] w-full flex flex-col justify-center items-center'>
        <h1>Hi and Welcome to the todo app</h1>
        <div className='h-[60vh] w-[50vw] bg-slate-300 my-4'>
          {data.map((todo: TodoI) => (
            <div key={todo._id}>
              <Todo data={todo.data} id={todo._id} update={newTodo} />
            </div>
          ))}
        </div>
      </div>
      <div className='flex flex-col justify-center items-center'>
        <h2>Add a new todo</h2>
        <input onChange={e => {setNewTodo(e.target.value)}} type="text" className='border-2 rounded-md my-2' value={newTodo} />
        <button onClick={createNewTodo} className='bg-green-300 w-[8vw] p-4 mx-1 rounded-md'>Create</button>
      </div>
    </div>
  );
}

export default App;
