import { z } from 'zod';

export const profileSchema = z.object({
  avatar: z.string().optional(),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
