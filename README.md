# @quartz-community/backlinks

Displays a list of pages that link back to the current page. Backlinks come from the links Quartz collects while building (the built-in link processing, `configuration.links`); unlisted pages are left out.

## Installation

```bash
npx quartz plugin add @quartz-community/backlinks
```

It is already included (and enabled) in the default `quartz.config.yaml`.

## Usage

```yaml title="quartz.config.yaml"
plugins:
  - source: "@quartz-community/backlinks"
    enabled: true
    layout:
      position: right
      priority: 50
```

For advanced use cases, you can override in TypeScript:

```ts title="quartz.ts (override)"
import * as ExternalPlugin from "./.quartz/plugins";

ExternalPlugin.Backlinks({
  hideWhenEmpty: true,
});
```

## Configuration

| Option          | Type      | Default | Description                                                                        |
| --------------- | --------- | ------- | ---------------------------------------------------------------------------------- |
| `hideWhenEmpty` | `boolean` | `true`  | Whether to hide the backlinks section when no pages link back to the current page. |

## Documentation

See the [Quartz documentation](https://quartz.jzhao.xyz/features/backlinks) for more information.

## License

MIT
