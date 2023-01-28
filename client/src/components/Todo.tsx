import React, { FunctionComponent } from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';

interface todo {
    id: any,
    data: string,
    update: string,
};

const Todo: FunctionComponent<todo> = ({ data, id, update }) => {

  const { mutate: deleteTodo } = useMutation((id) => {
    return axios.delete(`http://localhost:4000/todo/${id}`);
  });

  const { mutate: updateTodo } = useMutation((id) => {
    return axios.put(`http://localhost:4000/todo/${id}`, {
      data: update
    });
  });

  return (
    <div className='h-[10vh] w-full bg-slate-600 flex justify-center items-center'>
        <h1 className='text-white w-[50%]'>{data}</h1>
        <span className='ml-4'>
            <button className='bg-green-300 w-[8vw] p-4 mx-1 rounded-md' onClick={() => updateTodo(id)}>Edit</button>
            <button className='bg-red-300 w-[8vw] p-4 mx-1 rounded-md' onClick={() => deleteTodo(id)}>Delete</button>

        </span>
    </div>
  )
}

export default Todo;