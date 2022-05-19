
class BaseError extends Error {
    
    constructor (public name:string, public statusCode:number, public isOperational:string, public description:string) {
    super(description)
   
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = name
    this.statusCode = statusCode
    this.isOperational = isOperational
    Error.captureStackTrace(this)
    }
   }
   
   export default BaseError