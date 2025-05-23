import { expect, describe, it } from "vitest";
import { tim } from "../src/index";

describe("String inline tests", () => {
  it("inline replace on simple string", () => {
    const result = tim("Hello {{place}}", { place: "world" });
    console.log(result);
    expect(result).toBe("Hello world");
  });

  it("inline path replace on simple string", () => {
    const template = "Hello {{place}}. My name is {{person.name}}.";
    const data = {
      place: "Brighton",
      person: {
        name: "Prem",
      },
    };
    const result = tim(template, data);
    expect(result).toBe("Hello Brighton. My name is Prem.");
  });

  it("inline replace on html string", () => {
    const template = "<p><a href='{{url}}'>{{title}}</a></p>";
    const data = {
      title: "Dharmafly",
      url: "http://dharmafly.com",
    };

    const result = tim(template, data);
    expect(result).toBe("<p><a href='http://dharmafly.com'>Dharmafly</a></p>");
  });

  it("inline replace on nested object", () => {
    const ul = "<ul>{{list}}</ul>";
    const li = "<li>{{contents}}</li>";
    let myList = "";
    let i: number;

    for (i = 100; i < 103; i++) {
      myList += tim(li, { contents: i });
    }
    const result = tim(ul, { list: myList });
    expect(result).toBe("<ul><li>100</li><li>101</li><li>102</li></ul>");
  });

  it("inline replace using simple array", () => {
    const result = tim("Hello {{0}}", ["world"]);
    expect(result).toBe("Hello world");
  });

  it("inline replace using object arrays", () => {
    const result = tim("Hello {{places.0}}", { places: ["world"] });
    expect(result).toBe("Hello world");
  });

  it("throws exception if path is invalid", () => {
    expect(() =>
      tim("Hello {{config.foo.bar}}", { config: { moo: "blah" } }),
    ).toThrow();
  });

  it("using non-standard template delimiters endings: `<%` and `%>`", () => {
    const start = "<%";
    const end = "%>";

    const result = tim("Hello <%place%>", { place: "world" }, start, end);
    expect(result).toBe("Hello world");
  });
});
