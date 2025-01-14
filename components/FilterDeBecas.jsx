"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import { todosLosDepartamentosUruguay } from "@/data/data";
import ContenedorBecas from "./ui/ContenedorBecas";
import { IoClose } from "react-icons/io5";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { stables } from "@/stables/stables";
import FiltrosAplicados from "./ui/FiltrosAplicados";
import Link from "next/link";

const FilterDeBecas = () => {
  const [paginaActual, setPaginaActual] = useState(1);
  const nivelEducativoRef = useRef();
  const departamentoRef = useRef();
  const [nivelEducativo, setNivelEducativo] = useState("0");
  const [departamento, setDepartamento] = useState("0");
  const [startDate, setStartDate] = useState(null);
  const [filteredBecas, setFilteredBecas] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [becasData, setBecasData] = useState([]);
  const [becasLoading, setBecasLoading] = useState(true);
  const [nivelesEducativos, setNivelesEducativos] = useState([]);
  const [nivelesLoading, setNivelesLoading] = useState(true);
  const [categoriesData, setCategoriesData] = useState([]);

  useEffect(() => {
    const fetchBecas = async () => {
      setBecasLoading(true);
      try {
        const response = await fetch(`${stables.API_URL}/becas?limit=1000`);
        const data = await response.json();
        setBecasData(data.docs);
      } catch (error) {
        console.error("Error fetching becas:", error);
      }
      setBecasLoading(false);
    };

    const fetchCategories = async () => {
      setBecasLoading(true);
      try {
        const response = await fetch(`${stables.API_URL}/tiposBeca?limit=1000`);
        const data = await response.json();
        setCategoriesData(data.docs);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
      setBecasLoading(false);
    };

    const fetchNivelesEducativos = async () => {
      setNivelesLoading(true);
      try {
        const response = await fetch(
          `${stables.API_URL}/nivelesEducativos?limit=1000`
        );
        const data = await response.json();
        setNivelesEducativos(data.docs.sort((a, b) => a.order - b.order));
      } catch (error) {
        console.error("Error fetching niveles educativos:", error);
      }
      setNivelesLoading(false);
    };

    fetchBecas();
    fetchNivelesEducativos();
    fetchCategories();
  }, []);

  const today = useMemo(() => new Date(), []);

  const calcularEdad = (fechaNacimiento) => {
    const diff = Date.now() - fechaNacimiento.getTime();
    const edad = new Date(diff);
    return Math.abs(edad.getUTCFullYear() - 1970);
  };

  const filtrar = useCallback(() => {
    const fechaNacimiento = startDate || today;
    let edad = calcularEdad(fechaNacimiento);

    const becasFiltradas = becasData?.filter((beca) => {
      if (
        beca.nivel_educativo?.length &&
        nivelEducativo !== "0" &&
        !beca.nivel_educativo.some(
          (nivel) =>
            nivel.value.toLocaleLowerCase() ===
            nivelEducativo.toLocaleLowerCase()
        )
      ) {
        return false;
      }
      if (
        beca.departamento.length &&
        departamento !== "0" &&
        !beca.departamento.includes(departamento)
      ) {
        return false;
      }
      if (
        selectedCategories.length > 0 &&
        !selectedCategories.some((cat) =>
          beca.tipo.some((tipo) => cat === tipo.id)
        )
      ) {
        if (selectedCategories.includes("Todas las Categorías")) return true;
        return false;
      }
      if (edad !== 0 && (edad < beca.edad_min || edad > beca.edad_max)) {
        return false;
      }
      return true;
    });
    setFilteredBecas(becasFiltradas?.filter((beca) => beca.mostrar));
  }, [
    startDate,
    today,
    nivelEducativo,
    departamento,
    selectedCategories,
    becasData,
  ]);

  useEffect(() => {
    if (becasData) {
      filtrar();
      setPaginaActual(1);
    }
  }, [
    startDate,
    nivelEducativo,
    departamento,
    selectedCategories,
    becasData,
    filtrar,
    setPaginaActual,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    filtrar();
  };

  const handleRemoveFilter = (filterType, categoryValue = "") => {
    switch (filterType) {
      case "Nivel Educativo":
        setNivelEducativo("0");
        nivelEducativoRef.current.value = "0";
        break;
      case "Departamento":
        setDepartamento("0");
        departamentoRef.current.value = "0";
        break;
      case "Fecha de Nacimiento":
        setStartDate(null);
        break;
      case "Categoría":
        setSelectedCategories(
          selectedCategories.filter((cat) => cat !== categoryValue)
        );
        break;
      case "Todos":
        setNivelEducativo("0");
        setDepartamento("0");
        setStartDate(null);
        setSelectedCategories([]);
        nivelEducativoRef.current.value = "0";
        departamentoRef.current.value = "0";
        break;
      default:
        break;
    }
  };

  const renderAppliedFilters = () => {
    const filters = [];

    if (nivelEducativo !== "0") {
      filters.push({
        type: "Nivel Educativo",
        value: nivelEducativo,
        label: nivelEducativo,
      });
    }
    if (departamento !== "0") {
      filters.push({
        type: "Departamento",
        value: departamento,
        label: departamento,
      });
    }
    if (startDate) {
      filters.push({
        type: "Fecha de Nacimiento",
        value: calcularEdad(startDate) + " años",
        label: calcularEdad(startDate) + " años",
      });
    }
    if (
      selectedCategories.length > 0 &&
      selectedCategories[0] !== categoriesData[0].nombre
    ) {
      selectedCategories.forEach((category) => {
        const label = categoriesData?.find((cat) => cat.id === category).nombre;

        filters.push({ type: "Categoría", value: category, label: label });
      });
    }

    return filters.map((filter, index) => {
      return (
        <span
          key={index}
          className="flex items-center bg-green-500 rounded-md pl-3 pr-2 py-1 text-sm font-semibold text-white mr-2 mb-2"
        >
          {filter.label}
          <button
            onClick={() => handleRemoveFilter(filter.type, filter.value)}
            aria-label={`Remover Filtro de ${filter.value}`}
            className="ml-2 focus:bg-red-800 Fred-button grid place-content-center rounded-sm hover:bg-red-500 transition-all ease-in-out"
          >
            <IoClose className="text-xl" />
          </button>
        </span>
      );
    });
  };

  const hayFiltrosAplicados =
    nivelEducativo !== "0" ||
    departamento !== "0" ||
    startDate !== null ||
    (selectedCategories.length > 0 &&
      selectedCategories[0] !== categoriesData[0].nombre);

  const toggleCategory = (category) => {
    if (category === "Todas las Categorías") {
      setSelectedCategories([]);
      return;
    }
    setSelectedCategories(
      selectedCategories.includes(category)
        ? selectedCategories.filter((cat) => cat !== category)
        : [...selectedCategories, category]
    );
  };

  return (
    <section id="encontraTuBeca" className="encuentra-tu-beca bg-transparent">
      <div className="container max-w-screen-lg mx-auto pt-16 md:py-16 bg-white flex flex-col gap-5 items-center">
        <h2 className="text-lg uppercase tracking-[0.6rem] font-bold text-green-500 px-5 sm:px-0">
          Encontrá tu beca
        </h2>

        <div className="encuentra-tu-beca-form mt-8 w-full">
          <form
            id="formFilter"
            onSubmit={handleSubmit}
            className="flex text-green-800 flex-col mx-auto md:w-[calc(100svw-2rem)] max-w-screen-md md:bg-gray-100 md:rounded-full"
          >
            <div className="flex p-5 md:p-0 flex-col md:flex-row gap-5 md:gap-2 justify-between items-center">
              <div className="w-full md:w-fit border-green-800">
                <label>
                  <span className="sr-only">Fecha de nacimiento</span>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    placeholderText="¿Cuándo naciste?"
                    className="!w-full placeholder:text-green-800 relative border md:text-center cursor-default border-gray-400 md:rounded-none rounded-lg md:border-none md:w-auto px-4 md:pl-4 md:pr-0 bg-transparent py-2 md:rounded-l-full"
                    showYearDropdown
                    dateFormat={"dd/MM/yyyy"}
                    showMonthDropdown
                    yearDropdownItemNumber={40}
                    maxDate={today}
                    scrollableYearDropdown
                    locale={es}
                  />
                </label>
              </div>
              <span className="hidden md:inline-block border border-green-500 w-0.5 h-8 bg-green-500" />
              <label htmlFor="nivelEducativo" className="sr-only">
                Nivel educativo
              </label>
              <select
                id="nivelEducativo"
                ref={nivelEducativoRef}
                onChange={(e) => setNivelEducativo(e.target.value)}
                defaultValue={0}
                name="nivelEducativo"
                className="border min-w-[44px] min-h-[44px] border-gray-400 md:rounded-none rounded-lg md:border-none px-4 bg-transparent py-2 w-full md:w-auto"
              >
                {!nivelesLoading ? (
                  <>
                    <option value={0}>¿Qué vas a estudiar?</option>
                    {nivelesEducativos &&
                      nivelesEducativos.map((nivel) => (
                        <option key={nivel.id} value={nivel.value}>
                          {nivel.label}
                        </option>
                      ))}
                  </>
                ) : (
                  <option value={0}>Cargando...</option>
                )}
              </select>
              <span className="hidden md:inline-block border border-green-500 w-0.5 h-8 bg-green-500" />
              <label htmlFor="departamento" className="sr-only">
                Departamento
              </label>
              <select
                id="departamento"
                ref={departamentoRef}
                onChange={(e) => setDepartamento(e.target.value)}
                defaultValue={0}
                name="departamento"
                className="border !min-w-fit border-gray-400 md:rounded-none rounded-lg md:border-none px-4 bg-transparent py-2 w-full md:w-auto"
              >
                <option value={0}>¿De dónde sos?</option>
                {todosLosDepartamentosUruguay.map((departamento) => (
                  <option key={departamento} value={departamento}>
                    {departamento}
                  </option>
                ))}
              </select>
              <Link
                scroll
                href={"#becasEncontradas"}
                aria-label="Buscar becas"
                className="bg-green-500 hover:bg-green-600 transition-all ease-in-out focus:bg-green-600 text-white px-10 py-3 w-full hidden md:block md:w-auto rounded-full md:rounded-l-none"
              >
                <FaMagnifyingGlass />
              </Link>
            </div>
          </form>
        </div>
      </div>
      <div className="max-w-screen-lg mx-auto bg-white md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-2 md:gap-5 px-5 md:px-0 pb-5 justify-center">
          <button
            onClick={() => toggleCategory("Todas las Categorías")}
            className={`relative  ${
              categoriesData.length % 2 ? "col-span-1" : "col-span-2 "
            }	
                  w-full
                  md:col-span-4
                md:hover:scale-110 ease-in-out transition-all grid place-content-center text-white font-semibold h-16 md:h-20 rounded-xl border-2 bg-cover ${
                  selectedCategories.length === 0 && "border-green-500"
                }`}
            style={{
              backgroundImage: `url("/images/todas.png")`,
            }}
          >
            <div
              className={`absolute inset-0 ${
                selectedCategories.length === 0
                  ? "bg-green-800/60"
                  : "bg-black/20"
              }  rounded-lg`}
            ></div>
            <span
              className={`z-10 ${
                selectedCategories.length === 0 ? "text-white/60" : "text-white"
              }`}
            >
              Todas las categorías
            </span>
          </button>
          {becasLoading &&
            Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className={`bg-slate-500 ${
                  i === 4 ? "hidden md:block" : ""
                } rounded-lg col-span-1 md:col-span-4 w-full h-16 md:h-20 animate-pulse`}
              ></div>
            ))}

          {categoriesData
            .sort((a, b) => a.nombre.localeCompare(b.nombre))
            .map((c, index) => {
              return (
                <button
                  key={index}
                  onClick={() => toggleCategory(c.id)}
                  className={`relative ${
                    categoriesData.length % 2
                      ? "col-span-1 md:col-span-4"
                      : `${
                          index > 1
                            ? "col-span-1 md:col-span-3"
                            : "md:col-span-4 col-span-1"
                        }`
                  } md:hover:scale-110 ease-in-out transition-all grid place-content-center text-white font-semibold h-16 md:h-20 rounded-xl border-2 bg-cover ${
                    selectedCategories.includes(c.id)
                      ? "border-green-500 text-white/60"
                      : "border-white"
                  }`}
                  style={{
                    backgroundImage: `url("${stables.BASE_URL}${c.imagen_fondo.filename}")`,
                  }}
                >
                  <div
                    className={`absolute inset-0 ${
                      selectedCategories.includes(c.id)
                        ? "bg-green-800/60"
                        : "bg-black/20"
                    }  rounded-lg`}
                  ></div>
                  <span className="z-10">{c.nombre}</span>
                </button>
              );
            })}
        </div>

        <FiltrosAplicados
          className="hidden md:block px-2 md:px-0"
          hayFiltrosAplicados={hayFiltrosAplicados}
          renderAppliedFilters={renderAppliedFilters}
          handleRemoveFilter={handleRemoveFilter}
        />
        {becasLoading && (
          <p className="text-center w-fill h-24">Cargando Becas...</p>
        )}

        {filteredBecas && (
          <ContenedorBecas
            loading={becasLoading}
            becas={filteredBecas}
            paginaActual={paginaActual}
            setPaginaActual={setPaginaActual}
          />
        )}
      </div>
    </section>
  );
};

export default FilterDeBecas;
