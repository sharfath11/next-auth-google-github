"use client"

import userCartSevice from "../../lib/models/hooks/userCartStore"
import Link from "next/link"
import React,{useState,useEffect} from "react"



const Menu  = ()=>{
    const {items}=userCartSevice()
    const [mounted,setMounted]=useState(false)
    
    useEffect(()=>{
        setMounted(true)
    },[])
    
    return <div>
        <div>
            <ul className="flex items-stretch">
                <li>
                    <Link className="btn btn-ghost rounded-btn" href="/cart">
                        Cart
                        {
                            mounted && items.length !==0 && (
                                <div className="badge badge-secondary">
                                    {items.reduce((a,c)=>a+c.qty,0)}{""}
                                </div>
                            )
                        }
                    </Link>

                </li>
            </ul>
        </div>
    </div>
}
export default Menu