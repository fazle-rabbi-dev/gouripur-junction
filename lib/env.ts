// Single place for env access. Import from here, never from process.env directly.
function required(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;
  if (!value) throw new Error(`Missing env: ${name}`);
  return value;
}

export const env = {
  ADMIN_USERNAME: required("ADMIN_USERNAME", "admin"),
  ADMIN_PASSWORD: required("ADMIN_PASSWORD", "admin"),
  JWT_SECRET: required("JWT_SECRET", "dev-only-secret-change-me"),
  MONGODB_URI: required("MONGODB_URI", "mongodb://127.0.0.1:27017/gouripur-junction"),
};
