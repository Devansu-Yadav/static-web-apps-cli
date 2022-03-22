import path from "path";
export const DEFAULT_CONFIG: SWACLIConfig = {
  port: 4280,
  host: "localhost",
  apiPort: 7071,
  apiPrefix: "api",
  ssl: false,
  appLocation: `.${path.sep}`,
  outputLocation: `.${path.sep}`,
  swaConfigLocation: `.${path.sep}`,
  sslCert: undefined,
  sslKey: undefined,
  appBuildCommand: "npm run build --if-present",
  apiBuildCommand: "npm run build --if-present",
  swaConfigFilename: "staticwebapp.config.json",
  swaConfigFilenameLegacy: "routes.json",
  run: undefined,
  verbose: "log",
  customUrlScheme: "swa://",
  overridableErrorCode: [400, 401, 403, 404],
  devserverTimeout: 30000,
  open: false,
  dryRun: false,
};
