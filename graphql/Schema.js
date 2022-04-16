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
        username:String!
        avatarImageSet:Boolean!
    }
    input usernameUpdate {
        username:String!
    }
    type RootMutation {
        update_Profile_Picture(id:ID!,update_picture:pictureUpdate): Users!
        update_profile_name(id:ID!,update_picture:usernameUpdate): Users!
    }
    
    schema {
        query: RootQuery
        mutation : RootMutation
    }   
`
)