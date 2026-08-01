# Conformance: [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0) draft2020-12

## Report options

| Profile | Options | SHA-256 |
| --- | --- | --- |
| base | {"formatProfile":"base","fast":{"mode":"lax","allErrors":false,"useDefaults":false,"removeAdditional":false,"contentValidation":false,"formatAssertion":false,"extraFormats":false,"weakFormats":true,"allowUnusedKeywords":true,"allowUnreachable":true,"$schemaDefault":"https://json-schema.org/draft/2020-12/schema","includeErrors":false},"detailed":{"mode":"lax","allErrors":false,"useDefaults":false,"removeAdditional":false,"contentValidation":false,"formatAssertion":false,"extraFormats":false,"weakFormats":true,"allowUnusedKeywords":true,"allowUnreachable":true,"$schemaDefault":"https://json-schema.org/draft/2020-12/schema","includeErrors":true}} | 9220c41402fc50d9f34a25300eae9682cf50ecc0a2a2a141b6d2c61451dd3509 |
| format-assertion | {"formatProfile":"format-assertion","fast":{"mode":"lax","allErrors":false,"useDefaults":false,"removeAdditional":false,"contentValidation":false,"formatAssertion":true,"extraFormats":false,"weakFormats":true,"allowUnusedKeywords":true,"allowUnreachable":true,"$schemaDefault":"https://json-schema.org/draft/2020-12/schema","includeErrors":false},"detailed":{"mode":"lax","allErrors":false,"useDefaults":false,"removeAdditional":false,"contentValidation":false,"formatAssertion":true,"extraFormats":false,"weakFormats":true,"allowUnusedKeywords":true,"allowUnreachable":true,"$schemaDefault":"https://json-schema.org/draft/2020-12/schema","includeErrors":true}} | 2f4cc70a079861858a5823e870c366a75973018100dce6bdf29d495e57113c33 |

## Counts

| Profile | Status | Cases | Percentage |
| --- | --- | ---: | ---: |
| base | PASS | 1443 | 99.04% |
| base | WRONG | 1 | 0.07% |
| base | COMPILE | 9 | 0.62% |
| base | RUNTIME | 4 | 0.27% |
| base | UNSUPPORTED | 0 | 0.00% |
| format-assertion | PASS | 488 | 73.16% |
| format-assertion | WRONG | 36 | 5.40% |
| format-assertion | COMPILE | 143 | 21.44% |
| format-assertion | RUNTIME | 0 | 0.00% |
| format-assertion | UNSUPPORTED | 0 | 0.00% |

## Non-PASS cases

| Case ID | Description | Expected | Observed | Status | Error |
| --- | --- | --- | --- | --- | --- |
| draft2020-12:defs.json#/groups/0/tests/0 | valid definition schema | true |  | COMPILE | FAST_COMPILE_ERROR: failed to resolve $ref: "https://json-schema.org/draft/2020-12/schema" at # |
| draft2020-12:defs.json#/groups/0/tests/1 | invalid definition schema | false |  | COMPILE | FAST_COMPILE_ERROR: failed to resolve $ref: "https://json-schema.org/draft/2020-12/schema" at # |
| draft2020-12:dynamicRef.json#/groups/20/tests/1 | data is not sufficient for schema at second#/$defs/length | false | true | WRONG |  |
| draft2020-12:optional/format-assertion.json#/groups/0/tests/0 | format-assertion: false: valid string | true |  | COMPILE | FAST_COMPILE_ERROR: Unexpected schema version: "https://localhost:1234/draft2020-12/format-assertion-false.json" at # |
| draft2020-12:optional/format-assertion.json#/groups/0/tests/1 | format-assertion: false: invalid string | false |  | COMPILE | FAST_COMPILE_ERROR: Unexpected schema version: "https://localhost:1234/draft2020-12/format-assertion-false.json" at # |
| draft2020-12:optional/format-assertion.json#/groups/1/tests/0 | format-assertion: true: valid string | true |  | COMPILE | FAST_COMPILE_ERROR: Unexpected schema version: "https://localhost:1234/draft2020-12/format-assertion-true.json" at # |
| draft2020-12:optional/format-assertion.json#/groups/1/tests/1 | format-assertion: true: invalid string | false |  | COMPILE | FAST_COMPILE_ERROR: Unexpected schema version: "https://localhost:1234/draft2020-12/format-assertion-true.json" at # |
| draft2020-12:optional/format/duration.json#/groups/0/tests/32 | fractional duration is not allowed by RFC 3339 ABNF | false | true | WRONG |  |
| draft2020-12:optional/format/duration.json#/groups/0/tests/37 | years and days cannot appear without months | false | true | WRONG |  |
| draft2020-12:optional/format/duration.json#/groups/0/tests/40 | hours and seconds cannot appear without minutes | false | true | WRONG |  |
| draft2020-12:optional/format/email.json#/groups/0/tests/11 | a quoted string with a space in the local part is valid | true | false | WRONG | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/email.json#/groups/0/tests/12 | a quoted string with a double dot in the local part is valid | true | false | WRONG | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/email.json#/groups/0/tests/13 | a quoted string with a @ in the local part is valid | true | false | WRONG | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/email.json#/groups/0/tests/14 | an IPv4-address-literal after the @ is valid | true | false | WRONG | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/email.json#/groups/0/tests/15 | an IPv6-address-literal after the @ is valid | true | false | WRONG | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/hostname.json#/groups/0/tests/14 | trailing dot | false | true | WRONG |  |
| draft2020-12:optional/format/hostname.json#/groups/1/tests/0 | invalid Punycode | false | true | WRONG |  |
| draft2020-12:optional/format/hostname.json#/groups/1/tests/2 | contains illegal char U+302E Hangul single dot tone mark | false | true | WRONG |  |
| draft2020-12:optional/format/hostname.json#/groups/1/tests/3 | Begins with a Spacing Combining Mark | false | true | WRONG |  |
| draft2020-12:optional/format/hostname.json#/groups/1/tests/4 | Begins with a Nonspacing Mark | false | true | WRONG |  |
| draft2020-12:optional/format/hostname.json#/groups/1/tests/5 | Begins with an Enclosing Mark | false | true | WRONG |  |
| draft2020-12:optional/format/hostname.json#/groups/1/tests/8 | Exceptions that are DISALLOWED, right-to-left chars | false | true | WRONG |  |
| draft2020-12:optional/format/hostname.json#/groups/1/tests/9 | Exceptions that are DISALLOWED, left-to-right chars | false | true | WRONG |  |
| draft2020-12:optional/format/hostname.json#/groups/1/tests/10 | MIDDLE DOT with no preceding 'l' | false | true | WRONG |  |
| draft2020-12:optional/format/hostname.json#/groups/1/tests/11 | MIDDLE DOT with nothing preceding | false | true | WRONG |  |
| draft2020-12:optional/format/hostname.json#/groups/1/tests/12 | MIDDLE DOT with no following 'l' | false | true | WRONG |  |
| draft2020-12:optional/format/hostname.json#/groups/1/tests/13 | MIDDLE DOT with nothing following | false | true | WRONG |  |
| draft2020-12:optional/format/hostname.json#/groups/1/tests/15 | Greek KERAIA not followed by Greek | false | true | WRONG |  |
| draft2020-12:optional/format/hostname.json#/groups/1/tests/16 | Greek KERAIA not followed by anything | false | true | WRONG |  |
| draft2020-12:optional/format/hostname.json#/groups/1/tests/18 | Hebrew GERESH not preceded by Hebrew | false | true | WRONG |  |
| draft2020-12:optional/format/hostname.json#/groups/1/tests/19 | Hebrew GERESH not preceded by anything | false | true | WRONG |  |
| draft2020-12:optional/format/hostname.json#/groups/1/tests/21 | Hebrew GERSHAYIM not preceded by Hebrew | false | true | WRONG |  |
| draft2020-12:optional/format/hostname.json#/groups/1/tests/22 | Hebrew GERSHAYIM not preceded by anything | false | true | WRONG |  |
| draft2020-12:optional/format/hostname.json#/groups/1/tests/24 | KATAKANA MIDDLE DOT with no Hiragana, Katakana, or Han | false | true | WRONG |  |
| draft2020-12:optional/format/hostname.json#/groups/1/tests/25 | KATAKANA MIDDLE DOT with no other characters | false | true | WRONG |  |
| draft2020-12:optional/format/hostname.json#/groups/1/tests/29 | Arabic-Indic digits mixed with Extended Arabic-Indic digits | false | true | WRONG |  |
| draft2020-12:optional/format/hostname.json#/groups/1/tests/32 | ZERO WIDTH JOINER not preceded by Virama | false | true | WRONG |  |
| draft2020-12:optional/format/hostname.json#/groups/1/tests/33 | ZERO WIDTH JOINER not preceded by anything | false | true | WRONG |  |
| draft2020-12:optional/format/hostname.json#/groups/1/tests/37 | contains "--" in the 3rd and 4th position | false | true | WRONG |  |
| draft2020-12:optional/format/idn-email.json#/groups/0/tests/0 | all string formats ignore integers | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-email" at # |
| draft2020-12:optional/format/idn-email.json#/groups/0/tests/1 | all string formats ignore floats | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-email" at # |
| draft2020-12:optional/format/idn-email.json#/groups/0/tests/2 | all string formats ignore objects | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-email" at # |
| draft2020-12:optional/format/idn-email.json#/groups/0/tests/3 | all string formats ignore arrays | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-email" at # |
| draft2020-12:optional/format/idn-email.json#/groups/0/tests/4 | all string formats ignore booleans | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-email" at # |
| draft2020-12:optional/format/idn-email.json#/groups/0/tests/5 | all string formats ignore nulls | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-email" at # |
| draft2020-12:optional/format/idn-email.json#/groups/0/tests/6 | a valid idn e-mail (example@example.test in Hangul) | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-email" at # |
| draft2020-12:optional/format/idn-email.json#/groups/0/tests/7 | an invalid e-mail/idn e-mail address | false |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-email" at # |
| draft2020-12:optional/format/idn-email.json#/groups/0/tests/8 | a valid e-mail address | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-email" at # |
| draft2020-12:optional/format/idn-email.json#/groups/0/tests/9 | a non-ASCII local part with an ASCII domain is valid | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-email" at # |
| draft2020-12:optional/format/idn-email.json#/groups/0/tests/10 | a non-ASCII quoted local part is valid | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-email" at # |
| draft2020-12:optional/format/idn-email.json#/groups/0/tests/11 | a local part with a lone UTF-16 surrogate is invalid | false |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-email" at # |
| draft2020-12:optional/format/idn-email.json#/groups/0/tests/12 | a domain label that is not in Unicode NFC is valid | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-email" at # |
| draft2020-12:optional/format/idn-email.json#/groups/0/tests/13 | a local part that is not in Unicode NFC is valid | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-email" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/0 | all string formats ignore integers | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/1 | all string formats ignore floats | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/2 | all string formats ignore objects | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/3 | all string formats ignore arrays | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/4 | all string formats ignore booleans | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/5 | all string formats ignore nulls | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/6 | a valid host name (example.test in Hangul) | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/7 | illegal first char U+302E Hangul single dot tone mark | false |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/8 | contains illegal char U+302E Hangul single dot tone mark | false |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/9 | a single label of 63 characters is valid | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/10 | a single label of 64 characters is too long | false |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/11 | invalid label, correct Punycode | false |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/12 | valid Chinese Punycode | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/13 | invalid Punycode | false |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/14 | U-label contains "--" in the 3rd and 4th position | false |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/15 | U-label starts with a dash | false |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/16 | U-label ends with a dash | false |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/17 | U-label starts and ends with a dash | false |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/18 | Begins with a Spacing Combining Mark | false |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/19 | Begins with a Nonspacing Mark | false |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/20 | Begins with an Enclosing Mark | false |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/21 | Exceptions that are PVALID, left-to-right chars | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/22 | Exceptions that are PVALID, right-to-left chars | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/23 | Exceptions that are DISALLOWED, right-to-left chars | false |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/24 | Exceptions that are DISALLOWED, left-to-right chars | false |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/25 | MIDDLE DOT with no preceding 'l' | false |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/26 | MIDDLE DOT with nothing preceding | false |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/27 | MIDDLE DOT with no following 'l' | false |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/28 | MIDDLE DOT with nothing following | false |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/29 | MIDDLE DOT with surrounding 'l's | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/30 | Greek KERAIA not followed by Greek | false |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/31 | Greek KERAIA not followed by anything | false |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/32 | Greek KERAIA followed by Greek | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/33 | Hebrew GERESH not preceded by Hebrew | false |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/34 | Hebrew GERESH not preceded by anything | false |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/35 | Hebrew GERESH preceded by Hebrew | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/36 | Hebrew GERSHAYIM not preceded by Hebrew | false |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/37 | Hebrew GERSHAYIM not preceded by anything | false |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/38 | Hebrew GERSHAYIM preceded by Hebrew | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/39 | KATAKANA MIDDLE DOT with no Hiragana, Katakana, or Han | false |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/40 | KATAKANA MIDDLE DOT with no other characters | false |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/41 | KATAKANA MIDDLE DOT with Hiragana | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/42 | KATAKANA MIDDLE DOT with Katakana | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/43 | KATAKANA MIDDLE DOT with Han | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/44 | Arabic-Indic digits mixed with Extended Arabic-Indic digits | false |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/45 | Arabic-Indic digits not mixed with Extended Arabic-Indic digits | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/46 | Extended Arabic-Indic digits not mixed with Arabic-Indic digits | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/47 | ZERO WIDTH JOINER not preceded by Virama | false |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/48 | ZERO WIDTH JOINER not preceded by anything | false |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/49 | ZERO WIDTH JOINER preceded by Virama | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/50 | ZERO WIDTH NON-JOINER preceded by Virama | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/51 | ZERO WIDTH NON-JOINER not preceded by Virama but matches regexp | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/52 | single label | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/53 | single label with hyphen | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/54 | single label with digits | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/55 | single label starting with digit | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/56 | single label ending with digit | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/57 | empty string | false |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/58 | zero width non-joiner must pass at every occurrence | false |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/59 | Bidi domain name with a digit-first label is invalid | false |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/60 | label starting with a digit before a right-to-left letter is invalid | false |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/61 | left-to-right label containing a right-to-left letter is invalid | false |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/62 | right-to-left label mixing both digit types is invalid | false |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/63 | A-label that decodes to a disallowed code point is invalid | false |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/64 | A-label that decodes to a Bidi rule violation is invalid | false |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/65 | a U-label whose A-label form is longer than 63 octets is invalid | false |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/66 | empty label between two dots is invalid | false |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/67 | a name longer than 253 characters is invalid | false |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/68 | A-label that decodes to only ASCII is invalid | false |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/69 | non-canonical Punycode that does not re-encode to itself is invalid | false |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/1/tests/0 | single dot | false |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/1/tests/1 | single ideographic full stop | false |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/1/tests/2 | single fullwidth full stop | false |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/1/tests/3 | single halfwidth ideographic full stop | false |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/1/tests/4 | dot as label separator | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/1/tests/5 | ideographic full stop as label separator | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/1/tests/6 | fullwidth full stop as label separator | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/1/tests/7 | halfwidth ideographic full stop as label separator | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/1/tests/8 | leading dot | false |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/1/tests/9 | leading ideographic full stop | false |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/1/tests/10 | leading fullwidth full stop | false |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/1/tests/11 | leading halfwidth ideographic full stop | false |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/1/tests/12 | trailing dot | false |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/1/tests/13 | trailing ideographic full stop | false |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/1/tests/14 | trailing fullwidth full stop | false |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/1/tests/15 | trailing halfwidth ideographic full stop | false |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/1/tests/16 | label too long if separator ignored (full stop) | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/1/tests/17 | label too long if separator ignored (ideographic full stop) | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/1/tests/18 | label too long if separator ignored (fullwidth full stop) | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/1/tests/19 | label too long if separator ignored (halfwidth ideographic full stop) | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/ipv4.json#/groups/0/tests/37 | single octet out of range in last position | false | true | WRONG |  |
| draft2020-12:optional/format/iri-reference.json#/groups/0/tests/0 | all string formats ignore integers | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "iri-reference" at # |
| draft2020-12:optional/format/iri-reference.json#/groups/0/tests/1 | all string formats ignore floats | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "iri-reference" at # |
| draft2020-12:optional/format/iri-reference.json#/groups/0/tests/2 | all string formats ignore objects | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "iri-reference" at # |
| draft2020-12:optional/format/iri-reference.json#/groups/0/tests/3 | all string formats ignore arrays | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "iri-reference" at # |
| draft2020-12:optional/format/iri-reference.json#/groups/0/tests/4 | all string formats ignore booleans | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "iri-reference" at # |
| draft2020-12:optional/format/iri-reference.json#/groups/0/tests/5 | all string formats ignore nulls | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "iri-reference" at # |
| draft2020-12:optional/format/iri-reference.json#/groups/0/tests/6 | a valid IRI | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "iri-reference" at # |
| draft2020-12:optional/format/iri-reference.json#/groups/0/tests/7 | a valid protocol-relative IRI Reference | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "iri-reference" at # |
| draft2020-12:optional/format/iri-reference.json#/groups/0/tests/8 | a valid relative IRI Reference | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "iri-reference" at # |
| draft2020-12:optional/format/iri-reference.json#/groups/0/tests/9 | an invalid IRI Reference | false |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "iri-reference" at # |
| draft2020-12:optional/format/iri-reference.json#/groups/0/tests/10 | a valid IRI Reference | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "iri-reference" at # |
| draft2020-12:optional/format/iri-reference.json#/groups/0/tests/11 | a valid IRI fragment | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "iri-reference" at # |
| draft2020-12:optional/format/iri-reference.json#/groups/0/tests/12 | an invalid IRI fragment | false |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "iri-reference" at # |
| draft2020-12:optional/format/iri.json#/groups/0/tests/0 | all string formats ignore integers | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "iri" at # |
| draft2020-12:optional/format/iri.json#/groups/0/tests/1 | all string formats ignore floats | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "iri" at # |
| draft2020-12:optional/format/iri.json#/groups/0/tests/2 | all string formats ignore objects | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "iri" at # |
| draft2020-12:optional/format/iri.json#/groups/0/tests/3 | all string formats ignore arrays | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "iri" at # |
| draft2020-12:optional/format/iri.json#/groups/0/tests/4 | all string formats ignore booleans | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "iri" at # |
| draft2020-12:optional/format/iri.json#/groups/0/tests/5 | all string formats ignore nulls | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "iri" at # |
| draft2020-12:optional/format/iri.json#/groups/0/tests/6 | a valid IRI with anchor tag | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "iri" at # |
| draft2020-12:optional/format/iri.json#/groups/0/tests/7 | a valid IRI with anchor tag and parentheses | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "iri" at # |
| draft2020-12:optional/format/iri.json#/groups/0/tests/8 | a valid IRI with URL-encoded stuff | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "iri" at # |
| draft2020-12:optional/format/iri.json#/groups/0/tests/9 | a valid IRI with many special characters | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "iri" at # |
| draft2020-12:optional/format/iri.json#/groups/0/tests/10 | a valid IRI based on IPv6 | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "iri" at # |
| draft2020-12:optional/format/iri.json#/groups/0/tests/11 | an IPv6 address without enclosing brackets is invalid | false |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "iri" at # |
| draft2020-12:optional/format/iri.json#/groups/0/tests/12 | an invalid relative IRI Reference | false |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "iri" at # |
| draft2020-12:optional/format/iri.json#/groups/0/tests/13 | an invalid IRI | false |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "iri" at # |
| draft2020-12:optional/format/iri.json#/groups/0/tests/14 | an invalid IRI though valid IRI reference | false |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "iri" at # |
| draft2020-12:optional/format/time.json#/groups/0/tests/41 | no time offset | false | true | WRONG |  |
| draft2020-12:optional/format/time.json#/groups/0/tests/42 | no time offset with second fraction | false | true | WRONG |  |
| draft2020-12:optional/format/unknown.json#/groups/0/tests/0 | unknown formats ignore integers | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "unknown" at # |
| draft2020-12:optional/format/unknown.json#/groups/0/tests/1 | unknown formats ignore floats | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "unknown" at # |
| draft2020-12:optional/format/unknown.json#/groups/0/tests/2 | unknown formats ignore objects | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "unknown" at # |
| draft2020-12:optional/format/unknown.json#/groups/0/tests/3 | unknown formats ignore arrays | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "unknown" at # |
| draft2020-12:optional/format/unknown.json#/groups/0/tests/4 | unknown formats ignore booleans | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "unknown" at # |
| draft2020-12:optional/format/unknown.json#/groups/0/tests/5 | unknown formats ignore nulls | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "unknown" at # |
| draft2020-12:optional/format/unknown.json#/groups/0/tests/6 | unknown formats ignore strings | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "unknown" at # |
| draft2020-12:optional/format/uri.json#/groups/0/tests/43 | non-numeric port is invalid | false | true | WRONG |  |
| draft2020-12:ref.json#/groups/6/tests/0 | remote ref valid | true |  | COMPILE | FAST_COMPILE_ERROR: failed to resolve $ref: "https://json-schema.org/draft/2020-12/schema" at # |
| draft2020-12:ref.json#/groups/6/tests/1 | remote ref invalid | false |  | COMPILE | FAST_COMPILE_ERROR: failed to resolve $ref: "https://json-schema.org/draft/2020-12/schema" at # |
| draft2020-12:unevaluatedItems.json#/groups/18/tests/0 | with no unevaluated items | true |  | RUNTIME | FAST_RUNTIME_ERROR: Cannot read properties of null (reading '0') |
| draft2020-12:unevaluatedItems.json#/groups/18/tests/1 | with unevaluated items | false |  | RUNTIME | FAST_RUNTIME_ERROR: Cannot read properties of null (reading '0') |
| draft2020-12:unevaluatedProperties.json#/groups/21/tests/0 | with no unevaluated properties | true |  | RUNTIME | FAST_RUNTIME_ERROR: Cannot read properties of null (reading '0') |
| draft2020-12:unevaluatedProperties.json#/groups/21/tests/1 | with unevaluated properties | false |  | RUNTIME | FAST_RUNTIME_ERROR: Cannot read properties of null (reading '0') |
| draft2020-12:vocabulary.json#/groups/0/tests/0 | applicator vocabulary still works | false |  | COMPILE | FAST_COMPILE_ERROR: Unexpected schema version: "https://localhost:1234/draft2020-12/metaschema-no-validation.json" at # |
| draft2020-12:vocabulary.json#/groups/0/tests/1 | no validation: valid number | true |  | COMPILE | FAST_COMPILE_ERROR: Unexpected schema version: "https://localhost:1234/draft2020-12/metaschema-no-validation.json" at # |
| draft2020-12:vocabulary.json#/groups/0/tests/2 | no validation: invalid number, but it still validates | true |  | COMPILE | FAST_COMPILE_ERROR: Unexpected schema version: "https://localhost:1234/draft2020-12/metaschema-no-validation.json" at # |
| draft2020-12:vocabulary.json#/groups/1/tests/0 | string value | false |  | COMPILE | FAST_COMPILE_ERROR: Unexpected schema version: "https://localhost:1234/draft2020-12/metaschema-optional-vocabulary.json" at # |
| draft2020-12:vocabulary.json#/groups/1/tests/1 | number value | true |  | COMPILE | FAST_COMPILE_ERROR: Unexpected schema version: "https://localhost:1234/draft2020-12/metaschema-optional-vocabulary.json" at # |

