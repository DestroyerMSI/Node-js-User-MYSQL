import cors from 'cors';

export const CORS = () => cors({
    origin: (origin, callback) => {
        const PUERTOS = [
            'http://localhost:3000',
            'http://localhost:5000',
            'http://127.0.0.1:5500',
        ];
        if (PUERTOS.includes(origin) || !origin) {
            callback(null, true); // Permitir el origen
        } else {
            callback(new Error('A ocurrido un error de CORS')); // Manejo de error
        }
    }
});
