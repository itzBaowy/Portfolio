import { existsSync, readFileSync } from "node:fs";
import { resolve, sep } from "node:path";
import { profile } from "@/data/profile";

// Only enable downloads for an existing local PDF. No broken download CTA.
export function getResumeUrl(): string | null {
  if (!profile.resumeUrl?.startsWith("/") || !profile.resumeUrl.endsWith(".pdf")) return null;
  const publicRoot = resolve(process.cwd(), "public");
  const file = resolve(publicRoot, profile.resumeUrl.slice(1));
  if (!file.startsWith(publicRoot + sep) || !existsSync(file)) return null;
  try {
    return readFileSync(file).subarray(0, 5).toString() === "%PDF-" ? profile.resumeUrl : null;
  } catch {
    return null;
  }
}
