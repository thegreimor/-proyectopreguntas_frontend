import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import axios from "axios"
import Alerta from "../components/alerta"
import clienteAxios from "../config/clienteAxios"
const NuevoPassword = () => {

  const [tokenValido, setTokenValido] = useState(false)
  const [password, setPassword] = useState("")
  const [alerta, setAlerta] = useState({})
  const [passwordModificado, setPasswordModificado] = useState(false)
  const params = useParams()
  const {token} = params

  useEffect(() =>{
    const comprobarToken = async () => {
      try {
        // TODO: Mover a axios
        const {data} = await await clienteAxios(`/usuarios/olvide-password/${token}`)
        setTokenValido(true)
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error:true
        })
        
      }
    }
    comprobarToken()
  }, [])
  const {msg} = alerta
  const handleSubmit = async e => {
    e.preventDefault()

    if(password.length < 6){
      setAlerta({
        msg: "El password debe ser minimo de 6 caracteres",
        error: true
      })
      return
    }

    try {
      const url = `/usuarios/olvide-password/${token}`
      const {data} = await clienteAxios.post(url, {password})
      setAlerta({
        msg: data.msg,
        error: false
      })
      setPasswordModificado(true)
      setTokenValido(false)
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }
  return (
    <>
          <h1 className="text-sky-600 font-black text-5xl capitalize text-center">Recuperar datos</h1>
          {msg && <Alerta alerta={alerta}></Alerta>}
    {tokenValido &&
    <form className="my-10 bg-white shadow rounded-lg p-10"
    onSubmit={handleSubmit}>
        


    <div className="my-5">
      <label className="uppercase text-gray-600 block text-xl font-bold"
      htmlFor="password"
      >Nuevo Password</label>
      <input  
      id="password"
      type="password" placeholder="Password nuevo" 
      className="w-full mt-3 p-3 border rounded-xl bg-gray-100"
      onChange={e => setPassword(e.target.value)}></input>
    </div>

  
    <input
      type="submit"
      value="Cambiar password"
      className="bg-sky-700 w-full mb-5 py-3 text-white uppercase font-bold rounded
      hover:cursor-pointer hover:bg-sky-800 transition-colors">
      
    </input>

  </form>
    }
    {passwordModificado && 
    <Link
    className="block text-center my-5 text-slate-500 uppercase text-sm"
    to="/"
    >Iniciar sesión </Link>}

      
    </>
  )
}

export default NuevoPassword