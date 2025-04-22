import { Schema, model, models, Types, Document } from "mongoose";

// objects
import { IUser } from "./User"

export interface IAgentApplication extends Document {
    idCard: string;
    video: string;
    status: 'pending' | 'approved' | 'rejected';
    user: IUser["_id"],
}

const agentAppSchema = new Schema<IAgentApplication>({
    user: {
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    },
    idCard: {
        type: String,
        required: true,
    },
    video: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
    },
}, {
    timestamps: true,
});

const AgentApplication = models.AgentApplication || model<IAgentApplication>("AgentApplication", agentAppSchema);

export default AgentApplication;
