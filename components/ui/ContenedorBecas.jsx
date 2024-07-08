import ReactPaginate from "react-paginate";
import Card from "./Card";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useEffect, useState } from "react";
import ModalBeca from "./ModalBeca";

const ContenedorBecas = ({ becas, paginaActual, setPaginaActual, loading }) => {
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
  };

  const numeroDePaginas = Math.ceil(becas.length / becasPorPagina);

  if (becas.length === 0 && !loading)
    return (
      <div className="container max-w-screen-lg mx-auto py-16 md:py-16 bg-white flex flex-col gap-5 items-center">
        <h2 className="text-lg uppercase tracking-[0.6rem] font-bold text-green-500">
          Oops...
        </h2>
        <p className="text-center w-3/4">
          No se encontraron becas con los filtros seleccionados
        </p>
      </div>
    );

  return (
    <>
      {isModalOpen && (
        <ModalBeca
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          becaSeleccionada={becaSeleccionada}
        />
      )}
      <section id="becasEncontradas" className="py-5">
        <h2
          className={`text-center text-lg uppercase tracking-[0.6rem] font-bold text-green-500 w-9/12 mb-5 mx-auto`}
        >
          Becas Encontradas
        </h2>
        <p className="sr-only">
          Espera a que se carguen las becas para poder navegarlas.
        </p>
        <div className="flex px-4 md:px-0 gap-2 md:gap-5 flex-wrap pt-8 pb-8 justify-center">
          {becasActuales.map((beca, index) => (
            <Card
              openModal={openModal}
              closeModal={() => setIsModalOpen(false)}
              key={beca.nombre + index}
              beca={beca}
            />
          ))}
        </div>
        {numeroDePaginas > 1 && (
          <ul className="flex justify-center items-center gap-2 mt-4 pb-5">
            <ReactPaginate
              pageCount={numeroDePaginas}
              pageRangeDisplayed={1}
              marginPagesDisplayed={1}
              onPageChange={cambiarPagina}
              pageLinkClassName="bg-gray-200 !min-w-[44px] !min-h-[44px] h-8 w-8 aspect-square hover:bg-green-500/60 px-4 py-3 rounded-xl transition-colors ease-in-out duration-300"
              activeLinkClassName="!bg-green-500 !min-w-[44px] !min-h-[44px] text-white hover:!bg-green-600"
              breakLinkClassName="bg-gray-200 !min-w-[44px] !min-h-[44px] h-8 w-8 aspect-square hover:bg-green-500/60 px-4 py-3 rounded-xl transition-colors ease-in-out duration-300"
              className="flex items-center gap-2 !min-w-[44px] !min-h-[44px] h-8"
              previousLabel={
                <FaAngleLeft className="text-xl !min-w-[44px] !min-h-[44px] hover:scale-125 transition-transform ease-in-out text-green-500" />
              }
              nextLabel={
                <FaAngleRight className="text-xl !min-w-[44px] !min-h-[44px] hover:scale-125 transition-transform ease-in-out text-green-500" />
              }
              forcePage={paginaActual - 1}
              onClick={() => {
                window.location.href = "#becasEncontradas";
              }}
            />
          </ul>
        )}
      </section>
    </>
  );
};

export default ContenedorBecas;
