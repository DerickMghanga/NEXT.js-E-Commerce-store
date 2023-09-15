import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { ReactSortable } from "react-sortablejs";  //Drag and drop feature to sort images

import Spinner from "./Spinner";

export default function ProductForm({ _id, title: existingTitle, description: existingDescription, price: existingPrice, images: existingImages, category: assignedCategory, properties: assignedProperties }) {

    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [category, setCategory] = useState(assignedCategory || '');   //set category for each product added
    const [productProperties, setProductProperties] = useState(assignedProperties || {});  //add properties to a product
    const [price, setPrice] = useState(existingPrice || '');
    const [images, setImages] = useState( existingImages || []);  //display images after each upload action
    const [goToProducts, setGoToProducts] = useState(false);//Redirects back to Products page once a product has been added
    const [isUploading, setIsUploading] = useState(false);   //display Spinner during uploading an image/photo
    const [categories, setCategories] = useState([]);  //categories from api. Display of the select box

    const router = useRouter();
    // console.log({_id});

    //fetch all categories once this component mounts
    useEffect(() => {
        axios.get('/api/categories').then( result => {
            setCategories(result.data);
        })
    }, []);

    //This function will create/edit a Product via pages/api/products.js file
    async function saveProduct(event) {
        event.preventDefault(); //Prevents default behaviour of the form which is GET request once we hit SAVE instead of POST
        
        const data = {
            title,
            description,
            price,
            images,
            category,
            properties: productProperties
        };

        if(_id) {
            //update product the correct product (filter) by the _id. (edit product page) 
            await axios.put('/api/products', {...data, _id});   //api end-point
        } else {
            //create product
            await axios.post('/api/products', data); //api end-point
        }
        setGoToProducts(true);
    }

    if (goToProducts) {
        router.push('/products'); //Redirects back to products page once a product is added
    }

    async function uploadImages(event) {
        // console.log(event);
        const files = event.target?.files;
        if (files?.length > 0) {   //If the files exist in the console(either undefined or null)
            setIsUploading(true);   //display the spinner during upload

            const data = new FormData();
            for (const file of files) {
                data.append('file', file);
            }

            const res = await axios.post('/api/upload', data); //api end-point
            // console.log(res.data);  //from /api/upload.js ( 'return res.json({ links });' )

            setImages(oldImages => {   //add new images and previously added images to the images array
                return [...oldImages, ...res.data.links];  // 'links' from res.data  >>> upload.js
            });

            setIsUploading(false);  //Not display the spinner after upload
        }
    }

    function updateImagesOrder(images) {
        // console.log(images);
        setImages(images);
    }

    function setProductProp(propName, value) {   //key and value pair
        setProductProperties((prev) => {
            const newProductProps = {...prev};
            newProductProps[propName] = value;
            return newProductProps;
        })
    }

    //fetch selected category info from categories list using the '_id'. check categories select value >> option value
    const propertiesToFill = [];   //properties to add in a product ie Each category has its properties (mobile >>> storage (GB) >>> 64 , 128 ...)
    if (categories.length > 0 && category) {
        let CategoryInfo = categories.find(({_id}) => _id === category);
        // console.log({CategoryInfo});
        propertiesToFill.push(...CategoryInfo.properties);

        //incase a category has parent category, then display parent category properties instead
        while (CategoryInfo?.parent?._id) {
            const parentCategoryInfo = categories.find(({_id}) => _id === CategoryInfo?.parent?._id)
            propertiesToFill.push(...parentCategoryInfo.properties);
            CategoryInfo = parentCategoryInfo;  //loop again to check if the parent also has a parent
        }
        
    }

    return (
        <form onSubmit={saveProduct}>

            <label>Product Name</label>
            <input type="text" placeholder="Product Name" value={title}
                onChange={e => setTitle(e.target.value)}
            />

            {/* Add Product Category */}
            <label>Category</label>
            <select value={category} onChange={(e)=> setCategory(e.target.value)}>
                <option value="">Un-Categorised</option>
                {categories.length > 0 && categories.map(category => (
                    <option value={category._id}>{category.name}</option>
                ))}
            </select>

            {/* Display properties for any Category selected( parent or child )*/}
            {propertiesToFill.length > 0 && propertiesToFill.map((p) => (
                <div className="flex gap-2">
                    <div>{p.name[0].toUpperCase()+p.name.substring(1)}</div>

                    <div>
                        <select value={productProperties[p.name]}
                            onChange={(e) => setProductProp(p.name, e.target.value)} 
                        >
                            {p.values.map( v => (
                                <option value={v}>{v}</option>
                            ))}
                        </select>
                    </div>
                    
                </div>
            ))}


            <label>Add Photo</label>
            <div className="mb-2 flex flex-wrap gap-1">
                <ReactSortable list={images} setList={updateImagesOrder} className="flex flex-wrap gap-2">
                {/* Display images after each upload */}
                {!!images?.length && images.map(link => (  //use "!!" to change to boolean
                    <div key={link} className="h-24">
                        <img src={link} alt="product images" className="rounded-lg"/>
                    </div>
                ))}
                </ReactSortable>


                {/* Display during upload */}
                {isUploading && (
                    <div className="h-24 p-1 flex items-center">
                        <Spinner />
                    </div>
                )}

                <label className="w-24 h-24 flex justify-center cursor-pointer items-center p-2 text-sm text-gray-800 rounded-lg bg-gray-400 border border-gray-300 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                    Upload
                    <input type="file" onChange={uploadImages} className="hidden"/>
                </label>
            </div>

            <label>Product Description</label>
            <textarea placeholder="Product Description" value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <label>Product Price(in KES)</label>
            <input type="number" placeholder="Product Price" value={price}
                onChange={(e) => setPrice(e.target.value)}
            />

            <button type="submit" className="btn-primary">SAVE</button>
        </form>
    );
}