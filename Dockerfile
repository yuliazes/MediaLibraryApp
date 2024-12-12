# Usa una imagen base
FROM node:16-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de configuración para instalar dependencias
COPY backend/package*.json ./backend/

# Instala las dependencias
RUN npm install --prefix backend

# Copia el código del backend
COPY backend ./backend

# Expone el puerto
EXPOSE 5000

# Comando para iniciar la aplicación
CMD ["npm", "start", "--prefix", "backend"]