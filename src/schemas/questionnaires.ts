import { z } from "zod";
import { stepConnectionSchema } from "./stepConnections";
import { timelineStepSchema } from "./timeline";

export const createQuestionnaireSchema = z.object({
  status: z.enum(["draft", "active", "closed", "archived"]).default("active"),
  title: z.string().min(1),
  description: z.string().min(1),
  participantTarget: z.number().optional(),
  allowToJoinAfterFull: z.boolean(),
  accessCode: z.string().optional(),
});
export type CreateQuestionnaireSchemaType = z.infer<
  typeof createQuestionnaireSchema
>;

export const questionnaireSchema = z.object({
  id: z.string().uuid(),
  creator: z.object({
    id: z.string().uuid(),
    name: z.string(),
    email: z.string().email(),
    role: z.enum(["admin", "user"]),
    deleted_at: z.string().datetime().nullable(),
  }),
  status: z.enum(["draft", "active", "closed", "archived"]),
  title: z.string(),
  description: z.string(),
  participantTarget: z.number(),
  allowExtraParticipants: z.boolean(),
  accessCode: z.string(),
});
export type QuestionnaireSchemaType = z.infer<typeof questionnaireSchema>;

export const questionnaireSchemaWithTimeline = z.object({
  questionnaire: questionnaireSchema,
  timeline: z.object({
    id: z.string().uuid(),
    sourceType: z.enum(["experiment", "task", "training", "questionnaire"]),
    sourceId: z.string().uuid(),
    createdAt: z.string().datetime(),
    steps: z.array(timelineStepSchema),
    step_connections: z.array(stepConnectionSchema),
  }),
});
export type QuestionnaireSchemaWithTimelineType = z.infer<
  typeof questionnaireSchemaWithTimeline
>;

export const questionnaireParticipantSchema = z.object({
  id: z.string().uuid().nullable(),
  questionnaireId: z.string().uuid(),
  userId: z.string().uuid(),
  completedAt: z.string().datetime().nullable(),
  createdAt: z.string().datetime().nullable(),
});
export type QuestionnaireParticipantSchemaType = z.infer<
  typeof questionnaireParticipantSchema
>;
