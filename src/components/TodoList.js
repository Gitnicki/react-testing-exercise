import React, { useEffect, useState } from 'react';

import TodoItem from './TodoItem';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');
    
    const addTodo = () => {
        setTodos([...todos, { text: input }]);
        setInput('');
    };
    
    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/todos');
                const data = await response.json();
                const formattedTodos = data.map(todo => ({ text: todo.title, completed: todo.completed }));
                setTodos(formattedTodos);
            } catch (error) {
                console.error('Error fetching todos:', error);
            }
        };
        fetchTodos();
    }, []);
    
    return (
        <div>
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Add new todo" />
            <button onClick={addTodo}>Add Todo</button>
            <ul>
                {todos.map((todo, index) => (
                    <TodoItem key={index} todo={todo} />
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
