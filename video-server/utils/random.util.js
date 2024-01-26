import { randomFillSync } from "crypto";

export const random = (() => {
  const buf = Buffer.alloc(16);
  return () => randomFillSync(buf).toString("hex");
})();
