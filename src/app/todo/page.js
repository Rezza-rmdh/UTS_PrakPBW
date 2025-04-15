"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getTodos, createTodo, updateTodo, deleteTodo, logout } from '../services/api';

function TodoInput({ onAdd }) {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim() !== '') {
            onAdd(text);
            setText('');
        }
    };

    return (
        <form className="todo-input" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Tambah todo baru..."
                value={text}
                onChange={e => setText(e.target.value)}
            />
            <button type="submit">Tambah</button>
        </form>
    );
}

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);

    const handleEdit = () => {
        if (isEditing && editText.trim() !== '' && editText !== todo.text) {
            onEdit(todo._id, editText, todo.status);
        }
        setIsEditing(!isEditing);
    };

    return (
        <div className={`todo-item ${todo.status ? 'checked' : ''}`}>
            {isEditing ? (
                <input
                    type="text"
                    value={editText}
                    onChange={e => setEditText(e.target.value)}
                />
            ) : (
                <span onClick={() => onToggle(todo._id, todo.text, todo.status)}>
                    {todo.text}
                </span>
            )}
            <button onClick={handleEdit}>
                {isEditing ? 'Simpan' : 'Edit'}
            </button>
            <button onClick={() => onDelete(todo._id)}>Hapus</button>
        </div>
    );
}

export default function TodoPage() {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const [todos, setTodos] = useState([]);

    const [user, setUser] = useState({
        _id: '',
        fullName: '',
        email: '',
        token: '',
        status: true,
    })

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        setUser(JSON.parse(savedUser));
    }, [])

    const handleLogout = async () => {
        try {
            await logout(token, user._id);
            alert("Berhasil logout");
            window.location.href = '/'; // redirect ke halaman utama/login
        } catch (error) {
            console.error("Gagal logout:", error);
        }
    };

    const fetchTodos = async () => {
        try {
            const data = await getTodos(token);
            setTodos(data.data || []);
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    };

    useEffect(() => {
        if (token) fetchTodos();
    }, [token]);

    const handleAdd = async (text) => {
        await createTodo(token, text);
        fetchTodos();
    };

    const handleToggle = async (id, text, done) => {
        await updateTodo(token, id, text, !done);
        fetchTodos();
    };

    const handleDelete = async (id) => {
        await deleteTodo(token, id);
        fetchTodos();
    };

    const handleEdit = async (id, newText, done) => {
        await updateTodo(token, id, newText, done);
        fetchTodos();
    };

    return (
        <div className="todo-page">
            <h2>Todo List</h2>
            <button onClick={handleLogout}>Logout</button>
            <TodoInput onAdd={handleAdd} />
            <div className="todo-list">
                {todos.map(todo => (
                    <TodoItem
                        key={todo._id}
                        todo={todo}
                        onToggle={handleToggle}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                    />
                ))}
            </div>
        </div>
    );
}
