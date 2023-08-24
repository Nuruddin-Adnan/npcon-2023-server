import { z } from 'zod';
import { paymentMethod, status } from './registration.constant';

const createRegistrationZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    designation: z.string().optional(),
    hospital: z.string().optional(),
    emailAddress: z.string().optional(),
    phoneNumber: z.string().optional(),
    amount: z.number({
      required_error: 'Amount is required',
    }),
    purpose: z.array(z.string()).min(1), // Array of non-empty strings
    paymentMethod: z.enum([...paymentMethod] as [string, ...string[]]),
    status: z.enum([...status] as [string, ...string[]]).optional(),
  }),
});

const updateRegistrationZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    designation: z.string().optional(),
    hospital: z.string().optional(),
    emailAddress: z.string().optional(),
    phoneNumber: z.string().optional(),
    amount: z.number().optional(),
    purpose: z.array(z.string()).min(1).optional(),
    paymentMethod: z
      .enum([...paymentMethod] as [string, ...string[]])
      .optional(),
    status: z.enum([...status] as [string, ...string[]]).optional(),
  }),
});

export const RegistrationValidation = {
  createRegistrationZodSchema,
  updateRegistrationZodSchema,
};
