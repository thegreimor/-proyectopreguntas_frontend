import { Link } from "react-router-dom"
import useTemas from "../hooks/useTemas"
import useAuth from "../hooks/useAuth"

const Header = () => {
  
  const {cerrarSesionTemas} = useTemas()
  const {cerrarSesionAuth} = useAuth()

  const handleCerrarSesion = () => {
    cerrarSesionAuth()
    cerrarSesionTemas()
    localStorage.removeItem('token')
  }

  return (
    <header className="px-4 py-5 bg-white border-b">
        <div className="md:flex md:justify-between">
          <h2 className="text-4xl text-sky-600 font-black">
            Temas
          </h2>

          <input
          type="search"
          placeholder="Buscar tema"
          className="rounded-lg lg:w-96 block p-2 border"
          ></input>

          <div className="flex items-center gap-4">
            <Link
                to="/temas"
                className="font-bold uppercase"
                >Temas</Link>

                <button
                type="button"
                className="text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold"
                onClick={handleCerrarSesion}
                >Cerrar sesión</button>
          </div>

        </div>
    </header>
  )
}

export default Header