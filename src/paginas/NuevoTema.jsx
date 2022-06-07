import FormularioTema from "../components/FormularioTema"

const NuevoTema = () => {
    return (
      <>
        <h1 className="text-4xl font-black">Crear Tema</h1>
  
        <div className="mt-10 flex justify-center">
            <FormularioTema></FormularioTema>
          
        </div>
      </>
    )
  }
  
  export default NuevoTema