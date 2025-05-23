import { describe, expect, it } from "vitest";
import { renderFile } from "../src/index";

describe("Render File tests", () => {
  it("file replace on simple string", () => {
    const result = renderFile("test/files/string.tim", { place: "world" });
    expect(result).toBeOneOf(["Hello world", "Hello world\n"]);
  });

  it("file path replace on simple string", () => {
    const template = "test/files/string2.tim";
    const data = {
      place: "Brighton",
      person: {
        name: "Prem",
      },
    };

    const result = renderFile(template, data);
    expect(result).toBeOneOf([
      "Hello Brighton. My name is Prem.",
      "Hello Brighton. My name is Prem.\n",
    ]);
  });

  it("file replace on html string", () => {
    const template = "./test/files/html.tim";
    const data = {
      title: "Dharmafly",
      url: "http://dharmafly.com",
    };

    const result = renderFile(template, data);
    expect(result).toBeOneOf([
      "<p><a href='http://dharmafly.com'>Dharmafly</a></p>",
      "<p><a href='http://dharmafly.com'>Dharmafly</a></p>\n",
    ]);
  });
});
