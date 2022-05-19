
import buildSchema from "./Schema"
import resolver  from "./Resolver"

// interface graphqlInterface {
//     originalError: any
//     message: string
//     err:{
//         originalError:{
//             message:string
//         },
//         message:string,
//     }
// }

const graphql=()=>{
    return {
        schema: buildSchema,
        rootValue: resolver,
        graphiql: true,
        customFormatErrorFn(err:any) {
          if (!err.originalError) {
            return err;
          }
          const data = err.originalError.message;
          const message = err.message || 'An error occurred.';
          const code = err.originalError.message || 500;
          return { message: message, status: code, data: data };
        }
      }
}

export default graphql