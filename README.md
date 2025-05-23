
Typescript port of [tynytim](https://github.com/baryon/node-tinytim) template engine.

## Usage

See tests folder for more examples.

```typescript
import { tim } from "../src/index";

let result = tim("Hello {{place}}", { place: "world" });
//    expect(result).toBe("Hello world");


result = tim("Hello {{places.0}}", { places: ["world"] });
//    expect(result).toBe("Hello world");


const start = "<%";
const end = "%>";
result = tim("Hello <%place%>", { place: "world" }, start, end);
//    expect(result).toBe("Hello world");

```
