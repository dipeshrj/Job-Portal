import mongoose from "mongoose";

// create rule
const jobSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 55,
        trim:true
    },
    company: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 55,
        trim:true
    },
     description: {
        type: String,
        required: true,
        minlength: 20,
        maxlength: 300,
        trim:true
    },
    salary: {
        type: Number,
        min:0,
        required:true
    },
    quantity: {
        type: Number,
        min:0,
        required:true
    },
    providerId: {
        type: mongoose.ObjectId,
        ref:"User"
    },
    category: {
        type: String,
        required: true,
        trim: true,
        enum:["teaching",
            "medical",
            "IT",
            "finance",
            "sales",
            "marketing",
            "transport",
            "hotel",
            "services",
            "maintenance",
        ]
    },
    validDate: {
        type: Date,
        required: true
    }
})

// create table
export const Job =mongoose.model("Job",jobSchema)