import { z } from "zod";
import { stepConnectionSchema } from "./stepConnections";
import { timelineStepSchema } from "./timeline";

export const createTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  isTemplate: z.boolean().optional(),
  createdBy: z.string().uuid().nullable(), // nullable in frontend
});
export type CreateTaskSchemaType = z.infer<typeof createTaskSchema>;

export const taskSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  createdBy: z.string().uuid(),
  isTemplate: z.boolean(),
});
export type TaskSchemaType = z.infer<typeof taskSchema>;

export const taskSchemaWithTimeline = z.object({
  task: taskSchema,
  timeline: z.object({
    id: z.string().uuid(),
    sourceType: z.enum(["experiment", "task", "training", "questionnaire"]),
    sourceId: z.string().uuid(),
    createdAt: z.string().datetime(),
    steps: z.array(timelineStepSchema),
    step_connections: z.array(stepConnectionSchema),
  }),
});
export type TaskSchemaWithTimelineType = z.infer<typeof taskSchemaWithTimeline>;
