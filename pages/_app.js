import { useEffect } from 'react'
import '../styles/globals.css'
import { ROLES } from "../utils/constants";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const users = localStorage.getItem("usuarios")
    if (users) {
      return
    }
    const json = {
      rol: ROLES.Admin,
      correo: 'admin@gmail.com',
      password: 'admi123',
      cedula: '',
      nombre: 'admin',
      apellido: '',
      direccion: '',
      celular: ''
    }
    localStorage.setItem('usuarios', JSON.stringify([json]))
  }, [])
  return <Component {...pageProps} />
}

export default MyApp
