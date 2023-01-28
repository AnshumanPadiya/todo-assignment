import { Request, Response } from 'express';
import { Todo, TodoInput } from '../models/todo';

export const getTodo = async (request: Request, response: Response) => {
    try {
        const todos = await Todo.find();
        return response.status(200).json({ data: todos });
    }
    catch(error) {
        response.status(400).send(error);
    }
}

export const createTodo = async (request: Request, response: Response) => {
    try {
        const { data } = request.body;

        if(!data) return response.status(400).json({ message: "Please fill up all the fields" });

        const todoRequest: TodoInput = {
            data,
        };

        const todoCreated = await Todo.create(todoRequest);
        console.log(todoCreated);
        return response.status(201).json({ data: todoCreated });
    
    }
    catch(error) {
        response.status(400).send(error);
    }
}


export const updateTodo = async (request: Request, response: Response) => {
    try {
        const { data } = request.body;
        const { id } = request.params;

        if(!data) return response.status(400).json({ message: "Please fill up all the fields" });
        
        const todo = await Todo.findById({ _id: id });

        await Todo.updateOne({ _id: id }, { data });
 
        const todoUpdated = await Todo.findById(id, { data });
        return response.status(201).json({ data: todoUpdated });

    }
    catch(error) {
        response.status(400).send(error);
    }
}


export const deleteTodo = async (request: Request, response: Response) => {
    try {
        const { id } = request.params;
        await Todo.findByIdAndDelete(id);
        return response.status(200).json({ message: "todo deleted" });
    }
    catch(error) {
        response.status(400).json({ message: "Invalid request", error });
    }
}

export const paginateTodo = async (request: Request, response: Response) => {
    try {

        const page = parseInt(request.params.page);
        const limit = parseInt(request.params.limit);

        const todos = await Todo.find()
        .skip(page * limit)
        .limit(limit)
        .exec((error, todos) => {
            if(!error) {
                return response.status(200).json({ data: todos });
            }
            else {
                response.status(400).json({ message: "Invalid request", error });
            }
        })
    }
    catch(error) {
        response.status(400).send(error);
    }
}