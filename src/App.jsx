import {BrowserRouter, Routes, Route} from 'react-router-dom'

import AuthLayout from './layouts/AuthLayout'
import Login from './paginas/Login'
import Registrar from './paginas/Registrar'
import OlvidePassword from './paginas/OlvidePassword'
import NuevoPassword from './paginas/NuevoPassword'
import ConfirmarCuenta from './paginas/ConfirmarCuenta'
import Temas from './paginas/Temas'
import RutaProtegida from './layouts/RutaProtegida'
import NuevoTema from './paginas/NuevoTema'
import { TemasProvider } from './context/TemasProvider'

import {AuthProvider} from './context/AuthProvider'

console.log(import.meta.env.VITE_BACKEND_URL)

function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <AuthProvider>
        <TemasProvider>
          <Routes>
              <Route path="/" element={<AuthLayout />}>
                <Route index element={<Login />} />
                <Route path='registrar' element={<Registrar />} />
                <Route path='olvide-password' element={<OlvidePassword />} />
                <Route path='olvide-password/:token' element={<NuevoPassword />} />
                <Route path='confirmar/:id' element={<ConfirmarCuenta />} />

              </Route>

              <Route path="/temas" element={<RutaProtegida />}>
                <Route index element={<Temas />}/>
                <Route path='crear-tema' element=
                {<NuevoTema/>}/>
              </Route>
          </Routes>
        </TemasProvider>
        </AuthProvider>
      </BrowserRouter>

    </div>
  )
}

export default App
