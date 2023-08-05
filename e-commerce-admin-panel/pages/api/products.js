import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handle(req, res) {
    const { method } = req; //Grab the method from the Request
    await mongooseConnect();

    //Fetch products from Database
    if (method === 'GET') {
        res.json(await Product.find());
    }

    //Used to add product to DataBase  @ pages/products/new.js
    if (method === 'POST') {
        const {title,description,price} = req.body;

        const productDoc = await Product.create({
            title, description, price
        })
        res.json(productDoc);
    }
}