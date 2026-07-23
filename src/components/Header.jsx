import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({ cantidadCarrito }) => {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
        
        {/* LOGO */}
        <Link to="/" className="text-xl font-bold text-emerald-800 tracking-tight">
          Hotel Hassinger
        </Link>

        {/* NAVEGACIÓN + CARRITO */}
        <nav className="flex items-center gap-6 font-inter text-sm font-medium text-gray-600">
          <Link to="/" className="hover:text-emerald-800 transition-colors">
            Inicio
          </Link>
          
          <Link 
            to="/login" 
            className="bg-emerald-800 text-white px-4 py-2 rounded-md hover:bg-emerald-900 transition-colors shadow-sm text-xs font-semibold"
          >
            Suscribirse al Boletín
          </Link>

          {/* ICONO DEL CARRITO DINÁMICO */}
          <div className="relative p-1 cursor-pointer hover:text-emerald-800 transition-colors">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2} 
              stroke="currentColor" 
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
            
            {/* Burbuja flotante con el número real */}
            {cantidadCarrito > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-fade-in shadow-sm">
                {cantidadCarrito}
              </span>
            )}
          </div>
        </nav>

      </div>
    </header>
  )
}

export default Header