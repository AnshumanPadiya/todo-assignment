import mongoose, { Schema, Model, Document } from 'mongoose';

type TodoDocument = Document & {
    data: string,
};

type TodoInput = {
    data: TodoDocument["data"];
}

const todoSchema = new Schema({
    data: Schema.Types.String,
})

const Todo: Model<TodoDocument> = mongoose.model<TodoDocument>('Todo', todoSchema);
export { Todo, TodoDocument, TodoInput };