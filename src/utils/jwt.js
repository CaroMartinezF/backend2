import jwt from "jsonwebtoken";
import 'dotenv/config';

export const generateToken = (user) => {
    const payload = {
    _id: user._id,
    email: user.email,
    role: user.role,
    };
    return jwt.sign(payload, process.env.SECRET_KEY_JWT, {
        expiresIn: "5m",
    });
};


export function verifyToken(token) {
    try{
        const decoded = jwt.verify(token, process.env.SECRET_KEY_JWT);
        return decoded;
    } catch (error) {
        throw new Error("Invalid token");
    }
}