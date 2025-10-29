import fs from "node:fs";
import path from "node:path";
if (!process.env.HOPPY_API_KEY || !process.env.HOPPY_WORKSPACE_ID) {
  const p = path.join(process.cwd(), ".env.local");
  if (fs.existsSync(p)) {
    for (const line of fs.readFileSync(p, "utf8").split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.+)\s*$/);
      if (m && process.env[m[1]] == null) process.env[m[1]] = m[2];
    }
  }
}
