import React from 'react'
import { useLoaderData } from 'react-router-dom'

const ShowRecipe = () => {
    const recipe = useLoaderData()

    return (
        <div className="recipe-details">

            <img
                src={`http://localhost:5000/images/${recipe.coverImage}`}
                alt={recipe.title}
                className="recipe-image"
            />

            <h1>{recipe.title}</h1>

            <p className="recipe-time">
                ⏱️ {recipe.time}
            </p>

            <h2>Ingredients</h2>
            <ul>
                {recipe.ingredients.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>

            <h2>Instructions</h2>

            {recipe.instructions.split(",").map((step, index) => (
                <p key={index}>
                    <strong>Step {index + 1}:</strong> {step}
                </p>
            ))}

            <h4>Created By</h4>
            <p>@{recipe.createdBy?.email || "Unknown"}</p>

        </div>
    )
}

export default ShowRecipe