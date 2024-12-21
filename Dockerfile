
# Usa una imagen base de Node.js

FROM node:20.14.0

# Crea un directorio de trabajo

WORKDIR /app

# Copia los archivos package.json y package-lock.json

COPY package*.json ./

# Instala las dependencias

RUN npm install

RUN npm rebuild bcrypt --build-from-source

# Copia el resto del código de la aplicación

COPY . .

# Expon el puerto en el que escucha la aplicación

EXPOSE 8080

# Define el comando para ejecutar la aplicación

CMD ["npm", "start"]