import { Router } from "express";
import { UserModel } from "../daos/mongodb/models/user.model.js";
import { comparePassword } from "../utils/hash.js";
import { generateToken, verifyToken } from "../utils/jwt.js";
import passport from "passport";
import { createHash } from "../utils/hash.js";

const router = Router();

router.post("/login", passport.authenticate("login", {
    session: false,
    failureRedirect: "/api/session/login",
}), async (req, res) => {
    const payload = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        role: req.user.role,
    };
    
    console.log("login");
        const token = generateToken(payload);
    
        res.cookie("token", token, {
            maxAge: 100000,
            httpOnly: true,
        });
    
        res.status(200).json({
            message: "Sesión iniciada",
            token,
        });
    }
);

router.get("/login", (req, res) => {
    res.status(401).json({
    error: "No autorizado",
    });
});

router.post(
    "/login",
    passport.authenticate("login", {
        session: false,
        failureRedirect: "/api/session/login",
    }),
    async (req, res) => {
        const payload = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            role: req.user.role,
        };

        const token = generateToken(payload);

        res.cookie("token", token, {
            maxAge: 100000,
            httpOnly: true,
        });

        res.status(200).json({
            message: "Login success",
            token,
        });
    }
);

router.get("/login", (req, res) => {
    res.status(401).json({
        error: "Unauthorized",
    });
});

router.post("/register", async (req, res) => {
    const { first_name, last_name, email, age, role, password } = req.body;

    if (!first_name || !last_name || !email || !age || !password) {
        return res.status(400).json({
            error: "Faltan campos",
        });
    }
    
    try {
    // Hashear contraseña
        const hashPassword = await createHash(password);

        const user = await UserModel.create({
            first_name,
            last_name,
            email,
            age,
            password: hashPassword,
            role,
        });
    
        res.status(201).json(user);
        } catch (error) {
        res
            .status(500)
            .json({ error: "Error al crear el usuario", details: error.message });
        }
    });

router.get("/current", async (req, res) => {
    const token = req.cookies["token"];

    if (!token) {
    return res.status(401).json({ error: "No autorizado" });
    }

    try {
        const user = verifyToken(token);

        const userDB = await UserModel.findOne({ email: user.email });

        if (!userDB) {
            return res.status(404).json({ error: "No se encontró el usuario" });
        }

        res.status(200).json(userDB);
    } catch (error) {
        res
        .status(500)
        .json({ error: "Error al obtener el usuario", details: error.message });
    }
});

router.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Sesión cerrada" });
});

export default router;