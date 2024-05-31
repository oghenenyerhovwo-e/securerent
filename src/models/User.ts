import { Schema, models, model, Document } from "mongoose";

export interface IUser extends Document  {
    fullName: string,
    email: string,
    password: string,
    profilePic: string,
    isVerified: boolean,
    role: string,
    agentApplicationIdCard: string,
    agentApplicationVideo: string,
    agentApplicationStatus: string,
    agentApplicationFeedback: string,
}

const userSchema = new Schema<IUser>({
    fullName: {
        type: String,
        required: [true, "Please provide a name"],
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    profilePic: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        default: "regular",
        enum: ["regular", "agent", "admin"]
    },
    agentApplicationIdCard: {
        type: String,
    },
    agentApplicationVideo: {
        type: String,
    },
    agentApplicationStatus: {
        type: String,
        default: "pending",
        enum: ["rejected", "accepted", "pending"]
    },
    agentApplicationFeedback: {
        type: String,
    },
},{
    timestamps: true,
})

const User = models.User || model<IUser>("User", userSchema);

export default User;