import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast' // Importado para las alertas
import Header from './components/Header'
import Home from './views/Home'
import Login from './views/Login'

function App() {
  const [cantidadCarrito, setCantidadCarrito] = useState(0)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      
      {/* Contenedor de notificaciones flotantes de la Semana 15 */}
      <Toaster position="bottom-right" reverseOrder={false} />

      <Header cantidadCarrito={cantidadCarrito} />

      <div className="flex-grow">
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                setCantidad={setCantidadCarrito} 
                cantidadCarrito={cantidadCarrito} 
              />
            } 
          />
          <Route 
            path="/login" 
            element={<Login />} 
          />
        </Routes>
      </div>

      <footer className="bg-white border-t border-gray-100 py-4 text-center text-xs text-gray-400 font-inter">
        &copy; {new Date().getFullYear()} Hotel Hassinger. Todos los derechos reservados.
      </footer>

    </div>
  )
}

export default App