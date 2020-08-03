const Sequelize = require('sequelize')

const db = new Sequelize('postgres://tkkxpeeezvwqon:813ed6cb8145a3bdfc49bae2535a2c2d2c94bac144633a2174c1bf5f480b6a08@ec2-176-34-97-213.eu-west-1.compute.amazonaws.com:5432/dbvinueti3asol', {
    dialect: 'postgres',
    protocol: "postgres",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        },
    }
})

module.exports = db