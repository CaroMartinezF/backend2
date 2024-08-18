import { Router } from "express";
import { UserModel } from "../daos/mongodb/models/user.model.js";
import { comparePassword } from "../utils/hash.js";
import { generateToken, verifyToken } from "../utils/jwt.js";
import passport from "passport";
import { createHash } from "../utils/hash.js";
import { mailService } from "../services/mail.service.js";
import { validate } from "../../middleware/validation.middleware.js";
import { authDto } from "../dtos/auth.dto.js";
import { userDto } from "../dtos/user.dto.js";
import { resUserDto } from "../dtos/user.dto.js";
import { authorizationRole } from "../../middleware/auth.middleware.js";

const router = Router();

router.post("/login", validate(authDto), passport.authenticate("login", {session: false, failureRedirect: "/api/session/login"}), authorizationRole(['admin','user']), async (req, res) => {
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

router.post("/register", validate(userDto), async (req, res) => {
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
        //Envio mail registro
        await mailService.sendMail({to: email, subject: "Bienvenido", type: "Registro", name: first_name})
        } catch (error) {
        res
            .status(500)
            .json({ error: "Error al crear el usuario", details: error.message });
        }
    });

router.get('/current', passport.authenticate("jwt",{session: false}), authorizationRole(['admin','user']), async (req, res)=>{
    res.status(200).json({
        message:"Bienvenido",
        user: await resUserDto(req.user)
    })
})

router.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Sesión cerrada" });
});

export default router;