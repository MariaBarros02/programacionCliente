import React from 'react'

const Alerta = ({alerta}) => {
    const {msg, error} = alerta;
  return (
    <p className={`p-2 text-center text-white text-xs rounded ${error ? "bg-red-600": "bg-lime-600"}`}>
        {msg}
    </p>
  )
}

export default Alerta