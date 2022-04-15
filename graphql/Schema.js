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
        Id:Strings!
        avartImage:String!
    }
    type RootMutation {
        update_Profile_Picture(update_picture:pictureUpdate): Users!
    }
    
    schema {
        query: RootQuery
    }   
`
)