## Detailed errors for invalid results

| Case ID | Description | Status | Error |
| --- | --- | --- | --- |
| draft2020-12:additionalProperties.json#/groups/0/tests/1 | an additional property is invalid | PASS | {"keywordLocation":"#/additionalProperties","instanceLocation":"#/quux"} |
| draft2020-12:additionalProperties.json#/groups/1/tests/1 | not matching the pattern is invalid | PASS | {"keywordLocation":"#/additionalProperties","instanceLocation":"#/élmény"} |
| draft2020-12:additionalProperties.json#/groups/2/tests/2 | an additional invalid property is invalid | PASS | {"keywordLocation":"#/additionalProperties/type","instanceLocation":"#/quux"} |
| draft2020-12:additionalProperties.json#/groups/3/tests/1 | an additional invalid property is invalid | PASS | {"keywordLocation":"#/additionalProperties/type","instanceLocation":"#/foo"} |
| draft2020-12:additionalProperties.json#/groups/5/tests/0 | properties defined in allOf are not examined | PASS | {"keywordLocation":"#/additionalProperties/type","instanceLocation":"#/foo"} |
| draft2020-12:additionalProperties.json#/groups/7/tests/1 | Valid against propertyNames, but not additionalProperties | PASS | {"keywordLocation":"#/additionalProperties/type","instanceLocation":"#/pear"} |
| draft2020-12:additionalProperties.json#/groups/8/tests/0 | additionalProperties doesn't consider dependentSchemas | PASS | {"keywordLocation":"#/additionalProperties","instanceLocation":"#/foo"} |
| draft2020-12:additionalProperties.json#/groups/8/tests/1 | additionalProperties can't see bar | PASS | {"keywordLocation":"#/additionalProperties","instanceLocation":"#/bar"} |
| draft2020-12:additionalProperties.json#/groups/8/tests/2 | additionalProperties can't see bar even when foo2 is present | PASS | {"keywordLocation":"#/additionalProperties","instanceLocation":"#/bar"} |
| draft2020-12:allOf.json#/groups/0/tests/1 | mismatch second | PASS | {"keywordLocation":"#/allOf/0/required","instanceLocation":"#/bar"} |
| draft2020-12:allOf.json#/groups/0/tests/2 | mismatch first | PASS | {"keywordLocation":"#/allOf/1/required","instanceLocation":"#/foo"} |
| draft2020-12:allOf.json#/groups/0/tests/3 | wrong type | PASS | {"keywordLocation":"#/allOf/0/properties/bar/type","instanceLocation":"#/bar"} |
| draft2020-12:allOf.json#/groups/1/tests/1 | mismatch base schema | PASS | {"keywordLocation":"#/required","instanceLocation":"#/bar"} |
| draft2020-12:allOf.json#/groups/1/tests/2 | mismatch first allOf | PASS | {"keywordLocation":"#/allOf/0/required","instanceLocation":"#/foo"} |
| draft2020-12:allOf.json#/groups/1/tests/3 | mismatch second allOf | PASS | {"keywordLocation":"#/allOf/1/required","instanceLocation":"#/baz"} |
| draft2020-12:allOf.json#/groups/1/tests/4 | mismatch both | PASS | {"keywordLocation":"#/allOf/0/required","instanceLocation":"#/foo"} |
| draft2020-12:allOf.json#/groups/2/tests/1 | mismatch one | PASS | {"keywordLocation":"#/allOf/0/maximum","instanceLocation":"#"} |
| draft2020-12:allOf.json#/groups/4/tests/0 | any value is invalid | PASS | {"keywordLocation":"#/allOf/1","instanceLocation":"#"} |
| draft2020-12:allOf.json#/groups/5/tests/0 | any value is invalid | PASS | {"keywordLocation":"#/allOf/0","instanceLocation":"#"} |
| draft2020-12:allOf.json#/groups/8/tests/1 | string is invalid | PASS | {"keywordLocation":"#/allOf/1/type","instanceLocation":"#"} |
| draft2020-12:allOf.json#/groups/9/tests/1 | string is invalid | PASS | {"keywordLocation":"#/allOf/0/type","instanceLocation":"#"} |
| draft2020-12:allOf.json#/groups/10/tests/1 | anything non-null is invalid | PASS | {"keywordLocation":"#/allOf/0/allOf/0/type","instanceLocation":"#"} |
| draft2020-12:allOf.json#/groups/11/tests/0 | allOf: false, anyOf: false, oneOf: false | PASS | {"keywordLocation":"#/allOf/0/multipleOf","instanceLocation":"#"} |
| draft2020-12:allOf.json#/groups/11/tests/1 | allOf: false, anyOf: false, oneOf: true | PASS | {"keywordLocation":"#/allOf/0/multipleOf","instanceLocation":"#"} |
| draft2020-12:allOf.json#/groups/11/tests/2 | allOf: false, anyOf: true, oneOf: false | PASS | {"keywordLocation":"#/allOf/0/multipleOf","instanceLocation":"#"} |
| draft2020-12:allOf.json#/groups/11/tests/3 | allOf: false, anyOf: true, oneOf: true | PASS | {"keywordLocation":"#/allOf/0/multipleOf","instanceLocation":"#"} |
| draft2020-12:allOf.json#/groups/11/tests/4 | allOf: true, anyOf: false, oneOf: false | PASS | {"keywordLocation":"#/allOf/0/multipleOf","instanceLocation":"#"} |
| draft2020-12:allOf.json#/groups/11/tests/5 | allOf: true, anyOf: false, oneOf: true | PASS | {"keywordLocation":"#/allOf/0/multipleOf","instanceLocation":"#"} |
| draft2020-12:allOf.json#/groups/11/tests/6 | allOf: true, anyOf: true, oneOf: false | PASS | {"keywordLocation":"#/allOf/0/multipleOf","instanceLocation":"#"} |
| draft2020-12:anchor.json#/groups/0/tests/1 | mismatch | PASS | {"keywordLocation":"#/$ref/type","instanceLocation":"#"} |
| draft2020-12:anchor.json#/groups/1/tests/1 | mismatch | PASS | {"keywordLocation":"#/$ref/type","instanceLocation":"#"} |
| draft2020-12:anchor.json#/groups/2/tests/1 | mismatch | PASS | {"keywordLocation":"#/$ref/type","instanceLocation":"#"} |
| draft2020-12:anchor.json#/groups/3/tests/1 | $ref does not resolve to /$defs/A/allOf/0 | PASS | {"keywordLocation":"#/$ref/type","instanceLocation":"#"} |
| draft2020-12:anyOf.json#/groups/0/tests/3 | neither anyOf valid | PASS | {"keywordLocation":"#/anyOf","instanceLocation":"#"} |
| draft2020-12:anyOf.json#/groups/1/tests/0 | mismatch base schema | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft2020-12:anyOf.json#/groups/1/tests/2 | both anyOf invalid | PASS | {"keywordLocation":"#/anyOf","instanceLocation":"#"} |
| draft2020-12:anyOf.json#/groups/4/tests/0 | any value is invalid | PASS | {"keywordLocation":"#/anyOf","instanceLocation":"#"} |
| draft2020-12:anyOf.json#/groups/5/tests/3 | neither anyOf valid (complex) | PASS | {"keywordLocation":"#/anyOf","instanceLocation":"#"} |
| draft2020-12:anyOf.json#/groups/7/tests/1 | anything non-null is invalid | PASS | {"keywordLocation":"#/allOf/0/allOf/0/type","instanceLocation":"#"} |
| draft2020-12:boolean_schema.json#/groups/1/tests/0 | number is invalid | PASS | {"keywordLocation":"#","instanceLocation":"#"} |
| draft2020-12:boolean_schema.json#/groups/1/tests/1 | string is invalid | PASS | {"keywordLocation":"#","instanceLocation":"#"} |
| draft2020-12:boolean_schema.json#/groups/1/tests/2 | boolean true is invalid | PASS | {"keywordLocation":"#","instanceLocation":"#"} |
| draft2020-12:boolean_schema.json#/groups/1/tests/3 | boolean false is invalid | PASS | {"keywordLocation":"#","instanceLocation":"#"} |
| draft2020-12:boolean_schema.json#/groups/1/tests/4 | null is invalid | PASS | {"keywordLocation":"#","instanceLocation":"#"} |
| draft2020-12:boolean_schema.json#/groups/1/tests/5 | object is invalid | PASS | {"keywordLocation":"#","instanceLocation":"#"} |
| draft2020-12:boolean_schema.json#/groups/1/tests/6 | empty object is invalid | PASS | {"keywordLocation":"#","instanceLocation":"#"} |
| draft2020-12:boolean_schema.json#/groups/1/tests/7 | array is invalid | PASS | {"keywordLocation":"#","instanceLocation":"#"} |
| draft2020-12:boolean_schema.json#/groups/1/tests/8 | empty array is invalid | PASS | {"keywordLocation":"#","instanceLocation":"#"} |
| draft2020-12:const.json#/groups/0/tests/1 | another value is invalid | PASS | {"keywordLocation":"#/const","instanceLocation":"#"} |
| draft2020-12:const.json#/groups/0/tests/2 | another type is invalid | PASS | {"keywordLocation":"#/const","instanceLocation":"#"} |
| draft2020-12:const.json#/groups/1/tests/2 | another object is invalid | PASS | {"keywordLocation":"#/const","instanceLocation":"#"} |
| draft2020-12:const.json#/groups/1/tests/3 | another type is invalid | PASS | {"keywordLocation":"#/const","instanceLocation":"#"} |
| draft2020-12:const.json#/groups/2/tests/1 | another array item is invalid | PASS | {"keywordLocation":"#/const","instanceLocation":"#"} |
| draft2020-12:const.json#/groups/2/tests/2 | array with additional items is invalid | PASS | {"keywordLocation":"#/const","instanceLocation":"#"} |
| draft2020-12:const.json#/groups/3/tests/1 | not null is invalid | PASS | {"keywordLocation":"#/const","instanceLocation":"#"} |
| draft2020-12:const.json#/groups/4/tests/1 | integer zero is invalid | PASS | {"keywordLocation":"#/const","instanceLocation":"#"} |
| draft2020-12:const.json#/groups/4/tests/2 | float zero is invalid | PASS | {"keywordLocation":"#/const","instanceLocation":"#"} |
| draft2020-12:const.json#/groups/5/tests/1 | integer one is invalid | PASS | {"keywordLocation":"#/const","instanceLocation":"#"} |
| draft2020-12:const.json#/groups/5/tests/2 | float one is invalid | PASS | {"keywordLocation":"#/const","instanceLocation":"#"} |
| draft2020-12:const.json#/groups/6/tests/1 | [0] is invalid | PASS | {"keywordLocation":"#/const","instanceLocation":"#"} |
| draft2020-12:const.json#/groups/6/tests/2 | [0.0] is invalid | PASS | {"keywordLocation":"#/const","instanceLocation":"#"} |
| draft2020-12:const.json#/groups/7/tests/1 | [1] is invalid | PASS | {"keywordLocation":"#/const","instanceLocation":"#"} |
| draft2020-12:const.json#/groups/7/tests/2 | [1.0] is invalid | PASS | {"keywordLocation":"#/const","instanceLocation":"#"} |
| draft2020-12:const.json#/groups/8/tests/1 | {"a": 0} is invalid | PASS | {"keywordLocation":"#/const","instanceLocation":"#"} |
| draft2020-12:const.json#/groups/8/tests/2 | {"a": 0.0} is invalid | PASS | {"keywordLocation":"#/const","instanceLocation":"#"} |
| draft2020-12:const.json#/groups/9/tests/1 | {"a": 1} is invalid | PASS | {"keywordLocation":"#/const","instanceLocation":"#"} |
| draft2020-12:const.json#/groups/9/tests/2 | {"a": 1.0} is invalid | PASS | {"keywordLocation":"#/const","instanceLocation":"#"} |
| draft2020-12:const.json#/groups/10/tests/0 | false is invalid | PASS | {"keywordLocation":"#/const","instanceLocation":"#"} |
| draft2020-12:const.json#/groups/10/tests/3 | empty object is invalid | PASS | {"keywordLocation":"#/const","instanceLocation":"#"} |
| draft2020-12:const.json#/groups/10/tests/4 | empty array is invalid | PASS | {"keywordLocation":"#/const","instanceLocation":"#"} |
| draft2020-12:const.json#/groups/10/tests/5 | empty string is invalid | PASS | {"keywordLocation":"#/const","instanceLocation":"#"} |
| draft2020-12:const.json#/groups/11/tests/0 | true is invalid | PASS | {"keywordLocation":"#/const","instanceLocation":"#"} |
| draft2020-12:const.json#/groups/12/tests/1 | integer 2 is invalid | PASS | {"keywordLocation":"#/const","instanceLocation":"#"} |
| draft2020-12:const.json#/groups/12/tests/3 | float 2.0 is invalid | PASS | {"keywordLocation":"#/const","instanceLocation":"#"} |
| draft2020-12:const.json#/groups/12/tests/4 | float -2.00001 is invalid | PASS | {"keywordLocation":"#/const","instanceLocation":"#"} |
| draft2020-12:const.json#/groups/13/tests/1 | integer minus one is invalid | PASS | {"keywordLocation":"#/const","instanceLocation":"#"} |
| draft2020-12:const.json#/groups/13/tests/3 | float minus one is invalid | PASS | {"keywordLocation":"#/const","instanceLocation":"#"} |
| draft2020-12:const.json#/groups/14/tests/1 | do not match string lacking nul | PASS | {"keywordLocation":"#/const","instanceLocation":"#"} |
| draft2020-12:const.json#/groups/15/tests/1 | character looks the same but uses a different codepoint | PASS | {"keywordLocation":"#/const","instanceLocation":"#"} |
| draft2020-12:const.json#/groups/16/tests/1 | character looks the same but uses combining marks | PASS | {"keywordLocation":"#/const","instanceLocation":"#"} |
| draft2020-12:contains.json#/groups/0/tests/3 | array without items matching schema is invalid | PASS | {"keywordLocation":"#/contains","instanceLocation":"#"} |
| draft2020-12:contains.json#/groups/0/tests/4 | empty array is invalid | PASS | {"keywordLocation":"#/contains","instanceLocation":"#"} |
| draft2020-12:contains.json#/groups/1/tests/2 | array without item 5 is invalid | PASS | {"keywordLocation":"#/contains","instanceLocation":"#"} |
| draft2020-12:contains.json#/groups/2/tests/1 | empty array is invalid | PASS | {"keywordLocation":"#/contains","instanceLocation":"#"} |
| draft2020-12:contains.json#/groups/3/tests/0 | any non-empty array is invalid | PASS | {"keywordLocation":"#/contains","instanceLocation":"#"} |
| draft2020-12:contains.json#/groups/3/tests/1 | empty array is invalid | PASS | {"keywordLocation":"#/contains","instanceLocation":"#"} |
| draft2020-12:contains.json#/groups/4/tests/0 | matches items, does not match contains | PASS | {"keywordLocation":"#/contains","instanceLocation":"#"} |
| draft2020-12:contains.json#/groups/4/tests/1 | does not match items, matches contains | PASS | {"keywordLocation":"#/items/multipleOf","instanceLocation":"#/0"} |
| draft2020-12:contains.json#/groups/4/tests/3 | matches neither items nor contains | PASS | {"keywordLocation":"#/items/multipleOf","instanceLocation":"#/0"} |
| draft2020-12:contains.json#/groups/5/tests/1 | empty array is invalid | PASS | {"keywordLocation":"#/contains","instanceLocation":"#"} |
| draft2020-12:default.json#/groups/2/tests/1 | an explicit property value is checked against maximum (failing) | PASS | {"keywordLocation":"#/properties/alpha/maximum","instanceLocation":"#/alpha"} |
| draft2020-12:defs.json#/groups/0/tests/0 | valid definition schema | COMPILE | FAST_COMPILE_ERROR: failed to resolve $ref: "https://json-schema.org/draft/2020-12/schema" at # |
| draft2020-12:defs.json#/groups/0/tests/1 | invalid definition schema | COMPILE | FAST_COMPILE_ERROR: failed to resolve $ref: "https://json-schema.org/draft/2020-12/schema" at # |
| draft2020-12:dependentRequired.json#/groups/0/tests/3 | missing dependency | PASS | {"keywordLocation":"#/dependentRequired/bar","instanceLocation":"#"} |
| draft2020-12:dependentRequired.json#/groups/2/tests/3 | missing dependency | PASS | {"keywordLocation":"#/dependentRequired/quux","instanceLocation":"#"} |
| draft2020-12:dependentRequired.json#/groups/2/tests/4 | missing other dependency | PASS | {"keywordLocation":"#/dependentRequired/quux","instanceLocation":"#"} |
| draft2020-12:dependentRequired.json#/groups/2/tests/5 | missing both dependencies | PASS | {"keywordLocation":"#/dependentRequired/quux","instanceLocation":"#"} |
| draft2020-12:dependentRequired.json#/groups/3/tests/2 | CRLF missing dependent | PASS | {"keywordLocation":"#/dependentRequired/foo\nbar","instanceLocation":"#"} |
| draft2020-12:dependentRequired.json#/groups/3/tests/3 | quoted quotes missing dependent | PASS | {"keywordLocation":"#/dependentRequired/foo\"bar","instanceLocation":"#"} |
| draft2020-12:dependentSchemas.json#/groups/0/tests/2 | wrong type | PASS | {"keywordLocation":"#/dependentSchemas/bar/properties/foo/type","instanceLocation":"#/foo"} |
| draft2020-12:dependentSchemas.json#/groups/0/tests/3 | wrong type other | PASS | {"keywordLocation":"#/dependentSchemas/bar/properties/bar/type","instanceLocation":"#/bar"} |
| draft2020-12:dependentSchemas.json#/groups/0/tests/4 | wrong type both | PASS | {"keywordLocation":"#/dependentSchemas/bar/properties/foo/type","instanceLocation":"#/foo"} |
| draft2020-12:dependentSchemas.json#/groups/1/tests/1 | object with property having schema false is invalid | PASS | {"keywordLocation":"#/dependentSchemas/bar","instanceLocation":"#"} |
| draft2020-12:dependentSchemas.json#/groups/1/tests/2 | object with both properties is invalid | PASS | {"keywordLocation":"#/dependentSchemas/bar","instanceLocation":"#"} |
| draft2020-12:dependentSchemas.json#/groups/2/tests/1 | quoted quote | PASS | {"keywordLocation":"#/dependentSchemas/foo'bar/required","instanceLocation":"#/foo\"bar"} |
| draft2020-12:dependentSchemas.json#/groups/2/tests/2 | quoted tab invalid under dependent schema | PASS | {"keywordLocation":"#/dependentSchemas/foo\tbar/minProperties","instanceLocation":"#"} |
| draft2020-12:dependentSchemas.json#/groups/2/tests/3 | quoted quote invalid under dependent schema | PASS | {"keywordLocation":"#/dependentSchemas/foo'bar/required","instanceLocation":"#/foo\"bar"} |
| draft2020-12:dependentSchemas.json#/groups/3/tests/0 | matches root | PASS | {"keywordLocation":"#/dependentSchemas/foo/additionalProperties","instanceLocation":"#/foo"} |
| draft2020-12:dependentSchemas.json#/groups/3/tests/2 | matches both | PASS | {"keywordLocation":"#/dependentSchemas/foo/additionalProperties","instanceLocation":"#/foo"} |
| draft2020-12:dynamicRef.json#/groups/0/tests/1 | An array containing non-strings is invalid | PASS | {"keywordLocation":"#/items/$dynamicRef/type","instanceLocation":"#/1"} |
| draft2020-12:dynamicRef.json#/groups/1/tests/1 | An array containing non-strings is invalid | PASS | {"keywordLocation":"#/items/$dynamicRef/type","instanceLocation":"#/1"} |
| draft2020-12:dynamicRef.json#/groups/2/tests/1 | An array containing non-strings is invalid | PASS | {"keywordLocation":"#/items/$ref/type","instanceLocation":"#/1"} |
| draft2020-12:dynamicRef.json#/groups/3/tests/1 | An array containing non-strings is invalid | PASS | {"keywordLocation":"#/$ref/items/$dynamicRef/type","instanceLocation":"#/1"} |
| draft2020-12:dynamicRef.json#/groups/4/tests/0 | An array of strings is invalid | PASS | {"keywordLocation":"#/$ref/items/$dynamicRef/type","instanceLocation":"#/0"} |
| draft2020-12:dynamicRef.json#/groups/5/tests/1 | An array containing non-strings is invalid | PASS | {"keywordLocation":"#/$ref/$ref/items/$dynamicRef/type","instanceLocation":"#/1"} |
| draft2020-12:dynamicRef.json#/groups/9/tests/1 | The recursive part is not valid against the root | PASS | {"keywordLocation":"#/$ref/properties/bar/$ref/properties/baz/$dynamicRef/properties/foo/const","instanceLocation":"#/bar/baz/foo"} |
| draft2020-12:dynamicRef.json#/groups/11/tests/1 | number list with string values | PASS | {"keywordLocation":"#/then/$ref/$ref/properties/list/items/$dynamicRef/type","instanceLocation":"#/list/0"} |
| draft2020-12:dynamicRef.json#/groups/11/tests/2 | string list with number values | PASS | {"keywordLocation":"#/else/$ref/$ref/properties/list/items/$dynamicRef/type","instanceLocation":"#/list/0"} |
| draft2020-12:dynamicRef.json#/groups/12/tests/0 | string matches /$defs/thingy, but the $dynamicRef does not stop here | PASS | {"keywordLocation":"#/then/$ref/$dynamicRef/type","instanceLocation":"#"} |
| draft2020-12:dynamicRef.json#/groups/12/tests/1 | first_scope is not in dynamic scope for the $dynamicRef | PASS | {"keywordLocation":"#/then/$ref/$dynamicRef/type","instanceLocation":"#"} |
| draft2020-12:dynamicRef.json#/groups/13/tests/0 | instance with misspelled field | PASS | {"keywordLocation":"#/$ref/properties/children/items/$dynamicRef/unevaluatedProperties","instanceLocation":"#/children/0/daat"} |
| draft2020-12:dynamicRef.json#/groups/14/tests/0 | incorrect parent schema | PASS | {"keywordLocation":"#/$ref/required","instanceLocation":"#/elements"} |
| draft2020-12:dynamicRef.json#/groups/14/tests/1 | incorrect extended schema | PASS | {"keywordLocation":"#/$ref/properties/elements/items/$dynamicRef/required","instanceLocation":"#/elements/0/a"} |
| draft2020-12:dynamicRef.json#/groups/15/tests/0 | incorrect parent schema | PASS | {"keywordLocation":"#/allOf/0/$ref/required","instanceLocation":"#/elements"} |
| draft2020-12:dynamicRef.json#/groups/15/tests/1 | incorrect extended schema | PASS | {"keywordLocation":"#/allOf/0/$ref/properties/elements/items/$dynamicRef/required","instanceLocation":"#/elements/0/a"} |
| draft2020-12:dynamicRef.json#/groups/16/tests/0 | incorrect parent schema | PASS | {"keywordLocation":"#/allOf/1/$ref/required","instanceLocation":"#/elements"} |
| draft2020-12:dynamicRef.json#/groups/16/tests/1 | incorrect extended schema | PASS | {"keywordLocation":"#/allOf/1/$ref/properties/elements/items/$dynamicRef/required","instanceLocation":"#/elements/0/a"} |
| draft2020-12:dynamicRef.json#/groups/17/tests/1 | non-number is invalid | PASS | {"keywordLocation":"#/$ref/$dynamicRef/type","instanceLocation":"#"} |
| draft2020-12:dynamicRef.json#/groups/18/tests/1 | follow $dynamicRef to a false schema | PASS | {"keywordLocation":"#/properties/false/$dynamicRef","instanceLocation":"#/false"} |
| draft2020-12:dynamicRef.json#/groups/19/tests/1 | string property fails | PASS | {"keywordLocation":"#/properties/bar-item/$ref/properties/content/$dynamicRef/type","instanceLocation":"#/bar-item/content"} |
| draft2020-12:enum.json#/groups/0/tests/1 | something else is invalid | PASS | {"keywordLocation":"#/enum","instanceLocation":"#"} |
| draft2020-12:enum.json#/groups/1/tests/1 | something else is invalid | PASS | {"keywordLocation":"#/enum","instanceLocation":"#"} |
| draft2020-12:enum.json#/groups/1/tests/2 | objects are deep compared | PASS | {"keywordLocation":"#/enum","instanceLocation":"#"} |
| draft2020-12:enum.json#/groups/1/tests/4 | extra properties in object is invalid | PASS | {"keywordLocation":"#/enum","instanceLocation":"#"} |
| draft2020-12:enum.json#/groups/2/tests/2 | something else is invalid | PASS | {"keywordLocation":"#/enum","instanceLocation":"#"} |
| draft2020-12:enum.json#/groups/3/tests/1 | wrong foo value | PASS | {"keywordLocation":"#/properties/foo/enum","instanceLocation":"#/foo"} |
| draft2020-12:enum.json#/groups/3/tests/2 | wrong bar value | PASS | {"keywordLocation":"#/properties/bar/enum","instanceLocation":"#/bar"} |
| draft2020-12:enum.json#/groups/3/tests/4 | missing required property is invalid | PASS | {"keywordLocation":"#/required","instanceLocation":"#/bar"} |
| draft2020-12:enum.json#/groups/3/tests/5 | missing all properties is invalid | PASS | {"keywordLocation":"#/required","instanceLocation":"#/bar"} |
| draft2020-12:enum.json#/groups/4/tests/2 | another string is invalid | PASS | {"keywordLocation":"#/enum","instanceLocation":"#"} |
| draft2020-12:enum.json#/groups/5/tests/1 | integer zero is invalid | PASS | {"keywordLocation":"#/enum","instanceLocation":"#"} |
| draft2020-12:enum.json#/groups/5/tests/2 | float zero is invalid | PASS | {"keywordLocation":"#/enum","instanceLocation":"#"} |
| draft2020-12:enum.json#/groups/6/tests/1 | [0] is invalid | PASS | {"keywordLocation":"#/enum","instanceLocation":"#"} |
| draft2020-12:enum.json#/groups/6/tests/2 | [0.0] is invalid | PASS | {"keywordLocation":"#/enum","instanceLocation":"#"} |
| draft2020-12:enum.json#/groups/7/tests/1 | integer one is invalid | PASS | {"keywordLocation":"#/enum","instanceLocation":"#"} |
| draft2020-12:enum.json#/groups/7/tests/2 | float one is invalid | PASS | {"keywordLocation":"#/enum","instanceLocation":"#"} |
| draft2020-12:enum.json#/groups/8/tests/1 | [1] is invalid | PASS | {"keywordLocation":"#/enum","instanceLocation":"#"} |
| draft2020-12:enum.json#/groups/8/tests/2 | [1.0] is invalid | PASS | {"keywordLocation":"#/enum","instanceLocation":"#"} |
| draft2020-12:enum.json#/groups/9/tests/0 | false is invalid | PASS | {"keywordLocation":"#/enum","instanceLocation":"#"} |
| draft2020-12:enum.json#/groups/10/tests/0 | [false] is invalid | PASS | {"keywordLocation":"#/enum","instanceLocation":"#"} |
| draft2020-12:enum.json#/groups/11/tests/0 | true is invalid | PASS | {"keywordLocation":"#/enum","instanceLocation":"#"} |
| draft2020-12:enum.json#/groups/12/tests/0 | [true] is invalid | PASS | {"keywordLocation":"#/enum","instanceLocation":"#"} |
| draft2020-12:enum.json#/groups/13/tests/1 | do not match string lacking nul | PASS | {"keywordLocation":"#/enum","instanceLocation":"#"} |
| draft2020-12:enum.json#/groups/14/tests/0 | string is invalid | PASS | {"keywordLocation":"#/enum","instanceLocation":"#"} |
| draft2020-12:enum.json#/groups/14/tests/1 | number is invalid | PASS | {"keywordLocation":"#/enum","instanceLocation":"#"} |
| draft2020-12:enum.json#/groups/14/tests/2 | null is invalid | PASS | {"keywordLocation":"#/enum","instanceLocation":"#"} |
| draft2020-12:enum.json#/groups/14/tests/3 | object is invalid | PASS | {"keywordLocation":"#/enum","instanceLocation":"#"} |
| draft2020-12:enum.json#/groups/14/tests/4 | array is invalid | PASS | {"keywordLocation":"#/enum","instanceLocation":"#"} |
| draft2020-12:enum.json#/groups/14/tests/5 | boolean is invalid | PASS | {"keywordLocation":"#/enum","instanceLocation":"#"} |
| draft2020-12:exclusiveMaximum.json#/groups/0/tests/1 | boundary point is invalid | PASS | {"keywordLocation":"#/exclusiveMaximum","instanceLocation":"#"} |
| draft2020-12:exclusiveMaximum.json#/groups/0/tests/2 | above the exclusiveMaximum is invalid | PASS | {"keywordLocation":"#/exclusiveMaximum","instanceLocation":"#"} |
| draft2020-12:exclusiveMinimum.json#/groups/0/tests/1 | boundary point is invalid | PASS | {"keywordLocation":"#/exclusiveMinimum","instanceLocation":"#"} |
| draft2020-12:exclusiveMinimum.json#/groups/0/tests/2 | below the exclusiveMinimum is invalid | PASS | {"keywordLocation":"#/exclusiveMinimum","instanceLocation":"#"} |
| draft2020-12:if-then-else.json#/groups/3/tests/1 | invalid through then | PASS | {"keywordLocation":"#/then/minimum","instanceLocation":"#"} |
| draft2020-12:if-then-else.json#/groups/4/tests/2 | invalid through else | PASS | {"keywordLocation":"#/else/multipleOf","instanceLocation":"#"} |
| draft2020-12:if-then-else.json#/groups/5/tests/1 | invalid through then | PASS | {"keywordLocation":"#/then/minimum","instanceLocation":"#"} |
| draft2020-12:if-then-else.json#/groups/5/tests/3 | invalid through else | PASS | {"keywordLocation":"#/else/multipleOf","instanceLocation":"#"} |
| draft2020-12:if-then-else.json#/groups/7/tests/1 | boolean schema true in if always chooses the then path (invalid) | PASS | {"keywordLocation":"#/then/const","instanceLocation":"#"} |
| draft2020-12:if-then-else.json#/groups/8/tests/0 | boolean schema false in if always chooses the else path (invalid) | PASS | {"keywordLocation":"#/else/const","instanceLocation":"#"} |
| draft2020-12:if-then-else.json#/groups/9/tests/2 | no redirects to then and fails | PASS | {"keywordLocation":"#/then/const","instanceLocation":"#"} |
| draft2020-12:if-then-else.json#/groups/9/tests/3 | invalid redirects to else and fails | PASS | {"keywordLocation":"#/else/const","instanceLocation":"#"} |
| draft2020-12:if-then-else.json#/groups/10/tests/0 | matches if → then=false → invalid | PASS | {"keywordLocation":"#/then","instanceLocation":"#"} |
| draft2020-12:if-then-else.json#/groups/11/tests/1 | does not match if → else executes → invalid | PASS | {"keywordLocation":"#/else","instanceLocation":"#"} |
| draft2020-12:infinite-loop-detection.json#/groups/0/tests/1 | failing case | PASS | {"keywordLocation":"#/allOf/0/properties/foo/$ref/type","instanceLocation":"#/foo"} |
| draft2020-12:items.json#/groups/0/tests/1 | wrong type of items | PASS | {"keywordLocation":"#/items/type","instanceLocation":"#/1"} |
| draft2020-12:items.json#/groups/2/tests/0 | any non-empty array is invalid | PASS | {"keywordLocation":"#/items","instanceLocation":"#"} |
| draft2020-12:items.json#/groups/3/tests/1 | too many items | PASS | {"keywordLocation":"#/items","instanceLocation":"#"} |
| draft2020-12:items.json#/groups/3/tests/2 | too many sub-items | PASS | {"keywordLocation":"#/0/$ref/items","instanceLocation":"#/0"} |
| draft2020-12:items.json#/groups/3/tests/3 | wrong item | PASS | {"keywordLocation":"#/0/$ref/type","instanceLocation":"#/0"} |
| draft2020-12:items.json#/groups/3/tests/4 | wrong sub-item | PASS | {"keywordLocation":"#/0/$ref/0/$ref/required","instanceLocation":"#/0/0/foo"} |
| draft2020-12:items.json#/groups/4/tests/1 | nested array with invalid type | PASS | {"keywordLocation":"#/items/items/items/items/type","instanceLocation":"#/0/0/0/0"} |
| draft2020-12:items.json#/groups/4/tests/2 | not deep enough | PASS | {"keywordLocation":"#/items/items/items/type","instanceLocation":"#/0/0/0"} |
| draft2020-12:items.json#/groups/5/tests/4 | additional items are not permitted | PASS | {"keywordLocation":"#/items","instanceLocation":"#"} |
| draft2020-12:items.json#/groups/6/tests/0 | prefixItems in allOf does not constrain items, invalid case | PASS | {"keywordLocation":"#/items/minimum","instanceLocation":"#/0"} |
| draft2020-12:items.json#/groups/7/tests/1 | wrong type of second item | PASS | {"keywordLocation":"#/items/type","instanceLocation":"#/1"} |
| draft2020-12:items.json#/groups/8/tests/0 | heterogeneous invalid instance | PASS | {"keywordLocation":"#/items","instanceLocation":"#"} |
| draft2020-12:maxContains.json#/groups/1/tests/0 | empty data | PASS | {"keywordLocation":"#/contains","instanceLocation":"#"} |
| draft2020-12:maxContains.json#/groups/1/tests/2 | all elements match, invalid maxContains | PASS | {"keywordLocation":"#/maxContains","instanceLocation":"#"} |
| draft2020-12:maxContains.json#/groups/1/tests/4 | some elements match, invalid maxContains | PASS | {"keywordLocation":"#/maxContains","instanceLocation":"#"} |
| draft2020-12:maxContains.json#/groups/2/tests/1 | too many elements match, invalid maxContains | PASS | {"keywordLocation":"#/maxContains","instanceLocation":"#"} |
| draft2020-12:maxContains.json#/groups/3/tests/0 | actual < minContains < maxContains | PASS | {"keywordLocation":"#/minContains","instanceLocation":"#"} |
| draft2020-12:maxContains.json#/groups/3/tests/2 | minContains < maxContains < actual | PASS | {"keywordLocation":"#/maxContains","instanceLocation":"#"} |
| draft2020-12:maxContains.json#/groups/4/tests/1 | one matching item | PASS | {"keywordLocation":"#/maxContains","instanceLocation":"#"} |
| draft2020-12:maximum.json#/groups/0/tests/2 | above the maximum is invalid | PASS | {"keywordLocation":"#/maximum","instanceLocation":"#"} |
| draft2020-12:maximum.json#/groups/1/tests/3 | above the maximum is invalid | PASS | {"keywordLocation":"#/maximum","instanceLocation":"#"} |
| draft2020-12:maxItems.json#/groups/0/tests/2 | too long is invalid | PASS | {"keywordLocation":"#/maxItems","instanceLocation":"#"} |
| draft2020-12:maxItems.json#/groups/1/tests/1 | too long is invalid | PASS | {"keywordLocation":"#/maxItems","instanceLocation":"#"} |
| draft2020-12:maxLength.json#/groups/0/tests/2 | too long is invalid | PASS | {"keywordLocation":"#/maxLength","instanceLocation":"#"} |
| draft2020-12:maxLength.json#/groups/1/tests/1 | too long is invalid | PASS | {"keywordLocation":"#/maxLength","instanceLocation":"#"} |
| draft2020-12:maxProperties.json#/groups/0/tests/2 | too long is invalid | PASS | {"keywordLocation":"#/maxProperties","instanceLocation":"#"} |
| draft2020-12:maxProperties.json#/groups/1/tests/1 | too long is invalid | PASS | {"keywordLocation":"#/maxProperties","instanceLocation":"#"} |
| draft2020-12:maxProperties.json#/groups/2/tests/1 | one property is invalid | PASS | {"keywordLocation":"#/maxProperties","instanceLocation":"#"} |
| draft2020-12:minContains.json#/groups/1/tests/0 | empty data | PASS | {"keywordLocation":"#/minContains","instanceLocation":"#"} |
| draft2020-12:minContains.json#/groups/1/tests/1 | no elements match | PASS | {"keywordLocation":"#/minContains","instanceLocation":"#"} |
| draft2020-12:minContains.json#/groups/2/tests/0 | empty data | PASS | {"keywordLocation":"#/minContains","instanceLocation":"#"} |
| draft2020-12:minContains.json#/groups/2/tests/1 | all elements match, invalid minContains | PASS | {"keywordLocation":"#/minContains","instanceLocation":"#"} |
| draft2020-12:minContains.json#/groups/2/tests/2 | some elements match, invalid minContains | PASS | {"keywordLocation":"#/minContains","instanceLocation":"#"} |
| draft2020-12:minContains.json#/groups/3/tests/0 | one element matches, invalid minContains | PASS | {"keywordLocation":"#/minContains","instanceLocation":"#"} |
| draft2020-12:minContains.json#/groups/4/tests/0 | empty data | PASS | {"keywordLocation":"#/minContains","instanceLocation":"#"} |
| draft2020-12:minContains.json#/groups/4/tests/1 | all elements match, invalid minContains | PASS | {"keywordLocation":"#/minContains","instanceLocation":"#"} |
| draft2020-12:minContains.json#/groups/4/tests/2 | all elements match, invalid maxContains | PASS | {"keywordLocation":"#/maxContains","instanceLocation":"#"} |
| draft2020-12:minContains.json#/groups/5/tests/0 | empty data | PASS | {"keywordLocation":"#/minContains","instanceLocation":"#"} |
| draft2020-12:minContains.json#/groups/5/tests/1 | invalid minContains | PASS | {"keywordLocation":"#/minContains","instanceLocation":"#"} |
| draft2020-12:minContains.json#/groups/5/tests/2 | invalid maxContains | PASS | {"keywordLocation":"#/maxContains","instanceLocation":"#"} |
| draft2020-12:minContains.json#/groups/5/tests/3 | invalid maxContains and minContains | PASS | {"keywordLocation":"#/minContains","instanceLocation":"#"} |
| draft2020-12:minContains.json#/groups/7/tests/2 | too many | PASS | {"keywordLocation":"#/maxContains","instanceLocation":"#"} |
| draft2020-12:minimum.json#/groups/0/tests/2 | below the minimum is invalid | PASS | {"keywordLocation":"#/minimum","instanceLocation":"#"} |
| draft2020-12:minimum.json#/groups/1/tests/4 | float below the minimum is invalid | PASS | {"keywordLocation":"#/minimum","instanceLocation":"#"} |
| draft2020-12:minimum.json#/groups/1/tests/5 | int below the minimum is invalid | PASS | {"keywordLocation":"#/minimum","instanceLocation":"#"} |
| draft2020-12:minItems.json#/groups/0/tests/2 | too short is invalid | PASS | {"keywordLocation":"#/minItems","instanceLocation":"#"} |
| draft2020-12:minItems.json#/groups/1/tests/1 | too short is invalid | PASS | {"keywordLocation":"#/minItems","instanceLocation":"#"} |
| draft2020-12:minLength.json#/groups/0/tests/2 | too short is invalid | PASS | {"keywordLocation":"#/minLength","instanceLocation":"#"} |
| draft2020-12:minLength.json#/groups/0/tests/4 | one grapheme is not long enough | PASS | {"keywordLocation":"#/minLength","instanceLocation":"#"} |
| draft2020-12:minLength.json#/groups/1/tests/1 | too short is invalid | PASS | {"keywordLocation":"#/minLength","instanceLocation":"#"} |
| draft2020-12:minProperties.json#/groups/0/tests/2 | too short is invalid | PASS | {"keywordLocation":"#/minProperties","instanceLocation":"#"} |
| draft2020-12:minProperties.json#/groups/1/tests/1 | too short is invalid | PASS | {"keywordLocation":"#/minProperties","instanceLocation":"#"} |
| draft2020-12:multipleOf.json#/groups/0/tests/1 | int by int fail | PASS | {"keywordLocation":"#/multipleOf","instanceLocation":"#"} |
| draft2020-12:multipleOf.json#/groups/1/tests/3 | 35 is not multiple of 1.5 | PASS | {"keywordLocation":"#/multipleOf","instanceLocation":"#"} |
| draft2020-12:multipleOf.json#/groups/2/tests/1 | 0.00751 is not multiple of 0.0001 | PASS | {"keywordLocation":"#/multipleOf","instanceLocation":"#"} |
| draft2020-12:multipleOf.json#/groups/3/tests/0 | always invalid, but naive implementations may raise an overflow error | PASS | {"keywordLocation":"#/multipleOf","instanceLocation":"#"} |
| draft2020-12:not.json#/groups/0/tests/1 | disallowed | PASS | {"keywordLocation":"#/not","instanceLocation":"#"} |
| draft2020-12:not.json#/groups/1/tests/1 | mismatch | PASS | {"keywordLocation":"#/not","instanceLocation":"#"} |
| draft2020-12:not.json#/groups/1/tests/2 | other mismatch | PASS | {"keywordLocation":"#/not","instanceLocation":"#"} |
| draft2020-12:not.json#/groups/2/tests/2 | mismatch | PASS | {"keywordLocation":"#/not","instanceLocation":"#"} |
| draft2020-12:not.json#/groups/3/tests/0 | property present | PASS | {"keywordLocation":"#/properties/foo/not","instanceLocation":"#/foo"} |
| draft2020-12:not.json#/groups/4/tests/0 | number is invalid | PASS | {"keywordLocation":"#/not","instanceLocation":"#"} |
| draft2020-12:not.json#/groups/4/tests/1 | string is invalid | PASS | {"keywordLocation":"#/not","instanceLocation":"#"} |
| draft2020-12:not.json#/groups/4/tests/2 | boolean true is invalid | PASS | {"keywordLocation":"#/not","instanceLocation":"#"} |
| draft2020-12:not.json#/groups/4/tests/3 | boolean false is invalid | PASS | {"keywordLocation":"#/not","instanceLocation":"#"} |
| draft2020-12:not.json#/groups/4/tests/4 | null is invalid | PASS | {"keywordLocation":"#/not","instanceLocation":"#"} |
| draft2020-12:not.json#/groups/4/tests/5 | object is invalid | PASS | {"keywordLocation":"#/not","instanceLocation":"#"} |
| draft2020-12:not.json#/groups/4/tests/6 | empty object is invalid | PASS | {"keywordLocation":"#/not","instanceLocation":"#"} |
| draft2020-12:not.json#/groups/4/tests/7 | array is invalid | PASS | {"keywordLocation":"#/not","instanceLocation":"#"} |
| draft2020-12:not.json#/groups/4/tests/8 | empty array is invalid | PASS | {"keywordLocation":"#/not","instanceLocation":"#"} |
| draft2020-12:not.json#/groups/5/tests/0 | number is invalid | PASS | {"keywordLocation":"#/not","instanceLocation":"#"} |
| draft2020-12:not.json#/groups/5/tests/1 | string is invalid | PASS | {"keywordLocation":"#/not","instanceLocation":"#"} |
| draft2020-12:not.json#/groups/5/tests/2 | boolean true is invalid | PASS | {"keywordLocation":"#/not","instanceLocation":"#"} |
| draft2020-12:not.json#/groups/5/tests/3 | boolean false is invalid | PASS | {"keywordLocation":"#/not","instanceLocation":"#"} |
| draft2020-12:not.json#/groups/5/tests/4 | null is invalid | PASS | {"keywordLocation":"#/not","instanceLocation":"#"} |
| draft2020-12:not.json#/groups/5/tests/5 | object is invalid | PASS | {"keywordLocation":"#/not","instanceLocation":"#"} |
| draft2020-12:not.json#/groups/5/tests/6 | empty object is invalid | PASS | {"keywordLocation":"#/not","instanceLocation":"#"} |
| draft2020-12:not.json#/groups/5/tests/7 | array is invalid | PASS | {"keywordLocation":"#/not","instanceLocation":"#"} |
| draft2020-12:not.json#/groups/5/tests/8 | empty array is invalid | PASS | {"keywordLocation":"#/not","instanceLocation":"#"} |
| draft2020-12:not.json#/groups/8/tests/1 | annotations are still collected inside a 'not' | PASS | {"keywordLocation":"#/not","instanceLocation":"#"} |
| draft2020-12:oneOf.json#/groups/0/tests/2 | both oneOf valid | PASS | {"keywordLocation":"#/oneOf","instanceLocation":"#"} |
| draft2020-12:oneOf.json#/groups/0/tests/3 | neither oneOf valid | PASS | {"keywordLocation":"#/oneOf","instanceLocation":"#"} |
| draft2020-12:oneOf.json#/groups/1/tests/0 | mismatch base schema | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft2020-12:oneOf.json#/groups/1/tests/2 | both oneOf valid | PASS | {"keywordLocation":"#/oneOf","instanceLocation":"#"} |
| draft2020-12:oneOf.json#/groups/2/tests/0 | any value is invalid | PASS | {"keywordLocation":"#/oneOf","instanceLocation":"#"} |
| draft2020-12:oneOf.json#/groups/4/tests/0 | any value is invalid | PASS | {"keywordLocation":"#/oneOf","instanceLocation":"#"} |
| draft2020-12:oneOf.json#/groups/5/tests/0 | any value is invalid | PASS | {"keywordLocation":"#/oneOf","instanceLocation":"#"} |
| draft2020-12:oneOf.json#/groups/6/tests/2 | both oneOf valid (complex) | PASS | {"keywordLocation":"#/oneOf","instanceLocation":"#"} |
| draft2020-12:oneOf.json#/groups/6/tests/3 | neither oneOf valid (complex) | PASS | {"keywordLocation":"#/oneOf","instanceLocation":"#"} |
| draft2020-12:oneOf.json#/groups/7/tests/1 | both valid - invalid | PASS | {"keywordLocation":"#/oneOf","instanceLocation":"#"} |
| draft2020-12:oneOf.json#/groups/8/tests/0 | both invalid - invalid | PASS | {"keywordLocation":"#/oneOf","instanceLocation":"#"} |
| draft2020-12:oneOf.json#/groups/8/tests/3 | both valid - invalid | PASS | {"keywordLocation":"#/oneOf","instanceLocation":"#"} |
| draft2020-12:oneOf.json#/groups/9/tests/2 | both oneOf valid | PASS | {"keywordLocation":"#/oneOf","instanceLocation":"#"} |
| draft2020-12:oneOf.json#/groups/9/tests/3 | neither oneOf valid | PASS | {"keywordLocation":"#/oneOf","instanceLocation":"#"} |
| draft2020-12:oneOf.json#/groups/10/tests/1 | anything non-null is invalid | PASS | {"keywordLocation":"#/allOf/0/allOf/0/type","instanceLocation":"#"} |
| draft2020-12:optional/anchor.json#/groups/0/tests/1 | in implementations that strip $anchor, this may match either $def | PASS | {"keywordLocation":"#/anyOf","instanceLocation":"#"} |
| draft2020-12:optional/anchor.json#/groups/0/tests/3 | no match on enum or $ref to $anchor | PASS | {"keywordLocation":"#/anyOf","instanceLocation":"#"} |
| draft2020-12:optional/bignum.json#/groups/2/tests/0 | a bignum is not a string | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft2020-12:optional/bignum.json#/groups/4/tests/0 | comparison works for high numbers | PASS | {"keywordLocation":"#/exclusiveMaximum","instanceLocation":"#"} |
| draft2020-12:optional/bignum.json#/groups/6/tests/0 | comparison works for very negative numbers | PASS | {"keywordLocation":"#/exclusiveMinimum","instanceLocation":"#"} |
| draft2020-12:optional/dependencies-compatibility.json#/groups/0/tests/3 | missing dependency | PASS | {"keywordLocation":"#/dependencies/bar","instanceLocation":"#"} |
| draft2020-12:optional/dependencies-compatibility.json#/groups/2/tests/3 | missing dependency | PASS | {"keywordLocation":"#/dependencies/quux","instanceLocation":"#"} |
| draft2020-12:optional/dependencies-compatibility.json#/groups/2/tests/4 | missing other dependency | PASS | {"keywordLocation":"#/dependencies/quux","instanceLocation":"#"} |
| draft2020-12:optional/dependencies-compatibility.json#/groups/2/tests/5 | missing both dependencies | PASS | {"keywordLocation":"#/dependencies/quux","instanceLocation":"#"} |
| draft2020-12:optional/dependencies-compatibility.json#/groups/3/tests/2 | CRLF missing dependent | PASS | {"keywordLocation":"#/dependencies/foo\nbar","instanceLocation":"#"} |
| draft2020-12:optional/dependencies-compatibility.json#/groups/3/tests/3 | quoted quotes missing dependent | PASS | {"keywordLocation":"#/dependencies/foo\"bar","instanceLocation":"#"} |
| draft2020-12:optional/dependencies-compatibility.json#/groups/4/tests/2 | wrong type | PASS | {"keywordLocation":"#/dependencies/bar/properties/foo/type","instanceLocation":"#/foo"} |
| draft2020-12:optional/dependencies-compatibility.json#/groups/4/tests/3 | wrong type other | PASS | {"keywordLocation":"#/dependencies/bar/properties/bar/type","instanceLocation":"#/bar"} |
| draft2020-12:optional/dependencies-compatibility.json#/groups/4/tests/4 | wrong type both | PASS | {"keywordLocation":"#/dependencies/bar/properties/foo/type","instanceLocation":"#/foo"} |
| draft2020-12:optional/dependencies-compatibility.json#/groups/5/tests/1 | object with property having schema false is invalid | PASS | {"keywordLocation":"#/dependencies/bar","instanceLocation":"#"} |
| draft2020-12:optional/dependencies-compatibility.json#/groups/5/tests/2 | object with both properties is invalid | PASS | {"keywordLocation":"#/dependencies/bar","instanceLocation":"#"} |
| draft2020-12:optional/dependencies-compatibility.json#/groups/6/tests/1 | quoted quote | PASS | {"keywordLocation":"#/dependencies/foo'bar/required","instanceLocation":"#/foo\"bar"} |
| draft2020-12:optional/dependencies-compatibility.json#/groups/6/tests/2 | quoted tab invalid under dependent schema | PASS | {"keywordLocation":"#/dependencies/foo\tbar/minProperties","instanceLocation":"#"} |
| draft2020-12:optional/dependencies-compatibility.json#/groups/6/tests/3 | quoted quote invalid under dependent schema | PASS | {"keywordLocation":"#/dependencies/foo'bar/required","instanceLocation":"#/foo\"bar"} |
| draft2020-12:optional/dynamicRef.json#/groups/0/tests/1 | string property fails | PASS | {"keywordLocation":"#/properties/bar-item/$ref/properties/content/$dynamicRef/type","instanceLocation":"#/bar-item/content"} |
| draft2020-12:optional/ecmascript-regex.json#/groups/0/tests/0 | matches in Python, but not in ECMA 262 | PASS | {"keywordLocation":"#/pattern","instanceLocation":"#"} |
| draft2020-12:optional/ecmascript-regex.json#/groups/1/tests/0 | does not match | PASS | {"keywordLocation":"#/pattern","instanceLocation":"#"} |
| draft2020-12:optional/ecmascript-regex.json#/groups/2/tests/0 | does not match | PASS | {"keywordLocation":"#/pattern","instanceLocation":"#"} |
| draft2020-12:optional/ecmascript-regex.json#/groups/3/tests/0 | does not match | PASS | {"keywordLocation":"#/pattern","instanceLocation":"#"} |
| draft2020-12:optional/ecmascript-regex.json#/groups/4/tests/1 | NKO DIGIT ZERO does not match (unlike e.g. Python) | PASS | {"keywordLocation":"#/pattern","instanceLocation":"#"} |
| draft2020-12:optional/ecmascript-regex.json#/groups/4/tests/2 | NKO DIGIT ZERO (as \u escape) does not match | PASS | {"keywordLocation":"#/pattern","instanceLocation":"#"} |
| draft2020-12:optional/ecmascript-regex.json#/groups/5/tests/0 | ASCII zero does not match | PASS | {"keywordLocation":"#/pattern","instanceLocation":"#"} |
| draft2020-12:optional/ecmascript-regex.json#/groups/6/tests/1 | latin-1 e-acute does not match (unlike e.g. Python) | PASS | {"keywordLocation":"#/pattern","instanceLocation":"#"} |
| draft2020-12:optional/ecmascript-regex.json#/groups/7/tests/0 | ASCII 'a' does not match | PASS | {"keywordLocation":"#/pattern","instanceLocation":"#"} |
| draft2020-12:optional/ecmascript-regex.json#/groups/8/tests/9 | Non-whitespace control does not match | PASS | {"keywordLocation":"#/pattern","instanceLocation":"#"} |
| draft2020-12:optional/ecmascript-regex.json#/groups/8/tests/10 | Non-whitespace does not match | PASS | {"keywordLocation":"#/pattern","instanceLocation":"#"} |
| draft2020-12:optional/ecmascript-regex.json#/groups/9/tests/0 | ASCII space does not match | PASS | {"keywordLocation":"#/pattern","instanceLocation":"#"} |
| draft2020-12:optional/ecmascript-regex.json#/groups/9/tests/1 | Character tabulation does not match | PASS | {"keywordLocation":"#/pattern","instanceLocation":"#"} |
| draft2020-12:optional/ecmascript-regex.json#/groups/9/tests/2 | Line tabulation does not match | PASS | {"keywordLocation":"#/pattern","instanceLocation":"#"} |
| draft2020-12:optional/ecmascript-regex.json#/groups/9/tests/3 | Form feed does not match | PASS | {"keywordLocation":"#/pattern","instanceLocation":"#"} |
| draft2020-12:optional/ecmascript-regex.json#/groups/9/tests/4 | latin-1 non-breaking-space does not match | PASS | {"keywordLocation":"#/pattern","instanceLocation":"#"} |
| draft2020-12:optional/ecmascript-regex.json#/groups/9/tests/5 | zero-width whitespace does not match | PASS | {"keywordLocation":"#/pattern","instanceLocation":"#"} |
| draft2020-12:optional/ecmascript-regex.json#/groups/9/tests/6 | line feed does not match (line terminator) | PASS | {"keywordLocation":"#/pattern","instanceLocation":"#"} |
| draft2020-12:optional/ecmascript-regex.json#/groups/9/tests/7 | paragraph separator does not match (line terminator) | PASS | {"keywordLocation":"#/pattern","instanceLocation":"#"} |
| draft2020-12:optional/ecmascript-regex.json#/groups/9/tests/8 | EM SPACE does not match (Space_Separator) | PASS | {"keywordLocation":"#/pattern","instanceLocation":"#"} |
| draft2020-12:optional/ecmascript-regex.json#/groups/10/tests/3 | unicode matching is case-sensitive | PASS | {"keywordLocation":"#/pattern","instanceLocation":"#"} |
| draft2020-12:optional/ecmascript-regex.json#/groups/11/tests/1 | literal unicode character in json string | PASS | {"keywordLocation":"#/pattern","instanceLocation":"#"} |
| draft2020-12:optional/ecmascript-regex.json#/groups/11/tests/2 | unicode character in hex format in string | PASS | {"keywordLocation":"#/pattern","instanceLocation":"#"} |
| draft2020-12:optional/ecmascript-regex.json#/groups/11/tests/3 | unicode matching is case-sensitive | PASS | {"keywordLocation":"#/pattern","instanceLocation":"#"} |
| draft2020-12:optional/ecmascript-regex.json#/groups/12/tests/0 | literal unicode character in json string | PASS | {"keywordLocation":"#/pattern","instanceLocation":"#"} |
| draft2020-12:optional/ecmascript-regex.json#/groups/12/tests/1 | unicode character in hex format in string | PASS | {"keywordLocation":"#/pattern","instanceLocation":"#"} |
| draft2020-12:optional/ecmascript-regex.json#/groups/13/tests/1 | ascii non-digits | PASS | {"keywordLocation":"#/pattern","instanceLocation":"#"} |
| draft2020-12:optional/ecmascript-regex.json#/groups/13/tests/2 | non-ascii digits (BENGALI DIGIT FOUR, BENGALI DIGIT TWO) | PASS | {"keywordLocation":"#/pattern","instanceLocation":"#"} |
| draft2020-12:optional/ecmascript-regex.json#/groups/14/tests/1 | ascii non-digits | PASS | {"keywordLocation":"#/pattern","instanceLocation":"#"} |
| draft2020-12:optional/ecmascript-regex.json#/groups/15/tests/3 | unicode matching is case-sensitive | PASS | {"keywordLocation":"#/additionalProperties","instanceLocation":"#/L'ÉCOLE"} |
| draft2020-12:optional/ecmascript-regex.json#/groups/16/tests/1 | literal unicode character in json string | PASS | {"keywordLocation":"#/additionalProperties","instanceLocation":"#/l'école"} |
| draft2020-12:optional/ecmascript-regex.json#/groups/16/tests/2 | unicode character in hex format in string | PASS | {"keywordLocation":"#/additionalProperties","instanceLocation":"#/l'école"} |
| draft2020-12:optional/ecmascript-regex.json#/groups/16/tests/3 | unicode matching is case-sensitive | PASS | {"keywordLocation":"#/additionalProperties","instanceLocation":"#/L'ÉCOLE"} |
| draft2020-12:optional/ecmascript-regex.json#/groups/17/tests/0 | literal unicode character in json string | PASS | {"keywordLocation":"#/additionalProperties","instanceLocation":"#/l'école"} |
| draft2020-12:optional/ecmascript-regex.json#/groups/17/tests/1 | unicode character in hex format in string | PASS | {"keywordLocation":"#/additionalProperties","instanceLocation":"#/l'école"} |
| draft2020-12:optional/ecmascript-regex.json#/groups/18/tests/1 | ascii non-digits | PASS | {"keywordLocation":"#/additionalProperties","instanceLocation":"#/-%#"} |
| draft2020-12:optional/ecmascript-regex.json#/groups/18/tests/2 | non-ascii digits (BENGALI DIGIT FOUR, BENGALI DIGIT TWO) | PASS | {"keywordLocation":"#/additionalProperties","instanceLocation":"#/৪২"} |
| draft2020-12:optional/ecmascript-regex.json#/groups/19/tests/1 | ascii non-digits | PASS | {"keywordLocation":"#/additionalProperties","instanceLocation":"#/-%#"} |
| draft2020-12:optional/format-assertion.json#/groups/0/tests/0 | format-assertion: false: valid string | COMPILE | FAST_COMPILE_ERROR: Unexpected schema version: "https://localhost:1234/draft2020-12/format-assertion-false.json" at # |
| draft2020-12:optional/format-assertion.json#/groups/0/tests/1 | format-assertion: false: invalid string | COMPILE | FAST_COMPILE_ERROR: Unexpected schema version: "https://localhost:1234/draft2020-12/format-assertion-false.json" at # |
| draft2020-12:optional/format-assertion.json#/groups/1/tests/0 | format-assertion: true: valid string | COMPILE | FAST_COMPILE_ERROR: Unexpected schema version: "https://localhost:1234/draft2020-12/format-assertion-true.json" at # |
| draft2020-12:optional/format-assertion.json#/groups/1/tests/1 | format-assertion: true: invalid string | COMPILE | FAST_COMPILE_ERROR: Unexpected schema version: "https://localhost:1234/draft2020-12/format-assertion-true.json" at # |
| draft2020-12:optional/format/date-time.json#/groups/0/tests/12 | an invalid date-time past leap second, UTC | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/date-time.json#/groups/0/tests/13 | an invalid date-time with leap second on a wrong minute, UTC | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/date-time.json#/groups/0/tests/14 | an invalid date-time with leap second on a wrong hour, UTC | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/date-time.json#/groups/0/tests/15 | an invalid day in date-time string | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/date-time.json#/groups/0/tests/16 | an invalid offset in date-time string | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/date-time.json#/groups/0/tests/17 | an invalid closing Z after time-zone offset | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/date-time.json#/groups/0/tests/18 | an invalid hour in date-time string | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/date-time.json#/groups/0/tests/19 | an invalid minute in date-time string | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/date-time.json#/groups/0/tests/20 | an invalid offset minute in date-time string | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/date-time.json#/groups/0/tests/21 | an invalid date-time string | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/date-time.json#/groups/0/tests/23 | only RFC3339 not all of ISO 8601 are valid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/date-time.json#/groups/0/tests/24 | invalid non-padded month dates | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/date-time.json#/groups/0/tests/25 | invalid non-padded day dates | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/date-time.json#/groups/0/tests/26 | invalid non-ASCII '৪' (a Bengali 4) in date portion | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/date-time.json#/groups/0/tests/27 | invalid non-ASCII '৪' (a Bengali 4) in time portion | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/date-time.json#/groups/0/tests/28 | invalid extended year | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/date.json#/groups/0/tests/8 | a invalid date string with 32 days in January | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/date.json#/groups/0/tests/10 | a invalid date string with 30 days in February (leap) | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/date.json#/groups/0/tests/12 | a invalid date string with 32 days in March | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/date.json#/groups/0/tests/14 | a invalid date string with 31 days in April | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/date.json#/groups/0/tests/16 | a invalid date string with 32 days in May | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/date.json#/groups/0/tests/18 | a invalid date string with 31 days in June | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/date.json#/groups/0/tests/20 | a invalid date string with 32 days in July | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/date.json#/groups/0/tests/22 | a invalid date string with 32 days in August | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/date.json#/groups/0/tests/24 | a invalid date string with 31 days in September | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/date.json#/groups/0/tests/26 | a invalid date string with 32 days in October | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/date.json#/groups/0/tests/28 | a invalid date string with 31 days in November | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/date.json#/groups/0/tests/30 | a invalid date string with 32 days in December | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/date.json#/groups/0/tests/31 | an invalid date string | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/date.json#/groups/0/tests/32 | only RFC3339 not all of ISO 8601 are valid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/date.json#/groups/0/tests/33 | non-padded month dates are not valid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/date.json#/groups/0/tests/34 | non-padded day dates are not valid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/date.json#/groups/0/tests/35 | invalid month | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/date.json#/groups/0/tests/36 | 2021 is not a leap year | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/date.json#/groups/0/tests/38 | invalid non-ASCII '৪' (a Bengali 4) | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/date.json#/groups/0/tests/39 | invalid: non-ASCII Bengali digit in month field | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/date.json#/groups/0/tests/40 | ISO8601 / non-RFC3339: YYYYMMDD without dashes (2023-03-28) | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/date.json#/groups/0/tests/41 | ISO8601 / non-RFC3339: week number implicit day of week (2023-01-02) | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/date.json#/groups/0/tests/42 | ISO8601 / non-RFC3339: week number with day of week (2023-03-28) | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/date.json#/groups/0/tests/43 | ISO8601 / non-RFC3339: week number rollover to next year (2023-01-01) | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/date.json#/groups/0/tests/44 | an invalid time string in date-time format | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/date.json#/groups/0/tests/45 | century year 0100 is not a leap year | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/date.json#/groups/0/tests/47 | century year 2100 is not a leap year | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/date.json#/groups/0/tests/48 | invalid: leading whitespace is not permitted | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/date.json#/groups/0/tests/49 | invalid: trailing whitespace is not permitted | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/date.json#/groups/0/tests/50 | invalid: month 00 is not valid per date-month range 01-12 | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/date.json#/groups/0/tests/51 | invalid: day 00 is not valid per date-mday minimum of 01 | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/date.json#/groups/0/tests/52 | invalid: empty string | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/date.json#/groups/0/tests/53 | invalid: embedded whitespace between year and month | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/date.json#/groups/0/tests/54 | invalid: trailing character after valid full-date | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/date.json#/groups/0/tests/55 | invalid: trailing Z after full-date | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/date.json#/groups/0/tests/56 | invalid: full-date followed by space and time component | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/date.json#/groups/0/tests/58 | invalid: two-digit year (N-2 digits) | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/date.json#/groups/0/tests/59 | invalid: three-digit year (N-1 digits) | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/date.json#/groups/0/tests/60 | invalid: five-digit year (N+1 digits) | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/date.json#/groups/0/tests/61 | invalid: positive sign prefix on year | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/date.json#/groups/0/tests/62 | invalid: negative sign prefix on year | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/date.json#/groups/0/tests/63 | invalid: non-ASCII Bengali digit in year field | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/date.json#/groups/0/tests/64 | invalid: alphabetic characters in year field | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/date.json#/groups/0/tests/65 | invalid: three-digit month (N+1 digits) | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/date.json#/groups/0/tests/66 | invalid: alphabetic characters in month field | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/date.json#/groups/0/tests/67 | invalid: three-digit day (N+1 digits) | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/date.json#/groups/0/tests/68 | invalid: alphabetic characters in day field | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/date.json#/groups/0/tests/69 | invalid: colon separators | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/date.json#/groups/0/tests/70 | invalid: dot separators | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/date.json#/groups/0/tests/71 | invalid: space separators | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/date.json#/groups/0/tests/72 | invalid: mixed slash and hyphen separators | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/date.json#/groups/0/tests/73 | invalid: duplicated first hyphen | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/date.json#/groups/0/tests/74 | invalid: duplicated second hyphen | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/duration.json#/groups/0/tests/7 | an invalid duration string | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/duration.json#/groups/0/tests/8 | must start with P | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/duration.json#/groups/0/tests/9 | no elements present | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/duration.json#/groups/0/tests/10 | no time elements present | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/duration.json#/groups/0/tests/11 | no date or time elements present | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/duration.json#/groups/0/tests/12 | elements out of order | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/duration.json#/groups/0/tests/13 | missing time separator | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/duration.json#/groups/0/tests/14 | time element in the date position | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/duration.json#/groups/0/tests/23 | weeks cannot be combined with other units | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/duration.json#/groups/0/tests/24 | invalid non-ASCII '২' (a Bengali 2) | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/duration.json#/groups/0/tests/25 | element without unit | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/duration.json#/groups/0/tests/33 | leading whitespace is invalid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/duration.json#/groups/0/tests/34 | trailing whitespace is invalid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/duration.json#/groups/0/tests/35 | empty string is invalid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/ecmascript-regex.json#/groups/0/tests/0 | when used as a pattern | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/email.json#/groups/0/tests/7 | an invalid e-mail address | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/email.json#/groups/0/tests/11 | a quoted string with a space in the local part is valid | WRONG | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/email.json#/groups/0/tests/12 | a quoted string with a double dot in the local part is valid | WRONG | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/email.json#/groups/0/tests/13 | a quoted string with a @ in the local part is valid | WRONG | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/email.json#/groups/0/tests/14 | an IPv4-address-literal after the @ is valid | WRONG | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/email.json#/groups/0/tests/15 | an IPv6-address-literal after the @ is valid | WRONG | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/email.json#/groups/0/tests/16 | dot before local part is not valid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/email.json#/groups/0/tests/17 | dot after local part is not valid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/email.json#/groups/0/tests/19 | two subsequent dots inside local part are not valid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/email.json#/groups/0/tests/20 | an invalid domain | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/email.json#/groups/0/tests/21 | an invalid IPv4-address-literal | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/email.json#/groups/0/tests/22 | two email addresses is not valid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/email.json#/groups/0/tests/23 | full "From" header is invalid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/email.json#/groups/0/tests/24 | local part is required | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/email.json#/groups/0/tests/25 | domain is required | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/email.json#/groups/0/tests/26 | unquoted space in local part is invalid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/hostname.json#/groups/0/tests/11 | empty string | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/hostname.json#/groups/0/tests/12 | single dot | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/hostname.json#/groups/0/tests/13 | leading dot | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/hostname.json#/groups/0/tests/15 | IDN label separator | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/hostname.json#/groups/0/tests/17 | starts with hyphen | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/hostname.json#/groups/0/tests/18 | ends with hyphen | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/hostname.json#/groups/0/tests/19 | contains underscore | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/hostname.json#/groups/0/tests/20 | exceeds maximum overall length (256) | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/hostname.json#/groups/0/tests/22 | exceeds maximum label length (63) | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/idn-email.json#/groups/0/tests/0 | all string formats ignore integers | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-email" at # |
| draft2020-12:optional/format/idn-email.json#/groups/0/tests/1 | all string formats ignore floats | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-email" at # |
| draft2020-12:optional/format/idn-email.json#/groups/0/tests/2 | all string formats ignore objects | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-email" at # |
| draft2020-12:optional/format/idn-email.json#/groups/0/tests/3 | all string formats ignore arrays | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-email" at # |
| draft2020-12:optional/format/idn-email.json#/groups/0/tests/4 | all string formats ignore booleans | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-email" at # |
| draft2020-12:optional/format/idn-email.json#/groups/0/tests/5 | all string formats ignore nulls | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-email" at # |
| draft2020-12:optional/format/idn-email.json#/groups/0/tests/6 | a valid idn e-mail (example@example.test in Hangul) | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-email" at # |
| draft2020-12:optional/format/idn-email.json#/groups/0/tests/7 | an invalid e-mail/idn e-mail address | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-email" at # |
| draft2020-12:optional/format/idn-email.json#/groups/0/tests/8 | a valid e-mail address | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-email" at # |
| draft2020-12:optional/format/idn-email.json#/groups/0/tests/9 | a non-ASCII local part with an ASCII domain is valid | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-email" at # |
| draft2020-12:optional/format/idn-email.json#/groups/0/tests/10 | a non-ASCII quoted local part is valid | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-email" at # |
| draft2020-12:optional/format/idn-email.json#/groups/0/tests/11 | a local part with a lone UTF-16 surrogate is invalid | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-email" at # |
| draft2020-12:optional/format/idn-email.json#/groups/0/tests/12 | a domain label that is not in Unicode NFC is valid | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-email" at # |
| draft2020-12:optional/format/idn-email.json#/groups/0/tests/13 | a local part that is not in Unicode NFC is valid | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-email" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/0 | all string formats ignore integers | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/1 | all string formats ignore floats | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/2 | all string formats ignore objects | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/3 | all string formats ignore arrays | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/4 | all string formats ignore booleans | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/5 | all string formats ignore nulls | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/6 | a valid host name (example.test in Hangul) | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/7 | illegal first char U+302E Hangul single dot tone mark | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/8 | contains illegal char U+302E Hangul single dot tone mark | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/9 | a single label of 63 characters is valid | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/10 | a single label of 64 characters is too long | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/11 | invalid label, correct Punycode | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/12 | valid Chinese Punycode | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/13 | invalid Punycode | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/14 | U-label contains "--" in the 3rd and 4th position | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/15 | U-label starts with a dash | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/16 | U-label ends with a dash | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/17 | U-label starts and ends with a dash | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/18 | Begins with a Spacing Combining Mark | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/19 | Begins with a Nonspacing Mark | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/20 | Begins with an Enclosing Mark | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/21 | Exceptions that are PVALID, left-to-right chars | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/22 | Exceptions that are PVALID, right-to-left chars | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/23 | Exceptions that are DISALLOWED, right-to-left chars | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/24 | Exceptions that are DISALLOWED, left-to-right chars | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/25 | MIDDLE DOT with no preceding 'l' | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/26 | MIDDLE DOT with nothing preceding | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/27 | MIDDLE DOT with no following 'l' | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/28 | MIDDLE DOT with nothing following | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/29 | MIDDLE DOT with surrounding 'l's | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/30 | Greek KERAIA not followed by Greek | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/31 | Greek KERAIA not followed by anything | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/32 | Greek KERAIA followed by Greek | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/33 | Hebrew GERESH not preceded by Hebrew | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/34 | Hebrew GERESH not preceded by anything | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/35 | Hebrew GERESH preceded by Hebrew | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/36 | Hebrew GERSHAYIM not preceded by Hebrew | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/37 | Hebrew GERSHAYIM not preceded by anything | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/38 | Hebrew GERSHAYIM preceded by Hebrew | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/39 | KATAKANA MIDDLE DOT with no Hiragana, Katakana, or Han | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/40 | KATAKANA MIDDLE DOT with no other characters | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/41 | KATAKANA MIDDLE DOT with Hiragana | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/42 | KATAKANA MIDDLE DOT with Katakana | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/43 | KATAKANA MIDDLE DOT with Han | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/44 | Arabic-Indic digits mixed with Extended Arabic-Indic digits | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/45 | Arabic-Indic digits not mixed with Extended Arabic-Indic digits | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/46 | Extended Arabic-Indic digits not mixed with Arabic-Indic digits | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/47 | ZERO WIDTH JOINER not preceded by Virama | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/48 | ZERO WIDTH JOINER not preceded by anything | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/49 | ZERO WIDTH JOINER preceded by Virama | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/50 | ZERO WIDTH NON-JOINER preceded by Virama | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/51 | ZERO WIDTH NON-JOINER not preceded by Virama but matches regexp | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/52 | single label | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/53 | single label with hyphen | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/54 | single label with digits | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/55 | single label starting with digit | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/56 | single label ending with digit | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/57 | empty string | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/58 | zero width non-joiner must pass at every occurrence | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/59 | Bidi domain name with a digit-first label is invalid | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/60 | label starting with a digit before a right-to-left letter is invalid | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/61 | left-to-right label containing a right-to-left letter is invalid | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/62 | right-to-left label mixing both digit types is invalid | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/63 | A-label that decodes to a disallowed code point is invalid | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/64 | A-label that decodes to a Bidi rule violation is invalid | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/65 | a U-label whose A-label form is longer than 63 octets is invalid | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/66 | empty label between two dots is invalid | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/67 | a name longer than 253 characters is invalid | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/68 | A-label that decodes to only ASCII is invalid | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/69 | non-canonical Punycode that does not re-encode to itself is invalid | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/1/tests/0 | single dot | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/1/tests/1 | single ideographic full stop | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/1/tests/2 | single fullwidth full stop | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/1/tests/3 | single halfwidth ideographic full stop | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/1/tests/4 | dot as label separator | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/1/tests/5 | ideographic full stop as label separator | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/1/tests/6 | fullwidth full stop as label separator | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/1/tests/7 | halfwidth ideographic full stop as label separator | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/1/tests/8 | leading dot | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/1/tests/9 | leading ideographic full stop | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/1/tests/10 | leading fullwidth full stop | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/1/tests/11 | leading halfwidth ideographic full stop | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/1/tests/12 | trailing dot | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/1/tests/13 | trailing ideographic full stop | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/1/tests/14 | trailing fullwidth full stop | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/1/tests/15 | trailing halfwidth ideographic full stop | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/1/tests/16 | label too long if separator ignored (full stop) | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/1/tests/17 | label too long if separator ignored (ideographic full stop) | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/1/tests/18 | label too long if separator ignored (fullwidth full stop) | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/idn-hostname.json#/groups/1/tests/19 | label too long if separator ignored (halfwidth ideographic full stop) | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "idn-hostname" at # |
| draft2020-12:optional/format/ipv4.json#/groups/0/tests/7 | an IP address with too many components | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/ipv4.json#/groups/0/tests/8 | an IP address with out-of-range values | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/ipv4.json#/groups/0/tests/9 | an IP address without 4 components | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/ipv4.json#/groups/0/tests/10 | a 2-part address resolving to a routable IP (inet_aton shorthand) | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/ipv4.json#/groups/0/tests/11 | a 3-part address resolving to a routable IP (inet_aton shorthand) | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/ipv4.json#/groups/0/tests/12 | an IP address as an integer | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/ipv4.json#/groups/0/tests/13 | an IP address as an integer (decimal) | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/ipv4.json#/groups/0/tests/14 | invalid non-ASCII '২' (a Bengali 2) | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/ipv4.json#/groups/0/tests/15 | invalid fullwidth digits (non-ASCII) | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/ipv4.json#/groups/0/tests/16 | invalid mathematical bold digits (non-ASCII) | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/ipv4.json#/groups/0/tests/17 | netmask is not a part of ipv4 address | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/ipv4.json#/groups/0/tests/18 | leading whitespace is invalid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/ipv4.json#/groups/0/tests/19 | trailing whitespace is invalid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/ipv4.json#/groups/0/tests/20 | trailing newline is invalid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/ipv4.json#/groups/0/tests/21 | hexadecimal notation is invalid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/ipv4.json#/groups/0/tests/22 | octal notation explicit is invalid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/ipv4.json#/groups/0/tests/23 | empty part (double dot) is invalid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/ipv4.json#/groups/0/tests/24 | leading dot is invalid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/ipv4.json#/groups/0/tests/25 | trailing dot is invalid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/ipv4.json#/groups/0/tests/28 | empty string is invalid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/ipv4.json#/groups/0/tests/29 | plus sign is invalid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/ipv4.json#/groups/0/tests/30 | negative sign is invalid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/ipv4.json#/groups/0/tests/31 | exponential notation is invalid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/ipv4.json#/groups/0/tests/32 | alpha characters are invalid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/ipv4.json#/groups/0/tests/33 | internal whitespace is invalid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/ipv4.json#/groups/0/tests/34 | tab character is invalid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/ipv4.json#/groups/0/tests/35 | additional content after an embedded NUL byte | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/ipv4.json#/groups/0/tests/36 | with port number is invalid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/ipv6.json#/groups/0/tests/7 | a group with 5 hex digits is invalid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/ipv6.json#/groups/0/tests/9 | trailing 5 hex symbols is invalid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/ipv6.json#/groups/0/tests/10 | an IPv6 address with too many components | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/ipv6.json#/groups/0/tests/11 | an IPv6 address containing illegal characters | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/ipv6.json#/groups/0/tests/15 | missing leading octet is invalid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/ipv6.json#/groups/0/tests/16 | missing trailing octet is invalid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/ipv6.json#/groups/0/tests/17 | missing leading octet with omitted octets later | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/ipv6.json#/groups/0/tests/19 | two sets of double colons is invalid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/ipv6.json#/groups/0/tests/22 | mixed format with ipv4 section with octet out of range | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/ipv6.json#/groups/0/tests/23 | mixed format with ipv4 section with a hex octet | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/ipv6.json#/groups/0/tests/25 | triple colons is invalid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/ipv6.json#/groups/0/tests/27 | insufficient octets without double colons | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/ipv6.json#/groups/0/tests/28 | no colons is invalid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/ipv6.json#/groups/0/tests/29 | ipv4 is not ipv6 | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/ipv6.json#/groups/0/tests/30 | ipv4 segment must have 4 octets | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/ipv6.json#/groups/0/tests/31 | leading whitespace is invalid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/ipv6.json#/groups/0/tests/32 | trailing whitespace is invalid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/ipv6.json#/groups/0/tests/33 | netmask is not a part of ipv6 address | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/ipv6.json#/groups/0/tests/34 | zone id is not a part of ipv6 address | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/ipv6.json#/groups/0/tests/36 | a long invalid ipv6, below length limit, first | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/ipv6.json#/groups/0/tests/37 | a long invalid ipv6, below length limit, second | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/ipv6.json#/groups/0/tests/38 | invalid non-ASCII '৪' (a Bengali 4) | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/ipv6.json#/groups/0/tests/39 | invalid non-ASCII '৪' (a Bengali 4) in the IPv4 portion | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/iri-reference.json#/groups/0/tests/0 | all string formats ignore integers | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "iri-reference" at # |
| draft2020-12:optional/format/iri-reference.json#/groups/0/tests/1 | all string formats ignore floats | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "iri-reference" at # |
| draft2020-12:optional/format/iri-reference.json#/groups/0/tests/2 | all string formats ignore objects | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "iri-reference" at # |
| draft2020-12:optional/format/iri-reference.json#/groups/0/tests/3 | all string formats ignore arrays | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "iri-reference" at # |
| draft2020-12:optional/format/iri-reference.json#/groups/0/tests/4 | all string formats ignore booleans | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "iri-reference" at # |
| draft2020-12:optional/format/iri-reference.json#/groups/0/tests/5 | all string formats ignore nulls | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "iri-reference" at # |
| draft2020-12:optional/format/iri-reference.json#/groups/0/tests/6 | a valid IRI | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "iri-reference" at # |
| draft2020-12:optional/format/iri-reference.json#/groups/0/tests/7 | a valid protocol-relative IRI Reference | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "iri-reference" at # |
| draft2020-12:optional/format/iri-reference.json#/groups/0/tests/8 | a valid relative IRI Reference | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "iri-reference" at # |
| draft2020-12:optional/format/iri-reference.json#/groups/0/tests/9 | an invalid IRI Reference | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "iri-reference" at # |
| draft2020-12:optional/format/iri-reference.json#/groups/0/tests/10 | a valid IRI Reference | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "iri-reference" at # |
| draft2020-12:optional/format/iri-reference.json#/groups/0/tests/11 | a valid IRI fragment | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "iri-reference" at # |
| draft2020-12:optional/format/iri-reference.json#/groups/0/tests/12 | an invalid IRI fragment | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "iri-reference" at # |
| draft2020-12:optional/format/iri.json#/groups/0/tests/0 | all string formats ignore integers | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "iri" at # |
| draft2020-12:optional/format/iri.json#/groups/0/tests/1 | all string formats ignore floats | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "iri" at # |
| draft2020-12:optional/format/iri.json#/groups/0/tests/2 | all string formats ignore objects | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "iri" at # |
| draft2020-12:optional/format/iri.json#/groups/0/tests/3 | all string formats ignore arrays | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "iri" at # |
| draft2020-12:optional/format/iri.json#/groups/0/tests/4 | all string formats ignore booleans | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "iri" at # |
| draft2020-12:optional/format/iri.json#/groups/0/tests/5 | all string formats ignore nulls | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "iri" at # |
| draft2020-12:optional/format/iri.json#/groups/0/tests/6 | a valid IRI with anchor tag | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "iri" at # |
| draft2020-12:optional/format/iri.json#/groups/0/tests/7 | a valid IRI with anchor tag and parentheses | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "iri" at # |
| draft2020-12:optional/format/iri.json#/groups/0/tests/8 | a valid IRI with URL-encoded stuff | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "iri" at # |
| draft2020-12:optional/format/iri.json#/groups/0/tests/9 | a valid IRI with many special characters | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "iri" at # |
| draft2020-12:optional/format/iri.json#/groups/0/tests/10 | a valid IRI based on IPv6 | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "iri" at # |
| draft2020-12:optional/format/iri.json#/groups/0/tests/11 | an IPv6 address without enclosing brackets is invalid | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "iri" at # |
| draft2020-12:optional/format/iri.json#/groups/0/tests/12 | an invalid relative IRI Reference | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "iri" at # |
| draft2020-12:optional/format/iri.json#/groups/0/tests/13 | an invalid IRI | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "iri" at # |
| draft2020-12:optional/format/iri.json#/groups/0/tests/14 | an invalid IRI though valid IRI reference | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "iri" at # |
| draft2020-12:optional/format/json-pointer.json#/groups/0/tests/7 | not a valid JSON-pointer (~ not escaped) | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/json-pointer.json#/groups/0/tests/27 | not a valid JSON-pointer (URI Fragment Identifier) #1 | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/json-pointer.json#/groups/0/tests/28 | not a valid JSON-pointer (URI Fragment Identifier) #2 | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/json-pointer.json#/groups/0/tests/29 | not a valid JSON-pointer (URI Fragment Identifier) #3 | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/json-pointer.json#/groups/0/tests/30 | not a valid JSON-pointer (some escaped, but not all) #1 | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/json-pointer.json#/groups/0/tests/31 | not a valid JSON-pointer (some escaped, but not all) #2 | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/json-pointer.json#/groups/0/tests/32 | not a valid JSON-pointer (wrong escape character) #1 | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/json-pointer.json#/groups/0/tests/33 | not a valid JSON-pointer (wrong escape character) #2 | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/json-pointer.json#/groups/0/tests/34 | not a valid JSON-pointer (multiple characters not escaped) | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/json-pointer.json#/groups/0/tests/35 | not a valid JSON-pointer (isn't empty nor starts with /) #1 | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/json-pointer.json#/groups/0/tests/36 | not a valid JSON-pointer (isn't empty nor starts with /) #2 | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/json-pointer.json#/groups/0/tests/37 | not a valid JSON-pointer (isn't empty nor starts with /) #3 | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/regex.json#/groups/0/tests/7 | a regular expression with unclosed parens is invalid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/relative-json-pointer.json#/groups/0/tests/10 | an invalid RJP that is a valid JSON Pointer | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/relative-json-pointer.json#/groups/0/tests/11 | negative prefix | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/relative-json-pointer.json#/groups/0/tests/12 | explicit positive prefix | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/relative-json-pointer.json#/groups/0/tests/13 | non-ASCII digit in the prefix is not allowed | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/relative-json-pointer.json#/groups/0/tests/14 | ## is not a valid json-pointer | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/relative-json-pointer.json#/groups/0/tests/15 | zero cannot be followed by other digits, plus json-pointer | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/relative-json-pointer.json#/groups/0/tests/16 | zero cannot be followed by other digits, plus octothorpe | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/relative-json-pointer.json#/groups/0/tests/17 | empty string | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/time.json#/groups/0/tests/7 | invalid time string with extra leading zeros | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/time.json#/groups/0/tests/8 | invalid time string with no leading zero for single digit | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/time.json#/groups/0/tests/9 | hour, minute, second must be two digits | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/time.json#/groups/0/tests/11 | invalid leap second, Zulu (wrong hour) | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/time.json#/groups/0/tests/12 | invalid leap second, Zulu (wrong minute) | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/time.json#/groups/0/tests/14 | invalid leap second, zero time-offset (wrong hour) | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/time.json#/groups/0/tests/15 | invalid leap second, zero time-offset (wrong minute) | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/time.json#/groups/0/tests/18 | invalid leap second, positive time-offset (wrong hour) | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/time.json#/groups/0/tests/19 | invalid leap second, positive time-offset (wrong minute) | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/time.json#/groups/0/tests/22 | invalid leap second, negative time-offset (wrong hour) | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/time.json#/groups/0/tests/23 | invalid leap second, negative time-offset (wrong minute) | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/time.json#/groups/0/tests/29 | hour, minute in time-offset must be two digits | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/time.json#/groups/0/tests/31 | an invalid time string with invalid hour | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/time.json#/groups/0/tests/32 | an invalid time string with invalid minute | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/time.json#/groups/0/tests/33 | an invalid time string with invalid second | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/time.json#/groups/0/tests/34 | an invalid time string with invalid leap second (wrong hour) | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/time.json#/groups/0/tests/35 | an invalid time string with invalid leap second (wrong minute) | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/time.json#/groups/0/tests/36 | an invalid time string with invalid time numoffset hour | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/time.json#/groups/0/tests/37 | an invalid time string with invalid time numoffset minute | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/time.json#/groups/0/tests/38 | an invalid time string with invalid time with both Z and numoffset | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/time.json#/groups/0/tests/39 | an invalid offset indicator | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/time.json#/groups/0/tests/40 | only RFC3339 not all of ISO 8601 are valid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/time.json#/groups/0/tests/43 | invalid non-ASCII '২' (a Bengali 2) | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/time.json#/groups/0/tests/44 | offset not starting with plus or minus | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/time.json#/groups/0/tests/45 | contains letters | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/time.json#/groups/0/tests/46 | an invalid time string in date-time format | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/unknown.json#/groups/0/tests/0 | unknown formats ignore integers | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "unknown" at # |
| draft2020-12:optional/format/unknown.json#/groups/0/tests/1 | unknown formats ignore floats | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "unknown" at # |
| draft2020-12:optional/format/unknown.json#/groups/0/tests/2 | unknown formats ignore objects | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "unknown" at # |
| draft2020-12:optional/format/unknown.json#/groups/0/tests/3 | unknown formats ignore arrays | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "unknown" at # |
| draft2020-12:optional/format/unknown.json#/groups/0/tests/4 | unknown formats ignore booleans | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "unknown" at # |
| draft2020-12:optional/format/unknown.json#/groups/0/tests/5 | unknown formats ignore nulls | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "unknown" at # |
| draft2020-12:optional/format/unknown.json#/groups/0/tests/6 | unknown formats ignore strings | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "unknown" at # |
| draft2020-12:optional/format/uri-reference.json#/groups/0/tests/9 | an invalid URI Reference | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/uri-reference.json#/groups/0/tests/12 | an invalid URI fragment | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/uri-reference.json#/groups/0/tests/13 | unescaped non US-ASCII characters | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/uri-reference.json#/groups/0/tests/14 | invalid backslash character | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/uri-template.json#/groups/0/tests/7 | an invalid uri-template | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/uri.json#/groups/0/tests/19 | an invalid protocol-relative URI Reference | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/uri.json#/groups/0/tests/20 | an invalid relative URI Reference | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/uri.json#/groups/0/tests/21 | an invalid URI | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/uri.json#/groups/0/tests/22 | an invalid URI though valid URI reference | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/uri.json#/groups/0/tests/23 | an invalid URI with spaces | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/uri.json#/groups/0/tests/24 | an invalid URI with spaces and missing scheme | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/uri.json#/groups/0/tests/25 | an invalid URI with comma in scheme | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/uri.json#/groups/0/tests/26 | invalid userinfo | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/uri.json#/groups/0/tests/27 | unescaped non US-ASCII characters | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/uri.json#/groups/0/tests/28 | invalid backslash character | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/uri.json#/groups/0/tests/29 | invalid " character | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/uri.json#/groups/0/tests/30 | invalid <> characters | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/uri.json#/groups/0/tests/31 | invalid {} characters | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/uri.json#/groups/0/tests/32 | invalid ^ character | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/uri.json#/groups/0/tests/33 | invalid ` character | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/uri.json#/groups/0/tests/34 | invalid SPACE character | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/uri.json#/groups/0/tests/35 | invalid \| character | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/uri.json#/groups/0/tests/38 | invalid percent-encoding with non-hex digits | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/uri.json#/groups/0/tests/39 | incomplete percent-encoding triplet | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/uri.json#/groups/0/tests/40 | lone percent sign is invalid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/uri.json#/groups/0/tests/41 | scheme must start with a letter | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/uri.json#/groups/0/tests/42 | invalid character in scheme | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/uuid.json#/groups/0/tests/10 | wrong length | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/uuid.json#/groups/0/tests/11 | missing section | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/uuid.json#/groups/0/tests/12 | bad characters (not hex) | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/uuid.json#/groups/0/tests/13 | no dashes | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/uuid.json#/groups/0/tests/14 | too few dashes | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/uuid.json#/groups/0/tests/15 | too many dashes | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/uuid.json#/groups/0/tests/16 | dashes in the wrong spot | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/uuid.json#/groups/0/tests/17 | shifted dashes | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/uuid.json#/groups/0/tests/22 | URN prefixed UUID is invalid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/uuid.json#/groups/0/tests/23 | trailing hyphen after a complete UUID is invalid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/format/uuid.json#/groups/0/tests/24 | non-ASCII digit '২' (a Bengali 2) is invalid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft2020-12:optional/id.json#/groups/0/tests/2 | no match on enum or $ref to $id | PASS | {"keywordLocation":"#/anyOf","instanceLocation":"#"} |
| draft2020-12:optional/no-schema.json#/groups/0/tests/1 | a 1-character string is not valid | PASS | {"keywordLocation":"#/minLength","instanceLocation":"#"} |
| draft2020-12:optional/non-bmp-regex.json#/groups/0/tests/3 | doesn't match one | PASS | {"keywordLocation":"#/pattern","instanceLocation":"#"} |
| draft2020-12:optional/non-bmp-regex.json#/groups/0/tests/4 | doesn't match two | PASS | {"keywordLocation":"#/pattern","instanceLocation":"#"} |
| draft2020-12:optional/non-bmp-regex.json#/groups/0/tests/5 | doesn't match one ASCII | PASS | {"keywordLocation":"#/pattern","instanceLocation":"#"} |
| draft2020-12:optional/non-bmp-regex.json#/groups/0/tests/6 | doesn't match two ASCII | PASS | {"keywordLocation":"#/pattern","instanceLocation":"#"} |
| draft2020-12:optional/non-bmp-regex.json#/groups/1/tests/3 | doesn't match one | PASS | {"keywordLocation":"#/patternProperties/^🐲*$/type","instanceLocation":"#/🐲"} |
| draft2020-12:optional/non-bmp-regex.json#/groups/1/tests/4 | doesn't match two | PASS | {"keywordLocation":"#/patternProperties/^🐲*$/type","instanceLocation":"#/🐲🐲"} |
| draft2020-12:optional/refOfUnknownKeyword.json#/groups/0/tests/1 | mismatch | PASS | {"keywordLocation":"#/properties/bar/$ref/type","instanceLocation":"#/bar"} |
| draft2020-12:optional/refOfUnknownKeyword.json#/groups/1/tests/1 | mismatch | PASS | {"keywordLocation":"#/properties/bar/$ref/type","instanceLocation":"#/bar"} |
| draft2020-12:optional/refOfUnknownKeyword.json#/groups/2/tests/1 | mismatch | PASS | {"keywordLocation":"#/properties/bar/$ref/type","instanceLocation":"#/bar"} |
| draft2020-12:optional/refOfUnknownKeyword.json#/groups/3/tests/1 | mismatch | PASS | {"keywordLocation":"#/$ref/type","instanceLocation":"#"} |
| draft2020-12:optional/refOfUnknownKeyword.json#/groups/4/tests/1 | mismatch | PASS | {"keywordLocation":"#/properties/bar/$ref/type","instanceLocation":"#/bar"} |
| draft2020-12:optional/unknownKeyword.json#/groups/0/tests/1 | type matches non-schema in first anyOf | PASS | {"keywordLocation":"#/anyOf","instanceLocation":"#"} |
| draft2020-12:optional/unknownKeyword.json#/groups/0/tests/2 | type matches non-schema in third anyOf | PASS | {"keywordLocation":"#/anyOf","instanceLocation":"#"} |
| draft2020-12:pattern.json#/groups/0/tests/1 | a non-matching pattern is invalid | PASS | {"keywordLocation":"#/pattern","instanceLocation":"#"} |
| draft2020-12:pattern.json#/groups/2/tests/2 | Digits do not match | PASS | {"keywordLocation":"#/pattern","instanceLocation":"#"} |
| draft2020-12:patternProperties.json#/groups/0/tests/2 | a single invalid match is invalid | PASS | {"keywordLocation":"#/patternProperties/f.*o/type","instanceLocation":"#/foo"} |
| draft2020-12:patternProperties.json#/groups/0/tests/3 | multiple invalid matches is invalid | PASS | {"keywordLocation":"#/patternProperties/f.*o/type","instanceLocation":"#/foo"} |
| draft2020-12:patternProperties.json#/groups/1/tests/3 | an invalid due to one is invalid | PASS | {"keywordLocation":"#/patternProperties/a*/type","instanceLocation":"#/a"} |
| draft2020-12:patternProperties.json#/groups/1/tests/4 | an invalid due to the other is invalid | PASS | {"keywordLocation":"#/patternProperties/aaa*/maximum","instanceLocation":"#/aaaa"} |
| draft2020-12:patternProperties.json#/groups/1/tests/5 | an invalid due to both is invalid | PASS | {"keywordLocation":"#/patternProperties/a*/type","instanceLocation":"#/aaa"} |
| draft2020-12:patternProperties.json#/groups/2/tests/1 | recognized members are accounted for | PASS | {"keywordLocation":"#/patternProperties/[0-9]{2,}/type","instanceLocation":"#/a31b"} |
| draft2020-12:patternProperties.json#/groups/2/tests/3 | regexes are case sensitive, 2 | PASS | {"keywordLocation":"#/patternProperties/X_/type","instanceLocation":"#/a_X_3"} |
| draft2020-12:patternProperties.json#/groups/3/tests/1 | object with property matching schema false is invalid | PASS | {"keywordLocation":"#/patternProperties/b.*","instanceLocation":"#/bar"} |
| draft2020-12:patternProperties.json#/groups/3/tests/2 | object with both properties is invalid | PASS | {"keywordLocation":"#/patternProperties/b.*","instanceLocation":"#/bar"} |
| draft2020-12:patternProperties.json#/groups/3/tests/3 | object with a property matching both true and false is invalid | PASS | {"keywordLocation":"#/patternProperties/b.*","instanceLocation":"#/foobar"} |
| draft2020-12:prefixItems.json#/groups/0/tests/1 | wrong types | PASS | {"keywordLocation":"#/0/type","instanceLocation":"#/0"} |
| draft2020-12:prefixItems.json#/groups/1/tests/1 | array with two items is invalid | PASS | {"keywordLocation":"#/1","instanceLocation":"#/1"} |
| draft2020-12:properties.json#/groups/0/tests/1 | one property invalid is invalid | PASS | {"keywordLocation":"#/properties/bar/type","instanceLocation":"#/bar"} |
| draft2020-12:properties.json#/groups/0/tests/2 | both properties invalid is invalid | PASS | {"keywordLocation":"#/properties/foo/type","instanceLocation":"#/foo"} |
| draft2020-12:properties.json#/groups/1/tests/1 | property invalidates property | PASS | {"keywordLocation":"#/properties/foo/maxItems","instanceLocation":"#/foo"} |
| draft2020-12:properties.json#/groups/1/tests/2 | patternProperty invalidates property | PASS | {"keywordLocation":"#/patternProperties/f.o/minItems","instanceLocation":"#/foo"} |
| draft2020-12:properties.json#/groups/1/tests/4 | patternProperty invalidates nonproperty | PASS | {"keywordLocation":"#/patternProperties/f.o/minItems","instanceLocation":"#/fxo"} |
| draft2020-12:properties.json#/groups/1/tests/7 | additionalProperty invalidates others | PASS | {"keywordLocation":"#/additionalProperties/type","instanceLocation":"#/quux"} |
| draft2020-12:properties.json#/groups/2/tests/2 | only 'false' property present is invalid | PASS | {"keywordLocation":"#/properties/bar","instanceLocation":"#/bar"} |
| draft2020-12:properties.json#/groups/2/tests/3 | both properties present is invalid | PASS | {"keywordLocation":"#/properties/bar","instanceLocation":"#/bar"} |
| draft2020-12:properties.json#/groups/3/tests/1 | object with strings is invalid | PASS | {"keywordLocation":"#/properties/foo\nbar/type","instanceLocation":"#/foo\nbar"} |
| draft2020-12:properties.json#/groups/5/tests/3 | __proto__ not valid | PASS | {"keywordLocation":"#/properties/__proto__/type","instanceLocation":"#/__proto__"} |
| draft2020-12:properties.json#/groups/5/tests/4 | toString not valid | PASS | {"keywordLocation":"#/properties/toString/properties/length/type","instanceLocation":"#/toString/length"} |
| draft2020-12:properties.json#/groups/5/tests/5 | constructor not valid | PASS | {"keywordLocation":"#/properties/constructor/type","instanceLocation":"#/constructor"} |
| draft2020-12:propertyNames.json#/groups/0/tests/1 | some property names invalid | PASS | {"keywordLocation":"#/propertyNames/maxLength","instanceLocation":"#/foobar"} |
| draft2020-12:propertyNames.json#/groups/1/tests/1 | non-matching property name is invalid | PASS | {"keywordLocation":"#/propertyNames/pattern","instanceLocation":"#/aaA"} |
| draft2020-12:propertyNames.json#/groups/3/tests/0 | object with any properties is invalid | PASS | {"keywordLocation":"#/propertyNames","instanceLocation":"#/foo"} |
| draft2020-12:propertyNames.json#/groups/4/tests/1 | object with any other property is invalid | PASS | {"keywordLocation":"#/propertyNames/const","instanceLocation":"#/bar"} |
| draft2020-12:propertyNames.json#/groups/5/tests/2 | object with any other property is invalid | PASS | {"keywordLocation":"#/propertyNames/enum","instanceLocation":"#/baz"} |
| draft2020-12:ref.json#/groups/0/tests/2 | mismatch | PASS | {"keywordLocation":"#/additionalProperties","instanceLocation":"#/bar"} |
| draft2020-12:ref.json#/groups/0/tests/3 | recursive mismatch | PASS | {"keywordLocation":"#/properties/foo/$ref/additionalProperties","instanceLocation":"#/foo/bar"} |
| draft2020-12:ref.json#/groups/1/tests/1 | mismatch | PASS | {"keywordLocation":"#/properties/bar/$ref/type","instanceLocation":"#/bar"} |
| draft2020-12:ref.json#/groups/2/tests/1 | mismatch array | PASS | {"keywordLocation":"#/1/$ref/type","instanceLocation":"#/1"} |
| draft2020-12:ref.json#/groups/3/tests/0 | slash invalid | PASS | {"keywordLocation":"#/properties/slash/$ref/type","instanceLocation":"#/slash"} |
| draft2020-12:ref.json#/groups/3/tests/1 | tilde invalid | PASS | {"keywordLocation":"#/properties/tilde/$ref/type","instanceLocation":"#/tilde"} |
| draft2020-12:ref.json#/groups/3/tests/2 | percent invalid | PASS | {"keywordLocation":"#/properties/percent/$ref/type","instanceLocation":"#/percent"} |
| draft2020-12:ref.json#/groups/4/tests/1 | nested ref invalid | PASS | {"keywordLocation":"#/$ref/$ref/$ref/type","instanceLocation":"#"} |
| draft2020-12:ref.json#/groups/5/tests/1 | ref valid, maxItems invalid | PASS | {"keywordLocation":"#/properties/foo/maxItems","instanceLocation":"#/foo"} |
| draft2020-12:ref.json#/groups/5/tests/2 | ref invalid | PASS | {"keywordLocation":"#/properties/foo/$ref/type","instanceLocation":"#/foo"} |
| draft2020-12:ref.json#/groups/6/tests/0 | remote ref valid | COMPILE | FAST_COMPILE_ERROR: failed to resolve $ref: "https://json-schema.org/draft/2020-12/schema" at # |
| draft2020-12:ref.json#/groups/6/tests/1 | remote ref invalid | COMPILE | FAST_COMPILE_ERROR: failed to resolve $ref: "https://json-schema.org/draft/2020-12/schema" at # |
| draft2020-12:ref.json#/groups/7/tests/1 | property named $ref invalid | PASS | {"keywordLocation":"#/properties/$ref/type","instanceLocation":"#/$ref"} |
| draft2020-12:ref.json#/groups/8/tests/1 | property named $ref invalid | PASS | {"keywordLocation":"#/properties/$ref/$ref/type","instanceLocation":"#/$ref"} |
| draft2020-12:ref.json#/groups/10/tests/0 | any value is invalid | PASS | {"keywordLocation":"#/$ref","instanceLocation":"#"} |
| draft2020-12:ref.json#/groups/11/tests/1 | invalid tree | PASS | {"keywordLocation":"#/properties/nodes/items/$ref/properties/subtree/$ref/properties/nodes/items/$ref/properties/value/type","instanceLocation":"#/nodes/0/subtree/nodes/0/value"} |
| draft2020-12:ref.json#/groups/12/tests/1 | object with strings is invalid | PASS | {"keywordLocation":"#/properties/foo\"bar/$ref/type","instanceLocation":"#/foo\"bar"} |
| draft2020-12:ref.json#/groups/13/tests/0 | referenced subschema doesn't see annotations from properties | PASS | {"keywordLocation":"#/$ref/unevaluatedProperties","instanceLocation":"#/prop1"} |
| draft2020-12:ref.json#/groups/14/tests/0 | do not evaluate the $ref inside the enum, matching any string | PASS | {"keywordLocation":"#/enum","instanceLocation":"#"} |
| draft2020-12:ref.json#/groups/14/tests/1 | do not evaluate the $ref inside the enum, definition exact match | PASS | {"keywordLocation":"#/enum","instanceLocation":"#"} |
| draft2020-12:ref.json#/groups/15/tests/0 | invalid on inner field | PASS | {"keywordLocation":"#/properties/foo/$ref/properties/bar/type","instanceLocation":"#/foo/bar"} |
| draft2020-12:ref.json#/groups/15/tests/1 | invalid on outer field | PASS | {"keywordLocation":"#/$ref/$ref/properties/bar/type","instanceLocation":"#/bar"} |
| draft2020-12:ref.json#/groups/16/tests/0 | invalid on inner field | PASS | {"keywordLocation":"#/properties/foo/$ref/properties/bar/type","instanceLocation":"#/foo/bar"} |
| draft2020-12:ref.json#/groups/16/tests/1 | invalid on outer field | PASS | {"keywordLocation":"#/$ref/$ref/properties/bar/type","instanceLocation":"#/bar"} |
| draft2020-12:ref.json#/groups/17/tests/1 | non-number is invalid | PASS | {"keywordLocation":"#/allOf/0/$ref/type","instanceLocation":"#"} |
| draft2020-12:ref.json#/groups/18/tests/1 | data is invalid against first definition | PASS | {"keywordLocation":"#/$ref/maximum","instanceLocation":"#"} |
| draft2020-12:ref.json#/groups/19/tests/1 | data is invalid against first definition | PASS | {"keywordLocation":"#/$ref/maximum","instanceLocation":"#"} |
| draft2020-12:ref.json#/groups/20/tests/1 | data is invalid against nested sibling | PASS | {"keywordLocation":"#/$ref/$ref/type","instanceLocation":"#"} |
| draft2020-12:ref.json#/groups/21/tests/1 | invalid under the URN IDed schema | PASS | {"keywordLocation":"#/properties/foo/$ref/minimum","instanceLocation":"#/foo"} |
| draft2020-12:ref.json#/groups/22/tests/1 | a non-string is invalid | PASS | {"keywordLocation":"#/properties/foo/$ref/type","instanceLocation":"#/foo"} |
| draft2020-12:ref.json#/groups/23/tests/1 | a non-string is invalid | PASS | {"keywordLocation":"#/properties/foo/$ref/type","instanceLocation":"#/foo"} |
| draft2020-12:ref.json#/groups/24/tests/1 | a non-string is invalid | PASS | {"keywordLocation":"#/properties/foo/$ref/type","instanceLocation":"#/foo"} |
| draft2020-12:ref.json#/groups/25/tests/1 | a non-string is invalid | PASS | {"keywordLocation":"#/properties/foo/$ref/type","instanceLocation":"#/foo"} |
| draft2020-12:ref.json#/groups/26/tests/1 | a non-string is invalid | PASS | {"keywordLocation":"#/properties/foo/$ref/type","instanceLocation":"#/foo"} |
| draft2020-12:ref.json#/groups/27/tests/1 | a non-string is invalid | PASS | {"keywordLocation":"#/properties/foo/$ref/type","instanceLocation":"#/foo"} |
| draft2020-12:ref.json#/groups/28/tests/1 | a non-string is invalid | PASS | {"keywordLocation":"#/$ref/$ref/type","instanceLocation":"#"} |
| draft2020-12:ref.json#/groups/29/tests/0 | a non-integer is invalid due to the $ref | PASS | {"keywordLocation":"#/$ref/type","instanceLocation":"#"} |
| draft2020-12:ref.json#/groups/30/tests/0 | a non-integer is invalid due to the $ref | PASS | {"keywordLocation":"#/$ref/type","instanceLocation":"#"} |
| draft2020-12:ref.json#/groups/31/tests/0 | a non-integer is invalid due to the $ref | PASS | {"keywordLocation":"#/$ref/type","instanceLocation":"#"} |
| draft2020-12:ref.json#/groups/32/tests/1 | an integer is invalid | PASS | {"keywordLocation":"#/$ref/type","instanceLocation":"#"} |
| draft2020-12:ref.json#/groups/33/tests/1 | non-number is invalid | PASS | {"keywordLocation":"#/$ref/type","instanceLocation":"#"} |
| draft2020-12:ref.json#/groups/34/tests/1 | non-number is invalid | PASS | {"keywordLocation":"#/$ref/type","instanceLocation":"#"} |
| draft2020-12:ref.json#/groups/35/tests/1 | non-number is invalid | PASS | {"keywordLocation":"#/allOf/0/$ref/type","instanceLocation":"#"} |
| draft2020-12:refRemote.json#/groups/0/tests/1 | remote ref invalid | PASS | {"keywordLocation":"#/$ref/type","instanceLocation":"#"} |
| draft2020-12:refRemote.json#/groups/1/tests/1 | remote fragment invalid | PASS | {"keywordLocation":"#/$ref/type","instanceLocation":"#"} |
| draft2020-12:refRemote.json#/groups/2/tests/1 | remote anchor invalid | PASS | {"keywordLocation":"#/$ref/type","instanceLocation":"#"} |
| draft2020-12:refRemote.json#/groups/3/tests/1 | ref within ref invalid | PASS | {"keywordLocation":"#/$ref/$ref/type","instanceLocation":"#"} |
| draft2020-12:refRemote.json#/groups/4/tests/1 | base URI change ref invalid | PASS | {"keywordLocation":"#/items/items/$ref/type","instanceLocation":"#/0/0"} |
| draft2020-12:refRemote.json#/groups/5/tests/1 | string is invalid | PASS | {"keywordLocation":"#/properties/list/$ref/items/$ref/type","instanceLocation":"#/list/0"} |
| draft2020-12:refRemote.json#/groups/6/tests/1 | string is invalid | PASS | {"keywordLocation":"#/properties/list/$ref/items/$ref/type","instanceLocation":"#/list/0"} |
| draft2020-12:refRemote.json#/groups/7/tests/2 | object is invalid | PASS | {"keywordLocation":"#/properties/name/$ref/anyOf","instanceLocation":"#/name"} |
| draft2020-12:refRemote.json#/groups/8/tests/0 | invalid | PASS | {"keywordLocation":"#/$ref/$ref/properties/bar/type","instanceLocation":"#/bar"} |
| draft2020-12:refRemote.json#/groups/9/tests/1 | string is invalid | PASS | {"keywordLocation":"#/$ref/$ref/type","instanceLocation":"#"} |
| draft2020-12:refRemote.json#/groups/10/tests/0 | number is invalid | PASS | {"keywordLocation":"#/properties/name/$ref/properties/foo/$ref/type","instanceLocation":"#/name/foo"} |
| draft2020-12:refRemote.json#/groups/11/tests/0 | number is invalid | PASS | {"keywordLocation":"#/$ref/$ref/type","instanceLocation":"#"} |
| draft2020-12:refRemote.json#/groups/12/tests/0 | number is invalid | PASS | {"keywordLocation":"#/$ref/$ref/type","instanceLocation":"#"} |
| draft2020-12:refRemote.json#/groups/13/tests/0 | number is invalid | PASS | {"keywordLocation":"#/$ref/$ref/type","instanceLocation":"#"} |
| draft2020-12:refRemote.json#/groups/14/tests/1 | non-number is invalid | PASS | {"keywordLocation":"#/$ref/$ref/type","instanceLocation":"#"} |
| draft2020-12:required.json#/groups/0/tests/1 | non-present required property is invalid | PASS | {"keywordLocation":"#/required","instanceLocation":"#/foo"} |
| draft2020-12:required.json#/groups/3/tests/1 | object with some properties missing is invalid | PASS | {"keywordLocation":"#/required","instanceLocation":"#/foo\\bar"} |
| draft2020-12:required.json#/groups/4/tests/2 | none of the properties mentioned | PASS | {"keywordLocation":"#/required","instanceLocation":"#/__proto__"} |
| draft2020-12:required.json#/groups/4/tests/3 | __proto__ present | PASS | {"keywordLocation":"#/required","instanceLocation":"#/toString"} |
| draft2020-12:required.json#/groups/4/tests/4 | toString present | PASS | {"keywordLocation":"#/required","instanceLocation":"#/__proto__"} |
| draft2020-12:required.json#/groups/4/tests/5 | constructor present | PASS | {"keywordLocation":"#/required","instanceLocation":"#/__proto__"} |
| draft2020-12:type.json#/groups/0/tests/2 | a float is not an integer | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft2020-12:type.json#/groups/0/tests/3 | a string is not an integer | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft2020-12:type.json#/groups/0/tests/4 | a string is still not an integer, even if it looks like one | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft2020-12:type.json#/groups/0/tests/5 | an object is not an integer | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft2020-12:type.json#/groups/0/tests/6 | an array is not an integer | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft2020-12:type.json#/groups/0/tests/7 | a boolean is not an integer | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft2020-12:type.json#/groups/0/tests/8 | null is not an integer | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft2020-12:type.json#/groups/1/tests/3 | a string is not a number | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft2020-12:type.json#/groups/1/tests/4 | a string is still not a number, even if it looks like one | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft2020-12:type.json#/groups/1/tests/5 | an object is not a number | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft2020-12:type.json#/groups/1/tests/6 | an array is not a number | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft2020-12:type.json#/groups/1/tests/7 | a boolean is not a number | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft2020-12:type.json#/groups/1/tests/8 | null is not a number | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft2020-12:type.json#/groups/2/tests/0 | 1 is not a string | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft2020-12:type.json#/groups/2/tests/1 | a float is not a string | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft2020-12:type.json#/groups/2/tests/5 | an object is not a string | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft2020-12:type.json#/groups/2/tests/6 | an array is not a string | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft2020-12:type.json#/groups/2/tests/7 | a boolean is not a string | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft2020-12:type.json#/groups/2/tests/8 | null is not a string | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft2020-12:type.json#/groups/3/tests/0 | an integer is not an object | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft2020-12:type.json#/groups/3/tests/1 | a float is not an object | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft2020-12:type.json#/groups/3/tests/2 | a string is not an object | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft2020-12:type.json#/groups/3/tests/4 | an array is not an object | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft2020-12:type.json#/groups/3/tests/5 | a boolean is not an object | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft2020-12:type.json#/groups/3/tests/6 | null is not an object | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft2020-12:type.json#/groups/4/tests/0 | an integer is not an array | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft2020-12:type.json#/groups/4/tests/1 | a float is not an array | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft2020-12:type.json#/groups/4/tests/2 | a string is not an array | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft2020-12:type.json#/groups/4/tests/3 | an object is not an array | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft2020-12:type.json#/groups/4/tests/5 | a boolean is not an array | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft2020-12:type.json#/groups/4/tests/6 | null is not an array | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft2020-12:type.json#/groups/5/tests/0 | an integer is not a boolean | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft2020-12:type.json#/groups/5/tests/1 | zero is not a boolean | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft2020-12:type.json#/groups/5/tests/2 | a float is not a boolean | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft2020-12:type.json#/groups/5/tests/3 | a string is not a boolean | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft2020-12:type.json#/groups/5/tests/4 | an empty string is not a boolean | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft2020-12:type.json#/groups/5/tests/5 | an object is not a boolean | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft2020-12:type.json#/groups/5/tests/6 | an array is not a boolean | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft2020-12:type.json#/groups/5/tests/9 | null is not a boolean | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft2020-12:type.json#/groups/6/tests/0 | an integer is not null | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft2020-12:type.json#/groups/6/tests/1 | a float is not null | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft2020-12:type.json#/groups/6/tests/2 | zero is not null | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft2020-12:type.json#/groups/6/tests/3 | a string is not null | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft2020-12:type.json#/groups/6/tests/4 | an empty string is not null | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft2020-12:type.json#/groups/6/tests/5 | an object is not null | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft2020-12:type.json#/groups/6/tests/6 | an array is not null | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft2020-12:type.json#/groups/6/tests/7 | true is not null | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft2020-12:type.json#/groups/6/tests/8 | false is not null | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft2020-12:type.json#/groups/7/tests/2 | a float is invalid | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft2020-12:type.json#/groups/7/tests/3 | an object is invalid | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft2020-12:type.json#/groups/7/tests/4 | an array is invalid | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft2020-12:type.json#/groups/7/tests/5 | a boolean is invalid | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft2020-12:type.json#/groups/7/tests/6 | null is invalid | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft2020-12:type.json#/groups/8/tests/1 | number is invalid | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft2020-12:type.json#/groups/9/tests/2 | number is invalid | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft2020-12:type.json#/groups/9/tests/3 | string is invalid | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft2020-12:type.json#/groups/9/tests/4 | null is invalid | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft2020-12:type.json#/groups/10/tests/3 | number is invalid | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft2020-12:type.json#/groups/10/tests/4 | string is invalid | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft2020-12:unevaluatedItems.json#/groups/1/tests/1 | with unevaluated items | PASS | {"keywordLocation":"#/unevaluatedItems","instanceLocation":"#"} |
| draft2020-12:unevaluatedItems.json#/groups/2/tests/2 | with invalid unevaluated items | PASS | {"keywordLocation":"#/unevaluatedItems/type","instanceLocation":"#/0"} |
| draft2020-12:unevaluatedItems.json#/groups/4/tests/1 | with unevaluated items | PASS | {"keywordLocation":"#/unevaluatedItems","instanceLocation":"#"} |
| draft2020-12:unevaluatedItems.json#/groups/6/tests/1 | invalid under items | PASS | {"keywordLocation":"#/items/type","instanceLocation":"#/0"} |
| draft2020-12:unevaluatedItems.json#/groups/7/tests/1 | with unevaluated items | PASS | {"keywordLocation":"#/unevaluatedItems","instanceLocation":"#"} |
| draft2020-12:unevaluatedItems.json#/groups/8/tests/2 | with invalid additional item | PASS | {"keywordLocation":"#/unevaluatedItems/type","instanceLocation":"#/0"} |
| draft2020-12:unevaluatedItems.json#/groups/11/tests/1 | when one schema matches and has unevaluated items | PASS | {"keywordLocation":"#/unevaluatedItems","instanceLocation":"#/2"} |
| draft2020-12:unevaluatedItems.json#/groups/11/tests/3 | when two schemas match and has unevaluated items | PASS | {"keywordLocation":"#/unevaluatedItems","instanceLocation":"#/3"} |
| draft2020-12:unevaluatedItems.json#/groups/12/tests/1 | with unevaluated items | PASS | {"keywordLocation":"#/unevaluatedItems","instanceLocation":"#"} |
| draft2020-12:unevaluatedItems.json#/groups/13/tests/0 | with unevaluated items | PASS | {"keywordLocation":"#/unevaluatedItems","instanceLocation":"#"} |
| draft2020-12:unevaluatedItems.json#/groups/14/tests/1 | when if matches and it has unevaluated items | PASS | {"keywordLocation":"#/unevaluatedItems","instanceLocation":"#/3"} |
| draft2020-12:unevaluatedItems.json#/groups/14/tests/3 | when if doesn't match and it has unevaluated items | PASS | {"keywordLocation":"#/unevaluatedItems","instanceLocation":"#/4"} |
| draft2020-12:unevaluatedItems.json#/groups/15/tests/1 | with unevaluated items | PASS | {"keywordLocation":"#/unevaluatedItems","instanceLocation":"#"} |
| draft2020-12:unevaluatedItems.json#/groups/16/tests/1 | with unevaluated items | PASS | {"keywordLocation":"#/unevaluatedItems","instanceLocation":"#"} |
| draft2020-12:unevaluatedItems.json#/groups/17/tests/1 | with unevaluated items | PASS | {"keywordLocation":"#/unevaluatedItems","instanceLocation":"#"} |
| draft2020-12:unevaluatedItems.json#/groups/18/tests/0 | with no unevaluated items | RUNTIME | FAST_RUNTIME_ERROR: Cannot read properties of null (reading '0') |
| draft2020-12:unevaluatedItems.json#/groups/18/tests/1 | with unevaluated items | RUNTIME | FAST_RUNTIME_ERROR: Cannot read properties of null (reading '0') |
| draft2020-12:unevaluatedItems.json#/groups/19/tests/0 | always fails | PASS | {"keywordLocation":"#/allOf/1/unevaluatedItems","instanceLocation":"#"} |
| draft2020-12:unevaluatedItems.json#/groups/20/tests/1 | uncle keyword evaluation is not significant | PASS | {"keywordLocation":"#/properties/foo/unevaluatedItems","instanceLocation":"#/foo"} |
| draft2020-12:unevaluatedItems.json#/groups/21/tests/1 | contains fails, second item is not evaluated | PASS | {"keywordLocation":"#/contains","instanceLocation":"#"} |
| draft2020-12:unevaluatedItems.json#/groups/21/tests/2 | contains passes, second item is not evaluated | PASS | {"keywordLocation":"#/unevaluatedItems","instanceLocation":"#/1"} |
| draft2020-12:unevaluatedItems.json#/groups/22/tests/1 | 7 not evaluated, fails unevaluatedItems | PASS | {"keywordLocation":"#/unevaluatedItems/multipleOf","instanceLocation":"#/3"} |
| draft2020-12:unevaluatedItems.json#/groups/23/tests/4 | only b's are invalid | PASS | {"keywordLocation":"#/unevaluatedItems","instanceLocation":"#/0"} |
| draft2020-12:unevaluatedItems.json#/groups/23/tests/5 | only c's are invalid | PASS | {"keywordLocation":"#/unevaluatedItems","instanceLocation":"#/0"} |
| draft2020-12:unevaluatedItems.json#/groups/23/tests/6 | only b's and c's are invalid | PASS | {"keywordLocation":"#/unevaluatedItems","instanceLocation":"#/0"} |
| draft2020-12:unevaluatedItems.json#/groups/23/tests/7 | only a's and c's are invalid | PASS | {"keywordLocation":"#/unevaluatedItems","instanceLocation":"#/0"} |
| draft2020-12:unevaluatedItems.json#/groups/24/tests/1 | no items evaluated by contains | PASS | {"keywordLocation":"#/unevaluatedItems","instanceLocation":"#/0"} |
| draft2020-12:unevaluatedItems.json#/groups/24/tests/2 | some but not all items evaluated by contains | PASS | {"keywordLocation":"#/unevaluatedItems","instanceLocation":"#/1"} |
| draft2020-12:unevaluatedItems.json#/groups/27/tests/1 | invalid in case if is evaluated | PASS | {"keywordLocation":"#/unevaluatedItems","instanceLocation":"#/0"} |
| draft2020-12:unevaluatedItems.json#/groups/28/tests/0 | with an unevaluated item that exists at another location | PASS | {"keywordLocation":"#/unevaluatedItems","instanceLocation":"#"} |
| draft2020-12:unevaluatedProperties.json#/groups/1/tests/2 | with invalid unevaluated properties | PASS | {"keywordLocation":"#/unevaluatedProperties/minLength","instanceLocation":"#/foo"} |
| draft2020-12:unevaluatedProperties.json#/groups/2/tests/1 | with unevaluated properties | PASS | {"keywordLocation":"#/unevaluatedProperties","instanceLocation":"#/foo"} |
| draft2020-12:unevaluatedProperties.json#/groups/3/tests/1 | with unevaluated properties | PASS | {"keywordLocation":"#/unevaluatedProperties","instanceLocation":"#/bar"} |
| draft2020-12:unevaluatedProperties.json#/groups/4/tests/1 | with unevaluated properties | PASS | {"keywordLocation":"#/unevaluatedProperties","instanceLocation":"#/bar"} |
| draft2020-12:unevaluatedProperties.json#/groups/7/tests/1 | with additional properties | PASS | {"keywordLocation":"#/unevaluatedProperties","instanceLocation":"#/baz"} |
| draft2020-12:unevaluatedProperties.json#/groups/8/tests/1 | with additional properties | PASS | {"keywordLocation":"#/unevaluatedProperties","instanceLocation":"#/baz"} |
| draft2020-12:unevaluatedProperties.json#/groups/11/tests/1 | when one matches and has unevaluated properties | PASS | {"keywordLocation":"#/unevaluatedProperties","instanceLocation":"#/baz"} |
| draft2020-12:unevaluatedProperties.json#/groups/11/tests/3 | when two match and has unevaluated properties | PASS | {"keywordLocation":"#/unevaluatedProperties","instanceLocation":"#/quux"} |
| draft2020-12:unevaluatedProperties.json#/groups/12/tests/1 | with unevaluated properties | PASS | {"keywordLocation":"#/unevaluatedProperties","instanceLocation":"#/quux"} |
| draft2020-12:unevaluatedProperties.json#/groups/13/tests/0 | with unevaluated properties | PASS | {"keywordLocation":"#/unevaluatedProperties","instanceLocation":"#/bar"} |
| draft2020-12:unevaluatedProperties.json#/groups/14/tests/1 | when if is true and has unevaluated properties | PASS | {"keywordLocation":"#/unevaluatedProperties","instanceLocation":"#/baz"} |
| draft2020-12:unevaluatedProperties.json#/groups/14/tests/3 | when if is false and has unevaluated properties | PASS | {"keywordLocation":"#/unevaluatedProperties","instanceLocation":"#/foo"} |
| draft2020-12:unevaluatedProperties.json#/groups/15/tests/1 | when if is true and has unevaluated properties | PASS | {"keywordLocation":"#/unevaluatedProperties","instanceLocation":"#/bar"} |
| draft2020-12:unevaluatedProperties.json#/groups/15/tests/3 | when if is false and has unevaluated properties | PASS | {"keywordLocation":"#/unevaluatedProperties","instanceLocation":"#/foo"} |
| draft2020-12:unevaluatedProperties.json#/groups/16/tests/1 | when if is true and has unevaluated properties | PASS | {"keywordLocation":"#/unevaluatedProperties","instanceLocation":"#/baz"} |
| draft2020-12:unevaluatedProperties.json#/groups/16/tests/2 | when if is false and has no unevaluated properties | PASS | {"keywordLocation":"#/unevaluatedProperties","instanceLocation":"#/baz"} |
| draft2020-12:unevaluatedProperties.json#/groups/16/tests/3 | when if is false and has unevaluated properties | PASS | {"keywordLocation":"#/unevaluatedProperties","instanceLocation":"#/foo"} |
| draft2020-12:unevaluatedProperties.json#/groups/17/tests/1 | with unevaluated properties | PASS | {"keywordLocation":"#/unevaluatedProperties","instanceLocation":"#/bar"} |
| draft2020-12:unevaluatedProperties.json#/groups/18/tests/1 | with unevaluated properties | PASS | {"keywordLocation":"#/unevaluatedProperties","instanceLocation":"#/bar"} |
| draft2020-12:unevaluatedProperties.json#/groups/19/tests/1 | with unevaluated properties | PASS | {"keywordLocation":"#/unevaluatedProperties","instanceLocation":"#/baz"} |
| draft2020-12:unevaluatedProperties.json#/groups/20/tests/1 | with unevaluated properties | PASS | {"keywordLocation":"#/unevaluatedProperties","instanceLocation":"#/baz"} |
| draft2020-12:unevaluatedProperties.json#/groups/21/tests/0 | with no unevaluated properties | RUNTIME | FAST_RUNTIME_ERROR: Cannot read properties of null (reading '0') |
| draft2020-12:unevaluatedProperties.json#/groups/21/tests/1 | with unevaluated properties | RUNTIME | FAST_RUNTIME_ERROR: Cannot read properties of null (reading '0') |
| draft2020-12:unevaluatedProperties.json#/groups/22/tests/0 | always fails | PASS | {"keywordLocation":"#/allOf/1/unevaluatedProperties","instanceLocation":"#/foo"} |
| draft2020-12:unevaluatedProperties.json#/groups/23/tests/0 | always fails | PASS | {"keywordLocation":"#/allOf/0/unevaluatedProperties","instanceLocation":"#/foo"} |
| draft2020-12:unevaluatedProperties.json#/groups/26/tests/0 | with no nested unevaluated properties | PASS | {"keywordLocation":"#/allOf/0/unevaluatedProperties","instanceLocation":"#/foo"} |
| draft2020-12:unevaluatedProperties.json#/groups/26/tests/1 | with nested unevaluated properties | PASS | {"keywordLocation":"#/allOf/0/unevaluatedProperties","instanceLocation":"#/foo"} |
| draft2020-12:unevaluatedProperties.json#/groups/27/tests/1 | with nested unevaluated properties | PASS | {"keywordLocation":"#/allOf/0/unevaluatedProperties","instanceLocation":"#/bar"} |
| draft2020-12:unevaluatedProperties.json#/groups/28/tests/0 | with no nested unevaluated properties | PASS | {"keywordLocation":"#/allOf/1/unevaluatedProperties","instanceLocation":"#/foo"} |
| draft2020-12:unevaluatedProperties.json#/groups/28/tests/1 | with nested unevaluated properties | PASS | {"keywordLocation":"#/allOf/1/unevaluatedProperties","instanceLocation":"#/foo"} |
| draft2020-12:unevaluatedProperties.json#/groups/29/tests/1 | with nested unevaluated properties | PASS | {"keywordLocation":"#/allOf/1/unevaluatedProperties","instanceLocation":"#/bar"} |
| draft2020-12:unevaluatedProperties.json#/groups/30/tests/1 | uncle keyword evaluation is not significant | PASS | {"keywordLocation":"#/properties/foo/unevaluatedProperties","instanceLocation":"#/foo/faz"} |
| draft2020-12:unevaluatedProperties.json#/groups/31/tests/0 | base case: both properties present | PASS | {"keywordLocation":"#/allOf/0/unevaluatedProperties","instanceLocation":"#/bar"} |
| draft2020-12:unevaluatedProperties.json#/groups/31/tests/2 | in place applicator siblings, foo is missing | PASS | {"keywordLocation":"#/allOf/0/unevaluatedProperties","instanceLocation":"#/bar"} |
| draft2020-12:unevaluatedProperties.json#/groups/32/tests/0 | base case: both properties present | PASS | {"keywordLocation":"#/allOf/0/unevaluatedProperties","instanceLocation":"#/foo"} |
| draft2020-12:unevaluatedProperties.json#/groups/32/tests/1 | in place applicator siblings, bar is missing | PASS | {"keywordLocation":"#/allOf/0/unevaluatedProperties","instanceLocation":"#/foo"} |
| draft2020-12:unevaluatedProperties.json#/groups/33/tests/2 | Unevaluated on 1st level is invalid | PASS | {"keywordLocation":"#/unevaluatedProperties","instanceLocation":"#/y"} |
| draft2020-12:unevaluatedProperties.json#/groups/33/tests/4 | Unevaluated on 2nd level is invalid | PASS | {"keywordLocation":"#/properties/x/$ref/unevaluatedProperties","instanceLocation":"#/x/y"} |
| draft2020-12:unevaluatedProperties.json#/groups/33/tests/6 | Unevaluated on 3rd level is invalid | PASS | {"keywordLocation":"#/properties/x/$ref/properties/x/$ref/unevaluatedProperties","instanceLocation":"#/x/x/y"} |
| draft2020-12:unevaluatedProperties.json#/groups/34/tests/0 | Empty is invalid (no x or y) | PASS | {"keywordLocation":"#/allOf/2/oneOf","instanceLocation":"#"} |
| draft2020-12:unevaluatedProperties.json#/groups/34/tests/1 | a and b are invalid (no x or y) | PASS | {"keywordLocation":"#/allOf/2/oneOf","instanceLocation":"#"} |
| draft2020-12:unevaluatedProperties.json#/groups/34/tests/2 | x and y are invalid | PASS | {"keywordLocation":"#/allOf/2/oneOf","instanceLocation":"#"} |
| draft2020-12:unevaluatedProperties.json#/groups/34/tests/7 | a and b and x and y are invalid | PASS | {"keywordLocation":"#/allOf/2/oneOf","instanceLocation":"#"} |
| draft2020-12:unevaluatedProperties.json#/groups/35/tests/0 | Empty is invalid | PASS | {"keywordLocation":"#/oneOf","instanceLocation":"#"} |
| draft2020-12:unevaluatedProperties.json#/groups/35/tests/5 | a + b is invalid | PASS | {"keywordLocation":"#/oneOf","instanceLocation":"#"} |
| draft2020-12:unevaluatedProperties.json#/groups/35/tests/6 | a + c is invalid | PASS | {"keywordLocation":"#/oneOf","instanceLocation":"#"} |
| draft2020-12:unevaluatedProperties.json#/groups/35/tests/7 | a + d is invalid | PASS | {"keywordLocation":"#/oneOf","instanceLocation":"#"} |
| draft2020-12:unevaluatedProperties.json#/groups/35/tests/8 | b + c is invalid | PASS | {"keywordLocation":"#/oneOf","instanceLocation":"#"} |
| draft2020-12:unevaluatedProperties.json#/groups/35/tests/9 | b + d is invalid | PASS | {"keywordLocation":"#/oneOf","instanceLocation":"#"} |
| draft2020-12:unevaluatedProperties.json#/groups/35/tests/10 | c + d is invalid | PASS | {"keywordLocation":"#/oneOf","instanceLocation":"#"} |
| draft2020-12:unevaluatedProperties.json#/groups/35/tests/13 | xx + foo is invalid | PASS | {"keywordLocation":"#/unevaluatedProperties","instanceLocation":"#/foo"} |
| draft2020-12:unevaluatedProperties.json#/groups/35/tests/14 | xx + a is invalid | PASS | {"keywordLocation":"#/oneOf","instanceLocation":"#"} |
| draft2020-12:unevaluatedProperties.json#/groups/35/tests/15 | xx + b is invalid | PASS | {"keywordLocation":"#/oneOf","instanceLocation":"#"} |
| draft2020-12:unevaluatedProperties.json#/groups/35/tests/16 | xx + c is invalid | PASS | {"keywordLocation":"#/oneOf","instanceLocation":"#"} |
| draft2020-12:unevaluatedProperties.json#/groups/35/tests/17 | xx + d is invalid | PASS | {"keywordLocation":"#/oneOf","instanceLocation":"#"} |
| draft2020-12:unevaluatedProperties.json#/groups/35/tests/20 | all + a is invalid | PASS | {"keywordLocation":"#/oneOf","instanceLocation":"#"} |
| draft2020-12:unevaluatedProperties.json#/groups/38/tests/1 | string property is invalid | PASS | {"keywordLocation":"#/unevaluatedProperties/type","instanceLocation":"#/a"} |
| draft2020-12:unevaluatedProperties.json#/groups/39/tests/1 | invalid in case if is evaluated | PASS | {"keywordLocation":"#/unevaluatedProperties","instanceLocation":"#/bar"} |
| draft2020-12:unevaluatedProperties.json#/groups/40/tests/0 | unevaluatedProperties doesn't consider dependentSchemas | PASS | {"keywordLocation":"#/unevaluatedProperties","instanceLocation":"#/foo"} |
| draft2020-12:unevaluatedProperties.json#/groups/40/tests/1 | unevaluatedProperties doesn't see bar when foo2 is absent | PASS | {"keywordLocation":"#/unevaluatedProperties","instanceLocation":"#/bar"} |
| draft2020-12:unevaluatedProperties.json#/groups/41/tests/0 | with an unevaluated property that exists at another location | PASS | {"keywordLocation":"#/unevaluatedProperties","instanceLocation":"#/bar"} |
| draft2020-12:unevaluatedProperties.json#/groups/42/tests/1 | with an unevaluated property that exists at another location | PASS | {"keywordLocation":"#/unevaluatedProperties","instanceLocation":"#/bar"} |
| draft2020-12:unevaluatedProperties.json#/groups/43/tests/1 | with an unevaluated property that exists at another location | PASS | {"keywordLocation":"#/unevaluatedProperties","instanceLocation":"#/bar"} |
| draft2020-12:uniqueItems.json#/groups/0/tests/1 | non-unique array of integers is invalid | PASS | {"keywordLocation":"#/uniqueItems","instanceLocation":"#"} |
| draft2020-12:uniqueItems.json#/groups/0/tests/2 | non-unique array of more than two integers is invalid | PASS | {"keywordLocation":"#/uniqueItems","instanceLocation":"#"} |
| draft2020-12:uniqueItems.json#/groups/0/tests/3 | numbers are unique if mathematically unequal | PASS | {"keywordLocation":"#/uniqueItems","instanceLocation":"#"} |
| draft2020-12:uniqueItems.json#/groups/0/tests/7 | non-unique array of strings is invalid | PASS | {"keywordLocation":"#/uniqueItems","instanceLocation":"#"} |
| draft2020-12:uniqueItems.json#/groups/0/tests/9 | non-unique array of objects is invalid | PASS | {"keywordLocation":"#/uniqueItems","instanceLocation":"#"} |
| draft2020-12:uniqueItems.json#/groups/0/tests/10 | property order of array of objects is ignored | PASS | {"keywordLocation":"#/uniqueItems","instanceLocation":"#"} |
| draft2020-12:uniqueItems.json#/groups/0/tests/12 | non-unique array of nested objects is invalid | PASS | {"keywordLocation":"#/uniqueItems","instanceLocation":"#"} |
| draft2020-12:uniqueItems.json#/groups/0/tests/14 | non-unique array of arrays is invalid | PASS | {"keywordLocation":"#/uniqueItems","instanceLocation":"#"} |
| draft2020-12:uniqueItems.json#/groups/0/tests/15 | non-unique array of more than two arrays is invalid | PASS | {"keywordLocation":"#/uniqueItems","instanceLocation":"#"} |
| draft2020-12:uniqueItems.json#/groups/0/tests/23 | non-unique heterogeneous types are invalid | PASS | {"keywordLocation":"#/uniqueItems","instanceLocation":"#"} |
| draft2020-12:uniqueItems.json#/groups/0/tests/25 | objects are non-unique despite key order | PASS | {"keywordLocation":"#/uniqueItems","instanceLocation":"#"} |
| draft2020-12:uniqueItems.json#/groups/1/tests/2 | [false, false] from items array is not valid | PASS | {"keywordLocation":"#/uniqueItems","instanceLocation":"#"} |
| draft2020-12:uniqueItems.json#/groups/1/tests/3 | [true, true] from items array is not valid | PASS | {"keywordLocation":"#/uniqueItems","instanceLocation":"#"} |
| draft2020-12:uniqueItems.json#/groups/1/tests/6 | non-unique array extended from [false, true] is not valid | PASS | {"keywordLocation":"#/uniqueItems","instanceLocation":"#"} |
| draft2020-12:uniqueItems.json#/groups/1/tests/7 | non-unique array extended from [true, false] is not valid | PASS | {"keywordLocation":"#/uniqueItems","instanceLocation":"#"} |
| draft2020-12:uniqueItems.json#/groups/2/tests/2 | [false, false] from items array is not valid | PASS | {"keywordLocation":"#/uniqueItems","instanceLocation":"#"} |
| draft2020-12:uniqueItems.json#/groups/2/tests/3 | [true, true] from items array is not valid | PASS | {"keywordLocation":"#/uniqueItems","instanceLocation":"#"} |
| draft2020-12:uniqueItems.json#/groups/2/tests/4 | extra items are invalid even if unique | PASS | {"keywordLocation":"#/items","instanceLocation":"#"} |
| draft2020-12:uniqueItems.json#/groups/5/tests/4 | extra items are invalid even if unique | PASS | {"keywordLocation":"#/items","instanceLocation":"#"} |
| draft2020-12:vocabulary.json#/groups/0/tests/0 | applicator vocabulary still works | COMPILE | FAST_COMPILE_ERROR: Unexpected schema version: "https://localhost:1234/draft2020-12/metaschema-no-validation.json" at # |
| draft2020-12:vocabulary.json#/groups/0/tests/1 | no validation: valid number | COMPILE | FAST_COMPILE_ERROR: Unexpected schema version: "https://localhost:1234/draft2020-12/metaschema-no-validation.json" at # |
| draft2020-12:vocabulary.json#/groups/0/tests/2 | no validation: invalid number, but it still validates | COMPILE | FAST_COMPILE_ERROR: Unexpected schema version: "https://localhost:1234/draft2020-12/metaschema-no-validation.json" at # |
| draft2020-12:vocabulary.json#/groups/1/tests/0 | string value | COMPILE | FAST_COMPILE_ERROR: Unexpected schema version: "https://localhost:1234/draft2020-12/metaschema-optional-vocabulary.json" at # |
| draft2020-12:vocabulary.json#/groups/1/tests/1 | number value | COMPILE | FAST_COMPILE_ERROR: Unexpected schema version: "https://localhost:1234/draft2020-12/metaschema-optional-vocabulary.json" at # |
