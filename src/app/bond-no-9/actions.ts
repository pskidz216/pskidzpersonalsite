"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { grantAccess, revokeAccess, verifyPassword } from "./auth";

const loginSchema = z.object({
  password: z.string().min(1).max(200),
});

export type LoginResult = { error: string } | undefined;

export async function loginAction(
  _prev: LoginResult,
  formData: FormData
): Promise<LoginResult> {
  const parsed = loginSchema.safeParse({
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: "Please enter a password." };
  }

  if (!verifyPassword(parsed.data.password)) {
    return { error: "Incorrect password." };
  }

  await grantAccess();
  redirect("/bond-no-9/wireframes");
}

export async function logoutAction(): Promise<void> {
  await revokeAccess();
  redirect("/bond-no-9");
}
