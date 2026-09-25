/**
 * @file Tree-sitter grammar for EnergyPlus Input Data Files (IDF)
 * @license BSD-3-Clause
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

// Free text that does not start/end with whitespace and cannot contain the
// IDF delimiters (`,` `;`) or the comment character (`!`).
const TEXT = /[^,;!\s]([^,;!\n\r]*[^,;!\s])?/;

module.exports = grammar({
  name: "idf",

  extras: ($) => [/\s/, $.comment, $.macro],

  rules: {
    source_file: ($) => repeat($.object),

    // ClassName, field1, field2, ..., fieldN;
    object: ($) =>
      seq(
        field("class", $.class_name),
        optional(
          seq(
            ",",
            optional(field("name", $._value)),
            repeat(seq(",", optional($._value))),
          ),
        ),
        ";",
      ),

    // EP-Macro directives used in .imf files, e.g. `##include file.idf`.
    macro: (_) => token(prec(1, seq("##", /[^\n\r]*/))),

    // `!- Field Name` annotations and regular `!` comments.
    comment: (_) => token(seq("!", /[^\n\r]*/)),

    // Declared before the free-text tokens so that equal-length matches such
    // as `10` lex as numbers, while longer text like `10 Floors` stays a string.
    number: (_) => token(/[-+]?(\d+\.?\d*|\.\d+)([eE][-+]?\d+)?/),

    class_name: (_) => token(TEXT),

    _value: ($) => choice($.number, $.string),

    string: (_) => token(TEXT),
  },
});
