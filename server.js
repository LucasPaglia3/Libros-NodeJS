const express = require('express'); // Agrega las dependencias de express.
const { libraryRoute, userRoute, authRoute, bookRoute } = require('./routes'); // Incluye la ruta para la libreria.
const { initializeDb } = require('./config/db-config');
const { userModel } = require('./models');


const port = 5000;

const app = express(); // Instanciamos la app.

// Middlewares
app.use(express.json());

// Routes
app.use('/library', libraryRoute); // Usamos la ruta en '/library'
app.use('/user', userRoute); // Usamos la ruta en '/user'
app.use('/login', authRoute); // Usamos la ruta en '/login'
app.use('/book', bookRoute);


app.listen(port, async () => { // Levantamos el sv.
    await initializeDb();
    const adminCreated = await userModel.findOne({ user: "admin" });
    if(!adminCreated) {
        await userModel.create({ nombre: "admin", apellido: "admin", user: "admin", password: "admin" });
        console.log('No hay un admin, creando admin...')
    }
    console.log(`Server running on port: ${port}`);
});