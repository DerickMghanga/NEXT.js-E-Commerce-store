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
            parent:parentCategory,
        });

        res.json(categoryDoc);
    }

    //update (edit) Category
    if (method === 'PUT') {
        const {name, parentCategory, _id} = req.body;

        const categoryDoc = await Category.updateOne({_id} ,{   //use the '_id' to update the specific category
            name, 
            parent: parentCategory,
        });

        res.json(categoryDoc);
    }

    //Delete Category
    if (method === 'DELETE') {
        const { _id } = req.query;
        await Category.deleteOne({ _id });
        res.json('ok');
    }
}