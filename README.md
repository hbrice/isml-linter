# Isml Linter
Isml Linter is a tool for examining if your project's templates follow a specified set of rules defined by your dev team. The available rules can be roughly grouped into: 

 - Styles that are defined by your team;
 - Syntactic errors related to &lt;is* > tags;
 - Coding conventions recommended by SalesForce;
 - Git conflicts that may accidentally be left unresolved;

Please feel free to make suggestions and help make this linter better. :) The set of currently available rules can be found below.

## VSCode Extension

Isml Linter is also available as a VSCode extension. Please check https://marketplace.visualstudio.com/items?itemName=fabiowquixada.vscode-isml-linter and give it a try! :) There is a Prophet extension incompatibility, which we expect to be solved soon.

### Donations

If you think Isml Linter is useful and has helped improving and speeding up your project development, please consider making a donation!

[![](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=M22U4NRUFHELS&currency_code=USD&source=url)

## Installation

Simply run in your project's root directory:

```sh
$ npm install isml-linter --save-dev
```

and add the following to package.json:

```js
"scripts": {
    "init:isml":  "./node_modules/.bin/isml-linter --init",
    "lint:isml":  "./node_modules/.bin/isml-linter",
    "build:isml": "./node_modules/.bin/isml-linter --build",
    "fix:isml":   "./node_modules/.bin/isml-linter --autofix"
}
```

Here's what each script does:
- **init:isml** creates a config file;
- **lint:isml** simply lists the broken rules in the console;
- **build:isml** raises an error if there is any broken rule, thus can be used in your build process;
- **fix:isml** applies fixes for the enabled rules;


### Configuration

After adding the above scripts to package.json, run the following command to generate a config file containing all available rules:

```
npm run init:isml
```

You can disable any rule by removing it from the config file. You may also find these configuration options useful:

| Config            | Description                              |
| ----------------- |:-----------------------------------------|
| rootDir           | The root directory under which the linter will run. Defaults to the directory where the package.json file is |
| disableHtml5      | Disallows HTML5-defined unclosed tags, such as input, img and meta. Default: false |
| ignoreUnparseable | Does not raise an error if an unparseable template is found. Default: false. Please check "Parse Modes - Tree" section below |
| ignore            | If a template path contains (as a substring) any string defined here, that template will be ignored by the linter |
| eslintConfig      | Path to a eslint configuration file, to be applied within &lt;isscript> tags. Default: .eslintrc.json |
| autoFix           | Applies fixes for enabled rules. Default: 'false' |
| disableTreeParse  | Enables only rules that do not depend on  building an ISML tree. Check below when this might be useful. Default: 'false' |
| rules             | Defines which rules to check. See available rules below |

**Note:** If you explicitly set "ignoreUnparseable" config to true, unparseable templates may contain errors that will not be detected by Isml Linter.

Example configuration:

```json
{
    "rootDir": "./cartridges",
    "ignore": [
        "this_directory_is_to_be_ignored"
        "Email.isml"
    ],
    "rules" : {
        "no-br" : {}, 
        "enforce-require" : {}
    }
}
```

Note that according to the above configurations, the following templates would be ignored by Isml Linter:

- registerEmail.isml
- some/path/welcomeEmail.isml
- this_directory_is_to_be_ignored/producttile.isml
- some/path/this_directory_is_to_be_ignored/confirmationpage.isml

## Parse Modes

### Tree (disableTreeParse : false)

This is the default, and most powerful mode. It analyses the template and tries to build an "ISML-DOM" tree to then apply the enabled rules. It is required that the template is parseable.

For example, if a template contains a snippet like the following, IT IS NOT considered a parseable template:

```html
<isif condition="${aCondition}">
    <div class="info">
</isif>
        Some content
<isif condition="${aCondition}">
    </div>
</isif>
```

since the linter is not able to make an association between the opening and the corresponding closing &lt;div> elements. This is the only known limitation for this parse mode. One possible solution to turn such templates into parseable is to replace that snippet by:

```html
<isif condition="${aCondition}">
    <div class="info">
        <isinclude template="myTemplate" />
    </div>
<iselse/>
    <isinclude template="myTemplate" />
</isif>
```

There are other possible, potentially more "best-practice" approaches, but it goes beyond the scope of this article.

And, to avoid possible doubts, here is an extra piece of information: it is allowed to have isml tags within html tags, such as:

```html
<div <isif ...> </isif> />
```

### Line by Line (disableTreeParse : true)

This is a more robust, less powerful mode. It only has a few set of rules available and is indicated for cases where there are many, many lint errors and you want fix them gradually. It is also recommended in cases you don't want to force templates to be parseable (see previous section). This mode is ideally temporary, as it cannot take advantages of even some simple rules, such as indentation checking.

### Git Hooks (Optional)

To prevent new errors to be introduced in next pushes, we recommend using some git hook npm package, such as [husky][npm-husky] or [ghooks][npm-ghooks]. The following example works for ghook:

```js
"config": {
    "ghooks": {
      "pre-push": "npm run build:isml"
    }
}
```

## API

Check the [API docs][api-docs].

## Available Rules

| Rule                                                                                 | Description |
| ------------------------------------------------------------------------------------ |:-----------------------------------------|
| [no-br][no-br-readme]                                                                | Disallows &lt;br/> tags. Enable this rule if you prefer to use CSS to handle vertical spacing |
| [no-git-conflict][no-git-conflict-readme]                                            | Disallows unresolved Git conflicts |
| [no-import-package][no-import-package-readme]                                        | Disallows `importPackage()` function. It is recommended by SalesForce to use require() instead |
| [no-isscript][no-isscript-readme]                                                    | Disallows &lt;isscript/> tag in template. Enable this rule if you prefer logic to be kept in a separate .ds/.js file |
| :wrench: [no-trailing-spaces][no-isscript-readme]                                    | Disallows trailing blank spaces |
| :wrench: [no-space-only-lines][no-space-only-lines-readme]                           | Disallows lines that contain only blank spaces, i.e., unnecessarily indented |
| [no-inline-style][no-inline-style-readme]                                            | Disallows use of "style" HTML attribute. Enable this rule if you prefer style to be fully handled via CSS |
| :wrench: [no-tabs][no-tabs-readme]                                                   | Disallows use of tabs |
| [enforce-isprint][enforce-isprint-readme]                                            | Enforces every ${string} to be wrapped by an &lt;isprint/> tag |
| [enforce-require][enforce-require-readme]                                            | Disallows direct calls to a DigitalScript class, such as in:<br/>`var PaymentMgr = dw.order.PaymentMgr;`<br/>For this case, it is recommended to use instead:<br/>`var PaymentMgr = require('dw/order/PaymentMgr');` |
| [lowercase-filename][lowercase-filename-readme]                               | Disallows template names to have uppercase characters |
| :small_orange_diamond: [no-hardcode][no-hardcode-readme]                             | Disallows hardcoded strings outside ISML expressions |
| :small_orange_diamond: [indent][indent-readme]                                       | Sets indentation size |
| :small_orange_diamond: [no-require-in-loop][no-require-in-loop-readme]               | No `require()` calls from within a loop in the template |
| :small_orange_diamond: [no-embedded-isml][no-embedded-isml-readme]                   | Disallows embedded isml tags, such as in <div &lt;isif /> />, except for &lt;isprint /> |
| :small_orange_diamond: [max-depth][max-depth-readme]                                 | Sets the maximum of nested elements in a template |
| :wrench: :small_orange_diamond: [one-element-per-line][one-element-per-line-readme]  | One element per line |
| :wrench: :small_orange_diamond: [leading-iscontent][leading-iscontent-readme] | Ensures &lt;iscontent> tag is the first element in the template if present |
| :wrench: :small_orange_diamond: [leading-iscache][leading-iscache-readme]     | Ensures &lt;iscache> tag is among the first element in the template if present |
| :small_orange_diamond: [no-deprecated-attrs][no-deprecated-attrs-readme]      | Disallows deprecated attributes or attribute values |
| :small_orange_diamond: [contextual-attrs][contextual-attrs-readme]            | Disallows presence of mutually exclusive attributes |
| :small_orange_diamond: [custom-tags][custom-tags-readme]                      | Checks if "util/modules" template is actually needed or if it is missing |
| :boom: :small_orange_diamond: [eslint-to-isscript][eslint-to-isscript-readme] | Applies ESLint rules to &lt;isscript> tag content |
| :boom: :small_orange_diamond: [no-iselse-slash][no-iselse-slash-readme]              | Disallows self-closing &lt;iselse> and &lt;iselseif> tags |
| :boom: :small_orange_diamond: [empty-eof][empty-eof-readme]                          | Enforces a empty line at the end of the template |

You are more than welcome to contribute with us! Please check the [contribute section][contribute-docs].

## Iconography
:exclamation: Deprecated feature<br/>
:boom: New feature<br/>
:small_orange_diamond: Rules that require "disableTreeParse" configuration not to be true.<br/>
:wrench: Auto-fix available<br/>

[no-br-readme]:                  <docs/rules/no-br.md>
[no-git-conflict-readme]:        <docs/rules/no-git-conflict.md>
[no-import-package-readme]:      <docs/rules/no-import-package.md>
[no-isscript-readme]:            <docs/rules/no-isscript.md>
[no-trailing-spaces-readme]:     <docs/rules/no-trailing-spaces.md>
[no-space-only-lines-readme]:    <docs/rules/no-space-only-lines.md>
[no-inline-style-readme]:        <docs/rules/no-inline-style.md>
[no-tabs-readme]:                <docs/rules/no-tabs.md>
[enforce-isprint-readme]:        <docs/rules/enforce-isprint.md>
[enforce-require-readme]:        <docs/rules/enforce-require.md>
[lowercase-filename-readme]:     <docs/rules/lowercase-filename.md>
[no-hardcode-readme]:            <docs/rules/no-hardcode.md>
[indent-readme]:                 <docs/rules/indent.md>
[no-require-in-loop-readme]:     <docs/rules/no-require-in-loop.md>
[no-embedded-isml-readme]:       <docs/rules/no-embedded-isml.md>
[max-depth-readme]:              <docs/rules/max-depth.md>
[one-element-per-line-readme]:   <docs/rules/one-element-per-line.md>
[leading-iscontent-readme]:      <docs/rules/leading-iscontent.md>
[leading-iscache-readme]:        <docs/rules/leading-iscache.md>
[no-deprecated-attrs-readme]:    <docs/rules/no-deprecated-attrs.md>
[contextual-attrs-readme]:       <docs/rules/contextual-attrs.md>
[custom-tags-readme]:            <docs/rules/custom-tags.md>
[eslint-to-isscript-readme]:     <docs/rules/eslint-to-isscript.md>
[no-iselse-slash-readme]:        <docs/rules/no-iselse-slash.md>
[empty-eof-readme]:              <docs/rules/empty-eof.md>

[api-docs]: <docs/api.md>
[contribute-docs]: <docs/contribute.md>

[npm-husky]: <https://www.npmjs.com/package/husky>
[npm-ghooks]: <https://www.npmjs.com/package/ghooks>
