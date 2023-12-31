import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import queryFilters from '../../../shared/queryFilters';
import sendResponse from '../../../shared/sendResponse';
import { IRegistration } from './registration.interface';
import { RegistrationService } from './registration.service';

const createRegistration = catchAsync(async (req: Request, res: Response) => {
  const user = req.user!;
  const payload = req.body;
  payload.receivedBy = user._id;

  const result = await RegistrationService.createRegistration(payload);
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars

  sendResponse<IRegistration>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Registration done successfully!',
    data: result,
  });
});

const myRegistrations = catchAsync(async (req: Request, res: Response) => {
  const user = req.user!;
  const result = await RegistrationService.myRegistrations(user);

  sendResponse<IRegistration[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Registration retrieved successfully !',
    data: result,
  });
});

const getAllRegistrations = catchAsync(async (req: Request, res: Response) => {
  const filters = queryFilters(
    req.query as Record<string, string | undefined>,
    req,
  );
  const result = await RegistrationService.getAllRegistrations(
    filters.filters,
    filters.queries,
  );
  sendResponse<IRegistration[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Registration retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const showToAllRegistrations = catchAsync(
  async (req: Request, res: Response) => {
    const result = await RegistrationService.showToAllRegistrations();
    sendResponse<IRegistration[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Registration retrieved successfully !',
      data: result,
    });
  },
);

const getSingleRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = req.user!;
    const result = await RegistrationService.getSingleRegistration(user, id);

    sendResponse<IRegistration>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Registration retrieved successfully !',
      data: result,
    });
  },
);

const updateRegistration = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = req.user!;
  const updatedData = req.body;
  const result = await RegistrationService.updateRegistration(
    user,
    id,
    updatedData,
  );

  sendResponse<IRegistration>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Registration updated successfully !',
    data: result,
  });
});

const deleteRegistration = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await RegistrationService.deleteRegistration(id);
  sendResponse<IRegistration>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Registration deleted successfully !',
    data: result,
  });
});

export const RegistrationController = {
  createRegistration,
  myRegistrations,
  getAllRegistrations,
  showToAllRegistrations,
  getSingleRegistration,
  updateRegistration,
  deleteRegistration,
};
