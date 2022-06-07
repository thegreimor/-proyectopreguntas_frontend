import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const TemasContext = createContext()

const TemasProvider = ({children}) => {

    const [temas, setTemas] = useState([])
    const [alerta, SetAlerta] = useState([])
    const navigate = useNavigate()
    const {auth} = useAuth()

    useEffect(() => {
        const obtenerTemas = async () => {
            try {
                const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const {data} = await clienteAxios("/temas", config)
            setTemas(data)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerTemas()
    }, [auth])

    const mostrarAlerta = alerta => {
        SetAlerta(alerta)
        setTimeout(() => {
            SetAlerta({})
        }, 5000)
    }

    const submitTema = async tema => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            
            const {data} = await clienteAxios.post("/temas", tema, config)
            
            setTemas([...temas, data])

            SetAlerta({
                msg: "Tema creado",
                error: false
            })
            setTimeout(() => {
                SetAlerta({})
                navigate("/temas")
            }, 3000)
        } catch (error) {
            console.log(error)
        }
    }

    const cerrarSesionTemas = () => {
        setTemas({})
        setTemas([])
        SetAlerta({})
    }


    return (

        <TemasContext.Provider
        value={{
            temas,
            mostrarAlerta,
            alerta,
            submitTema,
            cerrarSesionTemas
        }}
        >{children}
        </TemasContext.Provider>
    )
}

export {
    TemasProvider
}

export default TemasContext