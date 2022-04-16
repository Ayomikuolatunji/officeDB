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
        avartImage:String
        avatarImageSet:Boolean
    }
    type RootMutation {
        update_Profile_Picture(id:ID!,update_picture:pictureUpdate): Users!
    }
    
    schema {
        query: RootQuery
        mutation : RootMutation
    }   
`
)