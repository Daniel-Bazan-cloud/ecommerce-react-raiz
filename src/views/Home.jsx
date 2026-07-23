import React, { useState, useEffect } from 'react'
import Card from '../components/Card'

const Home = ({ setCantidad, cantidadCarrito }) => {
  const [productos, setProductos] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [usuario, setUsuario] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [cargando, setCargando] = useState(true)

  // 1. PETICIÓN FETCH A LA REST API CON LA URL DE FIREBASE
  useEffect(() => {
    const obtenerProductosConUrl = async () => {
      try {
        const url = 'https://firestore.googleapis.com/v1/projects/hotel-hassinger/databases/(default)/documents/productos'
        const respuesta = await fetch(url)
        const datos = await respuesta.json()
        
        // Mapeamos la respuesta JSON de Firestore para que tenga la estructura limpia que usa tu Card.jsx
        if (datos.documents) {
          const listaProductos = datos.documents.map(doc => {
            const campos = doc.fields;
            
            // Extraemos el ID del nombre del documento
            const idDoc = doc.name.split('/').pop();

            return {
              id: idDoc,
              nombre: campos.nombre?.stringValue || '',
              // Convertimos el precio de String o Number a número flotante de JS
              precio: parseFloat(campos.precio?.doubleValue || campos.precio?.integerValue || 0),
              precioAnterior: campos.precioAntiguo ? parseFloat(campos.precioAntiguo?.doubleValue || campos.precioAntiguo?.integerValue || 0) : null,
              imagen: campos.imagen?.stringValue || '',
              tag: campos.descuento?.stringValue || null
            }
          })
          
          setProductos(listaProductos)
        }
      } catch (error) {
        console.error("Error al traer los productos mediante la URL:", error)
      } finally {
        setCargando(false)
      }
    }

    obtenerProductosConUrl()
  }, [])

  // Filtrar productos según la barra de búsqueda
  const productosFiltrados = productos.filter(producto =>
    producto?.nombre?.toLowerCase().includes(busqueda.toLowerCase())
  )

  // Incrementar el carrito
  const manejarAgregar = (producto) => {
    setCantidad(prev => prev + 1)
  }

  // Simulación de registro local en barra lateral
  const manejarRegistroLateral = (e) => {
    e.preventDefault()
    if (!usuario || !contrasena) {
      alert("Por favor, completa todos los campos de la barra lateral.")
      return
    }
    alert(`Usuario ${usuario} registrado con éxito en la sesión local.`)
    setUsuario('')
    setContrasena('')
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      
      {/* 1. BARRA DE BÚSQUEDA SUPERIOR */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Buscar del catálogo real en la nube..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full max-w-lg p-3 border border-gray-200 rounded-lg outline-none focus:border-emerald-800 bg-white shadow-sm text-sm"
        />
      </div>

      {/* CONTENEDOR PRINCIPAL: Grid Catálogo (Izquierda) + Sidebar (Derecha) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
        
        {/* SECCIÓN DEL CATÁLOGO DE PRODUCTOS */}
        <div className="lg:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-800">Catálogo en Tiempo Real (API REST)</h2>
            <span className="text-xs text-gray-500">
              {cargando ? 'Cargando...' : `${productosFiltrados.length} disponibles`}
            </span>
          </div>

          {/* Estado de Carga */}
          {cargando ? (
            <div className="text-center py-12 text-gray-500 text-sm">
              Cargando catálogo desde la URL de Firebase...
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {productosFiltrados.map((producto) => (
                <Card 
                  key={producto.id} 
                  producto={producto} 
                  alAgregar={manejarAgregar} 
                />
              ))}
            </div>
          )}
        </div>

        {/* SECCIÓN DE LA BARRA LATERAL (SIDEBAR) */}
        <aside className="space-y-6">
          
          {/* Tarjeta: Estado del Servidor */}
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 mb-3">Estado del Servidor</h3>
            <div className="flex items-center gap-2 mb-4 text-xs font-semibold text-emerald-800">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
              Online
            </div>
            <div className="flex justify-between items-center text-xs border-t border-gray-100 pt-3">
              <span className="text-gray-500">Canasta:</span>
              <span className="font-bold text-emerald-800">{cantidadCarrito} uds</span>
            </div>
          </div>

          {/* Tarjeta: Formulario de Registro de Usuario Lateral */}
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 mb-1">Registro de Usuario</h3>
            <p className="text-[11px] text-gray-400 mb-4">Únete para gestionar tus reservas.</p>
            
            <form onSubmit={manejarRegistroLateral} className="space-y-3">
              <div>
                <label className="text-[10px] font-bold text-gray-600 block mb-1">Usuario:</label>
                <input
                  type="text"
                  placeholder="Ingresa tu usuario..."
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded-md text-xs outline-none focus:border-emerald-800 bg-gray-50"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-600 block mb-1">Contraseña:</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded-md text-xs outline-none focus:border-emerald-800 bg-gray-50"
                />
              </div>

              <button 
                type="submit" 
                className="w-full mt-2 bg-amber-500 hover:bg-amber-600 text-slate-900 text-xs font-bold py-2.5 rounded-md transition-colors shadow-sm"
              >
                Crear Cuenta
              </button>
            </form>
          </div>

        </aside>

      </div>

      {/* 3. TARJETA DEL BOLETÍN DEL VIAJERO */}
      <div className="max-w-2xl mx-auto bg-emerald-50 border border-emerald-100 p-6 rounded-2xl text-center shadow-sm">
        <h3 className="text-lg font-bold text-emerald-900 mb-1">Boletín del Viajero</h3>
        <p className="text-xs text-emerald-700 mb-4">
          Ingresa tu correo para enterarte de ofertas y descuentos exclusivos.
        </p>
        
        <form onSubmit={(e) => { e.preventDefault(); alert("¡Te has suscrito localmente!"); }} className="flex flex-col gap-3 max-w-md mx-auto">
          <input
            type="email"
            required
            placeholder="Ingresa tu correo para novedades..."
            className="w-full p-2.5 border border-emerald-200 rounded-md text-xs outline-none focus:border-emerald-800 bg-white"
          />
          <button 
            type="submit" 
            className="w-full bg-emerald-800 hover:bg-emerald-950 text-white text-xs font-bold py-2.5 rounded-md transition-colors"
          >
            Suscribirme al Boletín
          </button>
        </form>
      </div>

    </main>
  )
}

export default Home