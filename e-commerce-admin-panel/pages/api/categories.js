import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { getServerSession } from "next-auth";
import { authOptions, isAdminRequest } from "./auth/[...nextauth]";

export default async function handle(req, res) {
    const { method } = req;  //Grab the method from the Request
    await mongooseConnect();  //always connect to DB first

    await isAdminRequest(req, res); //checks if its the admin making the request. check(api/auth/[...nextauth].js)

    //Fetch categories from Database
    if (method === 'GET') {
        res.json(await Category.find().populate('parent'));
    }

    //add category to DB
    if (method === 'POST') {
        const {name, parentCategory, properties} = req.body;

        const categoryDoc = await Category.create({
            name, 
            parent:parentCategory || undefined,  // 'undefined' incase we dont have a parent category
            properties,
        });

        res.json(categoryDoc);
    }

    //update (edit) Category
    if (method === 'PUT') {
        const {name, parentCategory, properties, _id} = req.body;

        const categoryDoc = await Category.updateOne({_id} ,{   //use the '_id' to update the specific category
            name, 
            parent: parentCategory || undefined, // 'undefined' incase we dont have a parent category
            properties,
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