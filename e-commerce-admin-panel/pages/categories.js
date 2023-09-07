import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";

import { withSwal } from "react-sweetalert2";  //alert box before deleting

function Categories({swal}) {

    const [editingCategory, setEditingCategory] = useState(null)  //show when editing
    const [name, setName] = useState('');
    const [parentCategory, setParentCategory] = useState('');
    const [categories, setCategories] = useState('');
    const [properties, setProperties] = useState([]);

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

        const data = {
            name,
            parentCategory,
            properties: properties.map(p => ({
                name: p.name,
                values: p.values.split(',')  //split the Values for easy to read in the console
            }))

        }; // grab as object from category form

        if (editingCategory) {   //check if we are in editing mode using 'editingCategory' state
            data._id = editingCategory._id; //add '_id' of the Category to the data
            await axios.put('/api/categories', data);
            setEditingCategory(null);   //disable edit mode after editing the category
        } else {
            await axios.post('/api/categories', data); //add name & parent category incase of child category
        }

        setName(''); //make input empty after saving the name
        setParentCategory('');
        setProperties([]);
        fetchCategories();  //Re-fetch categories and display after saving/updating a category
    }

    //Display while Editing Category 
    function editCategory(category) {
        setEditingCategory(category);  //displays label with category name while editing
        setName(category.name);   //displays category name while editing. 'form > input'
        setParentCategory(category.parent?._id); //displays parent category name while editing 'form > select'
        setProperties(category.properties.map(({name, values}) => ({ //display current Category properties before editing
                name,
                values: values.join(',')  //convert back to strings from an array from DB
            }))
        ); 
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

    function addProperty() {
        setProperties(prev => {   //add previous/old properties and new properties to the properties array
            return [...prev, {name:'', values:''}]
        })
    }

    //enables adding/editing/update of a property name
    function handlePropertyNameChange(index, property, newName) {  //newName = e.target.value
        // console.log({index, property, newName});
        setProperties((prev) => {
            const properties = [...prev];   //make a clone of the previous properties
            properties[index].name = newName;
            return properties;
        });
    }

    //enables adding/editing/update of a property values
    function handlePropertyValueChange(index, property, newValues) {  //newValue = e.target.values
        setProperties((prev) => {
            const properties = [...prev];   //make a clone of the previous properties
            properties[index].values = newValues;
            return properties;
        });
    }

    // Remove/delete a property usign the index
    function removeProperty(indexToRemove) {
        setProperties(prev => {
            return [...prev].filter((p, pIndex) => {
                return pIndex !== indexToRemove;
            });
        });
    }

    return(
        <Layout>
            <h1>Categories</h1>
            <label> {editingCategory ? `Edit Category: "${editingCategory.name}"` : 'Create New Category'} </label>

            {/* Add New Category section */}
            <form onSubmit={saveCategory} >
                <div className="flex gap-1">
                    <input type="text" placeholder="Category name" 
                        value={name}  onChange={(e)=> setName(e.target.value)}
                    />

                    {/* Select Box to select Parent Category */}
                    <select value={parentCategory}
                        onChange={(e) => setParentCategory(e.target.value)}
                    >
                        <option value=''>No Parent Category</option>
                        {categories.length > 0 && categories.map(category => (
                            <option value={category._id}>{category.name}</option>
                        ))}
                    </select>
                </div>

                {/* Add Properties ie color, screen size, RAM */}
                <div>
                    <label className="block">Properties</label>

                    <button type="button" onClick={addProperty} className="btn-default text-sm">
                        Add New Property
                    </button>

                    {properties.length > 0 && properties.map((property, index) => (
                        <div className="flex gap-1">
                            <input type="text" value={property.name}
                                // change specific previous name to new name using 'index'
                                onChange={(e) => handlePropertyNameChange(index, property, e.target.value)}
                                placeholder="property name (example: color)"
                            />

                            <input type="text" value={property.values}
                                // change specific previous value to new name using 'index'
                                onChange={(e) => handlePropertyValueChange(index, property, e.target.value)}
                                placeholder="values, comma separated"
                            />

                            <button className="btn-red text-sm" type="button"
                                onClick={() => removeProperty(index)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}

                </div>

                <div className="flex gap-1">
                    {/* CANCEL BUTTON */}
                    {editingCategory && (   //Cancel Editing and clear the Form
                        <button type="button" className="btn-default p-3"
                        onClick={() => {
                            setEditingCategory(null);
                            setName('');
                            setParentCategory('');
                            setProperties([]);
                        }}
                    >
                        CANCEL
                    </button>
                    )}

                    <button type="submit" className="btn-primary">SAVE</button>
                </div>

            </form>

            {/* Categories Table to dissappear when editing a category and appear if we aren't */}
            {!editingCategory && (
                <table className="basic mt-3">
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

                                    <button className="btn-red"
                                        onClick={() => deleteCategory(category)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
               
        </Layout>
    );
}


//alert when Delete category button is clicked using 'swal prop injected' from React Sweet alert
export default withSwal(({swal}, ref) => (
    <Categories swal={swal} />
));