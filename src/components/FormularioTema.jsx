import { useState } from "react"
import useTemas from "../hooks/useTemas"
import Alerta from "./alerta"

const FormularioTema = () => {

    const [nombre, SetNombre] = useState("")

    const {mostrarAlerta, alerta, submitTema} = useTemas()

    const handleSubmit = async e => {
        e.preventDefault()

        if(nombre === '') {
            mostrarAlerta({
                msg: "Todos los campos son obligatorios",
                error: true
            })
            return
        }

        // Pasar los datos hacia el provider
        await submitTema({nombre})

        SetNombre("")
    }

    const {msg} = alerta

  return (
    <form className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
    onSubmit={handleSubmit}>
        {msg && <Alerta alerta={alerta}></Alerta>}
        <div className="mb-5">
            <label className="text-gray-700 uppercase font-bold text-sm"
            htmlFor="nombre">Nombre Tema</label>
            <input
            id="nombre" 
            type="text"
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Nombre del tema"
            value={nombre}
            onChange={e => SetNombre(e.target.value)}
            ></input>
        </div>
        <input
            type="submit"
            value="Crear Tema"
            className="bg-sky-600 w-full p-3 uppercase font-bold text-white
            rounded cursor-pointer hover:bg-sky-700 transition-colors"
            />
    </form>
  )
}

export default FormularioTema