import React from 'react'
import "./App.css"
import {createBrowserRouter,Router,RouterProvider} from "react-router-dom"
import Home from "./pages/Home"
import MainNavigation from "./components/MainNavigation"
import axios from "axios"
import AddFoodRecipe from './pages/AddFoodRecipe'
import EditRecipe from './pages/EditRecipe'
import ShowRecipe from './pages/ShowRecipe'


const getAllRecipies=async()=>{
    let allRecipies=[]
    const res=await axios.get(`${import.meta.env.VITE_API_URL}/recipe/`)
    allRecipies=res.data 
    return allRecipies
}
const getMyRecipies=async()=>{
  let user=JSON.parse(localStorage.getItem("user"))
  let allRecipies=await getAllRecipies()
  return allRecipies.filter(item=>item.createdBy===user._id)

}
const getFavRecipes=()=>{
  return JSON.parse(localStorage.getItem("fav"))
}

const getRecipeById=async({params})=>{
  const res=await axios.get(`${import.meta.env.VITE_API_URL}/recipe/${params.id}`)
  let recipe=res.data;
  return recipe

}



const App = () => {
  const router=createBrowserRouter([{
    path:"/",
    element:<MainNavigation/>,
    children:[
    {
      path:"/",
      element:<Home/>,loader:getAllRecipies

    },
    {
      path:"/myRecipe",
      element:<Home/>,
      loader:getMyRecipies
    },
    {
      path:"/favRecipe",
      element:<Home/>,
      loader:getFavRecipes

    },
    {
      path:"/addRecipe",
      element:<AddFoodRecipe/>
    },
    {
      path:"/editRecipe/:id",
      element:<EditRecipe/>
    },
    {
      path:"/recipe/:id",
      element:<ShowRecipe/>,
      loader:getRecipeById
    }
  ]
}
])

  

  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
      
    </div>
  )
}

export default App
