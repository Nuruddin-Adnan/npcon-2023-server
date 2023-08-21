import { Schema, model } from 'mongoose';
import { paymentMethod, purpose } from './registration.constant';
import { IRegistration } from './registration.interface';

const registrationSchema = new Schema<IRegistration>(
  {
    name: {
      type: String,
      required: true,
    },
    designation: { type: String },
    hospital: { type: String },
    emailAddress: { type: String },
    phoneNumber: { type: String },
    amount: { type: Number },
    purpose: [
      {
        type: String,
        enum: {
          values: purpose,
          message: 'Purpose can be `{VALUE}`',
          default: 'conference',
        },
      },
    ],
    paymentMethod: {
      type: String,
      enum: {
        values: paymentMethod,
        message: 'Payment method can be `{VALUE}`',
      },
    },
    receivedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Registration = model<IRegistration>(
  'Registration',
  registrationSchema,
);
