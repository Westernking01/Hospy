/**
 * Creates the initial HOPSY PLAZA administrator.
 *
 * Auth model (per docs/04_AUTHENTICATION_AND_SECURITY.md and 03_DATABASE_DESIGN.md):
 *   - Credentials live in Supabase Auth.
 *   - The `administrators` table holds the admin profile, linked via `auth_user_id`.
 *
 * Idempotent: re-running will not create duplicate auth users or profile rows.
 *
 * Env required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, DATABASE_URL/DIRECT_URL.
 * Optional: ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME.
 */
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;

const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "admin@hopsyplaza.com").toLowerCase();
const ADMIN_NAME = process.env.ADMIN_NAME || "HOPSY PLAZA Administrator";

function generatePassword() {
  // 20 chars, mixed. Avoids ambiguous separators that break shell copy/paste.
  const raw = crypto.randomBytes(24).toString("base64").replace(/[^A-Za-z0-9]/g, "");
  return `Hp!${raw.slice(0, 16)}9`;
}

async function main() {
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  }
  if (!connectionString) throw new Error("Missing DATABASE_URL / DIRECT_URL");

  const providedPassword = process.env.ADMIN_PASSWORD;
  const password = providedPassword || generatePassword();
  const passwordWasGenerated = !providedPassword;

  const pool = new Pool({ connectionString, ssl: { rejectUnauthorized: false } });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  console.log(`Ensuring administrator: ${ADMIN_EMAIL}`);

  // 1. Find or create the Supabase Auth user.
  let authUserId: string | undefined;
  let credentialsUsable = false;

  // Look for an existing auth user with this email (paginate defensively).
  for (let page = 1; page <= 20 && !authUserId; page++) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage: 200 });
    if (error) throw new Error(`listUsers failed: ${error.message}`);
    const found = data.users.find((u) => u.email?.toLowerCase() === ADMIN_EMAIL);
    if (found) authUserId = found.id;
    if (data.users.length < 200) break;
  }

  if (authUserId) {
    console.log(`Auth user already exists (${authUserId}).`);
    if (providedPassword) {
      const { error } = await supabase.auth.admin.updateUserById(authUserId, {
        password,
        email_confirm: true,
      });
      if (error) throw new Error(`updateUserById failed: ${error.message}`);
      credentialsUsable = true;
      console.log("Updated existing auth user's password to the provided value.");
    } else {
      console.log("Leaving existing auth user's password unchanged (set ADMIN_PASSWORD to reset).");
    }
  } else {
    const { data, error } = await supabase.auth.admin.createUser({
      email: ADMIN_EMAIL,
      password,
      email_confirm: true,
      user_metadata: { full_name: ADMIN_NAME, role: "administrator" },
    });
    if (error) throw new Error(`createUser failed: ${error.message}`);
    authUserId = data.user.id;
    credentialsUsable = true;
    console.log(`Created auth user (${authUserId}).`);
  }

  // 2. Upsert the administrator profile row, linked by auth_user_id.
  const existing = await prisma.administrator.findFirst({
    where: { OR: [{ auth_user_id: authUserId }, { email: ADMIN_EMAIL }] },
  });

  if (existing) {
    await prisma.administrator.update({
      where: { id: existing.id },
      data: { auth_user_id: authUserId, full_name: ADMIN_NAME, email: ADMIN_EMAIL, is_active: true },
    });
    console.log(`Administrator profile updated (${existing.id}).`);
  } else {
    const created = await prisma.administrator.create({
      data: { auth_user_id: authUserId, full_name: ADMIN_NAME, email: ADMIN_EMAIL, is_active: true },
    });
    console.log(`Administrator profile created (${created.id}).`);
  }

  console.log("\n================ ADMIN CREDENTIALS ================");
  console.log(`Email:    ${ADMIN_EMAIL}`);
  if (credentialsUsable) {
    console.log(`Password: ${password}${passwordWasGenerated ? "  (auto-generated)" : "  (provided)"}`);
  } else {
    console.log(`Password: <unchanged — existing auth user; rerun with ADMIN_PASSWORD to reset>`);
  }
  console.log("===================================================\n");

  await prisma.$disconnect();
  await pool.end();
}

main().catch((e) => {
  console.error("create-admin failed:");
  console.error(e);
  process.exit(1);
});
