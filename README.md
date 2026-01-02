# Notes API

API REST construida con Node.js, Express y Prisma para la gestión de usuarios y notas.
Incluye CRUD completo, relaciones entre entidades y validaciones básicas.

---

## Tech Stack

- Node.js
- Express
- PostgreSQL
- Prisma ORM

---

## Instalación

Clona el repositorio:

```bash
git clone https://github.com/carlososriaosda/notes-api.git
Entra al proyecto:

cd notes-api


Instala las dependencias:

npm install


Genera el cliente de Prisma:

npx prisma generate


Ejecuta el servidor en modo desarrollo:

npm run dev


El servidor se ejecuta por defecto en:

http://localhost:3000


Endpoints

Users
GET /users

GET /users/:id/notes

POST /users

PUT /users/:id

DELETE /users/:id

Notes
GET /notes

POST /notes

PUT /notes/:id

