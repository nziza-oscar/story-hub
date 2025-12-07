require("dotenv").config()
const { Sequelize} = require("sequelize")

const sequelize = new Sequelize(process.env.DATABASE_URL,{
    dialect:"postgres",
    dialectOptions:{
        ssl:{require:true}
    },
    logging:false
});



// const sequelize = new Sequelize(
//     process.env.SQL_DATABASE,
//     process.env.SQL_USERNAME,
//     process.env.SQL_PASSWORD,
    
//     {
//     dialect:"mysql",
//     host: process.env.SQL_HOST,
//     port: process.env.SQL_PORT,
//     logging:false
// });

module.exports=sequelize