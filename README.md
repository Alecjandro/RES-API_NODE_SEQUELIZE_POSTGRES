
# Desarrollo de Microservicio API REST

## Objetivo
Este proyecto tiene como objetivo desarrollar un microservicio API REST con las siguientes características:

- Desarrollo de un microservicio local en **Node.js** con **Express.js**.
- Creación de una API REST con endpoints funcionales.
- Implementación de una base de datos **PostgreSQL** con tres tablas relacionadas (**productos, categorías y usuarios**).
- Pruebas de la API utilizando **Postman**.
- Subida del proyecto a **GitHub**.
- Dockerización del proyecto completo para facilitar su despliegue.
- Despliegue del microservicio en **Render**.

---

## 1. Requisitos Técnicos

### 1.1 Desarrollo del Microservicio
El microservicio ha sido desarrollado en **Node.js** con el framework **Express** y sigue los principios de arquitectura RESTful:

- Maneja solicitudes HTTP: **GET, POST, PUT y DELETE**.
- Utiliza controladores y servicios para una mejor separación de responsabilidades.
- Implementa validaciones y manejo de errores adecuado.

### 1.2 Base de Datos PostgreSQL
La base de datos utilizada es **PostgreSQL**, y se han creado tres tablas relacionadas:

- **Productos**: Contiene la información de los productos.
- **Categorías**: Relacionada con los productos, almacena las diferentes categorías de productos.
- **Usuarios**: Almacena la información de los usuarios registrados en el sistema.

Se han utilizado **Sequelize** como ORM para la gestión de la base de datos, junto con **sequelize-cli** para manejar migraciones y definir relaciones entre tablas.
### 1.3 Pruebas de la API con Postman
Se han definido y documentado los endpoints de la API en **Postman**:

- Se creó una colección de pruebas con diferentes solicitudes a la API.
- Se generó un archivo `collection.json`, el cual se ha subido al repositorio para facilitar su uso y pruebas.

### 1.4 Dockerización del Proyecto
Para facilitar el despliegue, el microservicio ha sido **dockerizado** con los siguientes archivos:

- **Dockerfile**: Contiene las instrucciones para construir la imagen del microservicio.
- **docker-compose.yml**: Define los servicios de:
  - **Microservicio** basado en Node.js.
  - **Base de datos PostgreSQL**.

### 1.5 Despliegue en la Nube
El microservicio ha sido desplegado en **Render**. Para ello:

- Se configuró la base de datos en Render.
- Se generaron los archivos de configuración requeridos.
- Se subieron todos los archivos a **GitHub** para su versionado y mantenimiento.
- Se configuraron las variables de entorno necesarias.
- Se conectó la API a la base de datos usando **Sequelize**.

---

## 2. Instalación y Uso

### 2.1 Clonar el Repositorio
```bash
  git clone https://github.com/usuario/microservicio-api.git
  cd microservicio-api
```

### 2.2 Configuración de Variables de Entorno
Crear un archivo `.env` con los siguientes valores:
```env
PORT=3000
DATABASE_URL=postgresql://usuario:contraseña@servidor:puerto/inventarios_5ukc
```

### 2.3 Instalación de Dependencias
```bash
  npm install
```

### 2.4 Ejecutar el Proyecto en Desarrollo
```bash
  npm run dev
```

### 2.5 Ejecutar con Docker
```bash
  docker-compose up --build
```

---

## 3. Endpoints Principales

| Método | Endpoint         | Descripción                       |
|--------|-----------------|-----------------------------------|
| GET    | `/inventarios`  | Obtiene todos los inventarios    |
| POST   | `/inventarios`  | Crea un nuevo inventario         |
| PUT    | `/inventarios/:id` | Actualiza un inventario existente |
| DELETE | `/inventarios/:id` | Elimina un inventario             |

---

## 4. Proceso de Despliegue en Render

1. Crear la base de datos en Render:
   - Ir a [Render](https://dashboard.render.com).
   - Clic en **New** → **PostgreSQL**.
   - Configurar:
     - **Plan:** Free
     - **Database Name:** inventarios_5ukc
     - **Region:** Oregon
   - Guardar la base de datos y copiar la **URL de conexión**.
2. Conectar PostgreSQL a la API configurando `config/config.js`.
3. Subir el código a **GitHub**.
4. Crear el servicio en Render:
   - Ir a [Render](https://render.com).
   - Clic en **New Web Service**.
   - Conectar cuenta de **GitHub** y seleccionar el repositorio.
   - Configurar:
     - **Branch:** main
     - **Root Directory:** vacío
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`
     - **Runtime:** Node.js 22
5. Configurar las variables de entorno en Render:
   - Nombre: `DATABASE_URL`
   - Valor: `postgresql://usuario:contraseña@host:puerto/nombre_de_la_bd`
6. Guardar los cambios y desplegar.

URL API desplegada: [API en Render](https://res-api-node-sequelize-postgres-2.onrender.com/inventarios)

---

## 5. Retos enfrentados y soluciones implementadas

- **Problemas con las tablas en Sequelize y PostgreSQL**: Se ajustaron nombres manualmente y se configuró Sequelize para evitar modificaciones automáticas.
- **Errores en la configuración de Sequelize**: Se migró el archivo de configuración a JavaScript para manejar variables de entorno correctamente.
- **Dificultades con Docker**: Se ajustó la configuración para que la API esperara la disponibilidad de PostgreSQL antes de iniciar.
- **Errores en Postman**: Se corrigieron validaciones en Sequelize para evitar errores inesperados en la creación y actualización de datos.



















