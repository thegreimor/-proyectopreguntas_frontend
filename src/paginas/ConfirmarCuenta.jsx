import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"
import Alerta from "../components/alerta"
import clienteAxios from "../config/clienteAxios"


const ConfirmarCuenta = () => {

  const [alerta, setAlerta] = useState({})
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false)

  const params = useParams()
  const {id} = params

  useEffect( () => {
    const confirmarCuenta = async () => {
      try {
        const url = `/usuarios/confirmar/${id}`
        const {data} = await clienteAxios(url)

        setAlerta({
          msg: data.msg,
          error: false
        })

        setCuentaConfirmada(true)

      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
        
      }
    }
    return () => { confirmarCuenta()}
  }, [])

  const {msg} = alerta

  return (
    <>
    
    <h1 className="text-sky-600 font-black text-5xl capitalize text-center">Confirmar cuenta</h1>

  <div>
    {msg && <Alerta alerta = {alerta}></Alerta>}
    {cuentaConfirmada && 
    <Link
    className="block text-center my-5 text-slate-500 uppercase text-sm"
    to="/"
    >Iniciar sesión </Link>}

  </div>
  </>
  )
}

export default ConfirmarCuenta