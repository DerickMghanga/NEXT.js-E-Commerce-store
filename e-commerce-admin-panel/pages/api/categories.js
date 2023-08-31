import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";

export default async function handle(req, res) {
    const { method } = req;  //Grab the method from the Request
    await mongooseConnect();  //always connect to DB first

    //Fetch categories from Database
    if (method === 'GET') {
        res.json(await Category.find().populate('parent'));
    }

    //add category to DB
    if (method === 'POST') {
        const {name, parentCategory} = req.body;

        const categoryDoc = await Category.create({
            name, 
            parent: parentCategory,
        });

        res.json(categoryDoc);
    }
}