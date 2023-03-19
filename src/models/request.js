import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
    sender: {
        type: Object,
    
        required: true,
    },
    receiver: {
        type: Object,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending",
    },
});

 const Request = mongoose.models.request || mongoose.model("request", requestSchema);
 export default Request;