import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IGenericResponse } from '../../../interfaces/common';
import { IFilters, IQueries } from '../../../interfaces/queryFilters';
import searcher from '../../../shared/searcher';
import { registrationSearchableFields } from './registration.constant';
import { IRegistration } from './registration.interface';
import { Registration } from './registration.model';
import { JwtPayload } from 'jsonwebtoken';

const createRegistration = async (
  payload: IRegistration,
): Promise<IRegistration> => {
  const result = await Registration.create(payload);
  return result;
};

const myRegistrations = async (user: JwtPayload): Promise<IRegistration[]> => {
  const result = Registration.find({ receivedBy: user._id });
  return result;
};

const getAllRegistrations = async (
  filters: IFilters,
  queries: IQueries,
): Promise<IGenericResponse<IRegistration[]>> => {
  const conditions = searcher(filters, registrationSearchableFields);

  const { limit = 0, skip, fields, sort } = queries;

  const resultQuery = Registration.find(conditions)
    .skip(skip as number)
    .select(fields as string)
    .sort(sort)
    .limit(limit as number);

  const [result, total] = await Promise.all([
    resultQuery.exec(),
    Registration.countDocuments(conditions),
  ]);

  const page = Math.ceil(total / limit);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const showToAllRegistrations = async (): Promise<IRegistration[]> => {
  const result = await Registration.find({ status: 'notApproved' })
    .select({
      _id: 0,
    })
    .populate({
      path: 'receivedBy',
      select: 'name -_id',
    })
    .exec();
  return result;
};

const getSingleRegistration = async (
  user: JwtPayload,
  id: string,
): Promise<IRegistration | null> => {
  if (!id) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Registration Not found');
  }

  const result = await Registration.findById(id).populate({
    path: 'receivedBy',
  });
  /*
   check the authorization to update his/her own created registration data
   This is important to protect any unauthorized action
   * Admin Can get any registration but rent_collector can get his/her own entries data

   checking procedure
   # check the user role form request.user
   # if admin return the result or get any access
   # if not admin than match the data entries by(ObjectId) with user _id
   */
  if (user.role !== 'admin' && result?.receivedBy.toString() !== user._id) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
  }

  return result;
};

const updateRegistration = async (
  user: JwtPayload,
  id: string,
  payload: Partial<IRegistration>,
): Promise<IRegistration | null> => {
  if (!id) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Registration Not found');
  }

  /*
   check the authorization to update his/her own created registration data
   This is important to protect any unauthorized action
   * Admin Can update any registration but rent_collector can update his/her own entries data
    checking procedure
   # check the user role form request.user
   # if admin return the result or get any access
   # if not admin than match the data entries by(ObjectId) with user _id
   */

  const targetedData = await Registration.findById(id);

  if (!targetedData) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Registration Not found');
  }

  if (
    user.role !== 'admin' &&
    targetedData?.receivedBy.toString() !== user._id
  ) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'You are not authorized to delete',
    );
  }

  const result = await Registration.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

const deleteRegistration = async (
  id: string,
): Promise<IRegistration | null> => {
  if (!id) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Registration Not found');
  }
  const result = await Registration.findByIdAndDelete(id);
  return result;
};

export const RegistrationService = {
  createRegistration,
  myRegistrations,
  getAllRegistrations,
  showToAllRegistrations,
  getSingleRegistration,
  updateRegistration,
  deleteRegistration,
};
