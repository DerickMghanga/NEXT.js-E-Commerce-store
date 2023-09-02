import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";

import { withSwal } from "react-sweetalert2";  //alert box before deleting

function Categories({swal}) {

    const [editingCategory, setEditingCategory] = useState(null)  //show when editing
    const [name, setName] = useState('');
    const [parentCategory, setParentCategory] = useState('');
    const [categories, setCategories] = useState('');

    // categories display once the component mounts
    useEffect(() => {
       fetchCategories();
    }, []); 

    function fetchCategories() {
        axios.get('/api/categories').then(result => {
            setCategories(result.data);
        });
    }

    // save or edit category
    async function saveCategory(event) {
        event.preventDefault();  //prevents the default of forms which is GET

        const data = {name, parentCategory}; // grab as object from category form

        if (editingCategory) {   //check if we are in editing mode using 'editingCategory' state
            data._id = editingCategory._id; //add '_id' of the Category to the data
            await axios.put('/api/categories', data);
            setEditingCategory(null);   //disable edit mode after editing the category
        } else {
            await axios.post('/api/categories', data); //add name & parent category incase of child category
        }

        setName(''); //make input empty after saving the name
        fetchCategories();  //Re-fetch categories and display after saving/updating a category
    }

    //Display while Editing Category 
    function editCategory(category) {
        setEditingCategory(category);  //displays label with category name while editing
        setName(category.name);   //displays category name while editing. 'form > input'
        setParentCategory(category.parent?._id); //displays parent category name while editing 'form > select'
    }

    //Delete category with alert box for confirmation
    function deleteCategory(category) {
        swal.fire({
            title: 'Delete Category !!',
            text: `Do you want to delete '${category.name}' ?`,
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Yes, Delete!',
            confirmButtonColor: '#d55',
            reverseButtons: true,
            
        }).then( async result => {
            // console.log({result});
            if (result.isConfirmed) {
                const { _id } = category;
                await axios.delete('/api/categories?_id='+_id); //send to api as query
                fetchCategories();
            }
        });
    }

    return(
        <Layout>
            <h1>Categories</h1>
            <label> {editingCategory ? `Edit Category: "${editingCategory.name}"` : 'Create New Category'} </label>

            {/* Add New Category section */}
            <form onSubmit={saveCategory} className="flex gap-1 mb-4">

                <input type="text" placeholder="Category name" 
                    className="mb-0" 
                    value={name}  onChange={(e)=> setName(e.target.value)}
                />

                {/* Select Box to select Parent Category */}
                <select className="mb-0" value={parentCategory}
                    onChange={(e) => setParentCategory(e.target.value)}
                >
                    <option value=''>No Parent Category</option>
                    {categories.length > 0 && categories.map(category => (
                        <option value={category._id}>{category.name}</option>
                    ))}
                </select>

                <button type="submit" className="btn-primary">Save</button>

            </form>


            {/* Display all Categories from DB */}
            <table className="basic">
                <thead>
                    <tr>
                        <td>Category Name</td>
                        <td>Parent Category</td>
                        <td></td>
                    </tr>
                </thead>

                <tbody>
                    {categories.length > 0 && categories.map(category => (
                        <tr>
                            <td>{category.name}</td>
                            <td>{category?.parent?.name}</td>
                            {/* parent category optional >> '?' cant be undefined */}

                            <td className="flex gap-2">
                                <button className="btn-primary"
                                    onClick={() => editCategory(category)} //grab category with its props ie name & parent
                                >
                                    Edit
                                </button>

                                <button className="btn-primary"
                                    onClick={() => deleteCategory(category)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </Layout>
    );
}


//alert when Delete category button is clicked using 'swal prop injected' from React Sweet alert
export default withSwal(({swal}, ref) => (
    <Categories swal={swal} />
));