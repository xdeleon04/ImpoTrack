import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

interface Comprobantes {
    rncCedula: string;
    ncf: string;
    monto: number;
    itbis18: number;
}

interface Contribuyentes {
    rncCedula: string;
    nombre: string;
    tipo: string;
    estatus: string;
}

function App() {
    const [contribuyentes, setContribuyentes] = useState<Contribuyentes[]>([]);
    const [comprobantes, setComprobantes] = useState<Comprobantes[]>([]);
    const [contribuyenteSeleccionado, setContribuyenteSeleccionado] = useState<Contribuyentes>();
    const [sumaTotalItbis, setSumaTotalItbis] = useState(0);
    const [mostrarDetalles, setMostrarDetalles] = useState(false);
    const [error, setError] = useState<string | null>(null);
 
    useEffect(() => {
        const fetchContribuyentes = async () => {
            try {
                const response = await axios.get('/contribuyentes');
                setContribuyentes(response.data);
            } catch (error) {
                console.error('Error fetching contribuyentes: ', error);
                setError('Hubo un error al obtener los contribuyentes. (Haz clic aqu\u00ed para recargar)');
            }
        };

        const fetchComprobantes = async () => {
            try {
                const response = await axios.get('/comprobantes');
                setComprobantes(response.data);
            } catch (error) {
                console.error('Error fetching comprobantes: ', error);
                setError('Hubo un error al obtener los comprobantes. (Haz clic aqu\u00ed para recargar)');
            }
        };

        fetchContribuyentes();
        fetchComprobantes();
    }, []);

    useEffect(() => {
        if (contribuyenteSeleccionado) {
            const suma = comprobantes
                .filter(comprobante => comprobante.rncCedula === contribuyenteSeleccionado.rncCedula)
                .reduce((suma, comprobante) => suma + comprobante.itbis18, 0);
            setSumaTotalItbis(suma);
        }
    }, [comprobantes, contribuyenteSeleccionado]);

    const handleContribuyenteClick = (contribuyente: Contribuyentes) => {
        if (contribuyenteSeleccionado === contribuyente) {
            setMostrarDetalles(!mostrarDetalles);
        } else {
            setContribuyenteSeleccionado(contribuyente);
            setMostrarDetalles(true);
        }
    };

    return (
        <div className="p-6 text-black">
            <h1 className="text-3xl font-bold mb-4 text-green-500">Contribuyentes</h1>
            {error &&
                <div className="bg-red-500 p-2 mb-4 text-neutral-950 rounded cursor-pointer" onClick={() => window.location.reload()}>
                    {error}
                </div>
            }
            {contribuyentes.map(contribuyente => (
                <div key={contribuyente.rncCedula} onClick={() => handleContribuyenteClick(contribuyente)} className="p-2 my-2 hover:bg-green-600 cursor-pointer rounded">
                    {contribuyente.nombre}
                </div>
            ))}

            {contribuyenteSeleccionado && mostrarDetalles && (
                <div className="mt-6">
                    <div className="text-2xl font-bold mb-2 text-green-500">{contribuyenteSeleccionado.nombre}</div>
                    <div className="text-xl font-bold mt-4 text-green-500">Tipo: <span className="font-normal text-neutral-950">{contribuyenteSeleccionado.tipo}</span></div>
                    <div className="text-xl font-bold mt-4 text-green-500">Estatus: <span className="font-normal text-neutral-950">{contribuyenteSeleccionado.estatus}</span></div>
                    <div className="p-2 my-2 border-green-500 font-bold text-green-500">Comprobantes Fiscales</div>
                    {comprobantes
                        .filter(comprobante => comprobante.rncCedula === contribuyenteSeleccionado.rncCedula)
                        .map(comprobante => (
                            <div key={comprobante.ncf} className="p-2 my-2 border-b border-green-500">
                                <div className="font-bold text-green-500">{comprobante.ncf}: <span className="font-normal text-neutral-950">{comprobante.monto}</span></div>
                            </div>
                        ))}
                        <div className="text-xl font-bold mt-4 text-green-500">Total del ITBIS: <span className="font-normal text-neutral-950">{sumaTotalItbis}</span></div>
                </div>
            )}
        </div>
    );
}

export default App;