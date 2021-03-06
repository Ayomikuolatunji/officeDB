"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
exports.default = (0, graphql_1.buildSchema)(`
    
    type Users {
        _id:ID!
        email:String!
        username:String!
        password:String! 
        avatarImageSet: Boolean!   
        avartImage:String!
        role:String!
        about:String!
        location:String!
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

    input updateLocation {
        location:String!
    }

    type RootMutation {
        update_Profile_Picture(id:ID!,update_picture:pictureUpdate): Users!
        update_Profile_Username(id:ID!,update_username:usernameUpdate): Users!
        update_Employee_Role(id:ID!,role_update:roleUpdate): Users!
        update_Employee_Email(id:ID!,email_update:emailUpdate): Users!
        update_Employee_About(id:ID!,about_update:aboutUpdate): Users!
        update_Employee_Location(id:ID!,location_update:updateLocation): Users!
    }
    
    schema {
        query: RootQuery
        mutation : RootMutation
    }   
`);
