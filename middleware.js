import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
export default withAuth(
    console.log("fdsghkhhhhhhhh"),
    function middleware(req){
        console.log(req.nextUrl.pathname);
        console.log("tokeRole",req.nextauth.token.role);
        if(req.nextUrl.pathname.startsWith("/admin")&&req.nextauth.token.role !="admin"){
            return NextResponse.rewrite(new URL("/Denaied",req.url))
        }
    },{
    callbacks:{
        authorized:({token})=> !!token
    }
}
)
export const config={matcher:['/cart']}