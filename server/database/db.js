import mongoose from "mongoose" ;

const Connection = async (username, password) => {
    const URL = `mongodb+srv://${username}:${password}@cluster0.kpn8ome.mongodb.net/?retryWrites=true&w=majority`
    try {
        await mongoose.connect(URL, { useNewUrlParser: true});
        console.log("Database connected!");

    } catch(error) {
        console.log("Error connecting to DB", error);


    }
}

export default Connection;