import { describe, expect, it } from "vitest";
import { render, tim } from "../src/index";

describe("Render inline tests", () => {
  it("inline replace on simple string", () => {
    const result = render("Hello {{place}}", { place: "world" });
    expect(result).toBe("Hello world");
  });

  it("Render inline path replace on simple string", () => {
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

  it("Render inline replace on html string", () => {
    const template = "<p><a href='{{url}}'>{{title}}</a></p>";
    const data = {
      title: "Dharmafly",
      url: "http://dharmafly.com",
    };

    const result = render(template, data);
    expect(result).toBe("<p><a href='http://dharmafly.com'>Dharmafly</a></p>");
  });

  it("Render inline replace on nested object", () => {
    const ul = "<ul>{{list}}</ul>";
    const li = "<li>{{contents}}</li>";
    let myList = "";
    let i: number;

    for (i = 100; i < 103; i++) {
      myList += render(li, { contents: i });
    }
    const result = render(ul, { list: myList });
    expect(result).toBe("<ul><li>100</li><li>101</li><li>102</li></ul>");
  });

  it("Render inline replace using simple array", () => {
    const result = render("Hello {{0}}", ["world"]);
    expect(result).toBe("Hello world");
  });

  it("Render inline replace using object arrays", () => {
    const result = render("Hello {{places.0}}", { places: ["world"] });
    expect(result).toBe("Hello world");
  });

  it("Render throws exception if path is invalid", () => {
    expect(() =>
      render("Hello {{config.foo.bar}}", { config: { moo: "blah" } }),
    ).toThrow();
  });

  it("Render using non-standard template delimiters endings: `<%` and `%>`", () => {
    const start = "<%";
    const end = "%>";

    const result = render("Hello <%place%>", { place: "world" }, start, end);
    expect(result).toBe("Hello world");
  });
});
