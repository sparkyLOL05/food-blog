import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function EditRecipe() {
    const [recipeData, setRecipeData] = useState({
        title: "",
        time: "",
        ingredients: "",
        instructions: "",
        file: null
    })
    const navigate = useNavigate()
    const {id}=useParams()
    useEffect(()=>{
        const getData=async()=>{
            let resp=await axios.get(`${import.meta.env.VITE_API_URL}/recipe/${id}`)
            let res=resp.data
            setRecipeData({
                title:res.title,
                ingredients:res.ingredients.join(","),
                instructions:res.instructions,
                time:res.time
            })

        }
        getData();

    },[])
    const onHandleChange = (e) => {
        let val=(e.target.name==="ingredients")?e.target.value.split(",") : (e.target.name==="file")? e.target.files[0]:e.target.value 
        setRecipeData(pre=>({...pre,[e.target.name]:val}))
    }
    const onHandleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("title", recipeData.title);
        formData.append("time", recipeData.time);
        formData.append("ingredients", recipeData.ingredients);
        formData.append("instructions", recipeData.instructions);

        if (recipeData.file) {
            formData.append("file", recipeData.file);
        }

        try {
            const res = await axios.put(
            `${import.meta.env.VITE_API_URL}/recipe/${id}`,
            formData,
            {
                headers: {
                authorization: "bearer " + localStorage.getItem("token")
                }
            }
            );

            console.log("Recipe edited:", res.data);
            navigate("/");
        } catch (err) {
            console.log("Axios error:", err.response?.data || err.message);
        }
    };
    return (
        <>
            <div className='container'>
                <form className='form' onSubmit={onHandleSubmit}>
                    <div className='form-control'>
                        <label>Title</label>
                        <input type="text" className='input' name="title" onChange={onHandleChange}value={recipeData.title}></input>
                    </div>
                    <div className='form-control'>
                        <label>Time</label>
                        <input type="text" className='input' name="time" onChange={onHandleChange}value={recipeData.time}></input>
                    </div>
                    <div className='form-control'>
                        <label>Ingredients</label>
                        <textarea type="text" className='input-textarea' name="ingredients" rows="5" onChange={onHandleChange}value={recipeData.ingredients}></textarea>
                    </div>
                    <div className='form-control'>
                        <label>Instructions</label>
                        <textarea type="text" className='input-textarea' name="instructions" rows="5" onChange={onHandleChange}value={recipeData.instructions}></textarea>
                    </div>
                    <div className='form-control'>
                        <label>Recipe Image</label>
                        <input type="file" className='input' name="file" onChange={onHandleChange}></input>
                    </div>
                    <button type="submit">Edit Recipe</button>
                </form>
            </div>
        </>
    )
}