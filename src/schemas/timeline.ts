import { z } from "zod";

export const timelineSchema = z.object({
  id: z.string().uuid().nullable(), // Nullable in frontend
  sourceType: z.enum(["experiment", "task", "training", "questionnaire"]),
  sourceId: z.string().uuid(),
});
export type TimelineSchemaType = z.infer<typeof timelineSchema>;

export const experimentStepEnumValues = [
  "custom_block",
  "task",
  "conditional",
  "sequential_stimuli",
  // "simultaneous_stimuli",
  "multi_trigger_stimuli",
] as const;

export const questionnaireStepEnumValues = [
  "question_text",
  "question_radio",
  "question_checkbox",
  "question_dropdown",
] as const;

export const stepEnumValues = [
  ...experimentStepEnumValues,
  ...questionnaireStepEnumValues,
] as const;

export const stepTypeEnum = z.enum(stepEnumValues);

export type StepType = z.infer<typeof stepTypeEnum>;

export const timelineStepMetadataSchema = z.object({
  title: z.string(),
  positionX: z.number().nullable(),
  positionY: z.number().nullable(),
  blocks: z.array(z.any()).nullable().optional(),
  triggers: z.array(z.any()).nullable().optional(),
  config: z.any().nullable().optional(),
  group: z.any().nullable().optional(),
  question: z.string().nullable().optional(),
  question_options: z.array(z.string()).nullable().optional(),
});

export type TimelineStepMetadata = z.infer<typeof timelineStepMetadataSchema>;

export const timelineStepSchema = z.object({
  id: z.string().uuid().nullable(), // Nullable in frontend
  timelineId: z.string().uuid(),
  orderIndex: z.number().nullable(),
  type: stepTypeEnum,
  metadata: timelineStepMetadataSchema,
  taskVersionId: z.string().uuid().optional(),
  step_id: z.string().uuid().optional(),
});

export type TimelineStep = z.infer<typeof timelineStepSchema>;

export const createTimelineStepSchema = z.object({
  timelineId: z.string().uuid(),
  orderIndex: z.number().nullable(),
  type: stepTypeEnum,
  taskVersionId: z.string().uuid().optional(),
  metadata: timelineStepMetadataSchema,
});
export type CreateTimelineStepSchemaType = z.infer<
  typeof createTimelineStepSchema
>;
