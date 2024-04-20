export const getPackageJson = (projectName: string) => ({
  name: projectName,
  version: "1.0.0",
  description: "",
  main: "dist/index.js",
  scripts: {
    test: "jest",
    start: "ts-node src/index.ts",
    build: "tsc",
  },
  keywords: [],
  "lint-staged": {
    "*.{js,ts,tsx}": ["prettier --write"],
  }
});
