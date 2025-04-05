    import mongoose from "mongoose";
    import bcrypt from "bcryptjs";

    const userSchema = new mongoose.Schema({
        name: {
            type: String,
            requried: [true, "name is requried"],

        },
        email: {
            type: String,
            required: [true, "Please enter your email"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Please enter your password"],
        },
        role: {
            type: String,
            enum: ["renter", "admin"],
            default: "renter",
        },
        rentedCars: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Car",
            },
        ],
    }, { timestamps: true });

    userSchema.pre("save", async function (next) {
        if (!this.isModified("password")) return next();
        this.password = await bcrypt.hash(this.password, 10);
        next();
    });

    // Compare password during login
    userSchema.methods.matchPassword = async function (enteredPassword) {
        return await bcrypt.compare(enteredPassword, this.password);
    };


    const User = mongoose.model("User", userSchema)
    export default User;
