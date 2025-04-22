import { Schema, model, models, Types, Document } from "mongoose";

// objects
import { IUser } from "./User";
import { IListing } from "./Listing";

export interface IAppointment extends Document {
  user: IUser["_id"],
  date: Date;
  listing: IListing["_id"],
  status: 'pending' | 'approved' | 'rejected';
}

const appointmentSchema = new Schema<IAppointment>({
  user: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  },
  listing: {
    type: Types.ObjectId,
    ref: 'Listing',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    default: 'pending',
    enum: ['pending', 'approved', 'rejected'],
  },
}, {
  timestamps: true,
});

const Appointment = models.Appointment || model<IAppointment>("Appointment", appointmentSchema);

export default Appointment;
