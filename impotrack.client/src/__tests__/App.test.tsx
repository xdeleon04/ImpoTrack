import { vi, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import App from './../App'

test('renderiza el encabezado Contribuyentes', () => {
    render(<App />);
    const linkElement = screen.getByText(/Contribuyentes/i);
    expect(linkElement).toBeInTheDocument();
});

test('muestra un mensaje de error cuando la API falla', async () => {
    axios.get = vi.fn().mockRejectedValue(new Error('Hubo un error al obtener los comprobantes. (Haz clic aqu\u00ed para recargar)'));

    render(<App />);

    const errorMessage = await screen.findByText('Hubo un error al obtener los comprobantes. (Haz clic aqu\u00ed para recargar)');
    expect(errorMessage).toBeInTheDocument();
});

test('carga y muestra los datos de la API correctamente', async () => {
    const contribuyentes = [{ rncCedula: '98754321012', nombre: 'JUAN PEREZ', tipo: 'PERSONA FISICA', estatus: 'activo' }];
    const comprobantes = [{ rncCedula: '98754321012', ncf: 'E310000000001', monto: 100, itbis18: 18 }];

    axios.get = vi.fn().mockImplementation((url) => {
        switch (url) {
            case '/contribuyentes':
                return Promise.resolve({ data: contribuyentes });
            case '/comprobantes':
                return Promise.resolve({ data: comprobantes });
            default:
                return Promise.reject(new Error('not found'));
        }
    });

    render(<App />);

    const contribuyenteNombres = await screen.findAllByText('JUAN PEREZ');
    expect(contribuyenteNombres[0]).toBeInTheDocument();

    const contribuyenteButton = await screen.findByText('JUAN PEREZ');
    userEvent.click(contribuyenteButton);

    const tipoContribuyente = await screen.findByText('PERSONA FISICA');
    expect(tipoContribuyente).toBeInTheDocument();

    const estatusContribuyente = await screen.findByText('activo');
    expect(estatusContribuyente).toBeInTheDocument();

    const comprobanteNCF = await screen.findByText('E310000000001:');
    expect(comprobanteNCF).toBeInTheDocument();

    const comprobanteNCFMonto = await screen.findByText('100');
    expect(comprobanteNCFMonto).toBeInTheDocument();

    const comprobanteMonto = await screen.findByText('18');
    expect(comprobanteMonto).toBeInTheDocument();
});