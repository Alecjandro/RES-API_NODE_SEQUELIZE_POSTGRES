# Usa la imagen oficial de Node.js
FROM node:22

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos del proyecto
COPY package.json package-lock.json ./
RUN npm install

# Copia el resto del código fuente
COPY . .

# Expone el puerto en el que correrá la API
EXPOSE 4000

# Comando para iniciar la aplicación
CMD ["npm", "start"]

