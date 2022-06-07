

const PreviewTema = ({tema}) => {

    const {nombre, _id} = tema
  return (
    <div className="border-b p-5 flex">{nombre}</div>
  )
}

export default PreviewTema