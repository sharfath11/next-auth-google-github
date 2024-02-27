import { cache } from "react";
import { DbConnect } from "../DbConnect";
import ProductModel, { Product } from "../ProductModels";
export const revalidate=3000
const getLatest=cache(async()=>{
   await DbConnect()
   const products=await ProductModel.find({})
   //latest porduct 1st varan
   .sort({_id:-1})
   .limit(4)
   //data base resultne result convert plane javascriptnn
   .lean()
    return products as Product[]
})
const getFeatured=cache(async()=>{
    await DbConnect()
    const products=await ProductModel.find({isFeatured:true}).limit(3).lean()
    // console.log("featured",products)
     return products as Product[]
 })
const getBySlug=cache(async(slug:string)=>{
    await DbConnect()
    // console.log("jj",replacedSlug)
    
    const products=await ProductModel.findOne({slug}).lean()
     return products as Product
 })
const productService={
    getLatest,
    getFeatured,
    getBySlug
}
export default productService