import React from 'react'

const Card = ({ producto, alAgregar }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col justify-between p-4">
      
      {/* Imagen y Etiqueta */}
      <div className="relative mb-3">
        {producto.tag && (
          <span className="absolute top-2 left-2 bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">
            {producto.tag}
          </span>
        )}
        <img 
          src={producto.imagen} 
          alt={producto.nombre} 
          className="w-full h-44 object-cover rounded-lg"
        />
      </div>

      {/* Info */}
      <div className="flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-bold text-gray-800 mb-2 line-clamp-2 min-h-[40px]">
            {producto.nombre}
          </h3>
          
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-emerald-800 font-bold text-base">
              S/ {producto.precio.toFixed(2)}
            </span>
            {producto.precioAnterior && (
              <span className="text-gray-400 line-through text-xs">
                S/ {producto.precioAnterior.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* Botón Añadir original */}
        <button
          onClick={() => alAgregar(producto)}
          className="w-full bg-emerald-800 hover:bg-emerald-950 text-white text-sm py-2 rounded-md font-medium"
        >
          Añadir
        </button>
      </div>

    </div>
  )
}

export default Card