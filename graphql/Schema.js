var { buildSchema } = require('graphql');


module.exports=buildSchema(`
    
    type Users {
        _id:ID!
        email:String!
        username:String!
        password:String! 
        avatarImageSet: Boolean!   
        avartImage:String!
    }

    type RootQuery {
        name: String!
        int:Int!
    }

    input pictureUpdate{
        key:String!
        data:String!
    }
    input usernameUpdate {
        username:String!
    }
    input roleUpdate {
        role: String!
    }
    type RootMutation {
        update_Profile_Picture(id:ID!,update_picture:pictureUpdate): Users!
        update_Profile_Username(id:ID!,update_username:usernameUpdate): Users!
        update_Employee_Role(id:ID!,role_update:roleUpdate): Users!
    }
    
    schema {
        query: RootQuery
        mutation : RootMutation
    }   
`
)