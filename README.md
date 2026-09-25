# EnergyPlus for Zed

Syntax highlighting for [EnergyPlus](https://energyplus.net) input files in the
[Zed](https://zed.dev) editor, modeled after
[vs-code-energyplus-modelkit](https://github.com/bigladder/vs-code-energyplus-modelkit).

File types: `.idf`, `.imf`, `.ddy`, `.edd`, `.mdd`, `.rdd`

## Features

- Class names (`Building`, `Zone`, `Output:Variable`, ...)
- Numeric vs. text field values
- `Autosize` / `Autocalculate` keywords
- `!` comments, with `!- Field Name` annotations styled as doc comments
- EP-Macro directives (`##include`, `##def`, ...)
- `???` snippet placeholders
- Outline panel (`cmd-shift-o`) listing every object as `ClassName Name`
- Toggle line comment (`cmd-/`) using `!`

## Layout

```
extension.toml                  Zed extension manifest
languages/energyplus/
  config.toml                   file suffixes, comment token
  highlights.scm                syntax highlighting queries
  outline.scm                   outline/symbol queries
tree-sitter-idf/                Tree-sitter grammar
  grammar.js                    grammar source
  src/                          generated parser (commit this!)
  test/corpus/                  grammar tests
```

## Development

### Changing the grammar

```sh
cd tree-sitter-idf
npm install
npx tree-sitter generate   # regenerates src/parser.c
npx tree-sitter test
```

Zed compiles `tree-sitter-idf/src/parser.c` to WebAssembly itself, so the
generated `src/` directory must be committed.

### Installing locally in Zed

Zed fetches the grammar from the pushed Git commit named in `extension.toml`,
even for dev extensions:

1. Commit and push your grammar changes, then copy the commit SHA
   (`git rev-parse HEAD`).
2. Put that SHA in `rev` under `[grammars.idf]` in `extension.toml`.
3. In Zed, run **zed: install dev extension** from the command palette and
   select this folder.
4. Open an `.idf` file. After changing the grammar, repeat steps 1–2 and click
   **Rebuild** on the extension in the Extensions panel. Query and
   `config.toml` changes only need a rebuild.

Check **zed: open log** if the extension fails to build.

### Publishing

1. Add a `LICENSE` file. The Zed extension registry requires one.
2. Open a PR to [zed-industries/extensions](https://github.com/zed-industries/extensions)
   that adds this repo as a submodule and an entry in `extensions.toml`.
   See the [Zed extension docs](https://zed.dev/docs/extensions/developing-extensions).
