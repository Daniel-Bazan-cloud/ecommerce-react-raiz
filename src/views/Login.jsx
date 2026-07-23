import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast' // Importamos la librería de alertas para la Semana 15

const Login = () => {
  const [correo, setCorreo] = useState('')
  const [errorValidacion, setErrorValidacion] = useState('') // Mensaje de error local
  const [procesando, setProcesando] = useState(false) // Estado de carga para el botón
  const navigate = useNavigate()

  const registrarUsuarioBoletin = async (e) => {
    e.preventDefault()
    setErrorValidacion('') // Limpiamos errores previos antes de validar

    // 1. VALIDACIÓN PREVENTIVA (FRONTEND)
    if (!correo.trim()) {
      setErrorValidacion("El campo no puede estar vacío.")
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(correo)) {
      setErrorValidacion("Por favor, ingresa un correo electrónico válido.")
      return
    }

    // 2. INICIO DE ESTADO DE CARGA
    setProcesando(true)

    try {
      const urlApi = "https://firestore.googleapis.com/v1/projects/hotel-hassinger/databases/(default)/documents/usuarios"
      
      const payload = {
        fields: {
          correo: { stringValue: correo },
          fechaRegistro: { stringValue: new Date().toISOString() }
        }
      }

      const respuesta = await fetch(urlApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      if (respuesta.ok) {
        // NOTIFICACIÓN TOAST DE ÉXITO (Reemplaza al alert antiguo)
        toast.success("¡Suscripción al boletín registrada con éxito!")
        navigate('/') // Redireccionamos automáticamente al catálogo
      } else {
        throw new Error("No se pudo guardar la suscripción en el servidor")
      }
    } catch (error) {
      // NOTIFICACIÓN TOAST DE ERROR
      toast.error(error.message)
    } finally {
      setProcesando(false)
      setCorreo('')
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg border border-gray-200 shadow-sm my-10 text-center">
      <h2 className="text-xl font-bold text-emerald-900 mb-2">Únete a nuestra comunidad</h2>
      <p className="text-xs text-gray-500 mb-5">
        Suscríbete al boletín oficial para guardar tus datos en nuestra base de datos en la nube y recibir ofertas exclusivas.
      </p>
      
      <form onSubmit={registrarUsuarioBoletin} className="flex flex-col gap-4">
        <div className="text-left">
          <label className="text-xs font-semibold text-gray-700 block mb-1">Correo Electrónico:</label>
          <input
            type="text" // Cambiado a text para probar nuestra validación personalizada
            placeholder="tu@correo.com"
            value={correo}
            onChange={(e) => {
              setCorreo(e.target.value)
              setErrorValidacion('') // Limpia el error rojo mientras escribes
            }}
            disabled={procesando}
            className={`w-full p-2.5 border rounded-md text-sm outline-none bg-gray-50 transition-all ${
              errorValidacion 
                ? 'border-red-500 focus:border-red-500' 
                : 'border-gray-300 focus:border-emerald-800'
            }`}
          />
          {errorValidacion && (
            <p className="text-red-500 text-xs mt-1 font-semibold">{errorValidacion}</p>
          )}
        </div>

        {/* BOTÓN CON SPINNER DE CARGA */}
        <button
          type="submit"
          disabled={procesando}
          className={`w-full text-white font-semibold p-2.5 rounded-md transition-colors text-sm flex justify-center items-center gap-2 shadow-sm mt-2 ${
            procesando 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-emerald-800 hover:bg-emerald-900'
          }`}
        >
          {procesando ? (
            <>
              {/* Spinner SVG animado */}
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Conectando...
            </>
          ) : (
            'Suscribirme al Boletín'
          )}
        </button>
      </form>
    </div>
  )
}

export default Login