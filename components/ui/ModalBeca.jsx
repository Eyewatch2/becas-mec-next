import Link from 'next/link';
import React from 'react';

const tagBgColorClass = {
    "Apoyo Económico": "bg-amber-600",
    Transporte: "bg-red-600",
    Alojamiento: "bg-blue-600",
    Alimentación: "bg-orange-600",
    "Material de estudio": "bg-purple-700",
    Otros: "bg-green-600",
  };

const ModalBeca = ({ isModalOpen, setIsModalOpen, becaSeleccionada }) => {
    const hayRequisitosDeEdad = becaSeleccionada.edad_max || becaSeleccionada.edad_min;
    const hayFechasDePostulacion = becaSeleccionada.inicio_postulacion || becaSeleccionada.fin_postulacion;

    const fechaInicio = new Date(becaSeleccionada.inicio_postulacion);
    const fechaFin = new Date(becaSeleccionada.fin_postulacion);
    const opcionesDeFecha = { day: 'numeric', month: 'long', year: 'numeric' };
    const fechaInicioFormateada = fechaInicio.toLocaleDateString('es-UY', opcionesDeFecha);
    const fechaFinFormateada = fechaFin.toLocaleDateString('es-UY', opcionesDeFecha);
    return (
        <>
            {isModalOpen && (
                <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center' onClick={() => setIsModalOpen(false)}>
                    <div className='bg-white p-5 rounded-xl w-11/12 md:w-1/2' onClick={(e) => e.stopPropagation()}>
                        <h2 className='text-center text-lg uppercase tracking-[0.6rem] font-bold text-green-500'>Detalles de la beca</h2>
                        <div className='flex flex-col gap-5 mt-5'>
                            <div className='flex flex-col gap-2'>
                                <div className='w-full flex-col gap-2 flex'>
                                    <h3 className='text-2xl font-bold'>{becaSeleccionada.nombre}</h3>
                                    <h4 className='text-md font-bold flex-wrap flex gap-2 items-center'>Categoría: <span className={`text-xxs capitalize md:text-xs h-fit flex justify-center items-center w-fit z-10 ${tagBgColorClass[becaSeleccionada.tipo]} text-white px-2 py-1 rounded-md`}>
                                        {becaSeleccionada.tipo}
                                    </span>
                                    </h4>

                                </div>

                                <h4 className='text-md font-bold flex flex-wrap gap-2 items-center'>Nivel Educativo Requerido:

                                    {!becaSeleccionada.nivel_educativo && <span className="flex items-center w-fit md:w-auto bg-green-500 rounded-md px-2 py-1 text-xxs md:text-xs font-semibold text-white">Cualquier Nivel Educativo</span>}
                                    {becaSeleccionada.nivel_educativo?.map((nivel) => (<span key={nivel.label} className="flex items-center w-fit md:w-auto bg-green-500 rounded-md px-2 py-1 text-xxs md:text-xs font-semibold text-white">{nivel.label}</span>))}
                                </h4>

                            </div>
                            <p className='text-sm'><span className='font-bold'>Institución:</span> {becaSeleccionada.institucion}</p>
                            {hayRequisitosDeEdad && <div className='flex flex-col gap-1'>
                                <h4 className='text-lg font-bold'>Requisitos de Edad:</h4>
                                {becaSeleccionada.edad_min && <p className='text-sm'><span className='font-bold'>Edad mínima:</span> {becaSeleccionada.edad_min} años</p>}
                                {becaSeleccionada.edad_max && <p className='text-sm'><span className='font-bold'>Edad máxima:</span> {becaSeleccionada.edad_max} años</p>}
                            </div>}
                            {hayFechasDePostulacion && <div className='flex flex-col gap-1'>
                                <h4 className='text-lg font-bold'>Período de Postulaciones:</h4>
                                {becaSeleccionada.inicio_postulacion && <p className='text-sm'><span className='font-bold'>Inicio:</span> {fechaInicioFormateada}</p>}
                                {becaSeleccionada.fin_postulacion && <p className='text-sm'><span className='font-bold'>Fin:</span> {fechaFinFormateada}</p>}
                            </div>}
                            {becaSeleccionada.observaciones && <div className='flex flex-col gap-1 mb-5'>
                                <h4 className='text-lg font-bold'>Observaciones:</h4>
                                <p className='text-sm'>
                                    {becaSeleccionada.observaciones.split(' ').map((word, index) => {
                                        if (word.startsWith('http') || word.startsWith('www.')) {
                                            return (
                                                <Link key={index} className='text-blue-500 line-clamp-1 text-ellipsis hover:text-blue-600 transition' href={word.startsWith('www.') ? 'http://' + word : word} target="_blank" rel="noopener noreferrer">
                                                    {word}
                                                </Link>
                                            );
                                        } else {
                                            return word + ' ';
                                        }
                                    })}
                                </p>                            </div>}
                        </div>
                        <div className='w-full flex flex-col md:flex-row md:gap-3'>
                            <button autoFocus onClick={() => setIsModalOpen(false)} className='red-button bg-red-800 text-white w-full py-2 mt-5 rounded-xl hover:bg-red-700 transition-colors ease-in-out duration-300'>Cerrar</button>
                            {becaSeleccionada.link && <Link href={becaSeleccionada.link} target='_blank' rel='noreferrer' className='bg-green-500 text-center text-white w-full py-2 mt-5 rounded-xl hover:bg-green-600 transition-colors ease-in-out duration-300'>Saber más</Link>}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ModalBeca;
