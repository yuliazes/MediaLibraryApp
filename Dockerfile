# Usa una imagen base de Node.js
FROM node:16-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /app/backend

# Copia el archivo package.json y package-lock.json (si existe) al contenedor
COPY backend/package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código del backend al contenedor
COPY backend .

# Expone el puerto que usa tu aplicación
EXPOSE 5000

# Comando para iniciar la aplicación
CMD ["npm", "start"]