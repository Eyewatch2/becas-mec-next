import React from 'react'


const bgColorClass = {
    'Apoyo Económico': 'to-purple-500 from-purple-700',
    'Transporte': 'to-blue-500 from-blue-700',
    'Alojamiento': 'to-red-500 from-red-700',
    'Alimentación': 'to-yellow-500 from-yellow-700',
    'Material de estudio': 'to-orange-500 from-orange-700',
    'Otros': 'to-gray-500 from-gray-700',
}
const tagBgColorClass = {
    'Apoyo Económico': 'bg-purple-500',
    'Transporte': 'bg-blue-500',
    'Alojamiento': 'bg-red-500',
    'Alimentación': 'bg-yellow-500',
    'rosa': 'bg-pink-500',
    'Material de estudio': 'bg-orange-500',
    'Otros': 'bg-gray-500',
}


const Card = ({ beca, openModal }) => {
    const { nombre, institucion, tipo, inicio_postulacion, fin_postulacion } = beca;
    const fechaActual = new Date();
    const fechaInicio = new Date(inicio_postulacion);
    const fechaFin = new Date(fin_postulacion);

    const estaVigente = fechaActual >= fechaInicio && fechaActual <= fechaFin;
    
    return (
        <article onClick={() => openModal(beca)} className="w-full cursor-pointer md:w-[calc(31.5%)] md:hover:scale-110 transition-all ease-in-out px-4 md:px-0">
            <div className={`relative rounded-xl overflow-hidden pt-[35%] md:pt-[70%]`}>
                <div className="absolute inset-0 bg-cover bg-center" ></div>
                <div className="absolute z-10 top-0 left-0 p-4 text-white">
                    <h2 className="font-bold text-md md:text-xl">{nombre}</h2>
                    <span className='font-light text-xs md:text-base'>
                        {institucion}
                    </span>
                </div>
                {
                    estaVigente && (
                        <div className={`text-xs z-10 absolute bottom-3 left-3 ${tagBgColorClass[tipo]} text-white px-2 py-1 rounded-2xl`}>
                            ¡Inscribite Hoy!
                        </div>
                    )
                }
                <div className={`text-xs z-10 absolute bottom-3 right-3 lowercase ${tagBgColorClass[tipo]} text-white px-2 py-1 rounded-2xl`}>
                    {tipo}
                </div>
                <div className={`absolute w-full h-full bg-black inset-0 bg-gradient-to-t ${bgColorClass[tipo]}`}></div>
            </div>
        </article>
    )
}

export default Card