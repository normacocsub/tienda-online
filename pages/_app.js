import { useEffect } from 'react'
import '../styles/globals.css'
import { ROLES } from "../utils/constants";

function MyApp({ Component, pageProps }) {
  
  return <Component {...pageProps} />
}

export default MyApp
