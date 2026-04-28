import { z } from "zod";
import { stepConnectionSchema } from "./stepConnections";
import { timelineStepSchema } from "./timeline";

export const createExperimentSchema = z.object({
  status: z.enum(["draft", "active", "closed", "archived"]).default("active"),
  title: z.string().min(1),
  description: z.string().min(1),
  participantTarget: z.number().optional(),
  allowToJoinAfterFull: z.boolean(),
  accessCode: z.string().optional(),
});
export type CreateExperimentSchemaType = z.infer<typeof createExperimentSchema>;

export const experimentSchema = z.object({
  id: z.string().uuid(),
  creator: z.object({
    id: z.string().uuid(),
    name: z.string(),
    email: z.string().email(),
    role: z.enum(["admin", "user"]),
    deleted_at: z.string().datetime().nullable(), // Nullable in frontend
  }),
  status: z.enum(["draft", "active", "closed", "archived"]),
  title: z.string(),
  description: z.string(),
  participantTarget: z.number(),
  allowExtraParticipants: z.boolean(),
  accessCode: z.string(),
});
export type ExperimentSchemaType = z.infer<typeof experimentSchema>;

export const experimentSchemaWithTimeline = z.object({
  experiment: experimentSchema,
  timeline: z.object({
    id: z.string().uuid(),
    sourceType: z.enum(["experiment", "task", "training", "questionnaire"]),
    sourceId: z.string().uuid(),
    createdAt: z.string().datetime(),
    steps: z.array(timelineStepSchema),
    step_connections: z.array(stepConnectionSchema),
  }),
});
export type ExperimentSchemaWithTimelineType = z.infer<
  typeof experimentSchemaWithTimeline
>;

// export class CreateExperimentParticipantDto {
//   @IsUUID()
//   @ApiProperty({ example: 'b4b1bb70-1dc3-4d5f-a67b-123456789abc' })
//   experimentId: string;

//   @IsUUID()
//   @ApiProperty({ example: 'd1d2cc50-3cb1-4c3b-93a3-987654321xyz' })
//   userId: string;
// }

// export class UpdateExperimentParticipantDto {
//   @IsOptional()
//   @IsDateString()
//   @ApiProperty({ example: '2025-03-18T12:30:00.000Z', required: false })
//   completedAt?: Date;
// }

export const experimentParticipantSchema = z.object({
  id: z.string().uuid().nullable(), // Nullable in frontend
  experimentId: z.string().uuid(),
  userId: z.string().uuid(),
  completedAt: z.string().datetime().nullable(), // Nullable in frontend
  createdAt: z.string().datetime().nullable(), // Nullable in frontend
});
export type ExperimentParticipantSchemaType = z.infer<
  typeof experimentParticipantSchema
>;
