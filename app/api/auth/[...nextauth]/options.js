import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
export const options={
    
    providers:[
        GitHubProvider({
            profile(profile){
               
                let userRole="GitHub User"
                
                return{
                    ...profile,
                    role:userRole
                }
            },
            
            clientId:process.env.GITHUB_ID,
            clientSecret:process.env.GITHUB_secret,
            
        }),
       GoogleProvider({
        
            profile(profile){
                let userRole="google"
                if(profile?.email=="admin@gmail.com"){
                    
                    userRole="admin"
                    console.log("abcd",userRole);
                }
                console.log(userRole,'role user')
                
                return{
                    ...profile,
                    id:profile.sub,
                    role:userRole,
                    
                }
            },
            clientId:process.env.GOOGLE_ID,
            clientSecret:process.env.GOOGLE_Secret
        })
    ],
    
    callbacks:{
        async jwt({token,user}){
           
            if(user) token.role=user.role
            return token
        },
        async session({session,token}){
            if(session?.user) session.user.role=token.role
            return session
        }
    }
}