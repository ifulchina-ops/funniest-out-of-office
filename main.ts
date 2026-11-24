// The Funniest Out-of-Office — make.fun entry.
// Writes one out-of-office auto-reply, 140 characters or fewer, to
// /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt for local runs).
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const REPLY =
  "I'm away until Monday. Your email was forwarded to future me, who is equally behind and considerably more tanned.";

// The gate only accepts 1-140 characters of non-blank text; refuse to
// write anything that would fail it.
if (REPLY.length < 1 || REPLY.length > 140 || REPLY.trim().length === 0) {
  throw new Error(`reply is ${REPLY.length} characters, outside the 1-140 gate`);
}
if (REPLY.includes("\n")) {
  throw new Error("reply must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), REPLY, "utf8");
