const express = require("express")
const mongoose = require("mongoose");
const authRouter = require("./routes/authRoutes")
const productRouter = require("./routes/productRoutes")
const productCategoryRoutes = require("./routes/productCategoryRoutes")
const blogCategoryRoutes= require('./routes/blogCategoryRoutes')
const blogRouter = require("./routes/blogRoutes")
const uploadRouter = require("./routes/uploadRoute")
const brandRouter = require("./routes/brandRoutes")
const colorRouter = require("./routes/colorRoutes")
const connectDB = require("./config/dbConnect");
const cors = require('cors');
const app = express()
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser");
dotenv.config()
const PORT = process.env.PORT || 4000
connectDB()

app.use(cors());
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use("/api/products",productRouter)
app.use("/api/users",authRouter)
app.use("/api/blogs",blogRouter)
app.use("/api/brand",brandRouter)
app.use("/api/color",colorRouter)
app.use("/api/productcategory",productCategoryRoutes)
app.use("/api/blogcategory",blogCategoryRoutes)
app.use("/api/upload",uploadRouter)

app.get("/",(req,res)=>{
    res.send("api is running")
});
app.listen(PORT, ()=>{
    console.log(`Server is running at ${PORT}`)
})
