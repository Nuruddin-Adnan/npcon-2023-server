/* eslint-disable no-unused-vars */
import { Types } from 'mongoose';

export type IRegistration = {
  _id: Types.ObjectId;
  name: string;
  designation: string;
  hospital: string;
  emailAddress: string;
  phoneNumber: string;
  amount: number;
  purpose: string[];
  paymentMethod: string;
  receivedBy: Types.ObjectId;
  updatedBy: Types.ObjectId;
};
