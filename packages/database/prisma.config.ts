import { defineConfig } from "prisma/config";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.join(process.cwd(), "../../.env.local") });
dotenv.config({ path: path.join(process.cwd(), "../../.env") });

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DIRECT_URL || process.env.DATABASE_URL,
  },
});
