import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../components/alerta"
import axios from 'axios'
import clienteAxios from "../config/clienteAxios"

const Registrar = () => {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPaswordd] = useState('')
  const [repetirPassword, setrepetirPassword] = useState('')
  const [alerta, setAlerta] = useState({})

  const handleSubmit = async e => {
    e.preventDefault();

    if([nombre, email, password, repetirPassword].includes('')){
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }

    if(password !== repetirPassword){
      setAlerta({
        msg: 'Los password no son iguales',
        error: true
      })
    }

    if(password.length < 6){
      setAlerta({
        msg: 'Password muy corto, min. 6 caracteres',
        error: true
      })
    }

    setAlerta({})

    // Crear usuario en la API
    
    try {
      const {data} = await clienteAxios.post(`/usuarios`, 
      {nombre, email, password})
      setAlerta({
        msg: data.msg,
        error: false
      })
      setNombre('')
      setEmail('')
      setPaswordd('')
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
    
      <h1 className="text-sky-600 font-black text-5xl capitalize text-center">Registrar cuenta</h1>

      { msg && <Alerta alerta={alerta}></Alerta> }

      <form className="my-10 bg-white shadow rounded-lg p-10"
      onSubmit={handleSubmit}>
        <div className="my-5">
          <label className="uppercase text-gray-600 block text-xl font-bold"
          htmlFor="nombre"
          >Nombre</label>
          <input  
          id="nombre"
          type="text" placeholder="Nombre de usuario" 
          className="w-full mt-3 p-3 border rounded-xl bg-gray-100"
          value={nombre}
          onChange={e => setNombre(e.target.value)}>
          </input>
        </div>

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
          onChange={e => setPaswordd(e.target.value)}></input>
        </div>

        <div className="my-5">
          <label className="uppercase text-gray-600 block text-xl font-bold"
          htmlFor="password2"
          >Repetir Password</label>
          <input  
          id="password2"
          type="password" placeholder="Repetir password" 
          className="w-full mt-3 p-3 border rounded-xl bg-gray-100"
          value={repetirPassword}
          onChange={e => setrepetirPassword(e.target.value)}></input>
        </div>

        <input
          type="submit"
          value="Registrar cuenta"
          className="bg-sky-700 w-full mb-5 py-3 text-white uppercase font-bold rounded
          hover:cursor-pointer hover:bg-sky-800 transition-colors">
          
        </input>

      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
        className="block text-center my-5 text-slate-500 uppercase text-sm"
        to="/"
        >¿Ya tienes una cuenta? Iniciar sesión </Link>
        <Link
        className="block text-center my-5 text-slate-500 uppercase text-sm"
        to="../olvide-password"
        >Olvidé mi password </Link>
      </nav>
    </>
  )
}

export default Registrar