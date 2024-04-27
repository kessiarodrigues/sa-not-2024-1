import React from 'react'
import { Routes, Route } from 'react-router-dom'

import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import UserList from '../pages/UserList'
import UserForm from '../pages/UserForm'

export default function AppRoutes() {
  return <Routes>
    <Route path="/" element={ <HomePage /> } />
    <Route path="/login" element={ <LoginPage /> } />
    <Route path="/users" element={ <UserList /> } />
    <Route path="/users/:id" element={ <UserForm /> } />
  </Routes>
}