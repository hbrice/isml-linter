# "no-space-only-lines" Rule

Disallow lines that contain only blank spaces.

## Notes

- This rule does **not** dependent on abstract tree build;
- Auto-fixable;

## Configuration

No configuration is available for this rule. Check the [Generic Configurations for Rules][generic-config].

## Examples

```js
"no-space-only-lines": {}
```

For the above configuration, the following scenarios may happen. A dot "." notation is used to illustrate blank (heading and trailing) spaces.

```
....<div>      // Valid;
........<br/>. // Valid;
....</div>...  // Valid;
....           // Invalid;
....${value}   // Value;
```

[generic-config]: <../generic-rule-config.md>
