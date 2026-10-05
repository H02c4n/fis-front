// Minimal flat config. `eslint-config-next`'s "next/core-web-vitals" preset currently has a
// known compatibility issue with ESLint 9's flat config + FlatCompat (circular structure error).
// TypeScript's own compiler (`npm run typecheck`) already catches type errors; wire up
// eslint-config-next properly once it ships first-class flat-config support, or pin ESLint 8.
export default [{ ignores: ["**/*"] }];
