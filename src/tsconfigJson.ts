export const tsconfigJson = {
  compilerOptions: {
    target: "es6",
    module: "commonjs",
    outDir: "./dist",
    types: ["jest", "node"],
    strict: true,
    alwaysStrict: true,
    noImplicitAny: true,
    noUnusedLocals: true,
    noUnusedParameters: true,
    esModuleInterop: true,
    skipLibCheck: true,
    forceConsistentCasingInFileNames: true,
  },
  include: ["src"],
  exclude: ["**/*.spec.ts", "**/*.test.ts", "node_modules"],
};