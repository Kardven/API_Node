require("express-async-errors");

const migrationsRun = require('./database/sqlite/migrations')

const AppError = require('./utils/AppError')
const express = require('express')

const routes = require('./routes')

migrationsRun();

const app = express()
app.use(express.json())

app.use(routes)


app.use((error, request, response, next) => {
  if(error instanceof AppError) {
    return response.status(error.statusCode).json({ 
      status: "error", 
      error: error.message })
  }

  console.error(error);

  return response.status(500).json({ 
    status: "error", 
    error: "Internal Server Error"
});
});
const PORT = 3333
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`))























//Route
// app.get("/message/:id/:user", (request, response) => {
//   response.send(`
//     ID da mensagem: ${request.params.id}.
//     Para o Usuario ${request.params.user}.`)
// });
// ----------------

//Query

// app.get("/users", (request, response) => {
//   const {page, limit} = request.query;

//   response.send(`Pagina: ${page}. Mostrar: ${limit}`)
// });