import { NextRequest, NextResponse } from "next/server";
import data from "../../../lib/models/data";
import {DbConnect} from "../../../lib/models/DbConnect";
import UserModel from "../../../lib/models/UserModels";
import ProductModel from "../../../lib/models/ProductModels";
export const GET=async(req:NextRequest)=>{
    const {users,products}=data
    await DbConnect()
    await UserModel.deleteMany()
    await UserModel.insertMany(users)

    await ProductModel.deleteMany()
    await ProductModel.insertMany(products)
    return NextResponse.json({
        msg:"seeded success",
        users,
        products
    })
}