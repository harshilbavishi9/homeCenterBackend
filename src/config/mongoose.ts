import { connect } from "mongoose";

let DATABASE = process.env.DBURL || "mongodb+srv://harshil97:icb1HIh2xIOI5dO2@cluster0.1qoanql.mongodb.net/?retryWrites=true&w=majority"

function connects() {
    return connect(DATABASE, { retryWrites: true, w: 'majority' })
        .then(() => {
            console.log("Database Connected !!")
        })
        .catch((error) => {
            console.log("Database Not Connected", error)
        });
}

export default connects;
