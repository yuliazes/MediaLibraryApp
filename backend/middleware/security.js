const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');

// Configuración de Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100 // límite de 100 peticiones por ventana
});

// Configuración de CORS
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200
};

// Middleware de seguridad
const securityMiddleware = (app) => {
    // Protección básica con helmet
    app.use(helmet());
    
    // Configuración de CORS
    app.use(cors(corsOptions));
    
    // Rate limiting
    app.use('/api/', limiter);
    
    // Prevención de ataques XSS
    app.use(helmet.xssFilter());
    
    // Prevención de clickjacking
    app.use(helmet.frameguard({ action: 'deny' }));
    
    // Desactivar la cabecera X-Powered-By
    app.disable('x-powered-by');
    
    // Configuración de CSP
    app.use(
        helmet.contentSecurityPolicy({
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "'unsafe-inline'"],
                styleSrc: ["'self'", "'unsafe-inline'"],
                imgSrc: ["'self'", "data:", "https:"],
                connectSrc: ["'self'"],
                fontSrc: ["'self'"],
                objectSrc: ["'none'"],
                mediaSrc: ["'self'"],
                frameSrc: ["'none'"],
            },
        })
    );
};

module.exports = securityMiddleware; 