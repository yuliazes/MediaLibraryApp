# Media Library App

Una aplicación moderna para gestionar tu biblioteca multimedia personal.

## 🚀 Características

- Gestión de contenido multimedia
- Interfaz de usuario intuitiva
- API RESTful
- Autenticación de usuarios
- Almacenamiento seguro

## 📋 Prerrequisitos

- Node.js (v14 o superior)
- Docker y Docker Compose
- MongoDB

## 🛠️ Instalación

### Desarrollo local

1. Clonar el repositorio:
```bash
git clone https://github.com/yourusername/MediaLibraryApp.git
cd MediaLibraryApp
```

2. Configurar el backend:
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

3. Configurar el frontend:
```bash
cd frontend
npm install
npm start
```

### Usando Docker

```bash
docker-compose up --build
```

## 🔧 Configuración

### Variables de entorno

Backend (.env):
```
MONGODB_URI=mongodb://localhost:27017/medialibrary
JWT_SECRET=your_jwt_secret
PORT=3000
```

## 📚 Documentación API

La documentación de la API está disponible en `/api/docs` cuando el servidor está corriendo.

## 🧪 Tests

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu rama de feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT.
