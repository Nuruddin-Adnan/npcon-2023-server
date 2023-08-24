import { Schema, model } from 'mongoose';
import { paymentMethod, purpose, status } from './registration.constant';
import { IRegistration, IRegistrationModel } from './registration.interface';

const registrationSchema = new Schema<IRegistration, IRegistrationModel>(
  {
    name: {
      type: String,
      required: true,
    },
    designation: { type: String },
    hospital: { type: String },
    emailAddress: { type: String, unique: true },
    phoneNumber: { type: String, unique: true },
    amount: { type: Number, required: true },
    purpose: {
      type: [
        {
          type: String,
          required: true,
          enum: {
            values: purpose,
            message: 'Purpose can not be `{VALUE}`',
          },
        },
      ],
    },
    paymentMethod: {
      type: String,
      enum: {
        values: paymentMethod,
        message: 'Payment method can be `{VALUE}`',
      },
    },
    bkashNumber: { type: String },
    note: { type: String },
    status: {
      type: String,
      enum: {
        values: status,
        message: 'Status  can be `{VALUE}`',
      },
      default: 'notApproved',
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

export const Registration = model<IRegistration, IRegistrationModel>(
  'Registration',
  registrationSchema,
);
