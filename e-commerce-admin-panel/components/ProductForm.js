import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import { ReactSortable } from "react-sortablejs";  //Drag and drop feature to sort images

import Spinner from "./Spinner";

export default function ProductForm({ _id, title: existingTitle, description: existingDescription, price: existingPrice, images: existingImages }) {

    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(existingPrice || '');
    const [images, setImages] = useState( existingImages || []);  //display images after each upload action
    const [goToProducts, setGoToProducts] = useState(false);//Redirects back to Products page once a product has been added
    const [isUploading, setIsUploading] = useState(false);   //display Spinner during uploading an image/photo

    const router = useRouter();
    // console.log({_id});

    //This function will create/edit a Product via pages/api/products.js file
    async function saveProduct(event) {
        event.preventDefault(); //Prevents default behaviour of the form which is GET request once we hit SAVE instead of POST
        
        const data = {title, description, price, images};
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

    return (
        <form onSubmit={saveProduct}>

            <label>Product Name</label>
            <input type="text" placeholder="Product Name" value={title}
                onChange={e => setTitle(e.target.value)}
            />

            <label>Add Photo</label>
            <div className="mb-2 flex flex-wrap gap-1">
                <ReactSortable list={images} setList={updateImagesOrder} className="flex flex-wrap gap-1">
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

                <label className="w-24 h-24 flex justify-center cursor-pointer items-center p-2 text-sm text-gray-800 rounded-lg bg-gray-300">
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