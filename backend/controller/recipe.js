const Recipes=require("../models/recipe")
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

const getRecipes=async(req,res)=>{
    const recipes=await Recipes.find();
    return res.json(recipes)
    
}
const getRecipe=async(req,res)=>{
    const recipe=await Recipes.findById(req.params.id)
    return res.json(recipe)
}
const addRecipe = async (req, res) => {
    try {
        console.log("BODY:", req.body);
        console.log("FILE:", req.file);
        console.log("USER:", req.user);

        const { title, ingredients, instructions, time } = req.body;

        if (!title || !instructions || !ingredients) {
            return res.status(400).json({
                message: "Required fields can't be empty"
            });
        }

        const newRecipe = await Recipes.create({
            title,
            ingredients,
            instructions,
            time,
            coverImage: req.file ? req.file.filename : "",
            createdBy: req.user.id
        });

        return res.status(201).json(newRecipe);
    } catch (err) {
        console.log("ADD RECIPE ERROR:", err.message);
        return res.status(500).json({ message: err.message });
    }
};
    const editRecipe=async(req,res)=>{
        const {title,ingredients,instructions,time}=req.body
        let recipe=await Recipes.findById(req.params.id)
        try{
            if(recipe){
                await Recipes.findByIdAndUpdate(req.params.id,{...req.body,coverImage:req.file.filename},{new:true})
                return res.json({title,ingredients,instructions,time})
            }

        }
        catch(err){
            return res.status(404).json({message:"errorrrrr"})
        }
        
    }
const deleteRecipe=async(req,res)=>{
   try{
    await Recipes.deleteOne({_id:req.params.id})
    return res.json({message:"Recipe Deleted"})

   }
   catch(err){
    return res.status(400).json({message:"Error"})

   }
}

module.exports={getRecipes,getRecipe,editRecipe,addRecipe,deleteRecipe,upload}