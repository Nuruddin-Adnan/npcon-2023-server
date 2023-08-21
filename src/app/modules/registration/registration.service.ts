import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IGenericResponse } from '../../../interfaces/common';
import { IFilters, IQueries } from '../../../interfaces/queryFilters';
import searcher from '../../../shared/searcher';
import { registrationSearchableFields } from './registration.constant';
import { IRegistration } from './registration.interface';
import { Registration } from './registration.model';

const createRegistration = async (
  payload: IRegistration,
): Promise<IRegistration> => {
  const result = await Registration.create(payload);
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

const getSingleRegistration = async (
  id: string,
): Promise<IRegistration | null> => {
  if (!id) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Registration Not found');
  }
  const result = await Registration.findById(id);
  return result;
};

const updateRegistration = async (
  id: string,
  payload: Partial<IRegistration>,
): Promise<IRegistration | null> => {
  if (!id) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Registration Not found');
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
  getAllRegistrations,
  getSingleRegistration,
  updateRegistration,
  deleteRegistration,
};
