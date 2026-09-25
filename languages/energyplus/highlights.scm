; Field annotations written by IDF Editor, e.g. `!- Name`
((comment) @comment.doc
  (#match? @comment.doc "^!-"))

((comment) @comment
  (#not-match? @comment "^!-"))

(macro) @preproc

(class_name) @type

(number) @number

; Special keyword values accepted by many numeric fields
((string) @constant.builtin
  (#match? @constant.builtin "^(?i)(autosize|autocalculate)$"))

; Snippet placeholders (`???`) left for the user to fill in
((string) @keyword
  (#eq? @keyword "???"))

((string) @string
  (#not-match? @string "^((?i)(autosize|autocalculate)|\\?\\?\\?)$"))

[
  ","
  ";"
] @punctuation.delimiter
