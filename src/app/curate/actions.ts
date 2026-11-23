"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { ACCESS_ENV_VAR, configuredPassword, passwordMatches } from "./access";
import { grantCurateAccess } from "./session";

const unlockSchema = z.object({ password: z.string().min(1).max(200) });

export type UnlockState = { error?: string };

export async function unlockCurate(_prev: UnlockState, formData: FormData): Promise<UnlockState> {
  const parsed = unlockSchema.safeParse({ password: formData.get("password") });
  if (!parsed.success) return { error: "Enter the password." };

  const configured = configuredPassword();
  if (configured === null) {
    console.error(`[curate] ${ACCESS_ENV_VAR} is not set, so /curate stays locked.`);
    return { error: "This page isn't open yet. Ask Paul for access." };
  }

  if (!passwordMatches(parsed.data.password, configured)) {
    return { error: "That password isn't right." };
  }

  await grantCurateAccess(configured);
  redirect("/curate");
}
