const BASE_URL = 'https://api-todo-list-pbw.vercel.app';

export const register = async (email, fullName, password) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, fullName, password })
  });
  return res.json();
};

export const login = async (email, password) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return res.json();
};

export const logout = async (token, userId) => {
    await fetch(`${BASE_URL}/auth/logout/${userId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
};
  
export const getTodos = async (token) => {
  const res = await fetch(`${BASE_URL}/todo/getAllTodos`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
};

export const createTodo = async (token, text) => {
  await fetch(`${BASE_URL}/todo/createTodo`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ text })
  });
};

export const updateTodo = async (token, id, text, onCheckList = true) => {
  await fetch(`${BASE_URL}/todo/updateTodo/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ text, onCheckList })
  });
};

export const deleteTodo = async (token, id) => {
  await fetch(`${BASE_URL}/todo/deleteTodo/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
};


