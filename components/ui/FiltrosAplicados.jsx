import React from "react";

const FiltrosAplicados = ({
  hayFiltrosAplicados,
  renderAppliedFilters,
  handleRemoveFilter,
  className = "",
}) => {
  return (
    <div className={className}>
      <div className={`flex pr-1 items-center mb-4 justify-between`}>
        <span className={`py-2 font-bold`}>Filtros aplicados:</span>

        {hayFiltrosAplicados && (
          <button
            onClick={() => handleRemoveFilter("Todos")}
            className="px-2 py-1 float-right h-fit text-sm text-white font-semibold bg-gray-400 rounded-md hover:bg-red-800 focus:bg-red-800 red-button transition-all ease-in-out"
          >
            Borrar Filtros
          </button>
        )}
      </div>
      <div>
        <div
          className={`flex items-baseline justify-start flex-1 gap-2 order-2 md:order-1 ${
            hayFiltrosAplicados ? "w-full md:w-auto" : "w-auto"
          }`}
        >
          {hayFiltrosAplicados ? (
            <div className="flex flex-wrap gap-2">{renderAppliedFilters()}</div>
          ) : (
            <span className="text-green-800">Ningún filtro.</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default FiltrosAplicados;
