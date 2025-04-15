"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login, register } from '../services/api';

function AuthForm({ setToken, setUserId }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: '', password: '', fullName: '' });

  const router = useRouter()

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const data = isLogin
        ? await login(form.email, form.password)
        : await register(form.email, form.fullName, form.password);
      setToken(data.data.token);
      setUserId(data.data._id);

      localStorage.setItem("user", JSON.stringify({
        _id : data.data._id,
        email : data.data.email,
        fullName : data.data.fullName,
        token : data.data.token,
        status : true,
      }))

      router.push(`/todo?token=${data.data.token}`)
    } catch (err) {
      alert('Gagal login/registrasi');
    }
  };

  return (
    <div className="auth-form">
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            name="fullName"
            type="text"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            required
          />
        )}
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      <p onClick={() => setIsLogin(!isLogin)} className="toggle">
        {isLogin ? 'Belum punya akun? Daftar' : 'Sudah punya akun? Login'}
      </p>
    </div>
  );
}

export default AuthForm;
