import express, { Router } from 'express';
import { getTodo, createTodo, updateTodo, deleteTodo, paginateTodo } from '../controllers/todoController';

const router = Router();

// GET all todos
router.get('/todo', getTodo);

// Create a todo
router.post('/todo', createTodo);

// Update todo by id
router.put('/todo/:id', updateTodo);

// Delete todo by id
router.delete('/todo/:id', deleteTodo);

// Pagination
router.get('/todo/:page/:limit', paginateTodo);

export default router;