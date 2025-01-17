import { Command } from "commander";
import mockFs from "mock-fs";
import { parsePort } from "./net";
import { swaCliConfigFilename } from "./cli-config";
import { configureOptions } from "./options";

describe("configureOptions()", () => {
  afterEach(() => {
    mockFs.restore();
  });

  it("should return configuration options and context", async () => {
    const command = await new Command().parseAsync([]);

    expect(await configureOptions("test", { config: swaCliConfigFilename, port: 1234 }, command)).toStrictEqual({
      context: "test",
      options: {
        config: swaCliConfigFilename,
        port: 1234,
      },
    });
  });

  it("should return merged configuration from config file", async () => {
    const command = await new Command().parseAsync([]);
    mockFs({
      "swa-cli.config.json": JSON.stringify({
        configurations: {
          test: { port: 1234 },
        },
      }),
    });

    expect(await configureOptions("test", { config: swaCliConfigFilename }, command)).toStrictEqual({
      context: "test",
      options: {
        config: swaCliConfigFilename,
        port: 1234,
      },
    });
  });

  it("should return merged configuration with config file overriding default cli options", async () => {
    const command = await new Command().option<number>("--port <port>", "", parsePort, 4444).parseAsync([]);

    mockFs({
      "swa-cli.config.json": JSON.stringify({
        configurations: {
          test: { port: 1234 },
        },
      }),
    });

    expect(await configureOptions("test", { config: swaCliConfigFilename, port: 4444 }, command)).toStrictEqual({
      context: "test",
      options: {
        config: swaCliConfigFilename,
        port: 1234,
      },
    });
  });

  it("should return merged configuration with user cli options overriding config file", async () => {
    const command = await new Command()
      .name("swa")
      .option<number>("--port <port>", "", parsePort, 4444)
      .parseAsync(["node", "swa", "--port", "4567"]);

    mockFs({
      "swa-cli.config.json": JSON.stringify({
        configurations: {
          test: { port: 1234 },
        },
      }),
    });

    expect(await configureOptions("test", { config: swaCliConfigFilename, port: 4567 }, command)).toStrictEqual({
      context: "test",
      options: {
        config: swaCliConfigFilename,
        port: 4567,
      },
    });
  });
});
