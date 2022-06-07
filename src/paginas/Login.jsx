 import { useState } from "react"
 import { Link, useNavigate } from "react-router-dom"
 import Alerta from "../components/alerta"
 import clienteAxios from "../config/clienteAxios.jsx"
 import useAuth from '../hooks/useAuth.jsx'
const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alerta, setAlerta] = useState({})
  const navigate = useNavigate()
  const {setAuth} = useAuth()

  const handleSubmit = async e=> {
    e.preventDefault()

    if([email, password].includes('')){
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }


    try {
      const {data} = await clienteAxios.post('/usuarios/login', {email, password})
      setAlerta({})
      localStorage.setItem('token', data.token)
      setAuth(data)
      navigate("/temas")
    } catch (error) {
    setAlerta({
      msg: error.response.data.msg,
      error: true
    })
      
    }
  }
  const {msg} = alerta
  return (
    <>
    
      <h1 className="text-sky-600 font-black text-5xl capitalize text-center">Iniciar sesión</h1>
    {msg && <Alerta alerta={alerta}></Alerta>}
      <form className="my-10 bg-white shadow rounded-lg p-10"
      onSubmit={handleSubmit}>
        <div className="my-5">
          <label className="uppercase text-gray-600 block text-xl font-bold"
          htmlFor="email"
          >Email</label>
          <input  
          id="email"
          type="email" placeholder="Email de Registro" 
          className="w-full mt-3 p-3 border rounded-xl bg-gray-100"
          value={email}
          onChange={e => setEmail(e.target.value)}></input>
        </div>

        <div className="my-5">
          <label className="uppercase text-gray-600 block text-xl font-bold"
          htmlFor="password"
          >Password</label>
          <input  
          id="password"
          type="password" placeholder="Password de Registro" 
          className="w-full mt-3 p-3 border rounded-xl bg-gray-100"
          value={password}
          onChange={e => setPassword(e.target.value)}></input>
        </div>

        <input
          type="submit"
          value="Iniciar sesión"
          className="bg-sky-700 w-full mb-5 py-3 text-white uppercase font-bold rounded
          hover:cursor-pointer hover:bg-sky-800 transition-colors">
          
        </input>

      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
        className="block text-center my-5 text-slate-500 uppercase text-sm"
        to="registrar"
        >Registrar nueva cuenta </Link>
        <Link
        className="block text-center my-5 text-slate-500 uppercase text-sm"
        to="olvide-password"
        >Olvidé mi password </Link>
      </nav>
    </>
  )
}

export default Login