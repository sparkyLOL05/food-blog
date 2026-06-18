import React,{useState} from 'react'
import { useLoaderData } from 'react-router-dom'
import hero from "../assets/hero.png"
import { IoIosTime } from "react-icons/io";
import { CiHeart } from "react-icons/ci";  
import { FaEdit } from "react-icons/fa"; 
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaHeart } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
const RecipeItems = () => {
    
    const allRecipies=useLoaderData()
    const navigate=useNavigate()
    let path=window.location.pathname==="/myRecipe"?true:false
    let favItems=JSON.parse(localStorage.getItem("fav"))??[]
    const [isFavRecipe,setIsFavRecipe]=useState(false)



    console.log(allRecipies)

    const onDelete=async(id)=>{
        await axios.delete(`${import.meta.env.VITE_API_URL}/recipe/${id}`)
        let filterItem=favItems.filter(recipe=>recipe._id!==id)
        localStorage.setItem("fav",JSON.stringify(filterItem))
        navigate("/myRecipe");

    }
    const favRecipe=(item)=>{
        let filterItem=favItems.filter(recipe=>recipe._id!==item._id)
        favItems=favItems.filter(recipe=>recipe._id===item._id).length===0?[...favItems,item]:filterItem
        localStorage.setItem("fav",JSON.stringify(favItems))
        setIsFavRecipe(pre=>!pre)

    }
  return (
    <div className="card-container">
        {allRecipies?.map((item,index)=>{
            return(
                <div key={index} className='card'>
                    <NavLink to={`/recipe/${item._id}`}><img src={`${import.meta.env.VITE_API_URL}/images/${item.coverImage}`}  height="100px" width="120px" /></NavLink>
                    <div className="card-body">
                        <div className="title">{item.title}</div>
                        <div className="icons">
                            <div className="timer"><IoIosTime />{item.time}</div>

                            {(!path)?<FaHeart onClick={()=>favRecipe(item)}style={{color:(favItems).some(res=>res._id===item._id)?"red":""}} />:
                            <div className="action">
                                <Link to={`/editRecipe/${item._id}`} className='editIcon'><FaEdit /></Link>
                                <MdDelete onClick={()=>onDelete(item._id)} className='deleteIcon' />

                            </div>}
                            
                        </div>
                    </div>


                </div>
            )
        })}
    </div>
  )
}

export default RecipeItems
