# Conformance: [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1) draft7

## Report options

| Profile | Options | SHA-256 |
| --- | --- | --- |
| base | {"formatProfile":"base","draft":"7","shortCircuit":true} | 3c3be95d3b7336b88a4477e891cadc86f4b749b328ec4edf183d8aba3311da88 |
| format-assertion | {"formatProfile":"format-assertion","draft":"7","shortCircuit":true} | 6886d26e75cc388763c454add3cd3d3d370df9dc2e5f5245f83b778f1142b385 |

## Counts

| Profile | Status | Cases | Percentage |
| --- | --- | ---: | ---: |
| base | PASS | 1027 | 98.28% |
| base | WRONG | 11 | 1.05% |
| base | COMPILE | 3 | 0.29% |
| base | RUNTIME | 4 | 0.38% |
| base | UNSUPPORTED | 0 | 0.00% |
| format-assertion | PASS | 485 | 82.62% |
| format-assertion | WRONG | 102 | 17.38% |
| format-assertion | COMPILE | 0 | 0.00% |
| format-assertion | RUNTIME | 0 | 0.00% |
| format-assertion | UNSUPPORTED | 0 | 0.00% |

## Non-PASS cases

| Case ID | Description | Expected | Observed | Status | Error |
| --- | --- | --- | --- | --- | --- |
| draft7:definitions.json#/groups/0/tests/0 | valid definition schema | true |  | RUNTIME | FAST_RUNTIME_ERROR: Unresolved $ref "http://json-schema.org/draft-07/schema#".  Absolute URI "http://json-schema.org/draft-07/schema". Known schemas: - https://github.com/cfworker |
| draft7:definitions.json#/groups/0/tests/1 | invalid definition schema | false |  | RUNTIME | FAST_RUNTIME_ERROR: Unresolved $ref "http://json-schema.org/draft-07/schema#".  Absolute URI "http://json-schema.org/draft-07/schema". Known schemas: - https://github.com/cfworker |
| draft7:optional/content.json#/groups/0/tests/1 | an invalid JSON document | false | true | WRONG |  |
| draft7:optional/content.json#/groups/1/tests/1 | an invalid base64 string (% is not a valid character) | false | true | WRONG |  |
| draft7:optional/content.json#/groups/2/tests/1 | a validly-encoded invalid JSON document | false | true | WRONG |  |
| draft7:optional/content.json#/groups/2/tests/2 | an invalid base64 string that is valid JSON | false | true | WRONG |  |
| draft7:optional/format/date-time.json#/groups/0/tests/11 | a valid date-time with a leap second, with minus offset | true | false | WRONG | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"date-time\"."} |
| draft7:optional/format/date-time.json#/groups/0/tests/17 | an invalid offset minute in date-time string | false | true | WRONG |  |
| draft7:optional/format/date-time.json#/groups/0/tests/19 | an invalid offset in date-time string | false | true | WRONG |  |
| draft7:optional/format/hostname.json#/groups/0/tests/14 | trailing dot | false | true | WRONG |  |
| draft7:optional/format/hostname.json#/groups/1/tests/0 | invalid Punycode | false | true | WRONG |  |
| draft7:optional/format/hostname.json#/groups/1/tests/2 | contains illegal char U+302E Hangul single dot tone mark | false | true | WRONG |  |
| draft7:optional/format/hostname.json#/groups/1/tests/3 | Begins with a Spacing Combining Mark | false | true | WRONG |  |
| draft7:optional/format/hostname.json#/groups/1/tests/4 | Begins with a Nonspacing Mark | false | true | WRONG |  |
| draft7:optional/format/hostname.json#/groups/1/tests/5 | Begins with an Enclosing Mark | false | true | WRONG |  |
| draft7:optional/format/hostname.json#/groups/1/tests/8 | Exceptions that are DISALLOWED, right-to-left chars | false | true | WRONG |  |
| draft7:optional/format/hostname.json#/groups/1/tests/9 | Exceptions that are DISALLOWED, left-to-right chars | false | true | WRONG |  |
| draft7:optional/format/hostname.json#/groups/1/tests/10 | MIDDLE DOT with no preceding 'l' | false | true | WRONG |  |
| draft7:optional/format/hostname.json#/groups/1/tests/11 | MIDDLE DOT with nothing preceding | false | true | WRONG |  |
| draft7:optional/format/hostname.json#/groups/1/tests/12 | MIDDLE DOT with no following 'l' | false | true | WRONG |  |
| draft7:optional/format/hostname.json#/groups/1/tests/13 | MIDDLE DOT with nothing following | false | true | WRONG |  |
| draft7:optional/format/hostname.json#/groups/1/tests/15 | Greek KERAIA not followed by Greek | false | true | WRONG |  |
| draft7:optional/format/hostname.json#/groups/1/tests/16 | Greek KERAIA not followed by anything | false | true | WRONG |  |
| draft7:optional/format/hostname.json#/groups/1/tests/18 | Hebrew GERESH not preceded by Hebrew | false | true | WRONG |  |
| draft7:optional/format/hostname.json#/groups/1/tests/19 | Hebrew GERESH not preceded by anything | false | true | WRONG |  |
| draft7:optional/format/hostname.json#/groups/1/tests/21 | Hebrew GERSHAYIM not preceded by Hebrew | false | true | WRONG |  |
| draft7:optional/format/hostname.json#/groups/1/tests/22 | Hebrew GERSHAYIM not preceded by anything | false | true | WRONG |  |
| draft7:optional/format/hostname.json#/groups/1/tests/24 | KATAKANA MIDDLE DOT with no Hiragana, Katakana, or Han | false | true | WRONG |  |
| draft7:optional/format/hostname.json#/groups/1/tests/25 | KATAKANA MIDDLE DOT with no other characters | false | true | WRONG |  |
| draft7:optional/format/hostname.json#/groups/1/tests/29 | Arabic-Indic digits mixed with Extended Arabic-Indic digits | false | true | WRONG |  |
| draft7:optional/format/hostname.json#/groups/1/tests/32 | ZERO WIDTH JOINER not preceded by Virama | false | true | WRONG |  |
| draft7:optional/format/hostname.json#/groups/1/tests/33 | ZERO WIDTH JOINER not preceded by anything | false | true | WRONG |  |
| draft7:optional/format/hostname.json#/groups/1/tests/37 | contains "--" in the 3rd and 4th position | false | true | WRONG |  |
| draft7:optional/format/idn-email.json#/groups/0/tests/7 | an invalid e-mail/idn e-mail address | false | true | WRONG |  |
| draft7:optional/format/idn-email.json#/groups/0/tests/11 | a local part with a lone UTF-16 surrogate is invalid | false | true | WRONG |  |
| draft7:optional/format/idn-hostname.json#/groups/0/tests/7 | illegal first char U+302E Hangul single dot tone mark | false | true | WRONG |  |
| draft7:optional/format/idn-hostname.json#/groups/0/tests/8 | contains illegal char U+302E Hangul single dot tone mark | false | true | WRONG |  |
| draft7:optional/format/idn-hostname.json#/groups/0/tests/10 | a single label of 64 characters is too long | false | true | WRONG |  |
| draft7:optional/format/idn-hostname.json#/groups/0/tests/11 | invalid label, correct Punycode | false | true | WRONG |  |
| draft7:optional/format/idn-hostname.json#/groups/0/tests/13 | invalid Punycode | false | true | WRONG |  |
| draft7:optional/format/idn-hostname.json#/groups/0/tests/14 | U-label contains "--" in the 3rd and 4th position | false | true | WRONG |  |
| draft7:optional/format/idn-hostname.json#/groups/0/tests/15 | U-label starts with a dash | false | true | WRONG |  |
| draft7:optional/format/idn-hostname.json#/groups/0/tests/16 | U-label ends with a dash | false | true | WRONG |  |
| draft7:optional/format/idn-hostname.json#/groups/0/tests/17 | U-label starts and ends with a dash | false | true | WRONG |  |
| draft7:optional/format/idn-hostname.json#/groups/0/tests/18 | Begins with a Spacing Combining Mark | false | true | WRONG |  |
| draft7:optional/format/idn-hostname.json#/groups/0/tests/19 | Begins with a Nonspacing Mark | false | true | WRONG |  |
| draft7:optional/format/idn-hostname.json#/groups/0/tests/20 | Begins with an Enclosing Mark | false | true | WRONG |  |
| draft7:optional/format/idn-hostname.json#/groups/0/tests/23 | Exceptions that are DISALLOWED, right-to-left chars | false | true | WRONG |  |
| draft7:optional/format/idn-hostname.json#/groups/0/tests/24 | Exceptions that are DISALLOWED, left-to-right chars | false | true | WRONG |  |
| draft7:optional/format/idn-hostname.json#/groups/0/tests/25 | MIDDLE DOT with no preceding 'l' | false | true | WRONG |  |
| draft7:optional/format/idn-hostname.json#/groups/0/tests/26 | MIDDLE DOT with nothing preceding | false | true | WRONG |  |
| draft7:optional/format/idn-hostname.json#/groups/0/tests/27 | MIDDLE DOT with no following 'l' | false | true | WRONG |  |
| draft7:optional/format/idn-hostname.json#/groups/0/tests/28 | MIDDLE DOT with nothing following | false | true | WRONG |  |
| draft7:optional/format/idn-hostname.json#/groups/0/tests/30 | Greek KERAIA not followed by Greek | false | true | WRONG |  |
| draft7:optional/format/idn-hostname.json#/groups/0/tests/31 | Greek KERAIA not followed by anything | false | true | WRONG |  |
| draft7:optional/format/idn-hostname.json#/groups/0/tests/33 | Hebrew GERESH not preceded by Hebrew | false | true | WRONG |  |
| draft7:optional/format/idn-hostname.json#/groups/0/tests/34 | Hebrew GERESH not preceded by anything | false | true | WRONG |  |
| draft7:optional/format/idn-hostname.json#/groups/0/tests/36 | Hebrew GERSHAYIM not preceded by Hebrew | false | true | WRONG |  |
| draft7:optional/format/idn-hostname.json#/groups/0/tests/37 | Hebrew GERSHAYIM not preceded by anything | false | true | WRONG |  |
| draft7:optional/format/idn-hostname.json#/groups/0/tests/39 | KATAKANA MIDDLE DOT with no Hiragana, Katakana, or Han | false | true | WRONG |  |
| draft7:optional/format/idn-hostname.json#/groups/0/tests/40 | KATAKANA MIDDLE DOT with no other characters | false | true | WRONG |  |
| draft7:optional/format/idn-hostname.json#/groups/0/tests/44 | Arabic-Indic digits mixed with Extended Arabic-Indic digits | false | true | WRONG |  |
| draft7:optional/format/idn-hostname.json#/groups/0/tests/47 | ZERO WIDTH JOINER not preceded by Virama | false | true | WRONG |  |
| draft7:optional/format/idn-hostname.json#/groups/0/tests/48 | ZERO WIDTH JOINER not preceded by anything | false | true | WRONG |  |
| draft7:optional/format/idn-hostname.json#/groups/0/tests/56 | empty string | false | true | WRONG |  |
| draft7:optional/format/idn-hostname.json#/groups/0/tests/57 | zero width non-joiner must pass at every occurrence | false | true | WRONG |  |
| draft7:optional/format/idn-hostname.json#/groups/0/tests/58 | Bidi domain name with a digit-first label is invalid | false | true | WRONG |  |
| draft7:optional/format/idn-hostname.json#/groups/0/tests/59 | label starting with a digit before a right-to-left letter is invalid | false | true | WRONG |  |
| draft7:optional/format/idn-hostname.json#/groups/0/tests/60 | left-to-right label containing a right-to-left letter is invalid | false | true | WRONG |  |
| draft7:optional/format/idn-hostname.json#/groups/0/tests/61 | right-to-left label mixing both digit types is invalid | false | true | WRONG |  |
| draft7:optional/format/idn-hostname.json#/groups/0/tests/62 | A-label that decodes to a disallowed code point is invalid | false | true | WRONG |  |
| draft7:optional/format/idn-hostname.json#/groups/0/tests/63 | A-label that decodes to a Bidi rule violation is invalid | false | true | WRONG |  |
| draft7:optional/format/idn-hostname.json#/groups/0/tests/64 | a U-label whose A-label form is longer than 63 octets is invalid | false | true | WRONG |  |
| draft7:optional/format/idn-hostname.json#/groups/0/tests/65 | empty label between two dots is invalid | false | true | WRONG |  |
| draft7:optional/format/idn-hostname.json#/groups/0/tests/66 | a name longer than 253 characters is invalid | false | true | WRONG |  |
| draft7:optional/format/idn-hostname.json#/groups/0/tests/67 | A-label that decodes to only ASCII is invalid | false | true | WRONG |  |
| draft7:optional/format/idn-hostname.json#/groups/0/tests/68 | non-canonical Punycode that does not re-encode to itself is invalid | false | true | WRONG |  |
| draft7:optional/format/idn-hostname.json#/groups/1/tests/0 | single dot | false | true | WRONG |  |
| draft7:optional/format/idn-hostname.json#/groups/1/tests/1 | single ideographic full stop | false | true | WRONG |  |
| draft7:optional/format/idn-hostname.json#/groups/1/tests/2 | single fullwidth full stop | false | true | WRONG |  |
| draft7:optional/format/idn-hostname.json#/groups/1/tests/3 | single halfwidth ideographic full stop | false | true | WRONG |  |
| draft7:optional/format/idn-hostname.json#/groups/1/tests/8 | leading dot | false | true | WRONG |  |
| draft7:optional/format/idn-hostname.json#/groups/1/tests/9 | leading ideographic full stop | false | true | WRONG |  |
| draft7:optional/format/idn-hostname.json#/groups/1/tests/10 | leading fullwidth full stop | false | true | WRONG |  |
| draft7:optional/format/idn-hostname.json#/groups/1/tests/11 | leading halfwidth ideographic full stop | false | true | WRONG |  |
| draft7:optional/format/idn-hostname.json#/groups/1/tests/12 | trailing dot | false | true | WRONG |  |
| draft7:optional/format/idn-hostname.json#/groups/1/tests/13 | trailing ideographic full stop | false | true | WRONG |  |
| draft7:optional/format/idn-hostname.json#/groups/1/tests/14 | trailing fullwidth full stop | false | true | WRONG |  |
| draft7:optional/format/idn-hostname.json#/groups/1/tests/15 | trailing halfwidth ideographic full stop | false | true | WRONG |  |
| draft7:optional/format/iri-reference.json#/groups/0/tests/9 | an invalid IRI Reference | false | true | WRONG |  |
| draft7:optional/format/iri-reference.json#/groups/0/tests/12 | an invalid IRI fragment | false | true | WRONG |  |
| draft7:optional/format/iri.json#/groups/0/tests/11 | an IPv6 address without enclosing brackets is invalid | false | true | WRONG |  |
| draft7:optional/format/iri.json#/groups/0/tests/12 | an invalid relative IRI Reference | false | true | WRONG |  |
| draft7:optional/format/iri.json#/groups/0/tests/13 | an invalid IRI | false | true | WRONG |  |
| draft7:optional/format/iri.json#/groups/0/tests/14 | an invalid IRI though valid IRI reference | false | true | WRONG |  |
| draft7:optional/format/time.json#/groups/0/tests/16 | valid leap second, positive time-offset | true | false | WRONG | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"time\"."} |
| draft7:optional/format/time.json#/groups/0/tests/17 | valid leap second, large positive time-offset | true | false | WRONG | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"time\"."} |
| draft7:optional/format/time.json#/groups/0/tests/18 | invalid leap second, positive time-offset (wrong hour) | false | true | WRONG |  |
| draft7:optional/format/time.json#/groups/0/tests/19 | invalid leap second, positive time-offset (wrong minute) | false | true | WRONG |  |
| draft7:optional/format/time.json#/groups/0/tests/20 | valid leap second, negative time-offset | true | false | WRONG | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"time\"."} |
| draft7:optional/format/time.json#/groups/0/tests/21 | valid leap second, large negative time-offset | true | false | WRONG | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"time\"."} |
| draft7:optional/format/time.json#/groups/0/tests/22 | invalid leap second, negative time-offset (wrong hour) | false | true | WRONG |  |
| draft7:optional/format/time.json#/groups/0/tests/23 | invalid leap second, negative time-offset (wrong minute) | false | true | WRONG |  |
| draft7:optional/format/time.json#/groups/0/tests/36 | an invalid time string with invalid time numoffset hour | false | true | WRONG |  |
| draft7:optional/format/time.json#/groups/0/tests/37 | an invalid time string with invalid time numoffset minute | false | true | WRONG |  |
| draft7:optional/format/time.json#/groups/0/tests/41 | no time offset | false | true | WRONG |  |
| draft7:optional/format/time.json#/groups/0/tests/42 | no time offset with second fraction | false | true | WRONG |  |
| draft7:optional/format/uri.json#/groups/0/tests/43 | non-numeric port is invalid | false | true | WRONG |  |
| draft7:optional/unknownKeyword.json#/groups/0/tests/0 | type matches second anyOf, which has a real schema in it | true |  | COMPILE | FAST_SETUP_ERROR: Duplicate schema URI "https://localhost:1234/unknownKeyword/my_identifier.json". |
| draft7:optional/unknownKeyword.json#/groups/0/tests/1 | type matches non-schema in first anyOf | false |  | COMPILE | FAST_SETUP_ERROR: Duplicate schema URI "https://localhost:1234/unknownKeyword/my_identifier.json". |
| draft7:optional/unknownKeyword.json#/groups/0/tests/2 | type matches non-schema in third anyOf | false |  | COMPILE | FAST_SETUP_ERROR: Duplicate schema URI "https://localhost:1234/unknownKeyword/my_identifier.json". |
| draft7:properties.json#/groups/5/tests/2 | none of the properties mentioned | true | false | WRONG | {"instanceLocation":"#","keyword":"properties","keywordLocation":"#/properties","error":"Property \"__proto__\" does not match schema."} |
| draft7:ref.json#/groups/6/tests/0 | $ref resolves to /definitions/base_foo, data does not validate | false | true | WRONG |  |
| draft7:ref.json#/groups/6/tests/1 | $ref resolves to /definitions/base_foo, data validates | true | false | WRONG | {"instanceLocation":"#","keyword":"allOf","keywordLocation":"#/allOf","error":"Instance does not match every subschema."} |
| draft7:ref.json#/groups/7/tests/0 | remote ref valid | true |  | RUNTIME | FAST_RUNTIME_ERROR: Unresolved $ref "http://json-schema.org/draft-07/schema#".  Absolute URI "http://json-schema.org/draft-07/schema". Known schemas: - https://github.com/cfworker |
| draft7:ref.json#/groups/7/tests/1 | remote ref invalid | false |  | RUNTIME | FAST_RUNTIME_ERROR: Unresolved $ref "http://json-schema.org/draft-07/schema#".  Absolute URI "http://json-schema.org/draft-07/schema". Known schemas: - https://github.com/cfworker |
| draft7:required.json#/groups/4/tests/2 | none of the properties mentioned | false | true | WRONG |  |
| draft7:required.json#/groups/4/tests/3 | __proto__ present | false | true | WRONG |  |
| draft7:required.json#/groups/4/tests/4 | toString present | false | true | WRONG |  |
| draft7:required.json#/groups/4/tests/5 | constructor present | false | true | WRONG |  |

