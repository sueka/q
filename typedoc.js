module.exports = {
  entryPoints: [ 'src' ],
  // out: 'docs',
  exclude: [ // Same as in tsconfig.json
    "src/jest",
    "src/**/*.test.ts", "src/**/test.ts",
    "src/**/*.spec.ts", "src/**/spec.ts",
  ],
}
