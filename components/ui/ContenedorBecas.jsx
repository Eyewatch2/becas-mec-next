import ReactPaginate from 'react-paginate';
import Card from './Card';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useEffect, useState } from 'react';
import ModalBeca from './ModalBeca';


const ContenedorBecas = ({ becas, paginaActual, setPaginaActual }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [becaSeleccionada, setBecaSeleccionada] = useState(null);
    const becasPorPagina = 6;

    const indiceUltimaBeca = paginaActual * becasPorPagina;
    const indicePrimeraBeca = indiceUltimaBeca - becasPorPagina;
    const becasActuales = becas.slice(indicePrimeraBeca, indiceUltimaBeca);

    const cambiarPagina = ({ selected }) => setPaginaActual(selected + 1);

    useEffect(() => {
        setPaginaActual(1);
    }, [becas, setPaginaActual]);

    const openModal = (beca) => {
        setIsModalOpen(true);
        setBecaSeleccionada(beca);
    }

    const numeroDePaginas = Math.ceil(becas.length / becasPorPagina);

    if (becas.length === 0) return (
        <div className="container max-w-screen-lg mx-auto py-16 md:py-16 bg-white flex flex-col gap-5 items-center">
            <h2 className="text-lg uppercase tracking-[0.6rem] font-bold text-green-500">Oops...</h2>
            <p className="text-center w-3/4">No se encontraron becas con los filtros seleccionados</p>
        </div>
    );

    return (
        <>
            {isModalOpen && (
                <ModalBeca isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} becaSeleccionada={becaSeleccionada} />
            )}
            <section id='becasEncontradas' className='py-5'>
                <h2 className={`text-center text-lg uppercase tracking-[0.6rem] font-bold text-green-500 w-9/12 mb-5 mx-auto`}>Becas Encontradas</h2>
                <div className='flex gap-2 md:gap-5 flex-wrap pt-8 pb-8 justify-center'>
                    {becasActuales.map((beca, index) => (
                        <Card openModal={openModal} closeModal={() => setIsModalOpen(false)} key={beca.nombre + index} beca={beca} />
                    ))}
                </div>
                {numeroDePaginas > 1 && (
                    <div className='flex justify-center items-center gap-2 mt-4 pb-5'>
                        <ReactPaginate
                            pageCount={numeroDePaginas}
                            pageRangeDisplayed={2}
                            marginPagesDisplayed={1}
                            onPageChange={cambiarPagina}
                            pageLinkClassName='bg-gray-200 h-8 w-8 aspect-square hover:bg-green-500/60 px-4 py-3 rounded-xl transition-colors ease-in-out duration-300'
                            activeLinkClassName='!bg-green-500 text-white hover:!bg-green-600'
                            breakLinkClassName='bg-gray-200 h-8 w-8 aspect-square hover:bg-green-500/60 px-4 py-3 rounded-xl transition-colors ease-in-out duration-300'
                            className='flex items-center gap-2 h-8'
                            previousLabel={<FaAngleLeft className='text-xl hover:scale-125 transition-transform ease-in-out text-green-500' />}
                            nextLabel={<FaAngleRight className='text-xl hover:scale-125 transition-transform ease-in-out text-green-500' />}
                            forcePage={paginaActual - 1}
                            onClick={() => {
                                window.location.href = "#becasEncontradas";
                            }}
                        />
                    </div>
                )}
            </section>
        </>
    );
}

export default ContenedorBecas;
