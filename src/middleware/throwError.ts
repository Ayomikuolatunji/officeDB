import Error from "../interface/errorInterface";

export const throwError= (errorMsg:string,statusCode:number) => {
    const error:Error=new Error(errorMsg)
    error.statusCode=statusCode
    throw error
}