## Detailed errors for invalid results

| Case ID | Description | Status | Error |
| --- | --- | --- | --- |
| draft7:additionalItems.json#/groups/0/tests/1 | additional items do not match schema | PASS | {"instanceLocation":"#","keyword":"additionalItems","keywordLocation":"#/additionalItems","error":"Items did not match additional items schema."} |
| draft7:additionalItems.json#/groups/1/tests/1 | invalid with a array of mixed types | PASS | {"instanceLocation":"#","keyword":"items","keywordLocation":"#/items","error":"Items did not match schema."} |
| draft7:additionalItems.json#/groups/3/tests/4 | additional items are not permitted | PASS | {"instanceLocation":"#","keyword":"additionalItems","keywordLocation":"#/additionalItems","error":"Items did not match additional items schema."} |
| draft7:additionalItems.json#/groups/6/tests/0 | items defined in allOf are not examined | PASS | {"instanceLocation":"#","keyword":"additionalItems","keywordLocation":"#/additionalItems","error":"Items did not match additional items schema."} |
| draft7:additionalItems.json#/groups/7/tests/1 | wrong type of second item | PASS | {"instanceLocation":"#","keyword":"additionalItems","keywordLocation":"#/additionalItems","error":"Items did not match additional items schema."} |
| draft7:additionalItems.json#/groups/8/tests/0 | heterogeneous invalid instance | PASS | {"instanceLocation":"#","keyword":"additionalItems","keywordLocation":"#/additionalItems","error":"Items did not match additional items schema."} |
| draft7:additionalProperties.json#/groups/0/tests/1 | an additional property is invalid | PASS | {"instanceLocation":"#","keyword":"additionalProperties","keywordLocation":"#/additionalProperties","error":"Property \"quux\" does not match additional properties schema."} |
| draft7:additionalProperties.json#/groups/1/tests/1 | not matching the pattern is invalid | PASS | {"instanceLocation":"#","keyword":"additionalProperties","keywordLocation":"#/additionalProperties","error":"Property \"élmény\" does not match additional properties schema."} |
| draft7:additionalProperties.json#/groups/2/tests/2 | an additional invalid property is invalid | PASS | {"instanceLocation":"#","keyword":"additionalProperties","keywordLocation":"#/additionalProperties","error":"Property \"quux\" does not match additional properties schema."} |
| draft7:additionalProperties.json#/groups/3/tests/1 | an additional invalid property is invalid | PASS | {"instanceLocation":"#","keyword":"additionalProperties","keywordLocation":"#/additionalProperties","error":"Property \"foo\" does not match additional properties schema."} |
| draft7:additionalProperties.json#/groups/5/tests/0 | properties defined in allOf are not examined | PASS | {"instanceLocation":"#","keyword":"additionalProperties","keywordLocation":"#/additionalProperties","error":"Property \"foo\" does not match additional properties schema."} |
| draft7:allOf.json#/groups/0/tests/1 | mismatch second | PASS | {"instanceLocation":"#","keyword":"allOf","keywordLocation":"#/allOf","error":"Instance does not match every subschema."} |
| draft7:allOf.json#/groups/0/tests/2 | mismatch first | PASS | {"instanceLocation":"#","keyword":"allOf","keywordLocation":"#/allOf","error":"Instance does not match every subschema."} |
| draft7:allOf.json#/groups/0/tests/3 | wrong type | PASS | {"instanceLocation":"#","keyword":"allOf","keywordLocation":"#/allOf","error":"Instance does not match every subschema."} |
| draft7:allOf.json#/groups/1/tests/1 | mismatch base schema | PASS | {"instanceLocation":"#","keyword":"required","keywordLocation":"#/required","error":"Instance does not have required property \"bar\"."} |
| draft7:allOf.json#/groups/1/tests/2 | mismatch first allOf | PASS | {"instanceLocation":"#","keyword":"allOf","keywordLocation":"#/allOf","error":"Instance does not match every subschema."} |
| draft7:allOf.json#/groups/1/tests/3 | mismatch second allOf | PASS | {"instanceLocation":"#","keyword":"allOf","keywordLocation":"#/allOf","error":"Instance does not match every subschema."} |
| draft7:allOf.json#/groups/1/tests/4 | mismatch both | PASS | {"instanceLocation":"#","keyword":"allOf","keywordLocation":"#/allOf","error":"Instance does not match every subschema."} |
| draft7:allOf.json#/groups/2/tests/1 | mismatch one | PASS | {"instanceLocation":"#","keyword":"allOf","keywordLocation":"#/allOf","error":"Instance does not match every subschema."} |
| draft7:allOf.json#/groups/4/tests/0 | any value is invalid | PASS | {"instanceLocation":"#","keyword":"allOf","keywordLocation":"#/allOf","error":"Instance does not match every subschema."} |
| draft7:allOf.json#/groups/5/tests/0 | any value is invalid | PASS | {"instanceLocation":"#","keyword":"allOf","keywordLocation":"#/allOf","error":"Instance does not match every subschema."} |
| draft7:allOf.json#/groups/8/tests/1 | string is invalid | PASS | {"instanceLocation":"#","keyword":"allOf","keywordLocation":"#/allOf","error":"Instance does not match every subschema."} |
| draft7:allOf.json#/groups/9/tests/1 | string is invalid | PASS | {"instanceLocation":"#","keyword":"allOf","keywordLocation":"#/allOf","error":"Instance does not match every subschema."} |
| draft7:allOf.json#/groups/10/tests/1 | anything non-null is invalid | PASS | {"instanceLocation":"#","keyword":"allOf","keywordLocation":"#/allOf","error":"Instance does not match every subschema."} |
| draft7:allOf.json#/groups/11/tests/0 | allOf: false, anyOf: false, oneOf: false | PASS | {"instanceLocation":"#","keyword":"anyOf","keywordLocation":"#/anyOf","error":"Instance does not match any subschemas."} |
| draft7:allOf.json#/groups/11/tests/1 | allOf: false, anyOf: false, oneOf: true | PASS | {"instanceLocation":"#","keyword":"anyOf","keywordLocation":"#/anyOf","error":"Instance does not match any subschemas."} |
| draft7:allOf.json#/groups/11/tests/2 | allOf: false, anyOf: true, oneOf: false | PASS | {"instanceLocation":"#","keyword":"allOf","keywordLocation":"#/allOf","error":"Instance does not match every subschema."} |
| draft7:allOf.json#/groups/11/tests/3 | allOf: false, anyOf: true, oneOf: true | PASS | {"instanceLocation":"#","keyword":"allOf","keywordLocation":"#/allOf","error":"Instance does not match every subschema."} |
| draft7:allOf.json#/groups/11/tests/4 | allOf: true, anyOf: false, oneOf: false | PASS | {"instanceLocation":"#","keyword":"anyOf","keywordLocation":"#/anyOf","error":"Instance does not match any subschemas."} |
| draft7:allOf.json#/groups/11/tests/5 | allOf: true, anyOf: false, oneOf: true | PASS | {"instanceLocation":"#","keyword":"anyOf","keywordLocation":"#/anyOf","error":"Instance does not match any subschemas."} |
| draft7:allOf.json#/groups/11/tests/6 | allOf: true, anyOf: true, oneOf: false | PASS | {"instanceLocation":"#","keyword":"oneOf","keywordLocation":"#/oneOf","error":"Instance does not match exactly one subschema (0 matches)."} |
| draft7:anyOf.json#/groups/0/tests/3 | neither anyOf valid | PASS | {"instanceLocation":"#","keyword":"anyOf","keywordLocation":"#/anyOf","error":"Instance does not match any subschemas."} |
| draft7:anyOf.json#/groups/1/tests/0 | mismatch base schema | PASS | {"instanceLocation":"#","keyword":"type","keywordLocation":"#/type","error":"Instance type \"number\" is invalid. Expected \"string\"."} |
| draft7:anyOf.json#/groups/1/tests/2 | both anyOf invalid | PASS | {"instanceLocation":"#","keyword":"anyOf","keywordLocation":"#/anyOf","error":"Instance does not match any subschemas."} |
| draft7:anyOf.json#/groups/4/tests/0 | any value is invalid | PASS | {"instanceLocation":"#","keyword":"anyOf","keywordLocation":"#/anyOf","error":"Instance does not match any subschemas."} |
| draft7:anyOf.json#/groups/5/tests/3 | neither anyOf valid (complex) | PASS | {"instanceLocation":"#","keyword":"anyOf","keywordLocation":"#/anyOf","error":"Instance does not match any subschemas."} |
| draft7:anyOf.json#/groups/7/tests/1 | anything non-null is invalid | PASS | {"instanceLocation":"#","keyword":"anyOf","keywordLocation":"#/anyOf","error":"Instance does not match any subschemas."} |
| draft7:boolean_schema.json#/groups/1/tests/0 | number is invalid | PASS | {"instanceLocation":"#","keyword":"false","keywordLocation":"#","error":"False boolean schema."} |
| draft7:boolean_schema.json#/groups/1/tests/1 | string is invalid | PASS | {"instanceLocation":"#","keyword":"false","keywordLocation":"#","error":"False boolean schema."} |
| draft7:boolean_schema.json#/groups/1/tests/2 | boolean true is invalid | PASS | {"instanceLocation":"#","keyword":"false","keywordLocation":"#","error":"False boolean schema."} |
| draft7:boolean_schema.json#/groups/1/tests/3 | boolean false is invalid | PASS | {"instanceLocation":"#","keyword":"false","keywordLocation":"#","error":"False boolean schema."} |
| draft7:boolean_schema.json#/groups/1/tests/4 | null is invalid | PASS | {"instanceLocation":"#","keyword":"false","keywordLocation":"#","error":"False boolean schema."} |
| draft7:boolean_schema.json#/groups/1/tests/5 | object is invalid | PASS | {"instanceLocation":"#","keyword":"false","keywordLocation":"#","error":"False boolean schema."} |
| draft7:boolean_schema.json#/groups/1/tests/6 | empty object is invalid | PASS | {"instanceLocation":"#","keyword":"false","keywordLocation":"#","error":"False boolean schema."} |
| draft7:boolean_schema.json#/groups/1/tests/7 | array is invalid | PASS | {"instanceLocation":"#","keyword":"false","keywordLocation":"#","error":"False boolean schema."} |
| draft7:boolean_schema.json#/groups/1/tests/8 | empty array is invalid | PASS | {"instanceLocation":"#","keyword":"false","keywordLocation":"#","error":"False boolean schema."} |
| draft7:const.json#/groups/0/tests/1 | another value is invalid | PASS | {"instanceLocation":"#","keyword":"const","keywordLocation":"#/const","error":"Instance does not match 2."} |
| draft7:const.json#/groups/0/tests/2 | another type is invalid | PASS | {"instanceLocation":"#","keyword":"const","keywordLocation":"#/const","error":"Instance does not match 2."} |
| draft7:const.json#/groups/1/tests/2 | another object is invalid | PASS | {"instanceLocation":"#","keyword":"const","keywordLocation":"#/const","error":"Instance does not match {\"foo\":\"bar\",\"baz\":\"bax\"}."} |
| draft7:const.json#/groups/1/tests/3 | another type is invalid | PASS | {"instanceLocation":"#","keyword":"const","keywordLocation":"#/const","error":"Instance does not match {\"foo\":\"bar\",\"baz\":\"bax\"}."} |
| draft7:const.json#/groups/2/tests/1 | another array item is invalid | PASS | {"instanceLocation":"#","keyword":"const","keywordLocation":"#/const","error":"Instance does not match [{\"foo\":\"bar\"}]."} |
| draft7:const.json#/groups/2/tests/2 | array with additional items is invalid | PASS | {"instanceLocation":"#","keyword":"const","keywordLocation":"#/const","error":"Instance does not match [{\"foo\":\"bar\"}]."} |
| draft7:const.json#/groups/3/tests/1 | not null is invalid | PASS | {"instanceLocation":"#","keyword":"const","keywordLocation":"#/const","error":"Instance does not match null."} |
| draft7:const.json#/groups/4/tests/1 | integer zero is invalid | PASS | {"instanceLocation":"#","keyword":"const","keywordLocation":"#/const","error":"Instance does not match false."} |
| draft7:const.json#/groups/4/tests/2 | float zero is invalid | PASS | {"instanceLocation":"#","keyword":"const","keywordLocation":"#/const","error":"Instance does not match false."} |
| draft7:const.json#/groups/5/tests/1 | integer one is invalid | PASS | {"instanceLocation":"#","keyword":"const","keywordLocation":"#/const","error":"Instance does not match true."} |
| draft7:const.json#/groups/5/tests/2 | float one is invalid | PASS | {"instanceLocation":"#","keyword":"const","keywordLocation":"#/const","error":"Instance does not match true."} |
| draft7:const.json#/groups/6/tests/1 | [0] is invalid | PASS | {"instanceLocation":"#","keyword":"const","keywordLocation":"#/const","error":"Instance does not match [false]."} |
| draft7:const.json#/groups/6/tests/2 | [0.0] is invalid | PASS | {"instanceLocation":"#","keyword":"const","keywordLocation":"#/const","error":"Instance does not match [false]."} |
| draft7:const.json#/groups/7/tests/1 | [1] is invalid | PASS | {"instanceLocation":"#","keyword":"const","keywordLocation":"#/const","error":"Instance does not match [true]."} |
| draft7:const.json#/groups/7/tests/2 | [1.0] is invalid | PASS | {"instanceLocation":"#","keyword":"const","keywordLocation":"#/const","error":"Instance does not match [true]."} |
| draft7:const.json#/groups/8/tests/1 | {"a": 0} is invalid | PASS | {"instanceLocation":"#","keyword":"const","keywordLocation":"#/const","error":"Instance does not match {\"a\":false}."} |
| draft7:const.json#/groups/8/tests/2 | {"a": 0.0} is invalid | PASS | {"instanceLocation":"#","keyword":"const","keywordLocation":"#/const","error":"Instance does not match {\"a\":false}."} |
| draft7:const.json#/groups/9/tests/1 | {"a": 1} is invalid | PASS | {"instanceLocation":"#","keyword":"const","keywordLocation":"#/const","error":"Instance does not match {\"a\":true}."} |
| draft7:const.json#/groups/9/tests/2 | {"a": 1.0} is invalid | PASS | {"instanceLocation":"#","keyword":"const","keywordLocation":"#/const","error":"Instance does not match {\"a\":true}."} |
| draft7:const.json#/groups/10/tests/0 | false is invalid | PASS | {"instanceLocation":"#","keyword":"const","keywordLocation":"#/const","error":"Instance does not match 0."} |
| draft7:const.json#/groups/10/tests/3 | empty object is invalid | PASS | {"instanceLocation":"#","keyword":"const","keywordLocation":"#/const","error":"Instance does not match 0."} |
| draft7:const.json#/groups/10/tests/4 | empty array is invalid | PASS | {"instanceLocation":"#","keyword":"const","keywordLocation":"#/const","error":"Instance does not match 0."} |
| draft7:const.json#/groups/10/tests/5 | empty string is invalid | PASS | {"instanceLocation":"#","keyword":"const","keywordLocation":"#/const","error":"Instance does not match 0."} |
| draft7:const.json#/groups/11/tests/0 | true is invalid | PASS | {"instanceLocation":"#","keyword":"const","keywordLocation":"#/const","error":"Instance does not match 1."} |
| draft7:const.json#/groups/12/tests/1 | integer 2 is invalid | PASS | {"instanceLocation":"#","keyword":"const","keywordLocation":"#/const","error":"Instance does not match -2."} |
| draft7:const.json#/groups/12/tests/3 | float 2.0 is invalid | PASS | {"instanceLocation":"#","keyword":"const","keywordLocation":"#/const","error":"Instance does not match -2."} |
| draft7:const.json#/groups/12/tests/4 | float -2.00001 is invalid | PASS | {"instanceLocation":"#","keyword":"const","keywordLocation":"#/const","error":"Instance does not match -2."} |
| draft7:const.json#/groups/13/tests/1 | integer minus one is invalid | PASS | {"instanceLocation":"#","keyword":"const","keywordLocation":"#/const","error":"Instance does not match 9007199254740992."} |
| draft7:const.json#/groups/13/tests/3 | float minus one is invalid | PASS | {"instanceLocation":"#","keyword":"const","keywordLocation":"#/const","error":"Instance does not match 9007199254740992."} |
| draft7:const.json#/groups/14/tests/1 | do not match string lacking nul | PASS | {"instanceLocation":"#","keyword":"const","keywordLocation":"#/const","error":"Instance does not match \"hello\\u0000there\"."} |
| draft7:const.json#/groups/15/tests/1 | character looks the same but uses a different codepoint | PASS | {"instanceLocation":"#","keyword":"const","keywordLocation":"#/const","error":"Instance does not match \"μ\"."} |
| draft7:const.json#/groups/16/tests/1 | character looks the same but uses combining marks | PASS | {"instanceLocation":"#","keyword":"const","keywordLocation":"#/const","error":"Instance does not match \"ä\"."} |
| draft7:contains.json#/groups/0/tests/3 | array without items matching schema is invalid | PASS | {"instanceLocation":"#","keyword":"contains","keywordLocation":"#/contains","error":"Array does not contain item matching schema."} |
| draft7:contains.json#/groups/0/tests/4 | empty array is invalid | PASS | {"instanceLocation":"#","keyword":"contains","keywordLocation":"#/contains","error":"Array is empty. It must contain at least one item matching the schema."} |
| draft7:contains.json#/groups/1/tests/2 | array without item 5 is invalid | PASS | {"instanceLocation":"#","keyword":"contains","keywordLocation":"#/contains","error":"Array does not contain item matching schema."} |
| draft7:contains.json#/groups/2/tests/1 | empty array is invalid | PASS | {"instanceLocation":"#","keyword":"contains","keywordLocation":"#/contains","error":"Array is empty. It must contain at least one item matching the schema."} |
| draft7:contains.json#/groups/3/tests/0 | any non-empty array is invalid | PASS | {"instanceLocation":"#","keyword":"contains","keywordLocation":"#/contains","error":"Array does not contain item matching schema."} |
| draft7:contains.json#/groups/3/tests/1 | empty array is invalid | PASS | {"instanceLocation":"#","keyword":"contains","keywordLocation":"#/contains","error":"Array is empty. It must contain at least one item matching the schema."} |
| draft7:contains.json#/groups/4/tests/0 | matches items, does not match contains | PASS | {"instanceLocation":"#","keyword":"contains","keywordLocation":"#/contains","error":"Array does not contain item matching schema."} |
| draft7:contains.json#/groups/4/tests/1 | does not match items, matches contains | PASS | {"instanceLocation":"#","keyword":"items","keywordLocation":"#/items","error":"Items did not match schema."} |
| draft7:contains.json#/groups/4/tests/3 | matches neither items nor contains | PASS | {"instanceLocation":"#","keyword":"items","keywordLocation":"#/items","error":"Items did not match schema."} |
| draft7:contains.json#/groups/5/tests/1 | empty array is invalid | PASS | {"instanceLocation":"#","keyword":"contains","keywordLocation":"#/contains","error":"Array is empty. It must contain at least one item matching the schema."} |
| draft7:default.json#/groups/2/tests/1 | an explicit property value is checked against maximum (failing) | PASS | {"instanceLocation":"#","keyword":"properties","keywordLocation":"#/properties","error":"Property \"alpha\" does not match schema."} |
| draft7:definitions.json#/groups/0/tests/0 | valid definition schema | RUNTIME | FAST_RUNTIME_ERROR: Unresolved $ref "http://json-schema.org/draft-07/schema#".  Absolute URI "http://json-schema.org/draft-07/schema". Known schemas: - https://github.com/cfworker |
| draft7:definitions.json#/groups/0/tests/1 | invalid definition schema | RUNTIME | FAST_RUNTIME_ERROR: Unresolved $ref "http://json-schema.org/draft-07/schema#".  Absolute URI "http://json-schema.org/draft-07/schema". Known schemas: - https://github.com/cfworker |
| draft7:dependencies.json#/groups/0/tests/3 | missing dependency | PASS | {"instanceLocation":"#","keyword":"dependencies","keywordLocation":"#/dependencies","error":"Instance has \"bar\" but does not have \"foo\"."} |
| draft7:dependencies.json#/groups/2/tests/3 | missing dependency | PASS | {"instanceLocation":"#","keyword":"dependencies","keywordLocation":"#/dependencies","error":"Instance has \"quux\" but does not have \"bar\"."} |
| draft7:dependencies.json#/groups/2/tests/4 | missing other dependency | PASS | {"instanceLocation":"#","keyword":"dependencies","keywordLocation":"#/dependencies","error":"Instance has \"quux\" but does not have \"foo\"."} |
| draft7:dependencies.json#/groups/2/tests/5 | missing both dependencies | PASS | {"instanceLocation":"#","keyword":"dependencies","keywordLocation":"#/dependencies","error":"Instance has \"quux\" but does not have \"foo\"."} |
| draft7:dependencies.json#/groups/3/tests/2 | wrong type | PASS | {"instanceLocation":"#","keyword":"dependencies","keywordLocation":"#/dependencies","error":"Instance has \"bar\" but does not match dependant schema."} |
| draft7:dependencies.json#/groups/3/tests/3 | wrong type other | PASS | {"instanceLocation":"#","keyword":"dependencies","keywordLocation":"#/dependencies","error":"Instance has \"bar\" but does not match dependant schema."} |
| draft7:dependencies.json#/groups/3/tests/4 | wrong type both | PASS | {"instanceLocation":"#","keyword":"dependencies","keywordLocation":"#/dependencies","error":"Instance has \"bar\" but does not match dependant schema."} |
| draft7:dependencies.json#/groups/4/tests/1 | object with property having schema false is invalid | PASS | {"instanceLocation":"#","keyword":"dependencies","keywordLocation":"#/dependencies","error":"Instance has \"bar\" but does not match dependant schema."} |
| draft7:dependencies.json#/groups/4/tests/2 | object with both properties is invalid | PASS | {"instanceLocation":"#","keyword":"dependencies","keywordLocation":"#/dependencies","error":"Instance has \"bar\" but does not match dependant schema."} |
| draft7:dependencies.json#/groups/5/tests/3 | invalid object 1 | PASS | {"instanceLocation":"#","keyword":"dependencies","keywordLocation":"#/dependencies","error":"Instance has \"foo\nbar\" but does not have \"foo\rbar\"."} |
| draft7:dependencies.json#/groups/5/tests/4 | invalid object 2 | PASS | {"instanceLocation":"#","keyword":"dependencies","keywordLocation":"#/dependencies","error":"Instance has \"foo\tbar\" but does not match dependant schema."} |
| draft7:dependencies.json#/groups/5/tests/5 | invalid object 3 | PASS | {"instanceLocation":"#","keyword":"dependencies","keywordLocation":"#/dependencies","error":"Instance has \"foo'bar\" but does not match dependant schema."} |
| draft7:dependencies.json#/groups/5/tests/6 | invalid object 4 | PASS | {"instanceLocation":"#","keyword":"dependencies","keywordLocation":"#/dependencies","error":"Instance has \"foo\"bar\" but does not have \"foo'bar\"."} |
| draft7:dependencies.json#/groups/6/tests/0 | matches root | PASS | {"instanceLocation":"#","keyword":"dependencies","keywordLocation":"#/dependencies","error":"Instance has \"foo\" but does not match dependant schema."} |
| draft7:dependencies.json#/groups/6/tests/2 | matches both | PASS | {"instanceLocation":"#","keyword":"dependencies","keywordLocation":"#/dependencies","error":"Instance has \"foo\" but does not match dependant schema."} |
| draft7:enum.json#/groups/0/tests/1 | something else is invalid | PASS | {"instanceLocation":"#","keyword":"enum","keywordLocation":"#/enum","error":"Instance does not match any of [1,2,3]."} |
| draft7:enum.json#/groups/1/tests/1 | something else is invalid | PASS | {"instanceLocation":"#","keyword":"enum","keywordLocation":"#/enum","error":"Instance does not match any of [6,\"foo\",[],true,{\"foo\":12}]."} |
| draft7:enum.json#/groups/1/tests/2 | objects are deep compared | PASS | {"instanceLocation":"#","keyword":"enum","keywordLocation":"#/enum","error":"Instance does not match any of [6,\"foo\",[],true,{\"foo\":12}]."} |
| draft7:enum.json#/groups/1/tests/4 | extra properties in object is invalid | PASS | {"instanceLocation":"#","keyword":"enum","keywordLocation":"#/enum","error":"Instance does not match any of [6,\"foo\",[],true,{\"foo\":12}]."} |
| draft7:enum.json#/groups/2/tests/2 | something else is invalid | PASS | {"instanceLocation":"#","keyword":"enum","keywordLocation":"#/enum","error":"Instance does not match any of [6,null]."} |
| draft7:enum.json#/groups/3/tests/1 | wrong foo value | PASS | {"instanceLocation":"#","keyword":"properties","keywordLocation":"#/properties","error":"Property \"foo\" does not match schema."} |
| draft7:enum.json#/groups/3/tests/2 | wrong bar value | PASS | {"instanceLocation":"#","keyword":"properties","keywordLocation":"#/properties","error":"Property \"bar\" does not match schema."} |
| draft7:enum.json#/groups/3/tests/4 | missing required property is invalid | PASS | {"instanceLocation":"#","keyword":"required","keywordLocation":"#/required","error":"Instance does not have required property \"bar\"."} |
| draft7:enum.json#/groups/3/tests/5 | missing all properties is invalid | PASS | {"instanceLocation":"#","keyword":"required","keywordLocation":"#/required","error":"Instance does not have required property \"bar\"."} |
| draft7:enum.json#/groups/4/tests/2 | another string is invalid | PASS | {"instanceLocation":"#","keyword":"enum","keywordLocation":"#/enum","error":"Instance does not match any of [\"foo\\nbar\",\"foo\\rbar\"]."} |
| draft7:enum.json#/groups/5/tests/1 | integer zero is invalid | PASS | {"instanceLocation":"#","keyword":"enum","keywordLocation":"#/enum","error":"Instance does not match any of [false]."} |
| draft7:enum.json#/groups/5/tests/2 | float zero is invalid | PASS | {"instanceLocation":"#","keyword":"enum","keywordLocation":"#/enum","error":"Instance does not match any of [false]."} |
| draft7:enum.json#/groups/6/tests/1 | [0] is invalid | PASS | {"instanceLocation":"#","keyword":"enum","keywordLocation":"#/enum","error":"Instance does not match any of [[false]]."} |
| draft7:enum.json#/groups/6/tests/2 | [0.0] is invalid | PASS | {"instanceLocation":"#","keyword":"enum","keywordLocation":"#/enum","error":"Instance does not match any of [[false]]."} |
| draft7:enum.json#/groups/7/tests/1 | integer one is invalid | PASS | {"instanceLocation":"#","keyword":"enum","keywordLocation":"#/enum","error":"Instance does not match any of [true]."} |
| draft7:enum.json#/groups/7/tests/2 | float one is invalid | PASS | {"instanceLocation":"#","keyword":"enum","keywordLocation":"#/enum","error":"Instance does not match any of [true]."} |
| draft7:enum.json#/groups/8/tests/1 | [1] is invalid | PASS | {"instanceLocation":"#","keyword":"enum","keywordLocation":"#/enum","error":"Instance does not match any of [[true]]."} |
| draft7:enum.json#/groups/8/tests/2 | [1.0] is invalid | PASS | {"instanceLocation":"#","keyword":"enum","keywordLocation":"#/enum","error":"Instance does not match any of [[true]]."} |
| draft7:enum.json#/groups/9/tests/0 | false is invalid | PASS | {"instanceLocation":"#","keyword":"enum","keywordLocation":"#/enum","error":"Instance does not match any of [0]."} |
| draft7:enum.json#/groups/10/tests/0 | [false] is invalid | PASS | {"instanceLocation":"#","keyword":"enum","keywordLocation":"#/enum","error":"Instance does not match any of [[0]]."} |
| draft7:enum.json#/groups/11/tests/0 | true is invalid | PASS | {"instanceLocation":"#","keyword":"enum","keywordLocation":"#/enum","error":"Instance does not match any of [1]."} |
| draft7:enum.json#/groups/12/tests/0 | [true] is invalid | PASS | {"instanceLocation":"#","keyword":"enum","keywordLocation":"#/enum","error":"Instance does not match any of [[1]]."} |
| draft7:enum.json#/groups/13/tests/1 | do not match string lacking nul | PASS | {"instanceLocation":"#","keyword":"enum","keywordLocation":"#/enum","error":"Instance does not match any of [\"hello\\u0000there\"]."} |
| draft7:exclusiveMaximum.json#/groups/0/tests/1 | boundary point is invalid | PASS | {"instanceLocation":"#","keyword":"exclusiveMaximum","keywordLocation":"#/exclusiveMaximum","error":"3 is greater than or equal to 3."} |
| draft7:exclusiveMaximum.json#/groups/0/tests/2 | above the exclusiveMaximum is invalid | PASS | {"instanceLocation":"#","keyword":"exclusiveMaximum","keywordLocation":"#/exclusiveMaximum","error":"3.5 is greater than or equal to 3."} |
| draft7:exclusiveMinimum.json#/groups/0/tests/1 | boundary point is invalid | PASS | {"instanceLocation":"#","keyword":"exclusiveMinimum","keywordLocation":"#/exclusiveMinimum","error":"1.1 is less than 1.1."} |
| draft7:exclusiveMinimum.json#/groups/0/tests/2 | below the exclusiveMinimum is invalid | PASS | {"instanceLocation":"#","keyword":"exclusiveMinimum","keywordLocation":"#/exclusiveMinimum","error":"0.6 is less than 1.1."} |
| draft7:if-then-else.json#/groups/3/tests/1 | invalid through then | PASS | {"instanceLocation":"#","keyword":"if","keywordLocation":"#/if","error":"Instance does not match \"then\" schema."} |
| draft7:if-then-else.json#/groups/4/tests/2 | invalid through else | PASS | {"instanceLocation":"#","keyword":"if","keywordLocation":"#/if","error":"Instance does not match \"else\" schema."} |
| draft7:if-then-else.json#/groups/5/tests/1 | invalid through then | PASS | {"instanceLocation":"#","keyword":"if","keywordLocation":"#/if","error":"Instance does not match \"then\" schema."} |
| draft7:if-then-else.json#/groups/5/tests/3 | invalid through else | PASS | {"instanceLocation":"#","keyword":"if","keywordLocation":"#/if","error":"Instance does not match \"else\" schema."} |
| draft7:if-then-else.json#/groups/7/tests/1 | boolean schema true in if always chooses the then path (invalid) | PASS | {"instanceLocation":"#","keyword":"if","keywordLocation":"#/if","error":"Instance does not match \"then\" schema."} |
| draft7:if-then-else.json#/groups/8/tests/0 | boolean schema false in if always chooses the else path (invalid) | PASS | {"instanceLocation":"#","keyword":"if","keywordLocation":"#/if","error":"Instance does not match \"else\" schema."} |
| draft7:if-then-else.json#/groups/9/tests/2 | no redirects to then and fails | PASS | {"instanceLocation":"#","keyword":"if","keywordLocation":"#/if","error":"Instance does not match \"then\" schema."} |
| draft7:if-then-else.json#/groups/9/tests/3 | invalid redirects to else and fails | PASS | {"instanceLocation":"#","keyword":"if","keywordLocation":"#/if","error":"Instance does not match \"else\" schema."} |
| draft7:if-then-else.json#/groups/10/tests/0 | matches if → then=false → invalid | PASS | {"instanceLocation":"#","keyword":"if","keywordLocation":"#/if","error":"Instance does not match \"then\" schema."} |
| draft7:if-then-else.json#/groups/11/tests/1 | does not match if → else executes → invalid | PASS | {"instanceLocation":"#","keyword":"if","keywordLocation":"#/if","error":"Instance does not match \"else\" schema."} |
| draft7:infinite-loop-detection.json#/groups/0/tests/1 | failing case | PASS | {"instanceLocation":"#","keyword":"allOf","keywordLocation":"#/allOf","error":"Instance does not match every subschema."} |
| draft7:items.json#/groups/0/tests/1 | wrong type of items | PASS | {"instanceLocation":"#","keyword":"items","keywordLocation":"#/items","error":"Items did not match schema."} |
| draft7:items.json#/groups/1/tests/1 | wrong types | PASS | {"instanceLocation":"#","keyword":"items","keywordLocation":"#/items","error":"Items did not match schema."} |
| draft7:items.json#/groups/3/tests/0 | any non-empty array is invalid | PASS | {"instanceLocation":"#","keyword":"items","keywordLocation":"#/items","error":"Items did not match schema."} |
| draft7:items.json#/groups/4/tests/1 | array with two items is invalid | PASS | {"instanceLocation":"#","keyword":"items","keywordLocation":"#/items","error":"Items did not match schema."} |
| draft7:items.json#/groups/5/tests/1 | too many items | PASS | {"instanceLocation":"#","keyword":"additionalItems","keywordLocation":"#/additionalItems","error":"Items did not match additional items schema."} |
| draft7:items.json#/groups/5/tests/2 | too many sub-items | PASS | {"instanceLocation":"#","keyword":"items","keywordLocation":"#/items","error":"Items did not match schema."} |
| draft7:items.json#/groups/5/tests/3 | wrong item | PASS | {"instanceLocation":"#","keyword":"items","keywordLocation":"#/items","error":"Items did not match schema."} |
| draft7:items.json#/groups/5/tests/4 | wrong sub-item | PASS | {"instanceLocation":"#","keyword":"items","keywordLocation":"#/items","error":"Items did not match schema."} |
| draft7:items.json#/groups/6/tests/1 | nested array with invalid type | PASS | {"instanceLocation":"#","keyword":"items","keywordLocation":"#/items","error":"Items did not match schema."} |
| draft7:items.json#/groups/6/tests/2 | not deep enough | PASS | {"instanceLocation":"#","keyword":"items","keywordLocation":"#/items","error":"Items did not match schema."} |
| draft7:maximum.json#/groups/0/tests/2 | above the maximum is invalid | PASS | {"instanceLocation":"#","keyword":"maximum","keywordLocation":"#/maximum","error":"3.5 is greater than 3."} |
| draft7:maximum.json#/groups/1/tests/3 | above the maximum is invalid | PASS | {"instanceLocation":"#","keyword":"maximum","keywordLocation":"#/maximum","error":"300.5 is greater than 300."} |
| draft7:maxItems.json#/groups/0/tests/2 | too long is invalid | PASS | {"instanceLocation":"#","keyword":"maxItems","keywordLocation":"#/maxItems","error":"Array has too many items (3 > 2)."} |
| draft7:maxItems.json#/groups/1/tests/1 | too long is invalid | PASS | {"instanceLocation":"#","keyword":"maxItems","keywordLocation":"#/maxItems","error":"Array has too many items (3 > 2)."} |
| draft7:maxLength.json#/groups/0/tests/2 | too long is invalid | PASS | {"instanceLocation":"#","keyword":"maxLength","keywordLocation":"#/maxLength","error":"String is too long (3 > 2)."} |
| draft7:maxLength.json#/groups/1/tests/1 | too long is invalid | PASS | {"instanceLocation":"#","keyword":"maxLength","keywordLocation":"#/maxLength","error":"String is too long (3 > 2)."} |
| draft7:maxProperties.json#/groups/0/tests/2 | too long is invalid | PASS | {"instanceLocation":"#","keyword":"maxProperties","keywordLocation":"#/maxProperties","error":"Instance does not have at least 2 properties."} |
| draft7:maxProperties.json#/groups/1/tests/1 | too long is invalid | PASS | {"instanceLocation":"#","keyword":"maxProperties","keywordLocation":"#/maxProperties","error":"Instance does not have at least 2 properties."} |
| draft7:maxProperties.json#/groups/2/tests/1 | one property is invalid | PASS | {"instanceLocation":"#","keyword":"maxProperties","keywordLocation":"#/maxProperties","error":"Instance does not have at least 0 properties."} |
| draft7:minimum.json#/groups/0/tests/2 | below the minimum is invalid | PASS | {"instanceLocation":"#","keyword":"minimum","keywordLocation":"#/minimum","error":"0.6 is less than 1.1."} |
| draft7:minimum.json#/groups/1/tests/4 | float below the minimum is invalid | PASS | {"instanceLocation":"#","keyword":"minimum","keywordLocation":"#/minimum","error":"-2.0001 is less than -2."} |
| draft7:minimum.json#/groups/1/tests/5 | int below the minimum is invalid | PASS | {"instanceLocation":"#","keyword":"minimum","keywordLocation":"#/minimum","error":"-3 is less than -2."} |
| draft7:minItems.json#/groups/0/tests/2 | too short is invalid | PASS | {"instanceLocation":"#","keyword":"minItems","keywordLocation":"#/minItems","error":"Array has too few items (0 < 1)."} |
| draft7:minItems.json#/groups/1/tests/1 | too short is invalid | PASS | {"instanceLocation":"#","keyword":"minItems","keywordLocation":"#/minItems","error":"Array has too few items (0 < 1)."} |
| draft7:minLength.json#/groups/0/tests/2 | too short is invalid | PASS | {"instanceLocation":"#","keyword":"minLength","keywordLocation":"#/minLength","error":"String is too short (1 < 2)."} |
| draft7:minLength.json#/groups/0/tests/4 | one grapheme is not long enough | PASS | {"instanceLocation":"#","keyword":"minLength","keywordLocation":"#/minLength","error":"String is too short (1 < 2)."} |
| draft7:minLength.json#/groups/1/tests/1 | too short is invalid | PASS | {"instanceLocation":"#","keyword":"minLength","keywordLocation":"#/minLength","error":"String is too short (1 < 2)."} |
| draft7:minProperties.json#/groups/0/tests/2 | too short is invalid | PASS | {"instanceLocation":"#","keyword":"minProperties","keywordLocation":"#/minProperties","error":"Instance does not have at least 1 properties."} |
| draft7:minProperties.json#/groups/1/tests/1 | too short is invalid | PASS | {"instanceLocation":"#","keyword":"minProperties","keywordLocation":"#/minProperties","error":"Instance does not have at least 1 properties."} |
| draft7:multipleOf.json#/groups/0/tests/1 | int by int fail | PASS | {"instanceLocation":"#","keyword":"multipleOf","keywordLocation":"#/multipleOf","error":"7 is not a multiple of 2."} |
| draft7:multipleOf.json#/groups/1/tests/3 | 35 is not multiple of 1.5 | PASS | {"instanceLocation":"#","keyword":"multipleOf","keywordLocation":"#/multipleOf","error":"35 is not a multiple of 1.5."} |
| draft7:multipleOf.json#/groups/2/tests/1 | 0.00751 is not multiple of 0.0001 | PASS | {"instanceLocation":"#","keyword":"multipleOf","keywordLocation":"#/multipleOf","error":"0.00751 is not a multiple of 0.0001."} |
| draft7:multipleOf.json#/groups/3/tests/0 | always invalid, but naive implementations may raise an overflow error | PASS | {"instanceLocation":"#","keyword":"multipleOf","keywordLocation":"#/multipleOf","error":"1e+308 is not a multiple of 0.123456789."} |
| draft7:not.json#/groups/0/tests/1 | disallowed | PASS | {"instanceLocation":"#","keyword":"not","keywordLocation":"#/not","error":"Instance matched \"not\" schema."} |
| draft7:not.json#/groups/1/tests/1 | mismatch | PASS | {"instanceLocation":"#","keyword":"not","keywordLocation":"#/not","error":"Instance matched \"not\" schema."} |
| draft7:not.json#/groups/1/tests/2 | other mismatch | PASS | {"instanceLocation":"#","keyword":"not","keywordLocation":"#/not","error":"Instance matched \"not\" schema."} |
| draft7:not.json#/groups/2/tests/2 | mismatch | PASS | {"instanceLocation":"#","keyword":"not","keywordLocation":"#/not","error":"Instance matched \"not\" schema."} |
| draft7:not.json#/groups/3/tests/0 | property present | PASS | {"instanceLocation":"#","keyword":"properties","keywordLocation":"#/properties","error":"Property \"foo\" does not match schema."} |
| draft7:not.json#/groups/4/tests/0 | number is invalid | PASS | {"instanceLocation":"#","keyword":"not","keywordLocation":"#/not","error":"Instance matched \"not\" schema."} |
| draft7:not.json#/groups/4/tests/1 | string is invalid | PASS | {"instanceLocation":"#","keyword":"not","keywordLocation":"#/not","error":"Instance matched \"not\" schema."} |
| draft7:not.json#/groups/4/tests/2 | boolean true is invalid | PASS | {"instanceLocation":"#","keyword":"not","keywordLocation":"#/not","error":"Instance matched \"not\" schema."} |
| draft7:not.json#/groups/4/tests/3 | boolean false is invalid | PASS | {"instanceLocation":"#","keyword":"not","keywordLocation":"#/not","error":"Instance matched \"not\" schema."} |
| draft7:not.json#/groups/4/tests/4 | null is invalid | PASS | {"instanceLocation":"#","keyword":"not","keywordLocation":"#/not","error":"Instance matched \"not\" schema."} |
| draft7:not.json#/groups/4/tests/5 | object is invalid | PASS | {"instanceLocation":"#","keyword":"not","keywordLocation":"#/not","error":"Instance matched \"not\" schema."} |
| draft7:not.json#/groups/4/tests/6 | empty object is invalid | PASS | {"instanceLocation":"#","keyword":"not","keywordLocation":"#/not","error":"Instance matched \"not\" schema."} |
| draft7:not.json#/groups/4/tests/7 | array is invalid | PASS | {"instanceLocation":"#","keyword":"not","keywordLocation":"#/not","error":"Instance matched \"not\" schema."} |
| draft7:not.json#/groups/4/tests/8 | empty array is invalid | PASS | {"instanceLocation":"#","keyword":"not","keywordLocation":"#/not","error":"Instance matched \"not\" schema."} |
| draft7:not.json#/groups/5/tests/0 | number is invalid | PASS | {"instanceLocation":"#","keyword":"not","keywordLocation":"#/not","error":"Instance matched \"not\" schema."} |
| draft7:not.json#/groups/5/tests/1 | string is invalid | PASS | {"instanceLocation":"#","keyword":"not","keywordLocation":"#/not","error":"Instance matched \"not\" schema."} |
| draft7:not.json#/groups/5/tests/2 | boolean true is invalid | PASS | {"instanceLocation":"#","keyword":"not","keywordLocation":"#/not","error":"Instance matched \"not\" schema."} |
| draft7:not.json#/groups/5/tests/3 | boolean false is invalid | PASS | {"instanceLocation":"#","keyword":"not","keywordLocation":"#/not","error":"Instance matched \"not\" schema."} |
| draft7:not.json#/groups/5/tests/4 | null is invalid | PASS | {"instanceLocation":"#","keyword":"not","keywordLocation":"#/not","error":"Instance matched \"not\" schema."} |
| draft7:not.json#/groups/5/tests/5 | object is invalid | PASS | {"instanceLocation":"#","keyword":"not","keywordLocation":"#/not","error":"Instance matched \"not\" schema."} |
| draft7:not.json#/groups/5/tests/6 | empty object is invalid | PASS | {"instanceLocation":"#","keyword":"not","keywordLocation":"#/not","error":"Instance matched \"not\" schema."} |
| draft7:not.json#/groups/5/tests/7 | array is invalid | PASS | {"instanceLocation":"#","keyword":"not","keywordLocation":"#/not","error":"Instance matched \"not\" schema."} |
| draft7:not.json#/groups/5/tests/8 | empty array is invalid | PASS | {"instanceLocation":"#","keyword":"not","keywordLocation":"#/not","error":"Instance matched \"not\" schema."} |
| draft7:oneOf.json#/groups/0/tests/2 | both oneOf valid | PASS | {"instanceLocation":"#","keyword":"oneOf","keywordLocation":"#/oneOf","error":"Instance does not match exactly one subschema (2 matches)."} |
| draft7:oneOf.json#/groups/0/tests/3 | neither oneOf valid | PASS | {"instanceLocation":"#","keyword":"oneOf","keywordLocation":"#/oneOf","error":"Instance does not match exactly one subschema (0 matches)."} |
| draft7:oneOf.json#/groups/1/tests/0 | mismatch base schema | PASS | {"instanceLocation":"#","keyword":"type","keywordLocation":"#/type","error":"Instance type \"number\" is invalid. Expected \"string\"."} |
| draft7:oneOf.json#/groups/1/tests/2 | both oneOf valid | PASS | {"instanceLocation":"#","keyword":"oneOf","keywordLocation":"#/oneOf","error":"Instance does not match exactly one subschema (2 matches)."} |
| draft7:oneOf.json#/groups/2/tests/0 | any value is invalid | PASS | {"instanceLocation":"#","keyword":"oneOf","keywordLocation":"#/oneOf","error":"Instance does not match exactly one subschema (3 matches)."} |
| draft7:oneOf.json#/groups/4/tests/0 | any value is invalid | PASS | {"instanceLocation":"#","keyword":"oneOf","keywordLocation":"#/oneOf","error":"Instance does not match exactly one subschema (2 matches)."} |
| draft7:oneOf.json#/groups/5/tests/0 | any value is invalid | PASS | {"instanceLocation":"#","keyword":"oneOf","keywordLocation":"#/oneOf","error":"Instance does not match exactly one subschema (0 matches)."} |
| draft7:oneOf.json#/groups/6/tests/2 | both oneOf valid (complex) | PASS | {"instanceLocation":"#","keyword":"oneOf","keywordLocation":"#/oneOf","error":"Instance does not match exactly one subschema (2 matches)."} |
| draft7:oneOf.json#/groups/6/tests/3 | neither oneOf valid (complex) | PASS | {"instanceLocation":"#","keyword":"oneOf","keywordLocation":"#/oneOf","error":"Instance does not match exactly one subschema (0 matches)."} |
| draft7:oneOf.json#/groups/7/tests/1 | both valid - invalid | PASS | {"instanceLocation":"#","keyword":"oneOf","keywordLocation":"#/oneOf","error":"Instance does not match exactly one subschema (2 matches)."} |
| draft7:oneOf.json#/groups/8/tests/0 | both invalid - invalid | PASS | {"instanceLocation":"#","keyword":"oneOf","keywordLocation":"#/oneOf","error":"Instance does not match exactly one subschema (0 matches)."} |
| draft7:oneOf.json#/groups/8/tests/3 | both valid - invalid | PASS | {"instanceLocation":"#","keyword":"oneOf","keywordLocation":"#/oneOf","error":"Instance does not match exactly one subschema (2 matches)."} |
| draft7:oneOf.json#/groups/9/tests/2 | both oneOf valid | PASS | {"instanceLocation":"#","keyword":"oneOf","keywordLocation":"#/oneOf","error":"Instance does not match exactly one subschema (2 matches)."} |
| draft7:oneOf.json#/groups/9/tests/3 | neither oneOf valid | PASS | {"instanceLocation":"#","keyword":"oneOf","keywordLocation":"#/oneOf","error":"Instance does not match exactly one subschema (0 matches)."} |
| draft7:oneOf.json#/groups/10/tests/1 | anything non-null is invalid | PASS | {"instanceLocation":"#","keyword":"oneOf","keywordLocation":"#/oneOf","error":"Instance does not match exactly one subschema (0 matches)."} |
| draft7:optional/bignum.json#/groups/2/tests/0 | a bignum is not a string | PASS | {"instanceLocation":"#","keyword":"type","keywordLocation":"#/type","error":"Instance type \"number\" is invalid. Expected \"string\"."} |
| draft7:optional/bignum.json#/groups/4/tests/0 | comparison works for high numbers | PASS | {"instanceLocation":"#","keyword":"exclusiveMaximum","keywordLocation":"#/exclusiveMaximum","error":"9.727837981879871e+26 is greater than or equal to 9.727837981879871e+26."} |
| draft7:optional/bignum.json#/groups/6/tests/0 | comparison works for very negative numbers | PASS | {"instanceLocation":"#","keyword":"exclusiveMinimum","keywordLocation":"#/exclusiveMinimum","error":"-9.727837981879871e+26 is less than -9.727837981879871e+26."} |
| draft7:optional/cross-draft.json#/groups/0/tests/0 | missing bar is invalid | PASS | {"instanceLocation":"#","keyword":"allOf","keywordLocation":"#/allOf","error":"Instance does not match every subschema."} |
| draft7:optional/ecmascript-regex.json#/groups/0/tests/0 | matches in Python, but not in ECMA 262 | PASS | {"instanceLocation":"#","keyword":"pattern","keywordLocation":"#/pattern","error":"String does not match pattern."} |
| draft7:optional/ecmascript-regex.json#/groups/1/tests/0 | does not match | PASS | {"instanceLocation":"#","keyword":"pattern","keywordLocation":"#/pattern","error":"String does not match pattern."} |
| draft7:optional/ecmascript-regex.json#/groups/2/tests/0 | does not match | PASS | {"instanceLocation":"#","keyword":"pattern","keywordLocation":"#/pattern","error":"String does not match pattern."} |
| draft7:optional/ecmascript-regex.json#/groups/3/tests/0 | does not match | PASS | {"instanceLocation":"#","keyword":"pattern","keywordLocation":"#/pattern","error":"String does not match pattern."} |
| draft7:optional/ecmascript-regex.json#/groups/4/tests/1 | NKO DIGIT ZERO does not match (unlike e.g. Python) | PASS | {"instanceLocation":"#","keyword":"pattern","keywordLocation":"#/pattern","error":"String does not match pattern."} |
| draft7:optional/ecmascript-regex.json#/groups/4/tests/2 | NKO DIGIT ZERO (as \u escape) does not match | PASS | {"instanceLocation":"#","keyword":"pattern","keywordLocation":"#/pattern","error":"String does not match pattern."} |
| draft7:optional/ecmascript-regex.json#/groups/5/tests/0 | ASCII zero does not match | PASS | {"instanceLocation":"#","keyword":"pattern","keywordLocation":"#/pattern","error":"String does not match pattern."} |
| draft7:optional/ecmascript-regex.json#/groups/6/tests/1 | latin-1 e-acute does not match (unlike e.g. Python) | PASS | {"instanceLocation":"#","keyword":"pattern","keywordLocation":"#/pattern","error":"String does not match pattern."} |
| draft7:optional/ecmascript-regex.json#/groups/7/tests/0 | ASCII 'a' does not match | PASS | {"instanceLocation":"#","keyword":"pattern","keywordLocation":"#/pattern","error":"String does not match pattern."} |
| draft7:optional/ecmascript-regex.json#/groups/8/tests/9 | Non-whitespace control does not match | PASS | {"instanceLocation":"#","keyword":"pattern","keywordLocation":"#/pattern","error":"String does not match pattern."} |
| draft7:optional/ecmascript-regex.json#/groups/8/tests/10 | Non-whitespace does not match | PASS | {"instanceLocation":"#","keyword":"pattern","keywordLocation":"#/pattern","error":"String does not match pattern."} |
| draft7:optional/ecmascript-regex.json#/groups/9/tests/0 | ASCII space does not match | PASS | {"instanceLocation":"#","keyword":"pattern","keywordLocation":"#/pattern","error":"String does not match pattern."} |
| draft7:optional/ecmascript-regex.json#/groups/9/tests/1 | Character tabulation does not match | PASS | {"instanceLocation":"#","keyword":"pattern","keywordLocation":"#/pattern","error":"String does not match pattern."} |
| draft7:optional/ecmascript-regex.json#/groups/9/tests/2 | Line tabulation does not match | PASS | {"instanceLocation":"#","keyword":"pattern","keywordLocation":"#/pattern","error":"String does not match pattern."} |
| draft7:optional/ecmascript-regex.json#/groups/9/tests/3 | Form feed does not match | PASS | {"instanceLocation":"#","keyword":"pattern","keywordLocation":"#/pattern","error":"String does not match pattern."} |
| draft7:optional/ecmascript-regex.json#/groups/9/tests/4 | latin-1 non-breaking-space does not match | PASS | {"instanceLocation":"#","keyword":"pattern","keywordLocation":"#/pattern","error":"String does not match pattern."} |
| draft7:optional/ecmascript-regex.json#/groups/9/tests/5 | zero-width whitespace does not match | PASS | {"instanceLocation":"#","keyword":"pattern","keywordLocation":"#/pattern","error":"String does not match pattern."} |
| draft7:optional/ecmascript-regex.json#/groups/9/tests/6 | line feed does not match (line terminator) | PASS | {"instanceLocation":"#","keyword":"pattern","keywordLocation":"#/pattern","error":"String does not match pattern."} |
| draft7:optional/ecmascript-regex.json#/groups/9/tests/7 | paragraph separator does not match (line terminator) | PASS | {"instanceLocation":"#","keyword":"pattern","keywordLocation":"#/pattern","error":"String does not match pattern."} |
| draft7:optional/ecmascript-regex.json#/groups/9/tests/8 | EM SPACE does not match (Space_Separator) | PASS | {"instanceLocation":"#","keyword":"pattern","keywordLocation":"#/pattern","error":"String does not match pattern."} |
| draft7:optional/ecmascript-regex.json#/groups/10/tests/3 | unicode matching is case-sensitive | PASS | {"instanceLocation":"#","keyword":"pattern","keywordLocation":"#/pattern","error":"String does not match pattern."} |
| draft7:optional/ecmascript-regex.json#/groups/11/tests/1 | literal unicode character in json string | PASS | {"instanceLocation":"#","keyword":"pattern","keywordLocation":"#/pattern","error":"String does not match pattern."} |
| draft7:optional/ecmascript-regex.json#/groups/11/tests/2 | unicode character in hex format in string | PASS | {"instanceLocation":"#","keyword":"pattern","keywordLocation":"#/pattern","error":"String does not match pattern."} |
| draft7:optional/ecmascript-regex.json#/groups/11/tests/3 | unicode matching is case-sensitive | PASS | {"instanceLocation":"#","keyword":"pattern","keywordLocation":"#/pattern","error":"String does not match pattern."} |
| draft7:optional/ecmascript-regex.json#/groups/12/tests/0 | literal unicode character in json string | PASS | {"instanceLocation":"#","keyword":"pattern","keywordLocation":"#/pattern","error":"String does not match pattern."} |
| draft7:optional/ecmascript-regex.json#/groups/12/tests/1 | unicode character in hex format in string | PASS | {"instanceLocation":"#","keyword":"pattern","keywordLocation":"#/pattern","error":"String does not match pattern."} |
| draft7:optional/ecmascript-regex.json#/groups/13/tests/1 | ascii non-digits | PASS | {"instanceLocation":"#","keyword":"pattern","keywordLocation":"#/pattern","error":"String does not match pattern."} |
| draft7:optional/ecmascript-regex.json#/groups/13/tests/2 | non-ascii digits (BENGALI DIGIT FOUR, BENGALI DIGIT TWO) | PASS | {"instanceLocation":"#","keyword":"pattern","keywordLocation":"#/pattern","error":"String does not match pattern."} |
| draft7:optional/ecmascript-regex.json#/groups/14/tests/1 | ascii non-digits | PASS | {"instanceLocation":"#","keyword":"pattern","keywordLocation":"#/pattern","error":"String does not match pattern."} |
| draft7:optional/ecmascript-regex.json#/groups/15/tests/3 | unicode matching is case-sensitive | PASS | {"instanceLocation":"#","keyword":"additionalProperties","keywordLocation":"#/additionalProperties","error":"Property \"L'ÉCOLE\" does not match additional properties schema."} |
| draft7:optional/ecmascript-regex.json#/groups/16/tests/1 | literal unicode character in json string | PASS | {"instanceLocation":"#","keyword":"additionalProperties","keywordLocation":"#/additionalProperties","error":"Property \"l'école\" does not match additional properties schema."} |
| draft7:optional/ecmascript-regex.json#/groups/16/tests/2 | unicode character in hex format in string | PASS | {"instanceLocation":"#","keyword":"additionalProperties","keywordLocation":"#/additionalProperties","error":"Property \"l'école\" does not match additional properties schema."} |
| draft7:optional/ecmascript-regex.json#/groups/16/tests/3 | unicode matching is case-sensitive | PASS | {"instanceLocation":"#","keyword":"additionalProperties","keywordLocation":"#/additionalProperties","error":"Property \"L'ÉCOLE\" does not match additional properties schema."} |
| draft7:optional/ecmascript-regex.json#/groups/17/tests/0 | literal unicode character in json string | PASS | {"instanceLocation":"#","keyword":"additionalProperties","keywordLocation":"#/additionalProperties","error":"Property \"l'école\" does not match additional properties schema."} |
| draft7:optional/ecmascript-regex.json#/groups/17/tests/1 | unicode character in hex format in string | PASS | {"instanceLocation":"#","keyword":"additionalProperties","keywordLocation":"#/additionalProperties","error":"Property \"l'école\" does not match additional properties schema."} |
| draft7:optional/ecmascript-regex.json#/groups/18/tests/1 | ascii non-digits | PASS | {"instanceLocation":"#","keyword":"additionalProperties","keywordLocation":"#/additionalProperties","error":"Property \"-%#\" does not match additional properties schema."} |
| draft7:optional/ecmascript-regex.json#/groups/18/tests/2 | non-ascii digits (BENGALI DIGIT FOUR, BENGALI DIGIT TWO) | PASS | {"instanceLocation":"#","keyword":"additionalProperties","keywordLocation":"#/additionalProperties","error":"Property \"৪২\" does not match additional properties schema."} |
| draft7:optional/ecmascript-regex.json#/groups/19/tests/1 | ascii non-digits | PASS | {"instanceLocation":"#","keyword":"additionalProperties","keywordLocation":"#/additionalProperties","error":"Property \"-%#\" does not match additional properties schema."} |
| draft7:optional/format/date-time.json#/groups/0/tests/11 | a valid date-time with a leap second, with minus offset | WRONG | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"date-time\"."} |
| draft7:optional/format/date-time.json#/groups/0/tests/12 | an invalid date-time past leap second, UTC | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"date-time\"."} |
| draft7:optional/format/date-time.json#/groups/0/tests/13 | an invalid date-time with leap second on a wrong minute, UTC | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"date-time\"."} |
| draft7:optional/format/date-time.json#/groups/0/tests/14 | an invalid date-time with leap second on a wrong hour, UTC | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"date-time\"."} |
| draft7:optional/format/date-time.json#/groups/0/tests/15 | an invalid hour in date-time string | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"date-time\"."} |
| draft7:optional/format/date-time.json#/groups/0/tests/16 | an invalid minute in date-time string | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"date-time\"."} |
| draft7:optional/format/date-time.json#/groups/0/tests/18 | an invalid day in date-time string | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"date-time\"."} |
| draft7:optional/format/date-time.json#/groups/0/tests/20 | an invalid closing Z after time-zone offset | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"date-time\"."} |
| draft7:optional/format/date-time.json#/groups/0/tests/21 | an invalid date-time string | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"date-time\"."} |
| draft7:optional/format/date-time.json#/groups/0/tests/23 | only RFC3339 not all of ISO 8601 are valid | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"date-time\"."} |
| draft7:optional/format/date-time.json#/groups/0/tests/24 | invalid non-padded month dates | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"date-time\"."} |
| draft7:optional/format/date-time.json#/groups/0/tests/25 | invalid non-padded day dates | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"date-time\"."} |
| draft7:optional/format/date-time.json#/groups/0/tests/26 | invalid non-ASCII '৪' (a Bengali 4) in date portion | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"date-time\"."} |
| draft7:optional/format/date-time.json#/groups/0/tests/27 | invalid non-ASCII '৪' (a Bengali 4) in time portion | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"date-time\"."} |
| draft7:optional/format/date-time.json#/groups/0/tests/28 | invalid extended year | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"date-time\"."} |
| draft7:optional/format/date.json#/groups/0/tests/8 | a invalid date string with 32 days in January | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"date\"."} |
| draft7:optional/format/date.json#/groups/0/tests/10 | a invalid date string with 30 days in February (leap) | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"date\"."} |
| draft7:optional/format/date.json#/groups/0/tests/12 | a invalid date string with 32 days in March | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"date\"."} |
| draft7:optional/format/date.json#/groups/0/tests/14 | a invalid date string with 31 days in April | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"date\"."} |
| draft7:optional/format/date.json#/groups/0/tests/16 | a invalid date string with 32 days in May | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"date\"."} |
| draft7:optional/format/date.json#/groups/0/tests/18 | a invalid date string with 31 days in June | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"date\"."} |
| draft7:optional/format/date.json#/groups/0/tests/20 | a invalid date string with 32 days in July | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"date\"."} |
| draft7:optional/format/date.json#/groups/0/tests/22 | a invalid date string with 32 days in August | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"date\"."} |
| draft7:optional/format/date.json#/groups/0/tests/24 | a invalid date string with 31 days in September | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"date\"."} |
| draft7:optional/format/date.json#/groups/0/tests/26 | a invalid date string with 32 days in October | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"date\"."} |
| draft7:optional/format/date.json#/groups/0/tests/28 | a invalid date string with 31 days in November | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"date\"."} |
| draft7:optional/format/date.json#/groups/0/tests/30 | a invalid date string with 32 days in December | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"date\"."} |
| draft7:optional/format/date.json#/groups/0/tests/31 | an invalid date string | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"date\"."} |
| draft7:optional/format/date.json#/groups/0/tests/32 | only RFC3339 not all of ISO 8601 are valid | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"date\"."} |
| draft7:optional/format/date.json#/groups/0/tests/33 | non-padded month dates are not valid | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"date\"."} |
| draft7:optional/format/date.json#/groups/0/tests/34 | non-padded day dates are not valid | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"date\"."} |
| draft7:optional/format/date.json#/groups/0/tests/35 | invalid month | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"date\"."} |
| draft7:optional/format/date.json#/groups/0/tests/36 | 2021 is not a leap year | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"date\"."} |
| draft7:optional/format/date.json#/groups/0/tests/38 | invalid non-ASCII '৪' (a Bengali 4) | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"date\"."} |
| draft7:optional/format/date.json#/groups/0/tests/39 | invalid: non-ASCII Bengali digit in month field | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"date\"."} |
| draft7:optional/format/date.json#/groups/0/tests/40 | ISO8601 / non-RFC3339: YYYYMMDD without dashes (2023-03-28) | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"date\"."} |
| draft7:optional/format/date.json#/groups/0/tests/41 | ISO8601 / non-RFC3339: week number implicit day of week (2023-01-02) | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"date\"."} |
| draft7:optional/format/date.json#/groups/0/tests/42 | ISO8601 / non-RFC3339: week number with day of week (2023-03-28) | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"date\"."} |
| draft7:optional/format/date.json#/groups/0/tests/43 | ISO8601 / non-RFC3339: week number rollover to next year (2023-01-01) | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"date\"."} |
| draft7:optional/format/date.json#/groups/0/tests/44 | an invalid time string in date-time format | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"date\"."} |
| draft7:optional/format/date.json#/groups/0/tests/45 | century year 0100 is not a leap year | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"date\"."} |
| draft7:optional/format/date.json#/groups/0/tests/47 | century year 2100 is not a leap year | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"date\"."} |
| draft7:optional/format/date.json#/groups/0/tests/48 | invalid: leading whitespace is not permitted | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"date\"."} |
| draft7:optional/format/date.json#/groups/0/tests/49 | invalid: trailing whitespace is not permitted | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"date\"."} |
| draft7:optional/format/date.json#/groups/0/tests/50 | invalid: month 00 is not valid per date-month range 01-12 | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"date\"."} |
| draft7:optional/format/date.json#/groups/0/tests/51 | invalid: day 00 is not valid per date-mday minimum of 01 | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"date\"."} |
| draft7:optional/format/date.json#/groups/0/tests/52 | invalid: empty string | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"date\"."} |
| draft7:optional/format/date.json#/groups/0/tests/53 | invalid: embedded whitespace between year and month | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"date\"."} |
| draft7:optional/format/date.json#/groups/0/tests/54 | invalid: trailing character after valid full-date | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"date\"."} |
| draft7:optional/format/date.json#/groups/0/tests/55 | invalid: trailing Z after full-date | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"date\"."} |
| draft7:optional/format/date.json#/groups/0/tests/56 | invalid: full-date followed by space and time component | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"date\"."} |
| draft7:optional/format/date.json#/groups/0/tests/58 | invalid: two-digit year (N-2 digits) | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"date\"."} |
| draft7:optional/format/date.json#/groups/0/tests/59 | invalid: three-digit year (N-1 digits) | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"date\"."} |
| draft7:optional/format/date.json#/groups/0/tests/60 | invalid: five-digit year (N+1 digits) | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"date\"."} |
| draft7:optional/format/date.json#/groups/0/tests/61 | invalid: positive sign prefix on year | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"date\"."} |
| draft7:optional/format/date.json#/groups/0/tests/62 | invalid: negative sign prefix on year | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"date\"."} |
| draft7:optional/format/date.json#/groups/0/tests/63 | invalid: non-ASCII Bengali digit in year field | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"date\"."} |
| draft7:optional/format/date.json#/groups/0/tests/64 | invalid: alphabetic characters in year field | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"date\"."} |
| draft7:optional/format/date.json#/groups/0/tests/65 | invalid: three-digit month (N+1 digits) | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"date\"."} |
| draft7:optional/format/date.json#/groups/0/tests/66 | invalid: alphabetic characters in month field | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"date\"."} |
| draft7:optional/format/date.json#/groups/0/tests/67 | invalid: three-digit day (N+1 digits) | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"date\"."} |
| draft7:optional/format/date.json#/groups/0/tests/68 | invalid: alphabetic characters in day field | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"date\"."} |
| draft7:optional/format/date.json#/groups/0/tests/69 | invalid: colon separators | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"date\"."} |
| draft7:optional/format/date.json#/groups/0/tests/70 | invalid: dot separators | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"date\"."} |
| draft7:optional/format/date.json#/groups/0/tests/71 | invalid: space separators | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"date\"."} |
| draft7:optional/format/date.json#/groups/0/tests/72 | invalid: mixed slash and hyphen separators | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"date\"."} |
| draft7:optional/format/date.json#/groups/0/tests/73 | invalid: duplicated first hyphen | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"date\"."} |
| draft7:optional/format/date.json#/groups/0/tests/74 | invalid: duplicated second hyphen | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"date\"."} |
| draft7:optional/format/email.json#/groups/0/tests/7 | an invalid e-mail address | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"email\"."} |
| draft7:optional/format/email.json#/groups/0/tests/11 | dot before local part is not valid | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"email\"."} |
| draft7:optional/format/email.json#/groups/0/tests/12 | dot after local part is not valid | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"email\"."} |
| draft7:optional/format/email.json#/groups/0/tests/14 | two subsequent dots inside local part are not valid | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"email\"."} |
| draft7:optional/format/email.json#/groups/0/tests/15 | two email addresses is not valid | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"email\"."} |
| draft7:optional/format/email.json#/groups/0/tests/16 | full "From" header is invalid | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"email\"."} |
| draft7:optional/format/email.json#/groups/0/tests/17 | local part is required | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"email\"."} |
| draft7:optional/format/email.json#/groups/0/tests/18 | domain is required | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"email\"."} |
| draft7:optional/format/email.json#/groups/0/tests/19 | unquoted space in local part is invalid | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"email\"."} |
| draft7:optional/format/hostname.json#/groups/0/tests/11 | empty string | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"hostname\"."} |
| draft7:optional/format/hostname.json#/groups/0/tests/12 | single dot | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"hostname\"."} |
| draft7:optional/format/hostname.json#/groups/0/tests/13 | leading dot | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"hostname\"."} |
| draft7:optional/format/hostname.json#/groups/0/tests/15 | IDN label separator | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"hostname\"."} |
| draft7:optional/format/hostname.json#/groups/0/tests/17 | starts with hyphen | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"hostname\"."} |
| draft7:optional/format/hostname.json#/groups/0/tests/18 | ends with hyphen | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"hostname\"."} |
| draft7:optional/format/hostname.json#/groups/0/tests/19 | contains underscore | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"hostname\"."} |
| draft7:optional/format/hostname.json#/groups/0/tests/20 | exceeds maximum overall length (256) | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"hostname\"."} |
| draft7:optional/format/hostname.json#/groups/0/tests/22 | exceeds maximum label length (63) | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"hostname\"."} |
| draft7:optional/format/ipv4.json#/groups/0/tests/7 | an IP address with too many components | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"ipv4\"."} |
| draft7:optional/format/ipv4.json#/groups/0/tests/8 | an IP address with out-of-range values | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"ipv4\"."} |
| draft7:optional/format/ipv4.json#/groups/0/tests/9 | an IP address without 4 components | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"ipv4\"."} |
| draft7:optional/format/ipv4.json#/groups/0/tests/10 | a 2-part address resolving to a routable IP (inet_aton shorthand) | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"ipv4\"."} |
| draft7:optional/format/ipv4.json#/groups/0/tests/11 | a 3-part address resolving to a routable IP (inet_aton shorthand) | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"ipv4\"."} |
| draft7:optional/format/ipv4.json#/groups/0/tests/12 | an IP address as an integer | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"ipv4\"."} |
| draft7:optional/format/ipv4.json#/groups/0/tests/13 | an IP address as an integer (decimal) | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"ipv4\"."} |
| draft7:optional/format/ipv4.json#/groups/0/tests/14 | invalid non-ASCII '২' (a Bengali 2) | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"ipv4\"."} |
| draft7:optional/format/ipv4.json#/groups/0/tests/15 | invalid fullwidth digits (non-ASCII) | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"ipv4\"."} |
| draft7:optional/format/ipv4.json#/groups/0/tests/16 | invalid mathematical bold digits (non-ASCII) | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"ipv4\"."} |
| draft7:optional/format/ipv4.json#/groups/0/tests/17 | netmask is not a part of ipv4 address | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"ipv4\"."} |
| draft7:optional/format/ipv4.json#/groups/0/tests/18 | leading whitespace is invalid | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"ipv4\"."} |
| draft7:optional/format/ipv4.json#/groups/0/tests/19 | trailing whitespace is invalid | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"ipv4\"."} |
| draft7:optional/format/ipv4.json#/groups/0/tests/20 | trailing newline is invalid | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"ipv4\"."} |
| draft7:optional/format/ipv4.json#/groups/0/tests/21 | hexadecimal notation is invalid | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"ipv4\"."} |
| draft7:optional/format/ipv4.json#/groups/0/tests/22 | octal notation explicit is invalid | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"ipv4\"."} |
| draft7:optional/format/ipv4.json#/groups/0/tests/23 | empty part (double dot) is invalid | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"ipv4\"."} |
| draft7:optional/format/ipv4.json#/groups/0/tests/24 | leading dot is invalid | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"ipv4\"."} |
| draft7:optional/format/ipv4.json#/groups/0/tests/25 | trailing dot is invalid | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"ipv4\"."} |
| draft7:optional/format/ipv4.json#/groups/0/tests/28 | empty string is invalid | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"ipv4\"."} |
| draft7:optional/format/ipv4.json#/groups/0/tests/29 | plus sign is invalid | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"ipv4\"."} |
| draft7:optional/format/ipv4.json#/groups/0/tests/30 | negative sign is invalid | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"ipv4\"."} |
| draft7:optional/format/ipv4.json#/groups/0/tests/31 | exponential notation is invalid | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"ipv4\"."} |
| draft7:optional/format/ipv4.json#/groups/0/tests/32 | alpha characters are invalid | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"ipv4\"."} |
| draft7:optional/format/ipv4.json#/groups/0/tests/33 | internal whitespace is invalid | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"ipv4\"."} |
| draft7:optional/format/ipv4.json#/groups/0/tests/34 | tab character is invalid | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"ipv4\"."} |
| draft7:optional/format/ipv4.json#/groups/0/tests/35 | additional content after an embedded NUL byte | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"ipv4\"."} |
| draft7:optional/format/ipv4.json#/groups/0/tests/36 | with port number is invalid | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"ipv4\"."} |
| draft7:optional/format/ipv4.json#/groups/0/tests/37 | single octet out of range in last position | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"ipv4\"."} |
| draft7:optional/format/ipv6.json#/groups/0/tests/7 | a group with 5 hex digits is invalid | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"ipv6\"."} |
| draft7:optional/format/ipv6.json#/groups/0/tests/9 | trailing 5 hex symbols is invalid | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"ipv6\"."} |
| draft7:optional/format/ipv6.json#/groups/0/tests/10 | an IPv6 address with too many components | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"ipv6\"."} |
| draft7:optional/format/ipv6.json#/groups/0/tests/11 | an IPv6 address containing illegal characters | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"ipv6\"."} |
| draft7:optional/format/ipv6.json#/groups/0/tests/15 | missing leading octet is invalid | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"ipv6\"."} |
| draft7:optional/format/ipv6.json#/groups/0/tests/16 | missing trailing octet is invalid | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"ipv6\"."} |
| draft7:optional/format/ipv6.json#/groups/0/tests/17 | missing leading octet with omitted octets later | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"ipv6\"."} |
| draft7:optional/format/ipv6.json#/groups/0/tests/19 | two sets of double colons is invalid | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"ipv6\"."} |
| draft7:optional/format/ipv6.json#/groups/0/tests/22 | mixed format with ipv4 section with octet out of range | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"ipv6\"."} |
| draft7:optional/format/ipv6.json#/groups/0/tests/23 | mixed format with ipv4 section with a hex octet | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"ipv6\"."} |
| draft7:optional/format/ipv6.json#/groups/0/tests/25 | triple colons is invalid | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"ipv6\"."} |
| draft7:optional/format/ipv6.json#/groups/0/tests/27 | insufficient octets without double colons | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"ipv6\"."} |
| draft7:optional/format/ipv6.json#/groups/0/tests/28 | no colons is invalid | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"ipv6\"."} |
| draft7:optional/format/ipv6.json#/groups/0/tests/29 | ipv4 is not ipv6 | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"ipv6\"."} |
| draft7:optional/format/ipv6.json#/groups/0/tests/30 | ipv4 segment must have 4 octets | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"ipv6\"."} |
| draft7:optional/format/ipv6.json#/groups/0/tests/31 | leading whitespace is invalid | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"ipv6\"."} |
| draft7:optional/format/ipv6.json#/groups/0/tests/32 | trailing whitespace is invalid | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"ipv6\"."} |
| draft7:optional/format/ipv6.json#/groups/0/tests/33 | netmask is not a part of ipv6 address | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"ipv6\"."} |
| draft7:optional/format/ipv6.json#/groups/0/tests/34 | zone id is not a part of ipv6 address | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"ipv6\"."} |
| draft7:optional/format/ipv6.json#/groups/0/tests/36 | a long invalid ipv6, below length limit, first | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"ipv6\"."} |
| draft7:optional/format/ipv6.json#/groups/0/tests/37 | a long invalid ipv6, below length limit, second | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"ipv6\"."} |
| draft7:optional/format/ipv6.json#/groups/0/tests/38 | invalid non-ASCII '৪' (a Bengali 4) | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"ipv6\"."} |
| draft7:optional/format/ipv6.json#/groups/0/tests/39 | invalid non-ASCII '৪' (a Bengali 4) in the IPv4 portion | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"ipv6\"."} |
| draft7:optional/format/json-pointer.json#/groups/0/tests/7 | not a valid JSON-pointer (~ not escaped) | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"json-pointer\"."} |
| draft7:optional/format/json-pointer.json#/groups/0/tests/27 | not a valid JSON-pointer (URI Fragment Identifier) #1 | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"json-pointer\"."} |
| draft7:optional/format/json-pointer.json#/groups/0/tests/28 | not a valid JSON-pointer (URI Fragment Identifier) #2 | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"json-pointer\"."} |
| draft7:optional/format/json-pointer.json#/groups/0/tests/29 | not a valid JSON-pointer (URI Fragment Identifier) #3 | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"json-pointer\"."} |
| draft7:optional/format/json-pointer.json#/groups/0/tests/30 | not a valid JSON-pointer (some escaped, but not all) #1 | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"json-pointer\"."} |
| draft7:optional/format/json-pointer.json#/groups/0/tests/31 | not a valid JSON-pointer (some escaped, but not all) #2 | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"json-pointer\"."} |
| draft7:optional/format/json-pointer.json#/groups/0/tests/32 | not a valid JSON-pointer (wrong escape character) #1 | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"json-pointer\"."} |
| draft7:optional/format/json-pointer.json#/groups/0/tests/33 | not a valid JSON-pointer (wrong escape character) #2 | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"json-pointer\"."} |
| draft7:optional/format/json-pointer.json#/groups/0/tests/34 | not a valid JSON-pointer (multiple characters not escaped) | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"json-pointer\"."} |
| draft7:optional/format/json-pointer.json#/groups/0/tests/35 | not a valid JSON-pointer (isn't empty nor starts with /) #1 | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"json-pointer\"."} |
| draft7:optional/format/json-pointer.json#/groups/0/tests/36 | not a valid JSON-pointer (isn't empty nor starts with /) #2 | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"json-pointer\"."} |
| draft7:optional/format/json-pointer.json#/groups/0/tests/37 | not a valid JSON-pointer (isn't empty nor starts with /) #3 | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"json-pointer\"."} |
| draft7:optional/format/regex.json#/groups/0/tests/7 | a regular expression with unclosed parens is invalid | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"regex\"."} |
| draft7:optional/format/relative-json-pointer.json#/groups/0/tests/10 | an invalid RJP that is a valid JSON Pointer | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"relative-json-pointer\"."} |
| draft7:optional/format/relative-json-pointer.json#/groups/0/tests/11 | negative prefix | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"relative-json-pointer\"."} |
| draft7:optional/format/relative-json-pointer.json#/groups/0/tests/12 | explicit positive prefix | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"relative-json-pointer\"."} |
| draft7:optional/format/relative-json-pointer.json#/groups/0/tests/13 | non-ASCII digit in the prefix is not allowed | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"relative-json-pointer\"."} |
| draft7:optional/format/relative-json-pointer.json#/groups/0/tests/14 | ## is not a valid json-pointer | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"relative-json-pointer\"."} |
| draft7:optional/format/relative-json-pointer.json#/groups/0/tests/15 | zero cannot be followed by other digits, plus json-pointer | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"relative-json-pointer\"."} |
| draft7:optional/format/relative-json-pointer.json#/groups/0/tests/16 | zero cannot be followed by other digits, plus octothorpe | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"relative-json-pointer\"."} |
| draft7:optional/format/relative-json-pointer.json#/groups/0/tests/17 | empty string | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"relative-json-pointer\"."} |
| draft7:optional/format/time.json#/groups/0/tests/7 | invalid time string with extra leading zeros | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"time\"."} |
| draft7:optional/format/time.json#/groups/0/tests/8 | invalid time string with no leading zero for single digit | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"time\"."} |
| draft7:optional/format/time.json#/groups/0/tests/9 | hour, minute, second must be two digits | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"time\"."} |
| draft7:optional/format/time.json#/groups/0/tests/11 | invalid leap second, Zulu (wrong hour) | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"time\"."} |
| draft7:optional/format/time.json#/groups/0/tests/12 | invalid leap second, Zulu (wrong minute) | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"time\"."} |
| draft7:optional/format/time.json#/groups/0/tests/14 | invalid leap second, zero time-offset (wrong hour) | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"time\"."} |
| draft7:optional/format/time.json#/groups/0/tests/15 | invalid leap second, zero time-offset (wrong minute) | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"time\"."} |
| draft7:optional/format/time.json#/groups/0/tests/16 | valid leap second, positive time-offset | WRONG | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"time\"."} |
| draft7:optional/format/time.json#/groups/0/tests/17 | valid leap second, large positive time-offset | WRONG | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"time\"."} |
| draft7:optional/format/time.json#/groups/0/tests/20 | valid leap second, negative time-offset | WRONG | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"time\"."} |
| draft7:optional/format/time.json#/groups/0/tests/21 | valid leap second, large negative time-offset | WRONG | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"time\"."} |
| draft7:optional/format/time.json#/groups/0/tests/29 | hour, minute in time-offset must be two digits | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"time\"."} |
| draft7:optional/format/time.json#/groups/0/tests/31 | an invalid time string with invalid hour | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"time\"."} |
| draft7:optional/format/time.json#/groups/0/tests/32 | an invalid time string with invalid minute | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"time\"."} |
| draft7:optional/format/time.json#/groups/0/tests/33 | an invalid time string with invalid second | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"time\"."} |
| draft7:optional/format/time.json#/groups/0/tests/34 | an invalid time string with invalid leap second (wrong hour) | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"time\"."} |
| draft7:optional/format/time.json#/groups/0/tests/35 | an invalid time string with invalid leap second (wrong minute) | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"time\"."} |
| draft7:optional/format/time.json#/groups/0/tests/38 | an invalid time string with invalid time with both Z and numoffset | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"time\"."} |
| draft7:optional/format/time.json#/groups/0/tests/39 | an invalid offset indicator | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"time\"."} |
| draft7:optional/format/time.json#/groups/0/tests/40 | only RFC3339 not all of ISO 8601 are valid | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"time\"."} |
| draft7:optional/format/time.json#/groups/0/tests/43 | invalid non-ASCII '২' (a Bengali 2) | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"time\"."} |
| draft7:optional/format/time.json#/groups/0/tests/44 | offset not starting with plus or minus | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"time\"."} |
| draft7:optional/format/time.json#/groups/0/tests/45 | contains letters | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"time\"."} |
| draft7:optional/format/time.json#/groups/0/tests/46 | an invalid time string in date-time format | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"time\"."} |
| draft7:optional/format/uri-reference.json#/groups/0/tests/9 | an invalid URI Reference | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"uri-reference\"."} |
| draft7:optional/format/uri-reference.json#/groups/0/tests/12 | an invalid URI fragment | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"uri-reference\"."} |
| draft7:optional/format/uri-reference.json#/groups/0/tests/13 | unescaped non US-ASCII characters | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"uri-reference\"."} |
| draft7:optional/format/uri-reference.json#/groups/0/tests/14 | invalid backslash character | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"uri-reference\"."} |
| draft7:optional/format/uri-template.json#/groups/0/tests/7 | an invalid uri-template | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"uri-template\"."} |
| draft7:optional/format/uri.json#/groups/0/tests/19 | an invalid protocol-relative URI Reference | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"uri\"."} |
| draft7:optional/format/uri.json#/groups/0/tests/20 | an invalid relative URI Reference | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"uri\"."} |
| draft7:optional/format/uri.json#/groups/0/tests/21 | an invalid URI | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"uri\"."} |
| draft7:optional/format/uri.json#/groups/0/tests/22 | an invalid URI though valid URI reference | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"uri\"."} |
| draft7:optional/format/uri.json#/groups/0/tests/23 | an invalid URI with spaces | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"uri\"."} |
| draft7:optional/format/uri.json#/groups/0/tests/24 | an invalid URI with spaces and missing scheme | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"uri\"."} |
| draft7:optional/format/uri.json#/groups/0/tests/25 | an invalid URI with comma in scheme | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"uri\"."} |
| draft7:optional/format/uri.json#/groups/0/tests/26 | invalid userinfo | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"uri\"."} |
| draft7:optional/format/uri.json#/groups/0/tests/27 | unescaped non US-ASCII characters | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"uri\"."} |
| draft7:optional/format/uri.json#/groups/0/tests/28 | invalid backslash character | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"uri\"."} |
| draft7:optional/format/uri.json#/groups/0/tests/29 | invalid " character | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"uri\"."} |
| draft7:optional/format/uri.json#/groups/0/tests/30 | invalid <> characters | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"uri\"."} |
| draft7:optional/format/uri.json#/groups/0/tests/31 | invalid {} characters | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"uri\"."} |
| draft7:optional/format/uri.json#/groups/0/tests/32 | invalid ^ character | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"uri\"."} |
| draft7:optional/format/uri.json#/groups/0/tests/33 | invalid ` character | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"uri\"."} |
| draft7:optional/format/uri.json#/groups/0/tests/34 | invalid SPACE character | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"uri\"."} |
| draft7:optional/format/uri.json#/groups/0/tests/35 | invalid \| character | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"uri\"."} |
| draft7:optional/format/uri.json#/groups/0/tests/38 | invalid percent-encoding with non-hex digits | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"uri\"."} |
| draft7:optional/format/uri.json#/groups/0/tests/39 | incomplete percent-encoding triplet | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"uri\"."} |
| draft7:optional/format/uri.json#/groups/0/tests/40 | lone percent sign is invalid | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"uri\"."} |
| draft7:optional/format/uri.json#/groups/0/tests/41 | scheme must start with a letter | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"uri\"."} |
| draft7:optional/format/uri.json#/groups/0/tests/42 | invalid character in scheme | PASS | {"instanceLocation":"#","keyword":"format","keywordLocation":"#/format","error":"String does not match format \"uri\"."} |
| draft7:optional/id.json#/groups/0/tests/2 | no match on enum or $ref to id | PASS | {"instanceLocation":"#","keyword":"anyOf","keywordLocation":"#/anyOf","error":"Instance does not match any subschemas."} |
| draft7:optional/id.json#/groups/1/tests/1 | const at const_not_anchor does not match | PASS | {"instanceLocation":"#","keyword":"if","keywordLocation":"#/if","error":"Instance does not match \"else\" schema."} |
| draft7:optional/id.json#/groups/2/tests/1 | const at const_not_id does not match | PASS | {"instanceLocation":"#","keyword":"if","keywordLocation":"#/if","error":"Instance does not match \"else\" schema."} |
| draft7:optional/non-bmp-regex.json#/groups/0/tests/3 | doesn't match one | PASS | {"instanceLocation":"#","keyword":"pattern","keywordLocation":"#/pattern","error":"String does not match pattern."} |
| draft7:optional/non-bmp-regex.json#/groups/0/tests/4 | doesn't match two | PASS | {"instanceLocation":"#","keyword":"pattern","keywordLocation":"#/pattern","error":"String does not match pattern."} |
| draft7:optional/non-bmp-regex.json#/groups/0/tests/5 | doesn't match one ASCII | PASS | {"instanceLocation":"#","keyword":"pattern","keywordLocation":"#/pattern","error":"String does not match pattern."} |
| draft7:optional/non-bmp-regex.json#/groups/0/tests/6 | doesn't match two ASCII | PASS | {"instanceLocation":"#","keyword":"pattern","keywordLocation":"#/pattern","error":"String does not match pattern."} |
| draft7:optional/non-bmp-regex.json#/groups/1/tests/3 | doesn't match one | PASS | {"instanceLocation":"#","keyword":"patternProperties","keywordLocation":"#/patternProperties","error":"Property \"🐲\" matches pattern \"^🐲*$\" but does not match associated schema."} |
| draft7:optional/non-bmp-regex.json#/groups/1/tests/4 | doesn't match two | PASS | {"instanceLocation":"#","keyword":"patternProperties","keywordLocation":"#/patternProperties","error":"Property \"🐲🐲\" matches pattern \"^🐲*$\" but does not match associated schema."} |
| draft7:optional/unknownKeyword.json#/groups/0/tests/0 | type matches second anyOf, which has a real schema in it | COMPILE | FAST_SETUP_ERROR: Duplicate schema URI "https://localhost:1234/unknownKeyword/my_identifier.json". |
| draft7:optional/unknownKeyword.json#/groups/0/tests/1 | type matches non-schema in first anyOf | COMPILE | FAST_SETUP_ERROR: Duplicate schema URI "https://localhost:1234/unknownKeyword/my_identifier.json". |
| draft7:optional/unknownKeyword.json#/groups/0/tests/2 | type matches non-schema in third anyOf | COMPILE | FAST_SETUP_ERROR: Duplicate schema URI "https://localhost:1234/unknownKeyword/my_identifier.json". |
| draft7:pattern.json#/groups/0/tests/1 | a non-matching pattern is invalid | PASS | {"instanceLocation":"#","keyword":"pattern","keywordLocation":"#/pattern","error":"String does not match pattern."} |
| draft7:patternProperties.json#/groups/0/tests/2 | a single invalid match is invalid | PASS | {"instanceLocation":"#","keyword":"patternProperties","keywordLocation":"#/patternProperties","error":"Property \"foo\" matches pattern \"f.*o\" but does not match associated schema."} |
| draft7:patternProperties.json#/groups/0/tests/3 | multiple invalid matches is invalid | PASS | {"instanceLocation":"#","keyword":"patternProperties","keywordLocation":"#/patternProperties","error":"Property \"foo\" matches pattern \"f.*o\" but does not match associated schema."} |
| draft7:patternProperties.json#/groups/1/tests/3 | an invalid due to one is invalid | PASS | {"instanceLocation":"#","keyword":"patternProperties","keywordLocation":"#/patternProperties","error":"Property \"a\" matches pattern \"a*\" but does not match associated schema."} |
| draft7:patternProperties.json#/groups/1/tests/4 | an invalid due to the other is invalid | PASS | {"instanceLocation":"#","keyword":"patternProperties","keywordLocation":"#/patternProperties","error":"Property \"aaaa\" matches pattern \"aaa*\" but does not match associated schema."} |
| draft7:patternProperties.json#/groups/1/tests/5 | an invalid due to both is invalid | PASS | {"instanceLocation":"#","keyword":"patternProperties","keywordLocation":"#/patternProperties","error":"Property \"aaa\" matches pattern \"a*\" but does not match associated schema."} |
| draft7:patternProperties.json#/groups/2/tests/1 | recognized members are accounted for | PASS | {"instanceLocation":"#","keyword":"patternProperties","keywordLocation":"#/patternProperties","error":"Property \"a31b\" matches pattern \"[0-9]{2,}\" but does not match associated schema."} |
| draft7:patternProperties.json#/groups/2/tests/3 | regexes are case sensitive, 2 | PASS | {"instanceLocation":"#","keyword":"patternProperties","keywordLocation":"#/patternProperties","error":"Property \"a_X_3\" matches pattern \"X_\" but does not match associated schema."} |
| draft7:patternProperties.json#/groups/3/tests/1 | object with property matching schema false is invalid | PASS | {"instanceLocation":"#","keyword":"patternProperties","keywordLocation":"#/patternProperties","error":"Property \"bar\" matches pattern \"b.*\" but does not match associated schema."} |
| draft7:patternProperties.json#/groups/3/tests/2 | object with both properties is invalid | PASS | {"instanceLocation":"#","keyword":"patternProperties","keywordLocation":"#/patternProperties","error":"Property \"bar\" matches pattern \"b.*\" but does not match associated schema."} |
| draft7:patternProperties.json#/groups/3/tests/3 | object with a property matching both true and false is invalid | PASS | {"instanceLocation":"#","keyword":"patternProperties","keywordLocation":"#/patternProperties","error":"Property \"foobar\" matches pattern \"b.*\" but does not match associated schema."} |
| draft7:properties.json#/groups/0/tests/1 | one property invalid is invalid | PASS | {"instanceLocation":"#","keyword":"properties","keywordLocation":"#/properties","error":"Property \"bar\" does not match schema."} |
| draft7:properties.json#/groups/0/tests/2 | both properties invalid is invalid | PASS | {"instanceLocation":"#","keyword":"properties","keywordLocation":"#/properties","error":"Property \"foo\" does not match schema."} |
| draft7:properties.json#/groups/1/tests/1 | property invalidates property | PASS | {"instanceLocation":"#","keyword":"properties","keywordLocation":"#/properties","error":"Property \"foo\" does not match schema."} |
| draft7:properties.json#/groups/1/tests/2 | patternProperty invalidates property | PASS | {"instanceLocation":"#","keyword":"patternProperties","keywordLocation":"#/patternProperties","error":"Property \"foo\" matches pattern \"f.o\" but does not match associated schema."} |
| draft7:properties.json#/groups/1/tests/4 | patternProperty invalidates nonproperty | PASS | {"instanceLocation":"#","keyword":"patternProperties","keywordLocation":"#/patternProperties","error":"Property \"fxo\" matches pattern \"f.o\" but does not match associated schema."} |
| draft7:properties.json#/groups/1/tests/7 | additionalProperty invalidates others | PASS | {"instanceLocation":"#","keyword":"additionalProperties","keywordLocation":"#/additionalProperties","error":"Property \"quux\" does not match additional properties schema."} |
| draft7:properties.json#/groups/2/tests/2 | only 'false' property present is invalid | PASS | {"instanceLocation":"#","keyword":"properties","keywordLocation":"#/properties","error":"Property \"bar\" does not match schema."} |
| draft7:properties.json#/groups/2/tests/3 | both properties present is invalid | PASS | {"instanceLocation":"#","keyword":"properties","keywordLocation":"#/properties","error":"Property \"bar\" does not match schema."} |
| draft7:properties.json#/groups/3/tests/1 | object with strings is invalid | PASS | {"instanceLocation":"#","keyword":"properties","keywordLocation":"#/properties","error":"Property \"foo\nbar\" does not match schema."} |
| draft7:properties.json#/groups/5/tests/2 | none of the properties mentioned | WRONG | {"instanceLocation":"#","keyword":"properties","keywordLocation":"#/properties","error":"Property \"__proto__\" does not match schema."} |
| draft7:properties.json#/groups/5/tests/3 | __proto__ not valid | PASS | {"instanceLocation":"#","keyword":"properties","keywordLocation":"#/properties","error":"Property \"__proto__\" does not match schema."} |
| draft7:properties.json#/groups/5/tests/4 | toString not valid | PASS | {"instanceLocation":"#","keyword":"properties","keywordLocation":"#/properties","error":"Property \"__proto__\" does not match schema."} |
| draft7:properties.json#/groups/5/tests/5 | constructor not valid | PASS | {"instanceLocation":"#","keyword":"properties","keywordLocation":"#/properties","error":"Property \"__proto__\" does not match schema."} |
| draft7:propertyNames.json#/groups/0/tests/1 | some property names invalid | PASS | {"instanceLocation":"#","keyword":"propertyNames","keywordLocation":"#/propertyNames","error":"Property name \"foobar\" does not match schema."} |
| draft7:propertyNames.json#/groups/1/tests/1 | non-matching property name is invalid | PASS | {"instanceLocation":"#","keyword":"propertyNames","keywordLocation":"#/propertyNames","error":"Property name \"aaA\" does not match schema."} |
| draft7:propertyNames.json#/groups/3/tests/0 | object with any properties is invalid | PASS | {"instanceLocation":"#","keyword":"propertyNames","keywordLocation":"#/propertyNames","error":"Property name \"foo\" does not match schema."} |
| draft7:propertyNames.json#/groups/4/tests/1 | object with any other property is invalid | PASS | {"instanceLocation":"#","keyword":"propertyNames","keywordLocation":"#/propertyNames","error":"Property name \"bar\" does not match schema."} |
| draft7:propertyNames.json#/groups/5/tests/2 | object with any other property is invalid | PASS | {"instanceLocation":"#","keyword":"propertyNames","keywordLocation":"#/propertyNames","error":"Property name \"baz\" does not match schema."} |
| draft7:ref.json#/groups/0/tests/2 | mismatch | PASS | {"instanceLocation":"#","keyword":"additionalProperties","keywordLocation":"#/additionalProperties","error":"Property \"bar\" does not match additional properties schema."} |
| draft7:ref.json#/groups/0/tests/3 | recursive mismatch | PASS | {"instanceLocation":"#","keyword":"properties","keywordLocation":"#/properties","error":"Property \"foo\" does not match schema."} |
| draft7:ref.json#/groups/1/tests/1 | mismatch | PASS | {"instanceLocation":"#","keyword":"properties","keywordLocation":"#/properties","error":"Property \"bar\" does not match schema."} |
| draft7:ref.json#/groups/2/tests/1 | mismatch array | PASS | {"instanceLocation":"#","keyword":"items","keywordLocation":"#/items","error":"Items did not match schema."} |
| draft7:ref.json#/groups/3/tests/0 | slash invalid | PASS | {"instanceLocation":"#","keyword":"properties","keywordLocation":"#/properties","error":"Property \"slash\" does not match schema."} |
| draft7:ref.json#/groups/3/tests/1 | tilde invalid | PASS | {"instanceLocation":"#","keyword":"properties","keywordLocation":"#/properties","error":"Property \"tilde\" does not match schema."} |
| draft7:ref.json#/groups/3/tests/2 | percent invalid | PASS | {"instanceLocation":"#","keyword":"properties","keywordLocation":"#/properties","error":"Property \"percent\" does not match schema."} |
| draft7:ref.json#/groups/4/tests/1 | nested ref invalid | PASS | {"instanceLocation":"#","keyword":"allOf","keywordLocation":"#/allOf","error":"Instance does not match every subschema."} |
| draft7:ref.json#/groups/5/tests/2 | ref invalid | PASS | {"instanceLocation":"#","keyword":"properties","keywordLocation":"#/properties","error":"Property \"foo\" does not match schema."} |
| draft7:ref.json#/groups/6/tests/1 | $ref resolves to /definitions/base_foo, data validates | WRONG | {"instanceLocation":"#","keyword":"allOf","keywordLocation":"#/allOf","error":"Instance does not match every subschema."} |
| draft7:ref.json#/groups/7/tests/0 | remote ref valid | RUNTIME | FAST_RUNTIME_ERROR: Unresolved $ref "http://json-schema.org/draft-07/schema#".  Absolute URI "http://json-schema.org/draft-07/schema". Known schemas: - https://github.com/cfworker |
| draft7:ref.json#/groups/7/tests/1 | remote ref invalid | RUNTIME | FAST_RUNTIME_ERROR: Unresolved $ref "http://json-schema.org/draft-07/schema#".  Absolute URI "http://json-schema.org/draft-07/schema". Known schemas: - https://github.com/cfworker |
| draft7:ref.json#/groups/8/tests/1 | property named $ref invalid | PASS | {"instanceLocation":"#","keyword":"properties","keywordLocation":"#/properties","error":"Property \"$ref\" does not match schema."} |
| draft7:ref.json#/groups/9/tests/1 | property named $ref invalid | PASS | {"instanceLocation":"#","keyword":"properties","keywordLocation":"#/properties","error":"Property \"$ref\" does not match schema."} |
| draft7:ref.json#/groups/11/tests/0 | any value is invalid | PASS | {"instanceLocation":"#","keyword":"allOf","keywordLocation":"#/allOf","error":"Instance does not match every subschema."} |
| draft7:ref.json#/groups/12/tests/1 | invalid tree | PASS | {"instanceLocation":"#","keyword":"properties","keywordLocation":"#/properties","error":"Property \"nodes\" does not match schema."} |
| draft7:ref.json#/groups/13/tests/1 | object with strings is invalid | PASS | {"instanceLocation":"#","keyword":"properties","keywordLocation":"#/properties","error":"Property \"foo\"bar\" does not match schema."} |
| draft7:ref.json#/groups/14/tests/1 | mismatch | PASS | {"instanceLocation":"#","keyword":"allOf","keywordLocation":"#/allOf","error":"Instance does not match every subschema."} |
| draft7:ref.json#/groups/15/tests/1 | mismatch | PASS | {"instanceLocation":"#","keyword":"allOf","keywordLocation":"#/allOf","error":"Instance does not match every subschema."} |
| draft7:ref.json#/groups/16/tests/1 | mismatch | PASS | {"instanceLocation":"#","keyword":"allOf","keywordLocation":"#/allOf","error":"Instance does not match every subschema."} |
| draft7:ref.json#/groups/17/tests/0 | do not evaluate the $ref inside the enum, matching any string | PASS | {"instanceLocation":"#","keyword":"enum","keywordLocation":"#/enum","error":"Instance does not match any of [{\"$ref\":\"#/definitions/a_string\"}]."} |
| draft7:ref.json#/groups/17/tests/1 | do not evaluate the $ref inside the enum, definition exact match | PASS | {"instanceLocation":"#","keyword":"enum","keywordLocation":"#/enum","error":"Instance does not match any of [{\"$ref\":\"#/definitions/a_string\"}]."} |
| draft7:ref.json#/groups/18/tests/0 | invalid on inner field | PASS | {"instanceLocation":"#","keyword":"properties","keywordLocation":"#/properties","error":"Property \"foo\" does not match schema."} |
| draft7:ref.json#/groups/18/tests/1 | invalid on outer field | PASS | {"instanceLocation":"#","keyword":"allOf","keywordLocation":"#/allOf","error":"Instance does not match every subschema."} |
| draft7:ref.json#/groups/19/tests/0 | invalid on inner field | PASS | {"instanceLocation":"#","keyword":"properties","keywordLocation":"#/properties","error":"Property \"foo\" does not match schema."} |
| draft7:ref.json#/groups/19/tests/1 | invalid on outer field | PASS | {"instanceLocation":"#","keyword":"allOf","keywordLocation":"#/allOf","error":"Instance does not match every subschema."} |
| draft7:ref.json#/groups/20/tests/1 | non-number is invalid | PASS | {"instanceLocation":"#","keyword":"allOf","keywordLocation":"#/allOf","error":"Instance does not match every subschema."} |
| draft7:ref.json#/groups/21/tests/1 | invalid under the URN IDed schema | PASS | {"instanceLocation":"#","keyword":"properties","keywordLocation":"#/properties","error":"Property \"foo\" does not match schema."} |
| draft7:ref.json#/groups/22/tests/1 | a non-string is invalid | PASS | {"instanceLocation":"#","keyword":"properties","keywordLocation":"#/properties","error":"Property \"foo\" does not match schema."} |
| draft7:ref.json#/groups/23/tests/1 | a non-string is invalid | PASS | {"instanceLocation":"#","keyword":"properties","keywordLocation":"#/properties","error":"Property \"foo\" does not match schema."} |
| draft7:ref.json#/groups/24/tests/1 | a non-string is invalid | PASS | {"instanceLocation":"#","keyword":"properties","keywordLocation":"#/properties","error":"Property \"foo\" does not match schema."} |
| draft7:ref.json#/groups/25/tests/1 | a non-string is invalid | PASS | {"instanceLocation":"#","keyword":"properties","keywordLocation":"#/properties","error":"Property \"foo\" does not match schema."} |
| draft7:ref.json#/groups/26/tests/1 | a non-string is invalid | PASS | {"instanceLocation":"#","keyword":"properties","keywordLocation":"#/properties","error":"Property \"foo\" does not match schema."} |
| draft7:ref.json#/groups/27/tests/1 | a non-string is invalid | PASS | {"instanceLocation":"#","keyword":"properties","keywordLocation":"#/properties","error":"Property \"foo\" does not match schema."} |
| draft7:ref.json#/groups/28/tests/0 | a non-integer is invalid due to the $ref | PASS | {"instanceLocation":"#","keyword":"allOf","keywordLocation":"#/allOf","error":"Instance does not match every subschema."} |
| draft7:ref.json#/groups/29/tests/0 | a non-integer is invalid due to the $ref | PASS | {"instanceLocation":"#","keyword":"allOf","keywordLocation":"#/allOf","error":"Instance does not match every subschema."} |
| draft7:ref.json#/groups/30/tests/0 | a non-integer is invalid due to the $ref | PASS | {"instanceLocation":"#","keyword":"allOf","keywordLocation":"#/allOf","error":"Instance does not match every subschema."} |
| draft7:ref.json#/groups/31/tests/1 | an integer is invalid | PASS | {"instanceLocation":"#","keyword":"allOf","keywordLocation":"#/allOf","error":"Instance does not match every subschema."} |
| draft7:ref.json#/groups/32/tests/1 | non-number is invalid | PASS | {"instanceLocation":"#","keyword":"allOf","keywordLocation":"#/allOf","error":"Instance does not match every subschema."} |
| draft7:ref.json#/groups/33/tests/1 | non-number is invalid | PASS | {"instanceLocation":"#","keyword":"allOf","keywordLocation":"#/allOf","error":"Instance does not match every subschema."} |
| draft7:ref.json#/groups/34/tests/1 | non-number is invalid | PASS | {"instanceLocation":"#","keyword":"allOf","keywordLocation":"#/allOf","error":"Instance does not match every subschema."} |
| draft7:refRemote.json#/groups/0/tests/1 | remote ref invalid | PASS | {"instanceLocation":"#","keyword":"$ref","keywordLocation":"#/$ref","error":"A subschema had errors."} |
| draft7:refRemote.json#/groups/1/tests/1 | remote fragment invalid | PASS | {"instanceLocation":"#","keyword":"$ref","keywordLocation":"#/$ref","error":"A subschema had errors."} |
| draft7:refRemote.json#/groups/2/tests/1 | ref within ref invalid | PASS | {"instanceLocation":"#","keyword":"$ref","keywordLocation":"#/$ref","error":"A subschema had errors."} |
| draft7:refRemote.json#/groups/3/tests/1 | base URI change ref invalid | PASS | {"instanceLocation":"#","keyword":"items","keywordLocation":"#/items","error":"Items did not match schema."} |
| draft7:refRemote.json#/groups/4/tests/1 | string is invalid | PASS | {"instanceLocation":"#","keyword":"properties","keywordLocation":"#/properties","error":"Property \"list\" does not match schema."} |
| draft7:refRemote.json#/groups/5/tests/1 | string is invalid | PASS | {"instanceLocation":"#","keyword":"properties","keywordLocation":"#/properties","error":"Property \"list\" does not match schema."} |
| draft7:refRemote.json#/groups/6/tests/2 | object is invalid | PASS | {"instanceLocation":"#","keyword":"properties","keywordLocation":"#/properties","error":"Property \"name\" does not match schema."} |
| draft7:refRemote.json#/groups/7/tests/0 | invalid | PASS | {"instanceLocation":"#","keyword":"allOf","keywordLocation":"#/allOf","error":"Instance does not match every subschema."} |
| draft7:refRemote.json#/groups/8/tests/1 | string is invalid | PASS | {"instanceLocation":"#","keyword":"$ref","keywordLocation":"#/$ref","error":"A subschema had errors."} |
| draft7:refRemote.json#/groups/9/tests/0 | number is invalid | PASS | {"instanceLocation":"#","keyword":"properties","keywordLocation":"#/properties","error":"Property \"name\" does not match schema."} |
| draft7:refRemote.json#/groups/10/tests/1 | non-number is invalid | PASS | {"instanceLocation":"#","keyword":"$ref","keywordLocation":"#/$ref","error":"A subschema had errors."} |
| draft7:required.json#/groups/0/tests/1 | non-present required property is invalid | PASS | {"instanceLocation":"#","keyword":"required","keywordLocation":"#/required","error":"Instance does not have required property \"foo\"."} |
| draft7:required.json#/groups/3/tests/1 | object with some properties missing is invalid | PASS | {"instanceLocation":"#","keyword":"required","keywordLocation":"#/required","error":"Instance does not have required property \"foo\\bar\"."} |
| draft7:type.json#/groups/0/tests/2 | a float is not an integer | PASS | {"instanceLocation":"#","keyword":"type","keywordLocation":"#/type","error":"Instance type \"number\" is invalid. Expected \"integer\"."} |
| draft7:type.json#/groups/0/tests/3 | a string is not an integer | PASS | {"instanceLocation":"#","keyword":"type","keywordLocation":"#/type","error":"Instance type \"string\" is invalid. Expected \"integer\"."} |
| draft7:type.json#/groups/0/tests/4 | a string is still not an integer, even if it looks like one | PASS | {"instanceLocation":"#","keyword":"type","keywordLocation":"#/type","error":"Instance type \"string\" is invalid. Expected \"integer\"."} |
| draft7:type.json#/groups/0/tests/5 | an object is not an integer | PASS | {"instanceLocation":"#","keyword":"type","keywordLocation":"#/type","error":"Instance type \"object\" is invalid. Expected \"integer\"."} |
| draft7:type.json#/groups/0/tests/6 | an array is not an integer | PASS | {"instanceLocation":"#","keyword":"type","keywordLocation":"#/type","error":"Instance type \"array\" is invalid. Expected \"integer\"."} |
| draft7:type.json#/groups/0/tests/7 | a boolean is not an integer | PASS | {"instanceLocation":"#","keyword":"type","keywordLocation":"#/type","error":"Instance type \"boolean\" is invalid. Expected \"integer\"."} |
| draft7:type.json#/groups/0/tests/8 | null is not an integer | PASS | {"instanceLocation":"#","keyword":"type","keywordLocation":"#/type","error":"Instance type \"null\" is invalid. Expected \"integer\"."} |
| draft7:type.json#/groups/1/tests/3 | a string is not a number | PASS | {"instanceLocation":"#","keyword":"type","keywordLocation":"#/type","error":"Instance type \"string\" is invalid. Expected \"number\"."} |
| draft7:type.json#/groups/1/tests/4 | a string is still not a number, even if it looks like one | PASS | {"instanceLocation":"#","keyword":"type","keywordLocation":"#/type","error":"Instance type \"string\" is invalid. Expected \"number\"."} |
| draft7:type.json#/groups/1/tests/5 | an object is not a number | PASS | {"instanceLocation":"#","keyword":"type","keywordLocation":"#/type","error":"Instance type \"object\" is invalid. Expected \"number\"."} |
| draft7:type.json#/groups/1/tests/6 | an array is not a number | PASS | {"instanceLocation":"#","keyword":"type","keywordLocation":"#/type","error":"Instance type \"array\" is invalid. Expected \"number\"."} |
| draft7:type.json#/groups/1/tests/7 | a boolean is not a number | PASS | {"instanceLocation":"#","keyword":"type","keywordLocation":"#/type","error":"Instance type \"boolean\" is invalid. Expected \"number\"."} |
| draft7:type.json#/groups/1/tests/8 | null is not a number | PASS | {"instanceLocation":"#","keyword":"type","keywordLocation":"#/type","error":"Instance type \"null\" is invalid. Expected \"number\"."} |
| draft7:type.json#/groups/2/tests/0 | 1 is not a string | PASS | {"instanceLocation":"#","keyword":"type","keywordLocation":"#/type","error":"Instance type \"number\" is invalid. Expected \"string\"."} |
| draft7:type.json#/groups/2/tests/1 | a float is not a string | PASS | {"instanceLocation":"#","keyword":"type","keywordLocation":"#/type","error":"Instance type \"number\" is invalid. Expected \"string\"."} |
| draft7:type.json#/groups/2/tests/5 | an object is not a string | PASS | {"instanceLocation":"#","keyword":"type","keywordLocation":"#/type","error":"Instance type \"object\" is invalid. Expected \"string\"."} |
| draft7:type.json#/groups/2/tests/6 | an array is not a string | PASS | {"instanceLocation":"#","keyword":"type","keywordLocation":"#/type","error":"Instance type \"array\" is invalid. Expected \"string\"."} |
| draft7:type.json#/groups/2/tests/7 | a boolean is not a string | PASS | {"instanceLocation":"#","keyword":"type","keywordLocation":"#/type","error":"Instance type \"boolean\" is invalid. Expected \"string\"."} |
| draft7:type.json#/groups/2/tests/8 | null is not a string | PASS | {"instanceLocation":"#","keyword":"type","keywordLocation":"#/type","error":"Instance type \"null\" is invalid. Expected \"string\"."} |
| draft7:type.json#/groups/3/tests/0 | an integer is not an object | PASS | {"instanceLocation":"#","keyword":"type","keywordLocation":"#/type","error":"Instance type \"number\" is invalid. Expected \"object\"."} |
| draft7:type.json#/groups/3/tests/1 | a float is not an object | PASS | {"instanceLocation":"#","keyword":"type","keywordLocation":"#/type","error":"Instance type \"number\" is invalid. Expected \"object\"."} |
| draft7:type.json#/groups/3/tests/2 | a string is not an object | PASS | {"instanceLocation":"#","keyword":"type","keywordLocation":"#/type","error":"Instance type \"string\" is invalid. Expected \"object\"."} |
| draft7:type.json#/groups/3/tests/4 | an array is not an object | PASS | {"instanceLocation":"#","keyword":"type","keywordLocation":"#/type","error":"Instance type \"array\" is invalid. Expected \"object\"."} |
| draft7:type.json#/groups/3/tests/5 | a boolean is not an object | PASS | {"instanceLocation":"#","keyword":"type","keywordLocation":"#/type","error":"Instance type \"boolean\" is invalid. Expected \"object\"."} |
| draft7:type.json#/groups/3/tests/6 | null is not an object | PASS | {"instanceLocation":"#","keyword":"type","keywordLocation":"#/type","error":"Instance type \"null\" is invalid. Expected \"object\"."} |
| draft7:type.json#/groups/4/tests/0 | an integer is not an array | PASS | {"instanceLocation":"#","keyword":"type","keywordLocation":"#/type","error":"Instance type \"number\" is invalid. Expected \"array\"."} |
| draft7:type.json#/groups/4/tests/1 | a float is not an array | PASS | {"instanceLocation":"#","keyword":"type","keywordLocation":"#/type","error":"Instance type \"number\" is invalid. Expected \"array\"."} |
| draft7:type.json#/groups/4/tests/2 | a string is not an array | PASS | {"instanceLocation":"#","keyword":"type","keywordLocation":"#/type","error":"Instance type \"string\" is invalid. Expected \"array\"."} |
| draft7:type.json#/groups/4/tests/3 | an object is not an array | PASS | {"instanceLocation":"#","keyword":"type","keywordLocation":"#/type","error":"Instance type \"object\" is invalid. Expected \"array\"."} |
| draft7:type.json#/groups/4/tests/5 | a boolean is not an array | PASS | {"instanceLocation":"#","keyword":"type","keywordLocation":"#/type","error":"Instance type \"boolean\" is invalid. Expected \"array\"."} |
| draft7:type.json#/groups/4/tests/6 | null is not an array | PASS | {"instanceLocation":"#","keyword":"type","keywordLocation":"#/type","error":"Instance type \"null\" is invalid. Expected \"array\"."} |
| draft7:type.json#/groups/5/tests/0 | an integer is not a boolean | PASS | {"instanceLocation":"#","keyword":"type","keywordLocation":"#/type","error":"Instance type \"number\" is invalid. Expected \"boolean\"."} |
| draft7:type.json#/groups/5/tests/1 | zero is not a boolean | PASS | {"instanceLocation":"#","keyword":"type","keywordLocation":"#/type","error":"Instance type \"number\" is invalid. Expected \"boolean\"."} |
| draft7:type.json#/groups/5/tests/2 | a float is not a boolean | PASS | {"instanceLocation":"#","keyword":"type","keywordLocation":"#/type","error":"Instance type \"number\" is invalid. Expected \"boolean\"."} |
| draft7:type.json#/groups/5/tests/3 | a string is not a boolean | PASS | {"instanceLocation":"#","keyword":"type","keywordLocation":"#/type","error":"Instance type \"string\" is invalid. Expected \"boolean\"."} |
| draft7:type.json#/groups/5/tests/4 | an empty string is not a boolean | PASS | {"instanceLocation":"#","keyword":"type","keywordLocation":"#/type","error":"Instance type \"string\" is invalid. Expected \"boolean\"."} |
| draft7:type.json#/groups/5/tests/5 | an object is not a boolean | PASS | {"instanceLocation":"#","keyword":"type","keywordLocation":"#/type","error":"Instance type \"object\" is invalid. Expected \"boolean\"."} |
| draft7:type.json#/groups/5/tests/6 | an array is not a boolean | PASS | {"instanceLocation":"#","keyword":"type","keywordLocation":"#/type","error":"Instance type \"array\" is invalid. Expected \"boolean\"."} |
| draft7:type.json#/groups/5/tests/9 | null is not a boolean | PASS | {"instanceLocation":"#","keyword":"type","keywordLocation":"#/type","error":"Instance type \"null\" is invalid. Expected \"boolean\"."} |
| draft7:type.json#/groups/6/tests/0 | an integer is not null | PASS | {"instanceLocation":"#","keyword":"type","keywordLocation":"#/type","error":"Instance type \"number\" is invalid. Expected \"null\"."} |
| draft7:type.json#/groups/6/tests/1 | a float is not null | PASS | {"instanceLocation":"#","keyword":"type","keywordLocation":"#/type","error":"Instance type \"number\" is invalid. Expected \"null\"."} |
| draft7:type.json#/groups/6/tests/2 | zero is not null | PASS | {"instanceLocation":"#","keyword":"type","keywordLocation":"#/type","error":"Instance type \"number\" is invalid. Expected \"null\"."} |
| draft7:type.json#/groups/6/tests/3 | a string is not null | PASS | {"instanceLocation":"#","keyword":"type","keywordLocation":"#/type","error":"Instance type \"string\" is invalid. Expected \"null\"."} |
| draft7:type.json#/groups/6/tests/4 | an empty string is not null | PASS | {"instanceLocation":"#","keyword":"type","keywordLocation":"#/type","error":"Instance type \"string\" is invalid. Expected \"null\"."} |
| draft7:type.json#/groups/6/tests/5 | an object is not null | PASS | {"instanceLocation":"#","keyword":"type","keywordLocation":"#/type","error":"Instance type \"object\" is invalid. Expected \"null\"."} |
| draft7:type.json#/groups/6/tests/6 | an array is not null | PASS | {"instanceLocation":"#","keyword":"type","keywordLocation":"#/type","error":"Instance type \"array\" is invalid. Expected \"null\"."} |
| draft7:type.json#/groups/6/tests/7 | true is not null | PASS | {"instanceLocation":"#","keyword":"type","keywordLocation":"#/type","error":"Instance type \"boolean\" is invalid. Expected \"null\"."} |
| draft7:type.json#/groups/6/tests/8 | false is not null | PASS | {"instanceLocation":"#","keyword":"type","keywordLocation":"#/type","error":"Instance type \"boolean\" is invalid. Expected \"null\"."} |
| draft7:type.json#/groups/7/tests/2 | a float is invalid | PASS | {"instanceLocation":"#","keyword":"type","keywordLocation":"#/type","error":"Instance type \"number\" is invalid. Expected \"integer\", \"string\"."} |
| draft7:type.json#/groups/7/tests/3 | an object is invalid | PASS | {"instanceLocation":"#","keyword":"type","keywordLocation":"#/type","error":"Instance type \"object\" is invalid. Expected \"integer\", \"string\"."} |
| draft7:type.json#/groups/7/tests/4 | an array is invalid | PASS | {"instanceLocation":"#","keyword":"type","keywordLocation":"#/type","error":"Instance type \"array\" is invalid. Expected \"integer\", \"string\"."} |
| draft7:type.json#/groups/7/tests/5 | a boolean is invalid | PASS | {"instanceLocation":"#","keyword":"type","keywordLocation":"#/type","error":"Instance type \"boolean\" is invalid. Expected \"integer\", \"string\"."} |
| draft7:type.json#/groups/7/tests/6 | null is invalid | PASS | {"instanceLocation":"#","keyword":"type","keywordLocation":"#/type","error":"Instance type \"null\" is invalid. Expected \"integer\", \"string\"."} |
| draft7:type.json#/groups/8/tests/1 | number is invalid | PASS | {"instanceLocation":"#","keyword":"type","keywordLocation":"#/type","error":"Instance type \"number\" is invalid. Expected \"string\"."} |
| draft7:type.json#/groups/9/tests/2 | number is invalid | PASS | {"instanceLocation":"#","keyword":"type","keywordLocation":"#/type","error":"Instance type \"number\" is invalid. Expected \"array\", \"object\"."} |
| draft7:type.json#/groups/9/tests/3 | string is invalid | PASS | {"instanceLocation":"#","keyword":"type","keywordLocation":"#/type","error":"Instance type \"string\" is invalid. Expected \"array\", \"object\"."} |
| draft7:type.json#/groups/9/tests/4 | null is invalid | PASS | {"instanceLocation":"#","keyword":"type","keywordLocation":"#/type","error":"Instance type \"null\" is invalid. Expected \"array\", \"object\"."} |
| draft7:type.json#/groups/10/tests/3 | number is invalid | PASS | {"instanceLocation":"#","keyword":"type","keywordLocation":"#/type","error":"Instance type \"number\" is invalid. Expected \"array\", \"object\", \"null\"."} |
| draft7:type.json#/groups/10/tests/4 | string is invalid | PASS | {"instanceLocation":"#","keyword":"type","keywordLocation":"#/type","error":"Instance type \"string\" is invalid. Expected \"array\", \"object\", \"null\"."} |
| draft7:uniqueItems.json#/groups/0/tests/1 | non-unique array of integers is invalid | PASS | {"instanceLocation":"#","keyword":"uniqueItems","keywordLocation":"#/uniqueItems","error":"Duplicate items at indexes 0 and 1."} |
| draft7:uniqueItems.json#/groups/0/tests/2 | non-unique array of more than two integers is invalid | PASS | {"instanceLocation":"#","keyword":"uniqueItems","keywordLocation":"#/uniqueItems","error":"Duplicate items at indexes 0 and 2."} |
| draft7:uniqueItems.json#/groups/0/tests/3 | numbers are unique if mathematically unequal | PASS | {"instanceLocation":"#","keyword":"uniqueItems","keywordLocation":"#/uniqueItems","error":"Duplicate items at indexes 0 and 1."} |
| draft7:uniqueItems.json#/groups/0/tests/7 | non-unique array of strings is invalid | PASS | {"instanceLocation":"#","keyword":"uniqueItems","keywordLocation":"#/uniqueItems","error":"Duplicate items at indexes 0 and 2."} |
| draft7:uniqueItems.json#/groups/0/tests/9 | non-unique array of objects is invalid | PASS | {"instanceLocation":"#","keyword":"uniqueItems","keywordLocation":"#/uniqueItems","error":"Duplicate items at indexes 0 and 1."} |
| draft7:uniqueItems.json#/groups/0/tests/10 | property order of array of objects is ignored | PASS | {"instanceLocation":"#","keyword":"uniqueItems","keywordLocation":"#/uniqueItems","error":"Duplicate items at indexes 0 and 1."} |
| draft7:uniqueItems.json#/groups/0/tests/12 | non-unique array of nested objects is invalid | PASS | {"instanceLocation":"#","keyword":"uniqueItems","keywordLocation":"#/uniqueItems","error":"Duplicate items at indexes 0 and 1."} |
| draft7:uniqueItems.json#/groups/0/tests/14 | non-unique array of arrays is invalid | PASS | {"instanceLocation":"#","keyword":"uniqueItems","keywordLocation":"#/uniqueItems","error":"Duplicate items at indexes 0 and 1."} |
| draft7:uniqueItems.json#/groups/0/tests/15 | non-unique array of more than two arrays is invalid | PASS | {"instanceLocation":"#","keyword":"uniqueItems","keywordLocation":"#/uniqueItems","error":"Duplicate items at indexes 0 and 2."} |
| draft7:uniqueItems.json#/groups/0/tests/23 | non-unique heterogeneous types are invalid | PASS | {"instanceLocation":"#","keyword":"uniqueItems","keywordLocation":"#/uniqueItems","error":"Duplicate items at indexes 0 and 4."} |
| draft7:uniqueItems.json#/groups/0/tests/25 | objects are non-unique despite key order | PASS | {"instanceLocation":"#","keyword":"uniqueItems","keywordLocation":"#/uniqueItems","error":"Duplicate items at indexes 0 and 1."} |
| draft7:uniqueItems.json#/groups/1/tests/2 | [false, false] from items array is not valid | PASS | {"instanceLocation":"#","keyword":"uniqueItems","keywordLocation":"#/uniqueItems","error":"Duplicate items at indexes 0 and 1."} |
| draft7:uniqueItems.json#/groups/1/tests/3 | [true, true] from items array is not valid | PASS | {"instanceLocation":"#","keyword":"uniqueItems","keywordLocation":"#/uniqueItems","error":"Duplicate items at indexes 0 and 1."} |
| draft7:uniqueItems.json#/groups/1/tests/6 | non-unique array extended from [false, true] is not valid | PASS | {"instanceLocation":"#","keyword":"uniqueItems","keywordLocation":"#/uniqueItems","error":"Duplicate items at indexes 2 and 3."} |
| draft7:uniqueItems.json#/groups/1/tests/7 | non-unique array extended from [true, false] is not valid | PASS | {"instanceLocation":"#","keyword":"uniqueItems","keywordLocation":"#/uniqueItems","error":"Duplicate items at indexes 2 and 3."} |
| draft7:uniqueItems.json#/groups/2/tests/2 | [false, false] from items array is not valid | PASS | {"instanceLocation":"#","keyword":"uniqueItems","keywordLocation":"#/uniqueItems","error":"Duplicate items at indexes 0 and 1."} |
| draft7:uniqueItems.json#/groups/2/tests/3 | [true, true] from items array is not valid | PASS | {"instanceLocation":"#","keyword":"uniqueItems","keywordLocation":"#/uniqueItems","error":"Duplicate items at indexes 0 and 1."} |
| draft7:uniqueItems.json#/groups/2/tests/4 | extra items are invalid even if unique | PASS | {"instanceLocation":"#","keyword":"additionalItems","keywordLocation":"#/additionalItems","error":"Items did not match additional items schema."} |
| draft7:uniqueItems.json#/groups/5/tests/4 | extra items are invalid even if unique | PASS | {"instanceLocation":"#","keyword":"additionalItems","keywordLocation":"#/additionalItems","error":"Items did not match additional items schema."} |
