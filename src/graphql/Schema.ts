const { buildSchema } = require('graphql');


module.exports=buildSchema(`
    
    type Users {
        _id:ID!
        email:String!
        username:String!
        password:String! 
        avatarImageSet: Boolean!   
        avartImage:String!
        role:String!
        about:String!
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

    input emailUpdate {
        email: String!
    }

    input aboutUpdate {
       about:String!
    }
    type RootMutation {
        update_Profile_Picture(id:ID!,update_picture:pictureUpdate): Users!
        update_Profile_Username(id:ID!,update_username:usernameUpdate): Users!
        update_Employee_Role(id:ID!,role_update:roleUpdate): Users!
        update_Employee_Email(id:ID!,email_update:emailUpdate): Users!
        update_Employeer_About(id:ID!,about_update:aboutUpdate): Users!
    }
    
    schema {
        query: RootQuery
        mutation : RootMutation
    }   
`
)