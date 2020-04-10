import * as uuid from 'uuid'

import { TodoItem } from '../models/TodoItem'
import { TodoAccess } from '../dataLayer/todoAccess'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { parseUserId } from '../auth/utils'

const todoAccess = new TodoAccess()

export async function getTodoById(todoId: String): Promise<TodoItem> {
  return todoAccess.getTodoById(todoId)
}

export async function getUserTodos(jwtToken: string): Promise<TodoItem[]> {
  const userId = parseUserId(jwtToken)
  return await todoAccess.getUserTodos(userId)
}

export async function deleteTodo(todoId: String): Promise<TodoItem> {
  let todo = await getTodoById(todoId)
  return await todoAccess.deleteTodo(todo)
}

export async function updateTodo(
  todoId: String,
  UpdateTodoRequest: UpdateTodoRequest
): Promise<TodoItem> {

  let todo = await getTodoById(todoId)
  todo.name = UpdateTodoRequest.name
  todo.dueDate = UpdateTodoRequest.dueDate
  todo.done = UpdateTodoRequest.done

  return await todoAccess.updateTodo(todo)
}

export async function createTodo(
  CreateTodoRequest: CreateTodoRequest,
  jwtToken: string
): Promise<TodoItem> {

  const itemId = uuid.v4()
  const userId = parseUserId(jwtToken)

  return await todoAccess.createTodo({
    todoId: itemId,
    userId: userId,
    name: CreateTodoRequest.name,
    dueDate: CreateTodoRequest.dueDate,
    createdAt: new Date().toISOString(),
    done: false
  })
}

export async function generateUploadUrl(todoId: string) {
  return await todoAccess.generateUploadUrl(todoId)
}