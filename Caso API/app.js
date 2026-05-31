const express = require("express");
const dbconnect = require("./config");
const ModelUser = require("./model");

const app = express();
const router = express.Router();

app.use(express.json());

/* REGISTRO */
router.post('/register', async (req, res) => {

    try {

        const { usuario, password } = req.body;

        const existe = await ModelUser.findOne({ usuario });

        if (existe) {
            return res.status(400).json({
                mensaje: "El usuario ya existe"
            });
        }

        const nuevoUsuario = await ModelUser.create({
            usuario,
            password
        });

        res.status(201).json({
            mensaje: "Usuario registrado correctamente",
            usuario: nuevoUsuario
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

});

/* LOGIN */
router.post('/login', async (req, res) => {

    try {

        const { usuario, password } = req.body;

        const user = await ModelUser.findOne({
            usuario,
            password
        });

        if (user) {

            return res.status(200).json({
                mensaje: "Autenticación satisfactoria"
            });

        }

        return res.status(401).json({
            mensaje: "Error en la autenticación"
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

});

/* CONSULTAR TODOS */
router.get('/', async (req, res) => {
    const respuesta = await ModelUser.find({});
    res.send(respuesta);
});

/* CONSULTAR POR ID */
router.get('/:id', async (req, res) => {
    const respuesta = await ModelUser.findById(req.params.id);
    res.send(respuesta);
});

/* ACTUALIZAR */
router.put('/:id', async (req, res) => {
    const respuesta = await ModelUser.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.send(respuesta);
});

/* ELIMINAR */
router.delete('/:id', async (req, res) => {
    const respuesta = await ModelUser.deleteOne({
        _id: req.params.id
    });
    res.send(respuesta);
});

app.use(router);

app.listen(3003, () => {
    console.log("Servidor ejecutándose en puerto 3003");
});

dbconnect();