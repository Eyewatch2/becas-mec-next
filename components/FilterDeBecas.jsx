"use client"

import { useState, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';
import { todosLosDepartamentosUruguay, categoriesData } from '@/data/data';
import ContenedorBecas from './ui/ContenedorBecas';
import { IoClose } from "react-icons/io5";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { stables } from '@/stables/stables';
import FiltrosAplicados from './ui/FiltrosAplicados';

const FilterDeBecas = () => {
    const [paginaActual, setPaginaActual] = useState(1);
    const nivelEducativoRef = useRef();
    const departamentoRef = useRef();
    const [nivelEducativo, setNivelEducativo] = useState('0');
    const [departamento, setDepartamento] = useState('0');
    const [startDate, setStartDate] = useState(null);
    const [filteredBecas, setFilteredBecas] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [becasData, setBecasData] = useState([]);
    const [becasLoading, setBecasLoading] = useState(true);
    const [nivelesEducativos, setNivelesEducativos] = useState([]);
    const [nivelesLoading, setNivelesLoading] = useState(true);



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

        const fetchNivelesEducativos = async () => {
            setNivelesLoading(true);
            try {
                const response = await fetch(`${stables.API_URL}/nivelesEducativos?limit=1000`);
                const data = await response.json();
                setNivelesEducativos(data.docs.sort((a, b) => a.order - b.order));
            } catch (error) {
                console.error("Error fetching niveles educativos:", error);
            }
            setNivelesLoading(false);
        };

        fetchBecas();
        fetchNivelesEducativos();
    }, []);

    const today = new Date();

    const filtrar = () => {
        const fechaNacimiento = startDate || today;
        let edad = calcularEdad(fechaNacimiento);

        const becasFiltradas = becasData?.filter(beca => {
            if (
                beca.nivel_educativo?.length &&
                nivelEducativo !== '0' &&
                !beca.nivel_educativo.some(nivel => nivel.value.toLocaleLowerCase() === nivelEducativo.toLocaleLowerCase())
            ) {
                return false;
            }
            if (beca.departamento.length && departamento !== '0' && !beca.departamento.includes(departamento)) {
                return false;
            }
            if (selectedCategories.length > 0 && !selectedCategories.some(cat => cat.toLocaleLowerCase() === beca.tipo.toLocaleLowerCase())) {
                if (selectedCategories.includes("Todas las Categorías")) return true;
                return false;
            }
            if (edad !== 0 && (edad < beca.edad_min || edad > beca.edad_max)) {
                return false;
            }
            return true;
        });
        setFilteredBecas(becasFiltradas?.filter(beca => beca.mostrar));
    };

    const calcularEdad = (fechaNacimiento) => {
        const diff = Date.now() - fechaNacimiento.getTime();
        const edad = new Date(diff);
        return Math.abs(edad.getUTCFullYear() - 1970);
    };

    useEffect(() => {
        if (becasData) {
            filtrar();
            setPaginaActual(1);
        }
    }, [startDate, nivelEducativo, departamento, selectedCategories, becasData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        filtrar();
    };

    const handleRemoveFilter = (filterType, categoryValue = "") => {
        switch (filterType) {
            case 'Nivel Educativo':
                setNivelEducativo('0');
                nivelEducativoRef.current.value = '0';
                break;
            case 'Departamento':
                setDepartamento('0');
                departamentoRef.current.value = '0';
                break;
            case 'Fecha de Nacimiento':
                setStartDate(null);
                break;
            case 'Categoría':
                setSelectedCategories(selectedCategories.filter(cat => cat !== categoryValue));
                break;
            case 'Todos':
                setNivelEducativo('0');
                setDepartamento('0');
                setStartDate(null);
                setSelectedCategories([]);
                nivelEducativoRef.current.value = '0';
                departamentoRef.current.value = '0';
                break;
            default:
                break;
        }
    };

    const renderAppliedFilters = () => {
        const filters = [];

        if (nivelEducativo !== '0') {
            filters.push({ type: 'Nivel Educativo', value: nivelEducativo });
        }
        if (departamento !== '0') {
            filters.push({ type: 'Departamento', value: departamento });
        }
        if (startDate) {
            filters.push({ type: 'Fecha de Nacimiento', value: calcularEdad(startDate) + ' años' });
        }
        if (selectedCategories.length > 0 && selectedCategories[0] !== categoriesData[0].nombre) {
            selectedCategories.forEach(category => {
                filters.push({ type: 'Categoría', value: category });
            });
        }

        return filters.map((filter, index) => (
            <span key={index} className="flex items-center bg-green-500 rounded-md pl-3 pr-2 py-1 text-sm font-semibold text-white mr-2 mb-2">
                {filter.value}
                <button onClick={() => handleRemoveFilter(filter.type, filter.value)} className="ml-2 bg-green-800/20 rounded-sm hover:bg-green-800 transition-all ease-in-out"><IoClose className='text-xl' /></button>
            </span>
        ));
    };

    const hayFiltrosAplicados = nivelEducativo !== '0' || departamento !== '0' || startDate !== null || (selectedCategories.length > 0 && selectedCategories[0] !== categoriesData[0].nombre);

    const toggleCategory = (category) => {
        if (category === categoriesData[0].nombre) {
            setSelectedCategories([])
            return
        }
        setSelectedCategories(selectedCategories.includes(category) ? selectedCategories.filter(cat => cat !== category) : [...selectedCategories, category]);

    };




    return (
        <section id='encontraTuBeca' className="encuentra-tu-beca bg-transparent">
            <div className="container max-w-screen-lg mx-auto pt-16 md:py-16 bg-white flex flex-col gap-5 items-center">
                <h2 className="text-lg uppercase tracking-[0.6rem] font-bold text-green-500">Encontrá tu beca</h2>

                <div className="encuentra-tu-beca-form mt-8 w-full">
                    <form id="formFilter" onSubmit={handleSubmit} className="flex text-green-800 flex-col mx-auto md:w-[calc(100svw-2rem)] max-w-screen-md md:bg-gray-100 md:rounded-full">
                        <div className="flex p-5 md:p-0 flex-col md:flex-row gap-5 md:gap-2 justify-between items-center">
                            <div className='w-full md:w-fit border-green-800'>
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    placeholderText="Fecha de nacimiento:"
                                    className="w-full placeholder:text-green-800 relative border md:text-center cursor-default border-gray-400 md:rounded-none rounded-lg md:border-none md:w-auto px-4 md:pl-4 md:pr-0 bg-transparent py-2 md:rounded-l-full"
                                    showYearDropdown
                                    dateFormat={"dd/MM/yyyy"}
                                    showMonthDropdown
                                    yearDropdownItemNumber={40}
                                    maxDate={today}
                                    scrollableYearDropdown
                                    locale={es}
                                />
                            </div>
                            <span className="hidden md:inline-block border border-green-500 w-0.5 h-8 bg-green-500" />
                            <select
                                ref={nivelEducativoRef}
                                onChange={(e) => setNivelEducativo(e.target.value)}
                                defaultValue={0}
                                name="nivelEducativo"
                                className="border border-gray-400 md:rounded-none rounded-lg md:border-none px-4 bg-transparent py-2 w-full md:w-auto"
                            >
                                {!nivelesLoading ? (
                                    <>
                                        <option value={0}>Nivel Educativo</option>
                                        {nivelesEducativos && nivelesEducativos.map((nivel) => (
                                            <option key={nivel.id} value={nivel.value}>{nivel.label}</option>
                                        ))}
                                    </>
                                ) : <option value={0}>Cargando...</option>}

                            </select>
                            <span className="hidden md:inline-block border border-green-500 w-0.5 h-8 bg-green-500" />
                            <select
                                ref={departamentoRef}
                                onChange={(e) => setDepartamento(e.target.value)}
                                defaultValue={0}
                                name="departamento"
                                className="border border-gray-400 md:rounded-none rounded-lg md:border-none px-4 bg-transparent py-2 w-full md:w-auto"
                            >
                                <option value={0}>Tu Departamento</option>
                                {todosLosDepartamentosUruguay.map((departamento, index) => (
                                    <option key={departamento} value={departamento}>{departamento}</option>
                                ))}
                            </select>
                            <button type="submit" className="bg-green-500 hover:bg-green-600 transition-all ease-in-out focus:bg-green-600 text-white px-10 py-3 w-full hidden md:block md:w-auto rounded-full md:rounded-l-none"><FaMagnifyingGlass /></button>
                        </div>
                    </form>
                </div>
            </div>
            <div className='max-w-screen-lg mx-auto bg-white md:px-10'>
                <div className="flex flex-wrap gap-5 pb-5 justify-center">
                    {categoriesData.map((c, index) => (
                        <button key={index} onClick={() => toggleCategory(c.nombre)}
                            className={`relative ${index < 3 ? "md:w-[calc(33%-0.7rem)]" : "md:w-[calc(25%-1rem)]"} ${index === 0 ? "w-[calc(100%-2.5rem)]" : "w-[calc(50%-2rem)]"} md:hover:scale-110 ease-in-out transition-all grid place-content-center text-white font-semibold h-16 md:h-20 rounded-xl border-2 ${selectedCategories.includes(c.nombre) ? 'border-green-500' : (selectedCategories.length === 0 && index === 0) ? 'border-green-500' : 'border-white'}`}
                            style={{
                                backgroundImage: `url("https://picsum.photos/200/300?random=${index}")`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        >
                            <div className={`absolute inset-0 ${(selectedCategories.includes(c.nombre) || (selectedCategories.length === 0 && index === 0)) ? "bg-green-800" : "bg-black"} opacity-60 rounded-lg`}></div>
                            <span className="z-10">{c.nombre}</span>
                        </button>
                    ))}
                </div>

                <FiltrosAplicados className='hidden md:block' hayFiltrosAplicados={hayFiltrosAplicados} renderAppliedFilters={renderAppliedFilters} handleRemoveFilter={handleRemoveFilter} />
                {becasLoading && <p className='text-center w-fill h-24'>Cargando Becas...</p>}

                {filteredBecas && <ContenedorBecas becas={filteredBecas} paginaActual={paginaActual} setPaginaActual={setPaginaActual} />}
            </div>
        </section>
    );
}

export default FilterDeBecas;
