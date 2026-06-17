import { z } from 'zod';

export const surveySchema = z.object({
  ageRange: z.string().min(1, 'Please select your age range.'),
  gender: z.string().min(1, 'Please select your gender.'),
  frequency: z.string().min(1, 'Please select how often you use our service.'),
  satisfaction: z.number().min(1, 'Please rate your satisfaction.').max(5),
  primaryFeature: z.string().min(1, 'Please select the feature you use most.'),
  usability: z.number().min(1, 'Please rate the design usability.').max(5),
  likeMost: z.string().min(1, 'Please select what you like most.'),
  improvements: z.string().min(5, 'Please provide suggestions with at least 5 characters.'),
  recommend: z.string().min(1, 'Please select an option.'),
  comments: z.string().optional(),
});

export type SurveyFormValues = z.infer<typeof surveySchema>;