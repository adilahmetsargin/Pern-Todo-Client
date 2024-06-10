import axios from 'axios';

const API_URL = 'http://localhost:7777';

export interface Todo {
    id: number;
    description: string;
}

export const getTodos = async (): Promise<Todo[]> => {
    const response = await axios.get<Todo[]>(`${API_URL}/todos`);
    return response.data;
};

export const addTodo = async (description: string): Promise<Todo> => {
    const response = await axios.post<Todo>(`${API_URL}/todos`, { description });
    return response.data;
};

export const deleteTodo = async (id: number): Promise<void> => {
    await fetch(`${API_URL}/todos/${id}`, {
        method: 'DELETE'
    });
    getTodos()
};

export const updateTodo = async (id: number, description: string): Promise<void> => {
    await fetch(`${API_URL}/todos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description }),
    });

    getTodos()
};