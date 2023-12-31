import mongoose, { Schema, model, models } from 'mongoose';

const CategorySchema = new Schema({
    name: {type:String, required:true},
    parent: {type: mongoose.Types.ObjectId, ref:'Category'}, //Not required. (Not a MUST)
    properties: [{type:Object,}]  //as an array of Objects
}); 

export const Category = models?.Category || model('Category', CategorySchema);