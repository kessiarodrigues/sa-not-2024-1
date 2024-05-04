import React from 'react'
import { Routes, Route } from 'react-router-dom'

import AuthGuard from './AuthGuard'

import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import UserList from '../pages/UserList'
import UserForm from '../pages/UserForm'
import BruteForce from '../pages/BruteForce'

// Rotas protegidas por AuthGuard
const guardedUserList = (
  <AuthGuard userLevel={2}>
    <UserList />
  </AuthGuard>
)
const guardedUserForm = (
  <AuthGuard userLevel={2}>
    <UserForm />
  </AuthGuard>
)
const guardedBruteForce = (
  <AuthGuard userLevel={1}>
    <BruteForce />
  </AuthGuard>
)

export default function AppRoutes() {
  return <Routes>
    <Route path="/" element={ <HomePage /> } />
    <Route path="/login" element={ <LoginPage /> } />
    <Route path="/users" element={ guardedUserList } />
    <Route path="/users/:id" element={ guardedUserForm } />
    <Route path="/brute-force" element={ guardedBruteForce } /> 
  </Routes>
}