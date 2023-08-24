/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { Types } from 'mongoose';
import { IUser } from '../user/user.interface';

export type IRegistration = {
  name: string;
  designation: string;
  hospital: string;
  emailAddress: string;
  phoneNumber: string;
  amount: number;
  purpose: string[];
  paymentMethod: string;
  bkashNumber: string;
  note: string;
  status: string;
  receivedBy: Types.ObjectId | IUser;
  updatedBy: Types.ObjectId | IUser;
};

export type IRegistrationModel = Model<IRegistration, Record<string, unknown>>;
