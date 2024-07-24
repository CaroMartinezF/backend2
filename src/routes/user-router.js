import { Router } from "express";
import { UserModel } from "../daos/mongodb/models/user.model.js";
import { createHash } from "../utils/hash.js";
/* import { authenticate, authorize } from "../middlewares/auth-middleware.js"; */

const router = Router();

router.get("/", async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (error) {
        res
        .status(500)
        .json({ error: "Error al obtener los usuarios", details: error.message });
    }
})

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await UserModel.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res
        .status(500)
        .json({ error: "Error al obtener el usuario", details: error.message });
    }
});

router.post("/", async (req, res) => {
    const {first_name, last_name, email, age, password} = req.body;
    if (!first_name || !last_name || !email || !age || !password) {
        return res.status(400).json({ error: "Falta información" });
    }
    try {
        //hashear contraseña
        const hashPassword = await createHash(password);

        const user = await UserModel.create({
            first_name,
            last_name,
            email,
            age,
            password: hashPassword,
        });

        res.status(201).json(user);
        } catch (error) {
        res
            .status(500)
            .json({ error: "Error al crear el usuario", details: error.message });
        }
    });
    
    export default router;
