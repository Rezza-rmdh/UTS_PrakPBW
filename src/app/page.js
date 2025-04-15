"use client";

import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthForm from './components/AuthForm';

export default function Home() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const router = useRouter()

  useEffect(() => {
    if (token) {
      router.push(`/todo?token=${token}`)
    }
  }, [])

  return (
    <AuthForm setToken={setToken} setUserId={setUserId} />
  )
}
