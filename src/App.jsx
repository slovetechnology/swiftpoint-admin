import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthRoutes, FormRoutes, GeneralRoutes } from './routes'
import AdminLayout from './components/AdminLayout'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      {GeneralRoutes.map((item, index) => (
        <Route key={index} path={item.path} element={<item.element />} />
      ))}
      {FormRoutes.map((item, index) => (
        <Route key={index} path={item.path} element={<item.element />} />
      ))}
      {AuthRoutes.map((item, index) => (
        <Route key={index} path={item.path} element={ <AdminLayout> <item.element /> </AdminLayout> } />
      ))}
    </Routes>
    </BrowserRouter>
  )
}

export default App