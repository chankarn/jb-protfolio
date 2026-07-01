// Shared zod schema for the contact form — used by both the client form and the
// server route handler (docs/SA_BLUEPRINT.md §3). `honeypot` must be empty; a
// filled value signals a bot (handled server-side).
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email(),
  message: z.string().trim().min(1).max(2000),
  honeypot: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
