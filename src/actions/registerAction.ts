'use server'

export interface registerBody {
    name:string,
    email:string,
    password:string,
    rePassword:string,
    phone:string
}

export async function signUpAction(values:registerBody) {
    try{

        const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signup' , {
            method:'POST' , 
            body:JSON.stringify(values) , 
            headers :{
                "Content-Type" : "application/json"
            }
        })
        const data = await response.json() 
        
        return data ; 
    }catch (err){
        throw err
    }
}