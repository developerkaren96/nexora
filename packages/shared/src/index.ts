import { z } from "zod";

export const PlanCodeSchema = z.enum(["STARTER", "BUSINESS", "PROFESSIONAL", "ENTERPRISE"]);
export type PlanCode = z.infer<typeof PlanCodeSchema>;

export const BusinessTypeSchema = z.enum([
  "ECOMMERCE", "RESTAURANT", "BEAUTY_SALON", "MEDICAL_CLINIC", "LAW_FIRM",
  "REAL_ESTATE", "DELIVERY", "SAAS_CRM", "ONLINE_SCHOOL", "BOOKING",
  "CORPORATE", "AUTOMOTIVE",
]);
export type BusinessType = z.infer<typeof BusinessTypeSchema>;

export const CreateProjectSchema = z.object({
  name: z.string().min(2).max(80),
  businessType: BusinessTypeSchema,
  slug: z.string().regex(/^[a-z0-9](?:[a-z0-9-]{1,30}[a-z0-9])?$/),
  logoUrl: z.string().url().nullish(),
  brandColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/).default("#6366F1"),
  templateId: z.string().uuid().nullish(),
});
export type CreateProjectInput = z.infer<typeof CreateProjectSchema>;

export const PLAN_LIMITS: Record<PlanCode, {
  maxProjects: number;
  maxDomains: number;
  maxStorageGb: number;
  maxSeats: number;
}> = {
  STARTER:      { maxProjects: 1,  maxDomains: 0,  maxStorageGb: 10,  maxSeats: 1  },
  BUSINESS:     { maxProjects: 3,  maxDomains: 1,  maxStorageGb: 100, maxSeats: 5  },
  PROFESSIONAL: { maxProjects: 10, maxDomains: 5,  maxStorageGb: 500, maxSeats: 20 },
  ENTERPRISE:   { maxProjects: -1, maxDomains: -1, maxStorageGb: -1,  maxSeats: -1 },
};

export const isUnlimited = (n: number) => n < 0;
