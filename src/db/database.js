import mongoose from "mongoose";
import 'dotenv/config'
const MONGO_URL = process.env.MONGO_URL

export const initMongoDB = async () =>{
    try {
        await mongoose.connect(MONGO_URL)
        console.log("Conectado a la base de datos de Mongo");

        /* const product = {
            title: "Calza Negra",
            description: "Descripción Calza",
            code: "1123",
            price: 8000,
            status: true,
            stock: 30,
            category: "Calzas",
            }
            console.log("Escritura", await ProductModel.create(product) ); */
            /* console.log("Lectura", await ProductModel.find({}) ); */
    } catch (error) {
        console.log(error);
    }
}


//initMongoDB()
