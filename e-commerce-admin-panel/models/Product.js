//Used for MongoDB database via mongoose
import mongoose, { model, models, Schema } from "mongoose";

const ProductSchema = new Schema({
    title: { type: String, required: true },
    description: String ,
    price: { type: Number, required: true },
    images: [{type: String}],  //image links as array of Strings from AWS S3 Bucket
    category: {type: mongoose.Types.ObjectId, ref:'Category'},
    properties: {type: Object},
});

export const Product = models?.Product || model('Product', ProductSchema);