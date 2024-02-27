//user cart store
import { create } from "zustand";
import { round2 } from "../utils";
import { OrderItem } from "../orderModel";
import { persist } from 'zustand/middleware'


type Cart={
    items:OrderItem[]
    itemsPrice:number
    taxPrice:number
    shipingPrice:number
    totelPrice:number
}

const initialState : Cart={
    items:[],
    itemsPrice:0,
    taxPrice:0,
    shipingPrice:0,
    totelPrice:0
}
//kuarch kayanjitt cheyya
export const cartStore=create<Cart>(()=>initialState)
export default function userCartSevice(){
    const {
        items,itemsPrice,taxPrice,shipingPrice,totelPrice
    }=cartStore()
    return{
        items,
        itemsPrice,
        taxPrice,
        shipingPrice,
        totelPrice,
        increase: (item:OrderItem)=>{
            const exist=items.find((x)=>x.slug===item.slug)
            const updateCartItems=exist
            ? items.map((x)=>
                x.slug===item.slug ?{...exist,qty:exist.qty+1}:x
            //    { if(x.slug===item.slug){
            //         action==="cartPriceTotel"?{...exist,itemsPrice:exist.price+exist.price}:x
            //     }
            // }
                
                
            )
            :[...items,{...item,qty:1}]
            // const { items,itemPrice,taxPrice,shipingPraice,totelPrice}=calcPrice(updateCartItem)
            const {itemsPrice,shipingPrice,taxPrice,totelPrice}=
            calcPrice(updateCartItems)
            cartStore.setState({
                items:updateCartItems,
                itemsPrice,
                shipingPrice,
                taxPrice,
                totelPrice
            })
        },
        decrease:(item:OrderItem)=>{
            const exist=items.find((x)=>x.slug===item.slug)
            if(!exist)return
            const updateCartItems=
            exist.qty===1 ?
            items.filter((x:OrderItem)=>x.slug!==item.slug):
            items.map((x)=>(
            item.slug ?
            {...exist,qty:exist.qty-1}:x)
            )
            const {itemsPrice,shipingPrice,taxPrice,totelPrice}=
            calcPrice(updateCartItems)
            cartStore.setState({
                items:updateCartItems,
                itemsPrice,
                shipingPrice,
                taxPrice,
                totelPrice
            })
        }
        
    }
}
const calcPrice=(items:OrderItem[])=>{

    const itemsPrice=round2(
        items.reduce((acc,item)=>acc+item.price*item.qty,0)
    ),
    //shipping praice we can decided
    shipingPrice=round2(itemsPrice>100 ? 0:100),
    //njan kodthath 0.15% ann
    taxPrice=round2(Number(0.15 + itemsPrice)),
    totelPrice=round2(itemsPrice+shipingPrice+taxPrice)
    return{itemsPrice,shipingPrice,taxPrice,totelPrice}

}