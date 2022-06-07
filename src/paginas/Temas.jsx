import useTemas from "../hooks/useTemas"
import PreviewTema from "../components/PreviewTema"

const Temas = () => {

  const {temas} = useTemas()

  return (
    <>
      <h1 className="text-4xl font-black">Temas</h1>

      <div className="bg-white shadow mt-10 rounded-lg">
        {temas.length ? 
        temas.map(tema => (
          <PreviewTema
          key={tema._id}
          tema={tema}
          ></PreviewTema>
        ))
        : <p className=" text-center text-gray-600 uppercase p-5">No hay proyectos aun</p>}
      </div>
    </>
  )
}

export default Temas