# @quartz-community/backlinks

Displays a list of pages that link back to the current page.

## Installation

```bash
npx quartz plugin add github:quartz-community/backlinks
```

## Usage

```ts
// quartz.layout.ts
import * as Plugin from "./.quartz/plugins";

// Add to your layout
Plugin.Backlinks(); // in the appropriate layout section
```

## Configuration

| Option          | Type      | Default | Description                                                                        |
| --------------- | --------- | ------- | ---------------------------------------------------------------------------------- |
| `hideWhenEmpty` | `boolean` | `true`  | Whether to hide the backlinks section when no pages link back to the current page. |

## Documentation

See the [Quartz documentation](https://quartz.jzhao.xyz/) for more information.

## License

MIT
