type Level = "info" | "error";

function log(level: Level, ...args: unknown[]) {
  if (process.env.NODE_ENV === "production" && level === "info") return;
  if (level === "error") {
    console.error(...args);
  } else {
    console.debug(...args);
  }
}

export const logger = {
  info: (...args: unknown[]) => log("info", ...args),
  error: (...args: unknown[]) => log("error", ...args),
};
