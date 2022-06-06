import Error from "../interface/errorInterface";

export const ErrorHandler= (errorMsg:string,statusCode:number) => {
    const error:Error=new Error(errorMsg)
    error.statusCode=404
    throw error
}