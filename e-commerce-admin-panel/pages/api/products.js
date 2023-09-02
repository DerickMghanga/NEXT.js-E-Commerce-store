import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handle(req, res) {
    const { method } = req; //Grab the method from the Request
    await mongooseConnect();  //always connect to DB first

    //Fetch products from Database
    if (method === 'GET') {
        if (req.query?.id) {
            res.json(await Product.findOne({ _id: req.query.id }));
        } else {
            res.json(await Product.find());
        }
    }

    // Add/create product to DataBase @ pages/products/new.js
    if (method === 'POST') {
        const {title,description,price, images, category} = req.body;

        const productDoc = await Product.create({
            title, description, price, images, category,
        })
        res.json(productDoc);
    }

    // update the product
    if (method === 'PUT') {
        const {title, description, price, images, _id, category} = req.body;

        await Product.updateOne({ _id }, {title, description, price, images, category}); //name of property is the same as name of variable ie use name only
        res.json(true);
    }

    // delete the product
    if (method === 'DELETE') {
        if (req.query?.id) {
            await Product.deleteOne({ _id: req.query.id });
            res.json(true);
        }
    }
}