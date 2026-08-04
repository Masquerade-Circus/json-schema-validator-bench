# Conformance: [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) draft2020-12

## Report options

| Profile | Options | SHA-256 |
| --- | --- | --- |
| base | {"formatProfile":"base","fast":{"ownProperties":true,"coerceTypes":false,"useDefaults":false,"removeAdditional":false,"strict":false,"validateFormats":false,"allErrors":false,"messages":false,"code":{"process":"isolate-visited-references-per-root-validation"}},"detailed":{"ownProperties":true,"coerceTypes":false,"useDefaults":false,"removeAdditional":false,"strict":false,"validateFormats":false,"allErrors":true,"messages":true},"formats":{"mode":"full","names":["date","time","date-time","duration","email","hostname","ipv4","ipv6","uuid","uri","uri-reference","uri-template","regex","json-pointer","relative-json-pointer"],"keywords":false},"implementation":{"core":{"packageName":"@redocly/ajv","version":"8.18.3"},"constructor":{"packageName":"@redocly/ajv","version":"8.18.3","entrypoint":"@redocly/ajv/dist/2020.js"}}} | 64066f169400a9f529ec81f08d5a22e1f853515080e31ec34ed163e1f0f9b0b8 |
| format-assertion | {"formatProfile":"format-assertion","fast":{"ownProperties":true,"coerceTypes":false,"useDefaults":false,"removeAdditional":false,"strict":false,"validateFormats":true,"allErrors":false,"messages":false,"code":{"process":"isolate-visited-references-per-root-validation"}},"detailed":{"ownProperties":true,"coerceTypes":false,"useDefaults":false,"removeAdditional":false,"strict":false,"validateFormats":true,"allErrors":true,"messages":true},"formats":{"mode":"full","names":["date","time","date-time","duration","email","hostname","ipv4","ipv6","uuid","uri","uri-reference","uri-template","regex","json-pointer","relative-json-pointer"],"keywords":false},"implementation":{"core":{"packageName":"@redocly/ajv","version":"8.18.3"},"constructor":{"packageName":"@redocly/ajv","version":"8.18.3","entrypoint":"@redocly/ajv/dist/2020.js"}}} | 97c1d9a98dea58d73b97a9bc0c189a641f6aae2d9170e7546701f937ea3a3456 |

## Counts

| Profile | Status | Cases | Percentage |
| --- | --- | ---: | ---: |
| base | PASS | 1395 | 95.74% |
| base | WRONG | 34 | 2.33% |
| base | COMPILE | 24 | 1.65% |
| base | RUNTIME | 4 | 0.27% |
| base | UNSUPPORTED | 0 | 0.00% |
| format-assertion | PASS | 567 | 85.01% |
| format-assertion | WRONG | 96 | 14.39% |
| format-assertion | COMPILE | 4 | 0.60% |
| format-assertion | RUNTIME | 0 | 0.00% |
| format-assertion | UNSUPPORTED | 0 | 0.00% |

## Non-PASS cases

| Case ID | Description | Expected | Observed | Status | Error |
| --- | --- | --- | --- | --- | --- |
| draft2020-12:dynamicRef.json#/groups/0/tests/0 | An array of strings is valid | true | false | WRONG | {"keyword":"type","instancePath":"/0","schemaPath":"#/type","message":"must be array"} |
| draft2020-12:dynamicRef.json#/groups/1/tests/0 | An array of strings is valid | true | false | WRONG | {"keyword":"type","instancePath":"/0","schemaPath":"#/type","message":"must be array"} |
| draft2020-12:dynamicRef.json#/groups/3/tests/0 | An array of strings is valid | true | false | WRONG | {"keyword":"type","instancePath":"/0","schemaPath":"#/type","message":"must be array"} |
| draft2020-12:dynamicRef.json#/groups/4/tests/1 | An array of numbers is valid | true | false | WRONG | {"keyword":"type","instancePath":"/0","schemaPath":"#/type","message":"must be array"} |
| draft2020-12:dynamicRef.json#/groups/5/tests/0 | An array of strings is valid | true | false | WRONG | {"keyword":"type","instancePath":"/0","schemaPath":"#/type","message":"must be array"} |
| draft2020-12:dynamicRef.json#/groups/6/tests/0 | Any array is valid | true | false | WRONG | {"keyword":"type","instancePath":"/0","schemaPath":"#/type","message":"must be array"} |
| draft2020-12:dynamicRef.json#/groups/7/tests/0 | Any array is valid | true | false | WRONG | {"keyword":"type","instancePath":"/0","schemaPath":"#/type","message":"must be array"} |
| draft2020-12:dynamicRef.json#/groups/8/tests/0 | Any array is valid | true | false | WRONG | {"keyword":"type","instancePath":"/0","schemaPath":"#/type","message":"must be array"} |
| draft2020-12:dynamicRef.json#/groups/9/tests/0 | The recursive part is valid against the root | true |  | COMPILE | FAST_SETUP_ERROR: "$dynamicRef" only supports hash fragment reference |
| draft2020-12:dynamicRef.json#/groups/9/tests/1 | The recursive part is not valid against the root | false |  | COMPILE | FAST_SETUP_ERROR: "$dynamicRef" only supports hash fragment reference |
| draft2020-12:dynamicRef.json#/groups/10/tests/0 | The recursive part doesn't need to validate against the root | true |  | COMPILE | FAST_SETUP_ERROR: "$dynamicRef" only supports hash fragment reference |
| draft2020-12:dynamicRef.json#/groups/11/tests/1 | number list with string values | false | true | WRONG |  |
| draft2020-12:dynamicRef.json#/groups/11/tests/2 | string list with number values | false | true | WRONG |  |
| draft2020-12:dynamicRef.json#/groups/12/tests/0 | string matches /$defs/thingy, but the $dynamicRef does not stop here | false |  | COMPILE | FAST_SETUP_ERROR: "$dynamicRef" only supports hash fragment reference |
| draft2020-12:dynamicRef.json#/groups/12/tests/1 | first_scope is not in dynamic scope for the $dynamicRef | false |  | COMPILE | FAST_SETUP_ERROR: "$dynamicRef" only supports hash fragment reference |
| draft2020-12:dynamicRef.json#/groups/12/tests/2 | /then/$defs/thingy is the final stop for the $dynamicRef | true |  | COMPILE | FAST_SETUP_ERROR: "$dynamicRef" only supports hash fragment reference |
| draft2020-12:dynamicRef.json#/groups/14/tests/2 | correct extended schema | true | false | WRONG | {"keyword":"required","instancePath":"/elements/0","schemaPath":"#/required","message":"must have required property 'elements'"} |
| draft2020-12:dynamicRef.json#/groups/15/tests/2 | correct extended schema | true | false | WRONG | {"keyword":"required","instancePath":"/elements/0","schemaPath":"#/required","message":"must have required property 'elements'"} |
| draft2020-12:dynamicRef.json#/groups/16/tests/2 | correct extended schema | true | false | WRONG | {"keyword":"required","instancePath":"/elements/0","schemaPath":"#/required","message":"must have required property 'elements'"} |
| draft2020-12:dynamicRef.json#/groups/17/tests/0 | number is valid | true |  | RUNTIME | FAST_RUNTIME_ERROR: Maximum call stack size exceeded |
| draft2020-12:dynamicRef.json#/groups/17/tests/1 | non-number is invalid | false |  | RUNTIME | FAST_RUNTIME_ERROR: Maximum call stack size exceeded |
| draft2020-12:dynamicRef.json#/groups/18/tests/1 | follow $dynamicRef to a false schema | false | true | WRONG |  |
| draft2020-12:dynamicRef.json#/groups/19/tests/0 | integer property passes | true | false | WRONG | {"keyword":"type","instancePath":"/bar-item/content","schemaPath":"#/type","message":"must be object"} |
| draft2020-12:dynamicRef.json#/groups/20/tests/0 | data is sufficient for schema at second#/$defs/length | true |  | RUNTIME | FAST_RUNTIME_ERROR: Maximum call stack size exceeded |
| draft2020-12:dynamicRef.json#/groups/20/tests/1 | data is not sufficient for schema at second#/$defs/length | false |  | RUNTIME | FAST_RUNTIME_ERROR: Maximum call stack size exceeded |
| draft2020-12:enum.json#/groups/14/tests/0 | string is invalid | false |  | COMPILE | FAST_SETUP_ERROR: enum must have non-empty array |
| draft2020-12:enum.json#/groups/14/tests/1 | number is invalid | false |  | COMPILE | FAST_SETUP_ERROR: enum must have non-empty array |
| draft2020-12:enum.json#/groups/14/tests/2 | null is invalid | false |  | COMPILE | FAST_SETUP_ERROR: enum must have non-empty array |
| draft2020-12:enum.json#/groups/14/tests/3 | object is invalid | false |  | COMPILE | FAST_SETUP_ERROR: enum must have non-empty array |
| draft2020-12:enum.json#/groups/14/tests/4 | array is invalid | false |  | COMPILE | FAST_SETUP_ERROR: enum must have non-empty array |
| draft2020-12:enum.json#/groups/14/tests/5 | boolean is invalid | false |  | COMPILE | FAST_SETUP_ERROR: enum must have non-empty array |
| draft2020-12:optional/cross-draft.json#/groups/0/tests/0 | first item not a string is valid | true |  | COMPILE | FAST_SETUP_ERROR: no schema with key or ref "https://json-schema.org/draft/2019-09/schema" |
| draft2020-12:optional/dynamicRef.json#/groups/0/tests/0 | integer property passes | true | false | WRONG | {"keyword":"type","instancePath":"/bar-item/content","schemaPath":"#/type","message":"must be object"} |
| draft2020-12:optional/float-overflow.json#/groups/0/tests/0 | valid if optional overflow handling is implemented | true | false | WRONG | {"keyword":"multipleOf","instancePath":"","schemaPath":"#/multipleOf","message":"must be multiple of 0.5"} |
| draft2020-12:optional/format-assertion.json#/groups/0/tests/0 | format-assertion: false: valid string | true |  | COMPILE | FAST_SETUP_ERROR: can't resolve reference https://json-schema.org/draft/2020-12/meta/format-assertion from id http://localhost:1234/draft2020-12/format-assertion-false.json |
| draft2020-12:optional/format-assertion.json#/groups/0/tests/1 | format-assertion: false: invalid string | false |  | COMPILE | FAST_SETUP_ERROR: can't resolve reference https://json-schema.org/draft/2020-12/meta/format-assertion from id http://localhost:1234/draft2020-12/format-assertion-false.json |
| draft2020-12:optional/format-assertion.json#/groups/1/tests/0 | format-assertion: true: valid string | true |  | COMPILE | FAST_SETUP_ERROR: can't resolve reference https://json-schema.org/draft/2020-12/meta/format-assertion from id http://localhost:1234/draft2020-12/format-assertion-true.json |
| draft2020-12:optional/format-assertion.json#/groups/1/tests/1 | format-assertion: true: invalid string | false |  | COMPILE | FAST_SETUP_ERROR: can't resolve reference https://json-schema.org/draft/2020-12/meta/format-assertion from id http://localhost:1234/draft2020-12/format-assertion-true.json |
| draft2020-12:optional/format/duration.json#/groups/0/tests/37 | years and days cannot appear without months | false | true | WRONG |  |
| draft2020-12:optional/format/duration.json#/groups/0/tests/40 | hours and seconds cannot appear without minutes | false | true | WRONG |  |
| draft2020-12:optional/format/ecmascript-regex.json#/groups/0/tests/0 | when used as a pattern | false | true | WRONG |  |
| draft2020-12:optional/format/email.json#/groups/0/tests/11 | a quoted string with a space in the local part is valid | true | false | WRONG | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"email\""} |
| draft2020-12:optional/format/email.json#/groups/0/tests/12 | a quoted string with a double dot in the local part is valid | true | false | WRONG | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"email\""} |
| draft2020-12:optional/format/email.json#/groups/0/tests/13 | a quoted string with a @ in the local part is valid | true | false | WRONG | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"email\""} |
| draft2020-12:optional/format/email.json#/groups/0/tests/14 | an IPv4-address-literal after the @ is valid | true | false | WRONG | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"email\""} |
| draft2020-12:optional/format/email.json#/groups/0/tests/15 | an IPv6-address-literal after the @ is valid | true | false | WRONG | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"email\""} |
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
| draft2020-12:optional/format/idn-email.json#/groups/0/tests/7 | an invalid e-mail/idn e-mail address | false | true | WRONG |  |
| draft2020-12:optional/format/idn-email.json#/groups/0/tests/11 | a local part with a lone UTF-16 surrogate is invalid | false | true | WRONG |  |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/7 | illegal first char U+302E Hangul single dot tone mark | false | true | WRONG |  |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/8 | contains illegal char U+302E Hangul single dot tone mark | false | true | WRONG |  |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/10 | a single label of 64 characters is too long | false | true | WRONG |  |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/11 | invalid label, correct Punycode | false | true | WRONG |  |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/13 | invalid Punycode | false | true | WRONG |  |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/14 | U-label contains "--" in the 3rd and 4th position | false | true | WRONG |  |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/15 | U-label starts with a dash | false | true | WRONG |  |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/16 | U-label ends with a dash | false | true | WRONG |  |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/17 | U-label starts and ends with a dash | false | true | WRONG |  |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/18 | Begins with a Spacing Combining Mark | false | true | WRONG |  |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/19 | Begins with a Nonspacing Mark | false | true | WRONG |  |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/20 | Begins with an Enclosing Mark | false | true | WRONG |  |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/23 | Exceptions that are DISALLOWED, right-to-left chars | false | true | WRONG |  |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/24 | Exceptions that are DISALLOWED, left-to-right chars | false | true | WRONG |  |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/25 | MIDDLE DOT with no preceding 'l' | false | true | WRONG |  |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/26 | MIDDLE DOT with nothing preceding | false | true | WRONG |  |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/27 | MIDDLE DOT with no following 'l' | false | true | WRONG |  |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/28 | MIDDLE DOT with nothing following | false | true | WRONG |  |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/30 | Greek KERAIA not followed by Greek | false | true | WRONG |  |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/31 | Greek KERAIA not followed by anything | false | true | WRONG |  |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/33 | Hebrew GERESH not preceded by Hebrew | false | true | WRONG |  |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/34 | Hebrew GERESH not preceded by anything | false | true | WRONG |  |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/36 | Hebrew GERSHAYIM not preceded by Hebrew | false | true | WRONG |  |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/37 | Hebrew GERSHAYIM not preceded by anything | false | true | WRONG |  |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/39 | KATAKANA MIDDLE DOT with no Hiragana, Katakana, or Han | false | true | WRONG |  |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/40 | KATAKANA MIDDLE DOT with no other characters | false | true | WRONG |  |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/44 | Arabic-Indic digits mixed with Extended Arabic-Indic digits | false | true | WRONG |  |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/47 | ZERO WIDTH JOINER not preceded by Virama | false | true | WRONG |  |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/48 | ZERO WIDTH JOINER not preceded by anything | false | true | WRONG |  |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/57 | empty string | false | true | WRONG |  |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/58 | zero width non-joiner must pass at every occurrence | false | true | WRONG |  |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/59 | Bidi domain name with a digit-first label is invalid | false | true | WRONG |  |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/60 | label starting with a digit before a right-to-left letter is invalid | false | true | WRONG |  |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/61 | left-to-right label containing a right-to-left letter is invalid | false | true | WRONG |  |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/62 | right-to-left label mixing both digit types is invalid | false | true | WRONG |  |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/63 | A-label that decodes to a disallowed code point is invalid | false | true | WRONG |  |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/64 | A-label that decodes to a Bidi rule violation is invalid | false | true | WRONG |  |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/65 | a U-label whose A-label form is longer than 63 octets is invalid | false | true | WRONG |  |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/66 | empty label between two dots is invalid | false | true | WRONG |  |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/67 | a name longer than 253 characters is invalid | false | true | WRONG |  |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/68 | A-label that decodes to only ASCII is invalid | false | true | WRONG |  |
| draft2020-12:optional/format/idn-hostname.json#/groups/0/tests/69 | non-canonical Punycode that does not re-encode to itself is invalid | false | true | WRONG |  |
| draft2020-12:optional/format/idn-hostname.json#/groups/1/tests/0 | single dot | false | true | WRONG |  |
| draft2020-12:optional/format/idn-hostname.json#/groups/1/tests/1 | single ideographic full stop | false | true | WRONG |  |
| draft2020-12:optional/format/idn-hostname.json#/groups/1/tests/2 | single fullwidth full stop | false | true | WRONG |  |
| draft2020-12:optional/format/idn-hostname.json#/groups/1/tests/3 | single halfwidth ideographic full stop | false | true | WRONG |  |
| draft2020-12:optional/format/idn-hostname.json#/groups/1/tests/8 | leading dot | false | true | WRONG |  |
| draft2020-12:optional/format/idn-hostname.json#/groups/1/tests/9 | leading ideographic full stop | false | true | WRONG |  |
| draft2020-12:optional/format/idn-hostname.json#/groups/1/tests/10 | leading fullwidth full stop | false | true | WRONG |  |
| draft2020-12:optional/format/idn-hostname.json#/groups/1/tests/11 | leading halfwidth ideographic full stop | false | true | WRONG |  |
| draft2020-12:optional/format/idn-hostname.json#/groups/1/tests/12 | trailing dot | false | true | WRONG |  |
| draft2020-12:optional/format/idn-hostname.json#/groups/1/tests/13 | trailing ideographic full stop | false | true | WRONG |  |
| draft2020-12:optional/format/idn-hostname.json#/groups/1/tests/14 | trailing fullwidth full stop | false | true | WRONG |  |
| draft2020-12:optional/format/idn-hostname.json#/groups/1/tests/15 | trailing halfwidth ideographic full stop | false | true | WRONG |  |
| draft2020-12:optional/format/iri-reference.json#/groups/0/tests/9 | an invalid IRI Reference | false | true | WRONG |  |
| draft2020-12:optional/format/iri-reference.json#/groups/0/tests/12 | an invalid IRI fragment | false | true | WRONG |  |
| draft2020-12:optional/format/iri.json#/groups/0/tests/11 | an IPv6 address without enclosing brackets is invalid | false | true | WRONG |  |
| draft2020-12:optional/format/iri.json#/groups/0/tests/12 | an invalid relative IRI Reference | false | true | WRONG |  |
| draft2020-12:optional/format/iri.json#/groups/0/tests/13 | an invalid IRI | false | true | WRONG |  |
| draft2020-12:optional/format/iri.json#/groups/0/tests/14 | an invalid IRI though valid IRI reference | false | true | WRONG |  |
| draft2020-12:optional/format/uri.json#/groups/0/tests/43 | non-numeric port is invalid | false | true | WRONG |  |
| draft2020-12:optional/format/uuid.json#/groups/0/tests/22 | URN prefixed UUID is invalid | false | true | WRONG |  |
| draft2020-12:optional/unknownKeyword.json#/groups/0/tests/0 | type matches second anyOf, which has a real schema in it | true |  | COMPILE | FAST_SETUP_ERROR: reference "https://localhost:1234/draft2020-12/unknownKeyword/my_identifier.json" resolves to more than one schema |
| draft2020-12:optional/unknownKeyword.json#/groups/0/tests/1 | type matches non-schema in first anyOf | false |  | COMPILE | FAST_SETUP_ERROR: reference "https://localhost:1234/draft2020-12/unknownKeyword/my_identifier.json" resolves to more than one schema |
| draft2020-12:optional/unknownKeyword.json#/groups/0/tests/2 | type matches non-schema in third anyOf | false |  | COMPILE | FAST_SETUP_ERROR: reference "https://localhost:1234/draft2020-12/unknownKeyword/my_identifier.json" resolves to more than one schema |
| draft2020-12:properties.json#/groups/5/tests/3 | __proto__ not valid | false | true | WRONG |  |
| draft2020-12:ref.json#/groups/15/tests/0 | invalid on inner field | false |  | COMPILE | FAST_SETUP_ERROR: Maximum call stack size exceeded |
| draft2020-12:ref.json#/groups/15/tests/1 | invalid on outer field | false |  | COMPILE | FAST_SETUP_ERROR: Maximum call stack size exceeded |
| draft2020-12:ref.json#/groups/15/tests/2 | valid on both fields | true |  | COMPILE | FAST_SETUP_ERROR: Maximum call stack size exceeded |
| draft2020-12:ref.json#/groups/16/tests/0 | invalid on inner field | false |  | COMPILE | FAST_SETUP_ERROR: Maximum call stack size exceeded |
| draft2020-12:ref.json#/groups/16/tests/1 | invalid on outer field | false |  | COMPILE | FAST_SETUP_ERROR: Maximum call stack size exceeded |
| draft2020-12:ref.json#/groups/16/tests/2 | valid on both fields | true |  | COMPILE | FAST_SETUP_ERROR: Maximum call stack size exceeded |
| draft2020-12:ref.json#/groups/28/tests/0 | a string is valid | true |  | COMPILE | FAST_SETUP_ERROR: Maximum call stack size exceeded |
| draft2020-12:ref.json#/groups/28/tests/1 | a non-string is invalid | false |  | COMPILE | FAST_SETUP_ERROR: Maximum call stack size exceeded |
| draft2020-12:unevaluatedItems.json#/groups/8/tests/1 | with no additional items | true | false | WRONG | {"keyword":"type","instancePath":"/true","schemaPath":"#/unevaluatedItems/type","message":"must be boolean"} |
| draft2020-12:unevaluatedItems.json#/groups/8/tests/2 | with invalid additional item | false | true | WRONG |  |
| draft2020-12:unevaluatedItems.json#/groups/18/tests/0 | with no unevaluated items | true | false | WRONG | {"keyword":"unevaluatedItems","instancePath":"","schemaPath":"#/unevaluatedItems","message":"must NOT have more than 1 items"} |
| draft2020-12:unevaluatedItems.json#/groups/21/tests/2 | contains passes, second item is not evaluated | false | true | WRONG |  |
| draft2020-12:unevaluatedItems.json#/groups/22/tests/1 | 7 not evaluated, fails unevaluatedItems | false | true | WRONG |  |
| draft2020-12:unevaluatedItems.json#/groups/23/tests/4 | only b's are invalid | false | true | WRONG |  |
| draft2020-12:unevaluatedItems.json#/groups/23/tests/5 | only c's are invalid | false | true | WRONG |  |
| draft2020-12:unevaluatedItems.json#/groups/23/tests/6 | only b's and c's are invalid | false | true | WRONG |  |
| draft2020-12:unevaluatedItems.json#/groups/23/tests/7 | only a's and c's are invalid | false | true | WRONG |  |
| draft2020-12:unevaluatedItems.json#/groups/24/tests/3 | all items evaluated by contains | true | false | WRONG | {"keyword":"unevaluatedItems","instancePath":"","schemaPath":"#/unevaluatedItems","message":"must NOT have more than 0 items"} |
| draft2020-12:unevaluatedItems.json#/groups/27/tests/0 | valid in case if is evaluated | true | false | WRONG | {"keyword":"unevaluatedItems","instancePath":"","schemaPath":"#/unevaluatedItems","message":"must NOT have more than 0 items"} |
| draft2020-12:unevaluatedProperties.json#/groups/15/tests/0 | when if is true and has no unevaluated properties | true | false | WRONG | {"keyword":"unevaluatedProperties","instancePath":"","schemaPath":"#/unevaluatedProperties","message":"must NOT have unevaluated properties"} |
| draft2020-12:unevaluatedProperties.json#/groups/15/tests/3 | when if is false and has unevaluated properties | false | true | WRONG |  |
| draft2020-12:unevaluatedProperties.json#/groups/21/tests/0 | with no unevaluated properties | true | false | WRONG | {"keyword":"unevaluatedProperties","instancePath":"","schemaPath":"#/unevaluatedProperties","message":"must NOT have unevaluated properties"} |
| draft2020-12:unevaluatedProperties.json#/groups/39/tests/0 | valid in case if is evaluated | true | false | WRONG | {"keyword":"unevaluatedProperties","instancePath":"","schemaPath":"#/unevaluatedProperties","message":"must NOT have unevaluated properties"} |
| draft2020-12:vocabulary.json#/groups/0/tests/2 | no validation: invalid number, but it still validates | true | false | WRONG | {"keyword":"minimum","instancePath":"/numberProperty","schemaPath":"#/properties/numberProperty/minimum","message":"must be >= 10"} |

## Detailed errors for invalid results

| Case ID | Description | Status | Error |
| --- | --- | --- | --- |
| draft2020-12:additionalProperties.json#/groups/0/tests/1 | an additional property is invalid | PASS | {"keyword":"additionalProperties","instancePath":"","schemaPath":"#/additionalProperties","message":"must NOT have additional properties"} |
| draft2020-12:additionalProperties.json#/groups/1/tests/1 | not matching the pattern is invalid | PASS | {"keyword":"additionalProperties","instancePath":"","schemaPath":"#/additionalProperties","message":"must NOT have additional properties"} |
| draft2020-12:additionalProperties.json#/groups/2/tests/2 | an additional invalid property is invalid | PASS | {"keyword":"type","instancePath":"/quux","schemaPath":"#/additionalProperties/type","message":"must be boolean"} |
| draft2020-12:additionalProperties.json#/groups/3/tests/1 | an additional invalid property is invalid | PASS | {"keyword":"type","instancePath":"/foo","schemaPath":"#/additionalProperties/type","message":"must be boolean"} |
| draft2020-12:additionalProperties.json#/groups/5/tests/0 | properties defined in allOf are not examined | PASS | {"keyword":"type","instancePath":"/foo","schemaPath":"#/additionalProperties/type","message":"must be boolean"} |
| draft2020-12:additionalProperties.json#/groups/7/tests/1 | Valid against propertyNames, but not additionalProperties | PASS | {"keyword":"type","instancePath":"/pear","schemaPath":"#/additionalProperties/type","message":"must be number"} |
| draft2020-12:additionalProperties.json#/groups/8/tests/0 | additionalProperties doesn't consider dependentSchemas | PASS | {"keyword":"additionalProperties","instancePath":"","schemaPath":"#/additionalProperties","message":"must NOT have additional properties"} |
| draft2020-12:additionalProperties.json#/groups/8/tests/1 | additionalProperties can't see bar | PASS | {"keyword":"additionalProperties","instancePath":"","schemaPath":"#/additionalProperties","message":"must NOT have additional properties"} |
| draft2020-12:additionalProperties.json#/groups/8/tests/2 | additionalProperties can't see bar even when foo2 is present | PASS | {"keyword":"additionalProperties","instancePath":"","schemaPath":"#/additionalProperties","message":"must NOT have additional properties"} |
| draft2020-12:allOf.json#/groups/0/tests/1 | mismatch second | PASS | {"keyword":"required","instancePath":"","schemaPath":"#/allOf/0/required","message":"must have required property 'bar'"} |
| draft2020-12:allOf.json#/groups/0/tests/2 | mismatch first | PASS | {"keyword":"required","instancePath":"","schemaPath":"#/allOf/1/required","message":"must have required property 'foo'"} |
| draft2020-12:allOf.json#/groups/0/tests/3 | wrong type | PASS | {"keyword":"type","instancePath":"/bar","schemaPath":"#/allOf/0/properties/bar/type","message":"must be integer"} |
| draft2020-12:allOf.json#/groups/1/tests/1 | mismatch base schema | PASS | {"keyword":"required","instancePath":"","schemaPath":"#/required","message":"must have required property 'bar'"} |
| draft2020-12:allOf.json#/groups/1/tests/2 | mismatch first allOf | PASS | {"keyword":"required","instancePath":"","schemaPath":"#/allOf/0/required","message":"must have required property 'foo'"} |
| draft2020-12:allOf.json#/groups/1/tests/3 | mismatch second allOf | PASS | {"keyword":"required","instancePath":"","schemaPath":"#/allOf/1/required","message":"must have required property 'baz'"} |
| draft2020-12:allOf.json#/groups/1/tests/4 | mismatch both | PASS | {"keyword":"required","instancePath":"","schemaPath":"#/allOf/0/required","message":"must have required property 'foo'"} |
| draft2020-12:allOf.json#/groups/2/tests/1 | mismatch one | PASS | {"keyword":"maximum","instancePath":"","schemaPath":"#/allOf/0/maximum","message":"must be <= 30"} |
| draft2020-12:allOf.json#/groups/4/tests/0 | any value is invalid | PASS | {"keyword":"false schema","instancePath":"","schemaPath":"#/allOf/1/false schema","message":"boolean schema is false"} |
| draft2020-12:allOf.json#/groups/5/tests/0 | any value is invalid | PASS | {"keyword":"false schema","instancePath":"","schemaPath":"#/allOf/0/false schema","message":"boolean schema is false"} |
| draft2020-12:allOf.json#/groups/8/tests/1 | string is invalid | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/allOf/1/type","message":"must be number"} |
| draft2020-12:allOf.json#/groups/9/tests/1 | string is invalid | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/allOf/0/type","message":"must be number"} |
| draft2020-12:allOf.json#/groups/10/tests/1 | anything non-null is invalid | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/allOf/0/allOf/0/type","message":"must be null"} |
| draft2020-12:allOf.json#/groups/11/tests/0 | allOf: false, anyOf: false, oneOf: false | PASS | {"keyword":"multipleOf","instancePath":"","schemaPath":"#/anyOf/0/multipleOf","message":"must be multiple of 3"} |
| draft2020-12:allOf.json#/groups/11/tests/1 | allOf: false, anyOf: false, oneOf: true | PASS | {"keyword":"multipleOf","instancePath":"","schemaPath":"#/anyOf/0/multipleOf","message":"must be multiple of 3"} |
| draft2020-12:allOf.json#/groups/11/tests/2 | allOf: false, anyOf: true, oneOf: false | PASS | {"keyword":"multipleOf","instancePath":"","schemaPath":"#/oneOf/0/multipleOf","message":"must be multiple of 5"} |
| draft2020-12:allOf.json#/groups/11/tests/3 | allOf: false, anyOf: true, oneOf: true | PASS | {"keyword":"multipleOf","instancePath":"","schemaPath":"#/allOf/0/multipleOf","message":"must be multiple of 2"} |
| draft2020-12:allOf.json#/groups/11/tests/4 | allOf: true, anyOf: false, oneOf: false | PASS | {"keyword":"multipleOf","instancePath":"","schemaPath":"#/anyOf/0/multipleOf","message":"must be multiple of 3"} |
| draft2020-12:allOf.json#/groups/11/tests/5 | allOf: true, anyOf: false, oneOf: true | PASS | {"keyword":"multipleOf","instancePath":"","schemaPath":"#/anyOf/0/multipleOf","message":"must be multiple of 3"} |
| draft2020-12:allOf.json#/groups/11/tests/6 | allOf: true, anyOf: true, oneOf: false | PASS | {"keyword":"multipleOf","instancePath":"","schemaPath":"#/oneOf/0/multipleOf","message":"must be multiple of 5"} |
| draft2020-12:anchor.json#/groups/0/tests/1 | mismatch | PASS | {"keyword":"type","instancePath":"","schemaPath":"#foo/type","message":"must be integer"} |
| draft2020-12:anchor.json#/groups/1/tests/1 | mismatch | PASS | {"keyword":"type","instancePath":"","schemaPath":"http://localhost:1234/draft2020-12/bar#foo/type","message":"must be integer"} |
| draft2020-12:anchor.json#/groups/2/tests/1 | mismatch | PASS | {"keyword":"type","instancePath":"","schemaPath":"http://localhost:1234/draft2020-12/nested.json#foo/type","message":"must be integer"} |
| draft2020-12:anchor.json#/groups/3/tests/1 | $ref does not resolve to /$defs/A/allOf/0 | PASS | {"keyword":"type","instancePath":"","schemaPath":"child1#my_anchor/type","message":"must be string"} |
| draft2020-12:anyOf.json#/groups/0/tests/3 | neither anyOf valid | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/anyOf/0/type","message":"must be integer"} |
| draft2020-12:anyOf.json#/groups/1/tests/0 | mismatch base schema | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be string"} |
| draft2020-12:anyOf.json#/groups/1/tests/2 | both anyOf invalid | PASS | {"keyword":"maxLength","instancePath":"","schemaPath":"#/anyOf/0/maxLength","message":"must NOT have more than 2 characters"} |
| draft2020-12:anyOf.json#/groups/4/tests/0 | any value is invalid | PASS | {"keyword":"false schema","instancePath":"","schemaPath":"#/anyOf/0/false schema","message":"boolean schema is false"} |
| draft2020-12:anyOf.json#/groups/5/tests/3 | neither anyOf valid (complex) | PASS | {"keyword":"type","instancePath":"/bar","schemaPath":"#/anyOf/0/properties/bar/type","message":"must be integer"} |
| draft2020-12:anyOf.json#/groups/7/tests/1 | anything non-null is invalid | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/anyOf/0/anyOf/0/type","message":"must be null"} |
| draft2020-12:boolean_schema.json#/groups/1/tests/0 | number is invalid | PASS | {"keyword":"false schema","instancePath":"","schemaPath":"#/false schema","message":"boolean schema is false"} |
| draft2020-12:boolean_schema.json#/groups/1/tests/1 | string is invalid | PASS | {"keyword":"false schema","instancePath":"","schemaPath":"#/false schema","message":"boolean schema is false"} |
| draft2020-12:boolean_schema.json#/groups/1/tests/2 | boolean true is invalid | PASS | {"keyword":"false schema","instancePath":"","schemaPath":"#/false schema","message":"boolean schema is false"} |
| draft2020-12:boolean_schema.json#/groups/1/tests/3 | boolean false is invalid | PASS | {"keyword":"false schema","instancePath":"","schemaPath":"#/false schema","message":"boolean schema is false"} |
| draft2020-12:boolean_schema.json#/groups/1/tests/4 | null is invalid | PASS | {"keyword":"false schema","instancePath":"","schemaPath":"#/false schema","message":"boolean schema is false"} |
| draft2020-12:boolean_schema.json#/groups/1/tests/5 | object is invalid | PASS | {"keyword":"false schema","instancePath":"","schemaPath":"#/false schema","message":"boolean schema is false"} |
| draft2020-12:boolean_schema.json#/groups/1/tests/6 | empty object is invalid | PASS | {"keyword":"false schema","instancePath":"","schemaPath":"#/false schema","message":"boolean schema is false"} |
| draft2020-12:boolean_schema.json#/groups/1/tests/7 | array is invalid | PASS | {"keyword":"false schema","instancePath":"","schemaPath":"#/false schema","message":"boolean schema is false"} |
| draft2020-12:boolean_schema.json#/groups/1/tests/8 | empty array is invalid | PASS | {"keyword":"false schema","instancePath":"","schemaPath":"#/false schema","message":"boolean schema is false"} |
| draft2020-12:const.json#/groups/0/tests/1 | another value is invalid | PASS | {"keyword":"const","instancePath":"","schemaPath":"#/const","message":"must be equal to constant"} |
| draft2020-12:const.json#/groups/0/tests/2 | another type is invalid | PASS | {"keyword":"const","instancePath":"","schemaPath":"#/const","message":"must be equal to constant"} |
| draft2020-12:const.json#/groups/1/tests/2 | another object is invalid | PASS | {"keyword":"const","instancePath":"","schemaPath":"#/const","message":"must be equal to constant"} |
| draft2020-12:const.json#/groups/1/tests/3 | another type is invalid | PASS | {"keyword":"const","instancePath":"","schemaPath":"#/const","message":"must be equal to constant"} |
| draft2020-12:const.json#/groups/2/tests/1 | another array item is invalid | PASS | {"keyword":"const","instancePath":"","schemaPath":"#/const","message":"must be equal to constant"} |
| draft2020-12:const.json#/groups/2/tests/2 | array with additional items is invalid | PASS | {"keyword":"const","instancePath":"","schemaPath":"#/const","message":"must be equal to constant"} |
| draft2020-12:const.json#/groups/3/tests/1 | not null is invalid | PASS | {"keyword":"const","instancePath":"","schemaPath":"#/const","message":"must be equal to constant"} |
| draft2020-12:const.json#/groups/4/tests/1 | integer zero is invalid | PASS | {"keyword":"const","instancePath":"","schemaPath":"#/const","message":"must be equal to constant"} |
| draft2020-12:const.json#/groups/4/tests/2 | float zero is invalid | PASS | {"keyword":"const","instancePath":"","schemaPath":"#/const","message":"must be equal to constant"} |
| draft2020-12:const.json#/groups/5/tests/1 | integer one is invalid | PASS | {"keyword":"const","instancePath":"","schemaPath":"#/const","message":"must be equal to constant"} |
| draft2020-12:const.json#/groups/5/tests/2 | float one is invalid | PASS | {"keyword":"const","instancePath":"","schemaPath":"#/const","message":"must be equal to constant"} |
| draft2020-12:const.json#/groups/6/tests/1 | [0] is invalid | PASS | {"keyword":"const","instancePath":"","schemaPath":"#/const","message":"must be equal to constant"} |
| draft2020-12:const.json#/groups/6/tests/2 | [0.0] is invalid | PASS | {"keyword":"const","instancePath":"","schemaPath":"#/const","message":"must be equal to constant"} |
| draft2020-12:const.json#/groups/7/tests/1 | [1] is invalid | PASS | {"keyword":"const","instancePath":"","schemaPath":"#/const","message":"must be equal to constant"} |
| draft2020-12:const.json#/groups/7/tests/2 | [1.0] is invalid | PASS | {"keyword":"const","instancePath":"","schemaPath":"#/const","message":"must be equal to constant"} |
| draft2020-12:const.json#/groups/8/tests/1 | {"a": 0} is invalid | PASS | {"keyword":"const","instancePath":"","schemaPath":"#/const","message":"must be equal to constant"} |
| draft2020-12:const.json#/groups/8/tests/2 | {"a": 0.0} is invalid | PASS | {"keyword":"const","instancePath":"","schemaPath":"#/const","message":"must be equal to constant"} |
| draft2020-12:const.json#/groups/9/tests/1 | {"a": 1} is invalid | PASS | {"keyword":"const","instancePath":"","schemaPath":"#/const","message":"must be equal to constant"} |
| draft2020-12:const.json#/groups/9/tests/2 | {"a": 1.0} is invalid | PASS | {"keyword":"const","instancePath":"","schemaPath":"#/const","message":"must be equal to constant"} |
| draft2020-12:const.json#/groups/10/tests/0 | false is invalid | PASS | {"keyword":"const","instancePath":"","schemaPath":"#/const","message":"must be equal to constant"} |
| draft2020-12:const.json#/groups/10/tests/3 | empty object is invalid | PASS | {"keyword":"const","instancePath":"","schemaPath":"#/const","message":"must be equal to constant"} |
| draft2020-12:const.json#/groups/10/tests/4 | empty array is invalid | PASS | {"keyword":"const","instancePath":"","schemaPath":"#/const","message":"must be equal to constant"} |
| draft2020-12:const.json#/groups/10/tests/5 | empty string is invalid | PASS | {"keyword":"const","instancePath":"","schemaPath":"#/const","message":"must be equal to constant"} |
| draft2020-12:const.json#/groups/11/tests/0 | true is invalid | PASS | {"keyword":"const","instancePath":"","schemaPath":"#/const","message":"must be equal to constant"} |
| draft2020-12:const.json#/groups/12/tests/1 | integer 2 is invalid | PASS | {"keyword":"const","instancePath":"","schemaPath":"#/const","message":"must be equal to constant"} |
| draft2020-12:const.json#/groups/12/tests/3 | float 2.0 is invalid | PASS | {"keyword":"const","instancePath":"","schemaPath":"#/const","message":"must be equal to constant"} |
| draft2020-12:const.json#/groups/12/tests/4 | float -2.00001 is invalid | PASS | {"keyword":"const","instancePath":"","schemaPath":"#/const","message":"must be equal to constant"} |
| draft2020-12:const.json#/groups/13/tests/1 | integer minus one is invalid | PASS | {"keyword":"const","instancePath":"","schemaPath":"#/const","message":"must be equal to constant"} |
| draft2020-12:const.json#/groups/13/tests/3 | float minus one is invalid | PASS | {"keyword":"const","instancePath":"","schemaPath":"#/const","message":"must be equal to constant"} |
| draft2020-12:const.json#/groups/14/tests/1 | do not match string lacking nul | PASS | {"keyword":"const","instancePath":"","schemaPath":"#/const","message":"must be equal to constant"} |
| draft2020-12:const.json#/groups/15/tests/1 | character looks the same but uses a different codepoint | PASS | {"keyword":"const","instancePath":"","schemaPath":"#/const","message":"must be equal to constant"} |
| draft2020-12:const.json#/groups/16/tests/1 | character looks the same but uses combining marks | PASS | {"keyword":"const","instancePath":"","schemaPath":"#/const","message":"must be equal to constant"} |
| draft2020-12:contains.json#/groups/0/tests/3 | array without items matching schema is invalid | PASS | {"keyword":"minimum","instancePath":"/0","schemaPath":"#/contains/minimum","message":"must be >= 5"} |
| draft2020-12:contains.json#/groups/0/tests/4 | empty array is invalid | PASS | {"keyword":"contains","instancePath":"","schemaPath":"#/contains","message":"must contain at least 1 valid item(s)"} |
| draft2020-12:contains.json#/groups/1/tests/2 | array without item 5 is invalid | PASS | {"keyword":"const","instancePath":"/0","schemaPath":"#/contains/const","message":"must be equal to constant"} |
| draft2020-12:contains.json#/groups/2/tests/1 | empty array is invalid | PASS | {"keyword":"contains","instancePath":"","schemaPath":"#/contains","message":"must contain at least 1 valid item(s)"} |
| draft2020-12:contains.json#/groups/3/tests/0 | any non-empty array is invalid | PASS | {"keyword":"false schema","instancePath":"/0","schemaPath":"#/contains/false schema","message":"boolean schema is false"} |
| draft2020-12:contains.json#/groups/3/tests/1 | empty array is invalid | PASS | {"keyword":"contains","instancePath":"","schemaPath":"#/contains","message":"must contain at least 1 valid item(s)"} |
| draft2020-12:contains.json#/groups/4/tests/0 | matches items, does not match contains | PASS | {"keyword":"multipleOf","instancePath":"/0","schemaPath":"#/contains/multipleOf","message":"must be multiple of 3"} |
| draft2020-12:contains.json#/groups/4/tests/1 | does not match items, matches contains | PASS | {"keyword":"multipleOf","instancePath":"/0","schemaPath":"#/items/multipleOf","message":"must be multiple of 2"} |
| draft2020-12:contains.json#/groups/4/tests/3 | matches neither items nor contains | PASS | {"keyword":"multipleOf","instancePath":"/0","schemaPath":"#/items/multipleOf","message":"must be multiple of 2"} |
| draft2020-12:contains.json#/groups/5/tests/1 | empty array is invalid | PASS | {"keyword":"contains","instancePath":"","schemaPath":"#/contains","message":"must contain at least 1 valid item(s)"} |
| draft2020-12:default.json#/groups/2/tests/1 | an explicit property value is checked against maximum (failing) | PASS | {"keyword":"maximum","instancePath":"/alpha","schemaPath":"#/properties/alpha/maximum","message":"must be <= 3"} |
| draft2020-12:defs.json#/groups/0/tests/1 | invalid definition schema | PASS | {"keyword":"enum","instancePath":"/$defs/foo/type","schemaPath":"#/$defs/simpleTypes/enum","message":"must be equal to one of the allowed values"} |
| draft2020-12:dependentRequired.json#/groups/0/tests/3 | missing dependency | PASS | {"keyword":"dependentRequired","instancePath":"","schemaPath":"#/dependentRequired","message":"must have property foo when property bar is present"} |
| draft2020-12:dependentRequired.json#/groups/2/tests/3 | missing dependency | PASS | {"keyword":"dependentRequired","instancePath":"","schemaPath":"#/dependentRequired","message":"must have properties foo, bar when property quux is present"} |
| draft2020-12:dependentRequired.json#/groups/2/tests/4 | missing other dependency | PASS | {"keyword":"dependentRequired","instancePath":"","schemaPath":"#/dependentRequired","message":"must have properties foo, bar when property quux is present"} |
| draft2020-12:dependentRequired.json#/groups/2/tests/5 | missing both dependencies | PASS | {"keyword":"dependentRequired","instancePath":"","schemaPath":"#/dependentRequired","message":"must have properties foo, bar when property quux is present"} |
| draft2020-12:dependentRequired.json#/groups/3/tests/2 | CRLF missing dependent | PASS | {"keyword":"dependentRequired","instancePath":"","schemaPath":"#/dependentRequired","message":"must have property foo\rbar when property foo\nbar is present"} |
| draft2020-12:dependentRequired.json#/groups/3/tests/3 | quoted quotes missing dependent | PASS | {"keyword":"dependentRequired","instancePath":"","schemaPath":"#/dependentRequired","message":"must have property foo'bar when property foo\"bar is present"} |
| draft2020-12:dependentSchemas.json#/groups/0/tests/2 | wrong type | PASS | {"keyword":"type","instancePath":"/foo","schemaPath":"#/dependentSchemas/bar/properties/foo/type","message":"must be integer"} |
| draft2020-12:dependentSchemas.json#/groups/0/tests/3 | wrong type other | PASS | {"keyword":"type","instancePath":"/bar","schemaPath":"#/dependentSchemas/bar/properties/bar/type","message":"must be integer"} |
| draft2020-12:dependentSchemas.json#/groups/0/tests/4 | wrong type both | PASS | {"keyword":"type","instancePath":"/foo","schemaPath":"#/dependentSchemas/bar/properties/foo/type","message":"must be integer"} |
| draft2020-12:dependentSchemas.json#/groups/1/tests/1 | object with property having schema false is invalid | PASS | {"keyword":"false schema","instancePath":"","schemaPath":"#/dependentSchemas/bar/false schema","message":"boolean schema is false"} |
| draft2020-12:dependentSchemas.json#/groups/1/tests/2 | object with both properties is invalid | PASS | {"keyword":"false schema","instancePath":"","schemaPath":"#/dependentSchemas/bar/false schema","message":"boolean schema is false"} |
| draft2020-12:dependentSchemas.json#/groups/2/tests/1 | quoted quote | PASS | {"keyword":"required","instancePath":"","schemaPath":"#/dependentSchemas/foo'bar/required","message":"must have required property 'foo\"bar'"} |
| draft2020-12:dependentSchemas.json#/groups/2/tests/2 | quoted tab invalid under dependent schema | PASS | {"keyword":"minProperties","instancePath":"","schemaPath":"#/dependentSchemas/foo%09bar/minProperties","message":"must NOT have fewer than 4 properties"} |
| draft2020-12:dependentSchemas.json#/groups/2/tests/3 | quoted quote invalid under dependent schema | PASS | {"keyword":"required","instancePath":"","schemaPath":"#/dependentSchemas/foo'bar/required","message":"must have required property 'foo\"bar'"} |
| draft2020-12:dependentSchemas.json#/groups/3/tests/0 | matches root | PASS | {"keyword":"additionalProperties","instancePath":"","schemaPath":"#/dependentSchemas/foo/additionalProperties","message":"must NOT have additional properties"} |
| draft2020-12:dependentSchemas.json#/groups/3/tests/2 | matches both | PASS | {"keyword":"additionalProperties","instancePath":"","schemaPath":"#/dependentSchemas/foo/additionalProperties","message":"must NOT have additional properties"} |
| draft2020-12:dynamicRef.json#/groups/0/tests/0 | An array of strings is valid | WRONG | {"keyword":"type","instancePath":"/0","schemaPath":"#/type","message":"must be array"} |
| draft2020-12:dynamicRef.json#/groups/0/tests/1 | An array containing non-strings is invalid | PASS | {"keyword":"type","instancePath":"/0","schemaPath":"#/type","message":"must be array"} |
| draft2020-12:dynamicRef.json#/groups/1/tests/0 | An array of strings is valid | WRONG | {"keyword":"type","instancePath":"/0","schemaPath":"#/type","message":"must be array"} |
| draft2020-12:dynamicRef.json#/groups/1/tests/1 | An array containing non-strings is invalid | PASS | {"keyword":"type","instancePath":"/0","schemaPath":"#/type","message":"must be array"} |
| draft2020-12:dynamicRef.json#/groups/2/tests/1 | An array containing non-strings is invalid | PASS | {"keyword":"type","instancePath":"/1","schemaPath":"#/type","message":"must be string"} |
| draft2020-12:dynamicRef.json#/groups/3/tests/0 | An array of strings is valid | WRONG | {"keyword":"type","instancePath":"/0","schemaPath":"#/type","message":"must be array"} |
| draft2020-12:dynamicRef.json#/groups/3/tests/1 | An array containing non-strings is invalid | PASS | {"keyword":"type","instancePath":"/0","schemaPath":"#/type","message":"must be array"} |
| draft2020-12:dynamicRef.json#/groups/4/tests/0 | An array of strings is invalid | PASS | {"keyword":"type","instancePath":"/0","schemaPath":"#/type","message":"must be array"} |
| draft2020-12:dynamicRef.json#/groups/4/tests/1 | An array of numbers is valid | WRONG | {"keyword":"type","instancePath":"/0","schemaPath":"#/type","message":"must be array"} |
| draft2020-12:dynamicRef.json#/groups/5/tests/0 | An array of strings is valid | WRONG | {"keyword":"type","instancePath":"/0","schemaPath":"#/type","message":"must be array"} |
| draft2020-12:dynamicRef.json#/groups/5/tests/1 | An array containing non-strings is invalid | PASS | {"keyword":"type","instancePath":"/0","schemaPath":"#/type","message":"must be array"} |
| draft2020-12:dynamicRef.json#/groups/6/tests/0 | Any array is valid | WRONG | {"keyword":"type","instancePath":"/0","schemaPath":"#/type","message":"must be array"} |
| draft2020-12:dynamicRef.json#/groups/7/tests/0 | Any array is valid | WRONG | {"keyword":"type","instancePath":"/0","schemaPath":"#/type","message":"must be array"} |
| draft2020-12:dynamicRef.json#/groups/8/tests/0 | Any array is valid | WRONG | {"keyword":"type","instancePath":"/0","schemaPath":"#/type","message":"must be array"} |
| draft2020-12:dynamicRef.json#/groups/9/tests/0 | The recursive part is valid against the root | COMPILE | FAST_SETUP_ERROR: "$dynamicRef" only supports hash fragment reference |
| draft2020-12:dynamicRef.json#/groups/9/tests/1 | The recursive part is not valid against the root | COMPILE | FAST_SETUP_ERROR: "$dynamicRef" only supports hash fragment reference |
| draft2020-12:dynamicRef.json#/groups/10/tests/0 | The recursive part doesn't need to validate against the root | COMPILE | FAST_SETUP_ERROR: "$dynamicRef" only supports hash fragment reference |
| draft2020-12:dynamicRef.json#/groups/12/tests/0 | string matches /$defs/thingy, but the $dynamicRef does not stop here | COMPILE | FAST_SETUP_ERROR: "$dynamicRef" only supports hash fragment reference |
| draft2020-12:dynamicRef.json#/groups/12/tests/1 | first_scope is not in dynamic scope for the $dynamicRef | COMPILE | FAST_SETUP_ERROR: "$dynamicRef" only supports hash fragment reference |
| draft2020-12:dynamicRef.json#/groups/12/tests/2 | /then/$defs/thingy is the final stop for the $dynamicRef | COMPILE | FAST_SETUP_ERROR: "$dynamicRef" only supports hash fragment reference |
| draft2020-12:dynamicRef.json#/groups/13/tests/0 | instance with misspelled field | PASS | {"keyword":"unevaluatedProperties","instancePath":"/children/0","schemaPath":"#/unevaluatedProperties","message":"must NOT have unevaluated properties"} |
| draft2020-12:dynamicRef.json#/groups/14/tests/0 | incorrect parent schema | PASS | {"keyword":"required","instancePath":"","schemaPath":"#/required","message":"must have required property 'elements'"} |
| draft2020-12:dynamicRef.json#/groups/14/tests/1 | incorrect extended schema | PASS | {"keyword":"required","instancePath":"/elements/0","schemaPath":"#/required","message":"must have required property 'elements'"} |
| draft2020-12:dynamicRef.json#/groups/14/tests/2 | correct extended schema | WRONG | {"keyword":"required","instancePath":"/elements/0","schemaPath":"#/required","message":"must have required property 'elements'"} |
| draft2020-12:dynamicRef.json#/groups/15/tests/0 | incorrect parent schema | PASS | {"keyword":"required","instancePath":"","schemaPath":"#/required","message":"must have required property 'elements'"} |
| draft2020-12:dynamicRef.json#/groups/15/tests/1 | incorrect extended schema | PASS | {"keyword":"required","instancePath":"/elements/0","schemaPath":"#/required","message":"must have required property 'elements'"} |
| draft2020-12:dynamicRef.json#/groups/15/tests/2 | correct extended schema | WRONG | {"keyword":"required","instancePath":"/elements/0","schemaPath":"#/required","message":"must have required property 'elements'"} |
| draft2020-12:dynamicRef.json#/groups/16/tests/0 | incorrect parent schema | PASS | {"keyword":"required","instancePath":"","schemaPath":"#/required","message":"must have required property 'elements'"} |
| draft2020-12:dynamicRef.json#/groups/16/tests/1 | incorrect extended schema | PASS | {"keyword":"required","instancePath":"/elements/0","schemaPath":"#/required","message":"must have required property 'elements'"} |
| draft2020-12:dynamicRef.json#/groups/16/tests/2 | correct extended schema | WRONG | {"keyword":"required","instancePath":"/elements/0","schemaPath":"#/required","message":"must have required property 'elements'"} |
| draft2020-12:dynamicRef.json#/groups/17/tests/0 | number is valid | RUNTIME | FAST_RUNTIME_ERROR: Maximum call stack size exceeded |
| draft2020-12:dynamicRef.json#/groups/17/tests/1 | non-number is invalid | RUNTIME | FAST_RUNTIME_ERROR: Maximum call stack size exceeded |
| draft2020-12:dynamicRef.json#/groups/19/tests/0 | integer property passes | WRONG | {"keyword":"type","instancePath":"/bar-item/content","schemaPath":"#/type","message":"must be object"} |
| draft2020-12:dynamicRef.json#/groups/19/tests/1 | string property fails | PASS | {"keyword":"type","instancePath":"/bar-item/content","schemaPath":"#/type","message":"must be object"} |
| draft2020-12:dynamicRef.json#/groups/20/tests/0 | data is sufficient for schema at second#/$defs/length | RUNTIME | FAST_RUNTIME_ERROR: Maximum call stack size exceeded |
| draft2020-12:dynamicRef.json#/groups/20/tests/1 | data is not sufficient for schema at second#/$defs/length | RUNTIME | FAST_RUNTIME_ERROR: Maximum call stack size exceeded |
| draft2020-12:enum.json#/groups/0/tests/1 | something else is invalid | PASS | {"keyword":"enum","instancePath":"","schemaPath":"#/enum","message":"must be equal to one of the allowed values"} |
| draft2020-12:enum.json#/groups/1/tests/1 | something else is invalid | PASS | {"keyword":"enum","instancePath":"","schemaPath":"#/enum","message":"must be equal to one of the allowed values"} |
| draft2020-12:enum.json#/groups/1/tests/2 | objects are deep compared | PASS | {"keyword":"enum","instancePath":"","schemaPath":"#/enum","message":"must be equal to one of the allowed values"} |
| draft2020-12:enum.json#/groups/1/tests/4 | extra properties in object is invalid | PASS | {"keyword":"enum","instancePath":"","schemaPath":"#/enum","message":"must be equal to one of the allowed values"} |
| draft2020-12:enum.json#/groups/2/tests/2 | something else is invalid | PASS | {"keyword":"enum","instancePath":"","schemaPath":"#/enum","message":"must be equal to one of the allowed values"} |
| draft2020-12:enum.json#/groups/3/tests/1 | wrong foo value | PASS | {"keyword":"enum","instancePath":"/foo","schemaPath":"#/properties/foo/enum","message":"must be equal to one of the allowed values"} |
| draft2020-12:enum.json#/groups/3/tests/2 | wrong bar value | PASS | {"keyword":"enum","instancePath":"/bar","schemaPath":"#/properties/bar/enum","message":"must be equal to one of the allowed values"} |
| draft2020-12:enum.json#/groups/3/tests/4 | missing required property is invalid | PASS | {"keyword":"required","instancePath":"","schemaPath":"#/required","message":"must have required property 'bar'"} |
| draft2020-12:enum.json#/groups/3/tests/5 | missing all properties is invalid | PASS | {"keyword":"required","instancePath":"","schemaPath":"#/required","message":"must have required property 'bar'"} |
| draft2020-12:enum.json#/groups/4/tests/2 | another string is invalid | PASS | {"keyword":"enum","instancePath":"","schemaPath":"#/enum","message":"must be equal to one of the allowed values"} |
| draft2020-12:enum.json#/groups/5/tests/1 | integer zero is invalid | PASS | {"keyword":"enum","instancePath":"","schemaPath":"#/enum","message":"must be equal to one of the allowed values"} |
| draft2020-12:enum.json#/groups/5/tests/2 | float zero is invalid | PASS | {"keyword":"enum","instancePath":"","schemaPath":"#/enum","message":"must be equal to one of the allowed values"} |
| draft2020-12:enum.json#/groups/6/tests/1 | [0] is invalid | PASS | {"keyword":"enum","instancePath":"","schemaPath":"#/enum","message":"must be equal to one of the allowed values"} |
| draft2020-12:enum.json#/groups/6/tests/2 | [0.0] is invalid | PASS | {"keyword":"enum","instancePath":"","schemaPath":"#/enum","message":"must be equal to one of the allowed values"} |
| draft2020-12:enum.json#/groups/7/tests/1 | integer one is invalid | PASS | {"keyword":"enum","instancePath":"","schemaPath":"#/enum","message":"must be equal to one of the allowed values"} |
| draft2020-12:enum.json#/groups/7/tests/2 | float one is invalid | PASS | {"keyword":"enum","instancePath":"","schemaPath":"#/enum","message":"must be equal to one of the allowed values"} |
| draft2020-12:enum.json#/groups/8/tests/1 | [1] is invalid | PASS | {"keyword":"enum","instancePath":"","schemaPath":"#/enum","message":"must be equal to one of the allowed values"} |
| draft2020-12:enum.json#/groups/8/tests/2 | [1.0] is invalid | PASS | {"keyword":"enum","instancePath":"","schemaPath":"#/enum","message":"must be equal to one of the allowed values"} |
| draft2020-12:enum.json#/groups/9/tests/0 | false is invalid | PASS | {"keyword":"enum","instancePath":"","schemaPath":"#/enum","message":"must be equal to one of the allowed values"} |
| draft2020-12:enum.json#/groups/10/tests/0 | [false] is invalid | PASS | {"keyword":"enum","instancePath":"","schemaPath":"#/enum","message":"must be equal to one of the allowed values"} |
| draft2020-12:enum.json#/groups/11/tests/0 | true is invalid | PASS | {"keyword":"enum","instancePath":"","schemaPath":"#/enum","message":"must be equal to one of the allowed values"} |
| draft2020-12:enum.json#/groups/12/tests/0 | [true] is invalid | PASS | {"keyword":"enum","instancePath":"","schemaPath":"#/enum","message":"must be equal to one of the allowed values"} |
| draft2020-12:enum.json#/groups/13/tests/1 | do not match string lacking nul | PASS | {"keyword":"enum","instancePath":"","schemaPath":"#/enum","message":"must be equal to one of the allowed values"} |
| draft2020-12:enum.json#/groups/14/tests/0 | string is invalid | COMPILE | FAST_SETUP_ERROR: enum must have non-empty array |
| draft2020-12:enum.json#/groups/14/tests/1 | number is invalid | COMPILE | FAST_SETUP_ERROR: enum must have non-empty array |
| draft2020-12:enum.json#/groups/14/tests/2 | null is invalid | COMPILE | FAST_SETUP_ERROR: enum must have non-empty array |
| draft2020-12:enum.json#/groups/14/tests/3 | object is invalid | COMPILE | FAST_SETUP_ERROR: enum must have non-empty array |
| draft2020-12:enum.json#/groups/14/tests/4 | array is invalid | COMPILE | FAST_SETUP_ERROR: enum must have non-empty array |
| draft2020-12:enum.json#/groups/14/tests/5 | boolean is invalid | COMPILE | FAST_SETUP_ERROR: enum must have non-empty array |
| draft2020-12:exclusiveMaximum.json#/groups/0/tests/1 | boundary point is invalid | PASS | {"keyword":"exclusiveMaximum","instancePath":"","schemaPath":"#/exclusiveMaximum","message":"must be < 3"} |
| draft2020-12:exclusiveMaximum.json#/groups/0/tests/2 | above the exclusiveMaximum is invalid | PASS | {"keyword":"exclusiveMaximum","instancePath":"","schemaPath":"#/exclusiveMaximum","message":"must be < 3"} |
| draft2020-12:exclusiveMinimum.json#/groups/0/tests/1 | boundary point is invalid | PASS | {"keyword":"exclusiveMinimum","instancePath":"","schemaPath":"#/exclusiveMinimum","message":"must be > 1.1"} |
| draft2020-12:exclusiveMinimum.json#/groups/0/tests/2 | below the exclusiveMinimum is invalid | PASS | {"keyword":"exclusiveMinimum","instancePath":"","schemaPath":"#/exclusiveMinimum","message":"must be > 1.1"} |
| draft2020-12:if-then-else.json#/groups/3/tests/1 | invalid through then | PASS | {"keyword":"minimum","instancePath":"","schemaPath":"#/then/minimum","message":"must be >= -10"} |
| draft2020-12:if-then-else.json#/groups/4/tests/2 | invalid through else | PASS | {"keyword":"multipleOf","instancePath":"","schemaPath":"#/else/multipleOf","message":"must be multiple of 2"} |
| draft2020-12:if-then-else.json#/groups/5/tests/1 | invalid through then | PASS | {"keyword":"minimum","instancePath":"","schemaPath":"#/then/minimum","message":"must be >= -10"} |
| draft2020-12:if-then-else.json#/groups/5/tests/3 | invalid through else | PASS | {"keyword":"multipleOf","instancePath":"","schemaPath":"#/else/multipleOf","message":"must be multiple of 2"} |
| draft2020-12:if-then-else.json#/groups/7/tests/1 | boolean schema true in if always chooses the then path (invalid) | PASS | {"keyword":"const","instancePath":"","schemaPath":"#/then/const","message":"must be equal to constant"} |
| draft2020-12:if-then-else.json#/groups/8/tests/0 | boolean schema false in if always chooses the else path (invalid) | PASS | {"keyword":"const","instancePath":"","schemaPath":"#/else/const","message":"must be equal to constant"} |
| draft2020-12:if-then-else.json#/groups/9/tests/2 | no redirects to then and fails | PASS | {"keyword":"const","instancePath":"","schemaPath":"#/then/const","message":"must be equal to constant"} |
| draft2020-12:if-then-else.json#/groups/9/tests/3 | invalid redirects to else and fails | PASS | {"keyword":"const","instancePath":"","schemaPath":"#/else/const","message":"must be equal to constant"} |
| draft2020-12:if-then-else.json#/groups/10/tests/0 | matches if → then=false → invalid | PASS | {"keyword":"false schema","instancePath":"","schemaPath":"#/then/false schema","message":"boolean schema is false"} |
| draft2020-12:if-then-else.json#/groups/11/tests/1 | does not match if → else executes → invalid | PASS | {"keyword":"false schema","instancePath":"","schemaPath":"#/else/false schema","message":"boolean schema is false"} |
| draft2020-12:infinite-loop-detection.json#/groups/0/tests/1 | failing case | PASS | {"keyword":"type","instancePath":"/foo","schemaPath":"#/$defs/int/type","message":"must be integer"} |
| draft2020-12:items.json#/groups/0/tests/1 | wrong type of items | PASS | {"keyword":"type","instancePath":"/1","schemaPath":"#/items/type","message":"must be integer"} |
| draft2020-12:items.json#/groups/2/tests/0 | any non-empty array is invalid | PASS | {"keyword":"false schema","instancePath":"/0","schemaPath":"#/items/false schema","message":"boolean schema is false"} |
| draft2020-12:items.json#/groups/3/tests/1 | too many items | PASS | {"keyword":"items","instancePath":"","schemaPath":"#/items","message":"must NOT have more than 3 items"} |
| draft2020-12:items.json#/groups/3/tests/2 | too many sub-items | PASS | {"keyword":"items","instancePath":"/0","schemaPath":"#/items","message":"must NOT have more than 2 items"} |
| draft2020-12:items.json#/groups/3/tests/3 | wrong item | PASS | {"keyword":"type","instancePath":"/0","schemaPath":"#/type","message":"must be array"} |
| draft2020-12:items.json#/groups/3/tests/4 | wrong sub-item | PASS | {"keyword":"required","instancePath":"/0/0","schemaPath":"#/$defs/sub-item/required","message":"must have required property 'foo'"} |
| draft2020-12:items.json#/groups/4/tests/1 | nested array with invalid type | PASS | {"keyword":"type","instancePath":"/0/0/0/0","schemaPath":"#/items/items/items/items/type","message":"must be number"} |
| draft2020-12:items.json#/groups/4/tests/2 | not deep enough | PASS | {"keyword":"type","instancePath":"/0/0/0","schemaPath":"#/items/items/items/type","message":"must be array"} |
| draft2020-12:items.json#/groups/5/tests/4 | additional items are not permitted | PASS | {"keyword":"items","instancePath":"","schemaPath":"#/items","message":"must NOT have more than 3 items"} |
| draft2020-12:items.json#/groups/6/tests/0 | prefixItems in allOf does not constrain items, invalid case | PASS | {"keyword":"minimum","instancePath":"/0","schemaPath":"#/items/minimum","message":"must be >= 5"} |
| draft2020-12:items.json#/groups/7/tests/1 | wrong type of second item | PASS | {"keyword":"type","instancePath":"/1","schemaPath":"#/items/type","message":"must be integer"} |
| draft2020-12:items.json#/groups/8/tests/0 | heterogeneous invalid instance | PASS | {"keyword":"items","instancePath":"","schemaPath":"#/items","message":"must NOT have more than 1 items"} |
| draft2020-12:maxContains.json#/groups/1/tests/0 | empty data | PASS | {"keyword":"contains","instancePath":"","schemaPath":"#/contains","message":"must contain at least 1 and no more than 1 valid item(s)"} |
| draft2020-12:maxContains.json#/groups/1/tests/2 | all elements match, invalid maxContains | PASS | {"keyword":"contains","instancePath":"","schemaPath":"#/contains","message":"must contain at least 1 and no more than 1 valid item(s)"} |
| draft2020-12:maxContains.json#/groups/1/tests/4 | some elements match, invalid maxContains | PASS | {"keyword":"const","instancePath":"/1","schemaPath":"#/contains/const","message":"must be equal to constant"} |
| draft2020-12:maxContains.json#/groups/2/tests/1 | too many elements match, invalid maxContains | PASS | {"keyword":"contains","instancePath":"","schemaPath":"#/contains","message":"must contain at least 1 and no more than 1 valid item(s)"} |
| draft2020-12:maxContains.json#/groups/3/tests/0 | actual < minContains < maxContains | PASS | {"keyword":"contains","instancePath":"","schemaPath":"#/contains","message":"must contain at least 1 and no more than 3 valid item(s)"} |
| draft2020-12:maxContains.json#/groups/3/tests/2 | minContains < maxContains < actual | PASS | {"keyword":"contains","instancePath":"","schemaPath":"#/contains","message":"must contain at least 1 and no more than 3 valid item(s)"} |
| draft2020-12:maxContains.json#/groups/4/tests/1 | one matching item | PASS | {"keyword":"contains","instancePath":"","schemaPath":"#/contains","message":"must contain at least 0 and no more than 0 valid item(s)"} |
| draft2020-12:maximum.json#/groups/0/tests/2 | above the maximum is invalid | PASS | {"keyword":"maximum","instancePath":"","schemaPath":"#/maximum","message":"must be <= 3"} |
| draft2020-12:maximum.json#/groups/1/tests/3 | above the maximum is invalid | PASS | {"keyword":"maximum","instancePath":"","schemaPath":"#/maximum","message":"must be <= 300"} |
| draft2020-12:maxItems.json#/groups/0/tests/2 | too long is invalid | PASS | {"keyword":"maxItems","instancePath":"","schemaPath":"#/maxItems","message":"must NOT have more than 2 items"} |
| draft2020-12:maxItems.json#/groups/1/tests/1 | too long is invalid | PASS | {"keyword":"maxItems","instancePath":"","schemaPath":"#/maxItems","message":"must NOT have more than 2 items"} |
| draft2020-12:maxLength.json#/groups/0/tests/2 | too long is invalid | PASS | {"keyword":"maxLength","instancePath":"","schemaPath":"#/maxLength","message":"must NOT have more than 2 characters"} |
| draft2020-12:maxLength.json#/groups/1/tests/1 | too long is invalid | PASS | {"keyword":"maxLength","instancePath":"","schemaPath":"#/maxLength","message":"must NOT have more than 2 characters"} |
| draft2020-12:maxProperties.json#/groups/0/tests/2 | too long is invalid | PASS | {"keyword":"maxProperties","instancePath":"","schemaPath":"#/maxProperties","message":"must NOT have more than 2 properties"} |
| draft2020-12:maxProperties.json#/groups/1/tests/1 | too long is invalid | PASS | {"keyword":"maxProperties","instancePath":"","schemaPath":"#/maxProperties","message":"must NOT have more than 2 properties"} |
| draft2020-12:maxProperties.json#/groups/2/tests/1 | one property is invalid | PASS | {"keyword":"maxProperties","instancePath":"","schemaPath":"#/maxProperties","message":"must NOT have more than 0 properties"} |
| draft2020-12:minContains.json#/groups/1/tests/0 | empty data | PASS | {"keyword":"contains","instancePath":"","schemaPath":"#/contains","message":"must contain at least 1 valid item(s)"} |
| draft2020-12:minContains.json#/groups/1/tests/1 | no elements match | PASS | {"keyword":"const","instancePath":"/0","schemaPath":"#/contains/const","message":"must be equal to constant"} |
| draft2020-12:minContains.json#/groups/2/tests/0 | empty data | PASS | {"keyword":"contains","instancePath":"","schemaPath":"#/contains","message":"must contain at least 2 valid item(s)"} |
| draft2020-12:minContains.json#/groups/2/tests/1 | all elements match, invalid minContains | PASS | {"keyword":"contains","instancePath":"","schemaPath":"#/contains","message":"must contain at least 2 valid item(s)"} |
| draft2020-12:minContains.json#/groups/2/tests/2 | some elements match, invalid minContains | PASS | {"keyword":"const","instancePath":"/1","schemaPath":"#/contains/const","message":"must be equal to constant"} |
| draft2020-12:minContains.json#/groups/3/tests/0 | one element matches, invalid minContains | PASS | {"keyword":"contains","instancePath":"","schemaPath":"#/contains","message":"must contain at least 2 valid item(s)"} |
| draft2020-12:minContains.json#/groups/4/tests/0 | empty data | PASS | {"keyword":"contains","instancePath":"","schemaPath":"#/contains","message":"must contain at least 2 and no more than 2 valid item(s)"} |
| draft2020-12:minContains.json#/groups/4/tests/1 | all elements match, invalid minContains | PASS | {"keyword":"contains","instancePath":"","schemaPath":"#/contains","message":"must contain at least 2 and no more than 2 valid item(s)"} |
| draft2020-12:minContains.json#/groups/4/tests/2 | all elements match, invalid maxContains | PASS | {"keyword":"contains","instancePath":"","schemaPath":"#/contains","message":"must contain at least 2 and no more than 2 valid item(s)"} |
| draft2020-12:minContains.json#/groups/5/tests/0 | empty data | PASS | {"keyword":"contains","instancePath":"","schemaPath":"#/contains","message":"must contain at least 3 and no more than 1 valid item(s)"} |
| draft2020-12:minContains.json#/groups/5/tests/1 | invalid minContains | PASS | {"keyword":"contains","instancePath":"","schemaPath":"#/contains","message":"must contain at least 3 and no more than 1 valid item(s)"} |
| draft2020-12:minContains.json#/groups/5/tests/2 | invalid maxContains | PASS | {"keyword":"contains","instancePath":"","schemaPath":"#/contains","message":"must contain at least 3 and no more than 1 valid item(s)"} |
| draft2020-12:minContains.json#/groups/5/tests/3 | invalid maxContains and minContains | PASS | {"keyword":"contains","instancePath":"","schemaPath":"#/contains","message":"must contain at least 3 and no more than 1 valid item(s)"} |
| draft2020-12:minContains.json#/groups/7/tests/2 | too many | PASS | {"keyword":"contains","instancePath":"","schemaPath":"#/contains","message":"must contain at least 0 and no more than 1 valid item(s)"} |
| draft2020-12:minimum.json#/groups/0/tests/2 | below the minimum is invalid | PASS | {"keyword":"minimum","instancePath":"","schemaPath":"#/minimum","message":"must be >= 1.1"} |
| draft2020-12:minimum.json#/groups/1/tests/4 | float below the minimum is invalid | PASS | {"keyword":"minimum","instancePath":"","schemaPath":"#/minimum","message":"must be >= -2"} |
| draft2020-12:minimum.json#/groups/1/tests/5 | int below the minimum is invalid | PASS | {"keyword":"minimum","instancePath":"","schemaPath":"#/minimum","message":"must be >= -2"} |
| draft2020-12:minItems.json#/groups/0/tests/2 | too short is invalid | PASS | {"keyword":"minItems","instancePath":"","schemaPath":"#/minItems","message":"must NOT have fewer than 1 items"} |
| draft2020-12:minItems.json#/groups/1/tests/1 | too short is invalid | PASS | {"keyword":"minItems","instancePath":"","schemaPath":"#/minItems","message":"must NOT have fewer than 1 items"} |
| draft2020-12:minLength.json#/groups/0/tests/2 | too short is invalid | PASS | {"keyword":"minLength","instancePath":"","schemaPath":"#/minLength","message":"must NOT have fewer than 2 characters"} |
| draft2020-12:minLength.json#/groups/0/tests/4 | one grapheme is not long enough | PASS | {"keyword":"minLength","instancePath":"","schemaPath":"#/minLength","message":"must NOT have fewer than 2 characters"} |
| draft2020-12:minLength.json#/groups/1/tests/1 | too short is invalid | PASS | {"keyword":"minLength","instancePath":"","schemaPath":"#/minLength","message":"must NOT have fewer than 2 characters"} |
| draft2020-12:minProperties.json#/groups/0/tests/2 | too short is invalid | PASS | {"keyword":"minProperties","instancePath":"","schemaPath":"#/minProperties","message":"must NOT have fewer than 1 properties"} |
| draft2020-12:minProperties.json#/groups/1/tests/1 | too short is invalid | PASS | {"keyword":"minProperties","instancePath":"","schemaPath":"#/minProperties","message":"must NOT have fewer than 1 properties"} |
| draft2020-12:multipleOf.json#/groups/0/tests/1 | int by int fail | PASS | {"keyword":"multipleOf","instancePath":"","schemaPath":"#/multipleOf","message":"must be multiple of 2"} |
| draft2020-12:multipleOf.json#/groups/1/tests/3 | 35 is not multiple of 1.5 | PASS | {"keyword":"multipleOf","instancePath":"","schemaPath":"#/multipleOf","message":"must be multiple of 1.5"} |
| draft2020-12:multipleOf.json#/groups/2/tests/1 | 0.00751 is not multiple of 0.0001 | PASS | {"keyword":"multipleOf","instancePath":"","schemaPath":"#/multipleOf","message":"must be multiple of 0.0001"} |
| draft2020-12:multipleOf.json#/groups/3/tests/0 | always invalid, but naive implementations may raise an overflow error | PASS | {"keyword":"multipleOf","instancePath":"","schemaPath":"#/multipleOf","message":"must be multiple of 0.123456789"} |
| draft2020-12:not.json#/groups/0/tests/1 | disallowed | PASS | {"keyword":"not","instancePath":"","schemaPath":"#/not","message":"must NOT be valid"} |
| draft2020-12:not.json#/groups/1/tests/1 | mismatch | PASS | {"keyword":"not","instancePath":"","schemaPath":"#/not","message":"must NOT be valid"} |
| draft2020-12:not.json#/groups/1/tests/2 | other mismatch | PASS | {"keyword":"not","instancePath":"","schemaPath":"#/not","message":"must NOT be valid"} |
| draft2020-12:not.json#/groups/2/tests/2 | mismatch | PASS | {"keyword":"not","instancePath":"","schemaPath":"#/not","message":"must NOT be valid"} |
| draft2020-12:not.json#/groups/3/tests/0 | property present | PASS | {"keyword":"not","instancePath":"/foo","schemaPath":"#/properties/foo/not","message":"must NOT be valid"} |
| draft2020-12:not.json#/groups/4/tests/0 | number is invalid | PASS | {"keyword":"not","instancePath":"","schemaPath":"#/not","message":"must NOT be valid"} |
| draft2020-12:not.json#/groups/4/tests/1 | string is invalid | PASS | {"keyword":"not","instancePath":"","schemaPath":"#/not","message":"must NOT be valid"} |
| draft2020-12:not.json#/groups/4/tests/2 | boolean true is invalid | PASS | {"keyword":"not","instancePath":"","schemaPath":"#/not","message":"must NOT be valid"} |
| draft2020-12:not.json#/groups/4/tests/3 | boolean false is invalid | PASS | {"keyword":"not","instancePath":"","schemaPath":"#/not","message":"must NOT be valid"} |
| draft2020-12:not.json#/groups/4/tests/4 | null is invalid | PASS | {"keyword":"not","instancePath":"","schemaPath":"#/not","message":"must NOT be valid"} |
| draft2020-12:not.json#/groups/4/tests/5 | object is invalid | PASS | {"keyword":"not","instancePath":"","schemaPath":"#/not","message":"must NOT be valid"} |
| draft2020-12:not.json#/groups/4/tests/6 | empty object is invalid | PASS | {"keyword":"not","instancePath":"","schemaPath":"#/not","message":"must NOT be valid"} |
| draft2020-12:not.json#/groups/4/tests/7 | array is invalid | PASS | {"keyword":"not","instancePath":"","schemaPath":"#/not","message":"must NOT be valid"} |
| draft2020-12:not.json#/groups/4/tests/8 | empty array is invalid | PASS | {"keyword":"not","instancePath":"","schemaPath":"#/not","message":"must NOT be valid"} |
| draft2020-12:not.json#/groups/5/tests/0 | number is invalid | PASS | {"keyword":"not","instancePath":"","schemaPath":"#/not","message":"must NOT be valid"} |
| draft2020-12:not.json#/groups/5/tests/1 | string is invalid | PASS | {"keyword":"not","instancePath":"","schemaPath":"#/not","message":"must NOT be valid"} |
| draft2020-12:not.json#/groups/5/tests/2 | boolean true is invalid | PASS | {"keyword":"not","instancePath":"","schemaPath":"#/not","message":"must NOT be valid"} |
| draft2020-12:not.json#/groups/5/tests/3 | boolean false is invalid | PASS | {"keyword":"not","instancePath":"","schemaPath":"#/not","message":"must NOT be valid"} |
| draft2020-12:not.json#/groups/5/tests/4 | null is invalid | PASS | {"keyword":"not","instancePath":"","schemaPath":"#/not","message":"must NOT be valid"} |
| draft2020-12:not.json#/groups/5/tests/5 | object is invalid | PASS | {"keyword":"not","instancePath":"","schemaPath":"#/not","message":"must NOT be valid"} |
| draft2020-12:not.json#/groups/5/tests/6 | empty object is invalid | PASS | {"keyword":"not","instancePath":"","schemaPath":"#/not","message":"must NOT be valid"} |
| draft2020-12:not.json#/groups/5/tests/7 | array is invalid | PASS | {"keyword":"not","instancePath":"","schemaPath":"#/not","message":"must NOT be valid"} |
| draft2020-12:not.json#/groups/5/tests/8 | empty array is invalid | PASS | {"keyword":"not","instancePath":"","schemaPath":"#/not","message":"must NOT be valid"} |
| draft2020-12:not.json#/groups/8/tests/1 | annotations are still collected inside a 'not' | PASS | {"keyword":"not","instancePath":"","schemaPath":"#/not","message":"must NOT be valid"} |
| draft2020-12:oneOf.json#/groups/0/tests/2 | both oneOf valid | PASS | {"keyword":"oneOf","instancePath":"","schemaPath":"#/oneOf","message":"must match exactly one schema in oneOf"} |
| draft2020-12:oneOf.json#/groups/0/tests/3 | neither oneOf valid | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/oneOf/0/type","message":"must be integer"} |
| draft2020-12:oneOf.json#/groups/1/tests/0 | mismatch base schema | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be string"} |
| draft2020-12:oneOf.json#/groups/1/tests/2 | both oneOf valid | PASS | {"keyword":"oneOf","instancePath":"","schemaPath":"#/oneOf","message":"must match exactly one schema in oneOf"} |
| draft2020-12:oneOf.json#/groups/2/tests/0 | any value is invalid | PASS | {"keyword":"oneOf","instancePath":"","schemaPath":"#/oneOf","message":"must match exactly one schema in oneOf"} |
| draft2020-12:oneOf.json#/groups/4/tests/0 | any value is invalid | PASS | {"keyword":"oneOf","instancePath":"","schemaPath":"#/oneOf","message":"must match exactly one schema in oneOf"} |
| draft2020-12:oneOf.json#/groups/5/tests/0 | any value is invalid | PASS | {"keyword":"false schema","instancePath":"","schemaPath":"#/oneOf/0/false schema","message":"boolean schema is false"} |
| draft2020-12:oneOf.json#/groups/6/tests/2 | both oneOf valid (complex) | PASS | {"keyword":"oneOf","instancePath":"","schemaPath":"#/oneOf","message":"must match exactly one schema in oneOf"} |
| draft2020-12:oneOf.json#/groups/6/tests/3 | neither oneOf valid (complex) | PASS | {"keyword":"type","instancePath":"/bar","schemaPath":"#/oneOf/0/properties/bar/type","message":"must be integer"} |
| draft2020-12:oneOf.json#/groups/7/tests/1 | both valid - invalid | PASS | {"keyword":"oneOf","instancePath":"","schemaPath":"#/oneOf","message":"must match exactly one schema in oneOf"} |
| draft2020-12:oneOf.json#/groups/8/tests/0 | both invalid - invalid | PASS | {"keyword":"required","instancePath":"","schemaPath":"#/oneOf/0/required","message":"must have required property 'foo'"} |
| draft2020-12:oneOf.json#/groups/8/tests/3 | both valid - invalid | PASS | {"keyword":"oneOf","instancePath":"","schemaPath":"#/oneOf","message":"must match exactly one schema in oneOf"} |
| draft2020-12:oneOf.json#/groups/9/tests/2 | both oneOf valid | PASS | {"keyword":"oneOf","instancePath":"","schemaPath":"#/oneOf","message":"must match exactly one schema in oneOf"} |
| draft2020-12:oneOf.json#/groups/9/tests/3 | neither oneOf valid | PASS | {"keyword":"required","instancePath":"","schemaPath":"#/oneOf/0/required","message":"must have required property 'bar'"} |
| draft2020-12:oneOf.json#/groups/10/tests/1 | anything non-null is invalid | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/oneOf/0/oneOf/0/type","message":"must be null"} |
| draft2020-12:optional/anchor.json#/groups/0/tests/1 | in implementations that strip $anchor, this may match either $def | PASS | {"keyword":"enum","instancePath":"","schemaPath":"#/$defs/anchor_in_enum/enum","message":"must be equal to one of the allowed values"} |
| draft2020-12:optional/anchor.json#/groups/0/tests/3 | no match on enum or $ref to $anchor | PASS | {"keyword":"enum","instancePath":"","schemaPath":"#/$defs/anchor_in_enum/enum","message":"must be equal to one of the allowed values"} |
| draft2020-12:optional/bignum.json#/groups/2/tests/0 | a bignum is not a string | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be string"} |
| draft2020-12:optional/bignum.json#/groups/4/tests/0 | comparison works for high numbers | PASS | {"keyword":"exclusiveMaximum","instancePath":"","schemaPath":"#/exclusiveMaximum","message":"must be < 9.727837981879871e+26"} |
| draft2020-12:optional/bignum.json#/groups/6/tests/0 | comparison works for very negative numbers | PASS | {"keyword":"exclusiveMinimum","instancePath":"","schemaPath":"#/exclusiveMinimum","message":"must be > -9.727837981879871e+26"} |
| draft2020-12:optional/cross-draft.json#/groups/0/tests/0 | first item not a string is valid | COMPILE | FAST_SETUP_ERROR: no schema with key or ref "https://json-schema.org/draft/2019-09/schema" |
| draft2020-12:optional/dependencies-compatibility.json#/groups/0/tests/3 | missing dependency | PASS | {"keyword":"dependencies","instancePath":"","schemaPath":"#/dependencies","message":"must have property foo when property bar is present"} |
| draft2020-12:optional/dependencies-compatibility.json#/groups/2/tests/3 | missing dependency | PASS | {"keyword":"dependencies","instancePath":"","schemaPath":"#/dependencies","message":"must have properties foo, bar when property quux is present"} |
| draft2020-12:optional/dependencies-compatibility.json#/groups/2/tests/4 | missing other dependency | PASS | {"keyword":"dependencies","instancePath":"","schemaPath":"#/dependencies","message":"must have properties foo, bar when property quux is present"} |
| draft2020-12:optional/dependencies-compatibility.json#/groups/2/tests/5 | missing both dependencies | PASS | {"keyword":"dependencies","instancePath":"","schemaPath":"#/dependencies","message":"must have properties foo, bar when property quux is present"} |
| draft2020-12:optional/dependencies-compatibility.json#/groups/3/tests/2 | CRLF missing dependent | PASS | {"keyword":"dependencies","instancePath":"","schemaPath":"#/dependencies","message":"must have property foo\rbar when property foo\nbar is present"} |
| draft2020-12:optional/dependencies-compatibility.json#/groups/3/tests/3 | quoted quotes missing dependent | PASS | {"keyword":"dependencies","instancePath":"","schemaPath":"#/dependencies","message":"must have property foo'bar when property foo\"bar is present"} |
| draft2020-12:optional/dependencies-compatibility.json#/groups/4/tests/2 | wrong type | PASS | {"keyword":"type","instancePath":"/foo","schemaPath":"#/dependencies/bar/properties/foo/type","message":"must be integer"} |
| draft2020-12:optional/dependencies-compatibility.json#/groups/4/tests/3 | wrong type other | PASS | {"keyword":"type","instancePath":"/bar","schemaPath":"#/dependencies/bar/properties/bar/type","message":"must be integer"} |
| draft2020-12:optional/dependencies-compatibility.json#/groups/4/tests/4 | wrong type both | PASS | {"keyword":"type","instancePath":"/foo","schemaPath":"#/dependencies/bar/properties/foo/type","message":"must be integer"} |
| draft2020-12:optional/dependencies-compatibility.json#/groups/5/tests/1 | object with property having schema false is invalid | PASS | {"keyword":"false schema","instancePath":"","schemaPath":"#/dependencies/bar/false schema","message":"boolean schema is false"} |
| draft2020-12:optional/dependencies-compatibility.json#/groups/5/tests/2 | object with both properties is invalid | PASS | {"keyword":"false schema","instancePath":"","schemaPath":"#/dependencies/bar/false schema","message":"boolean schema is false"} |
| draft2020-12:optional/dependencies-compatibility.json#/groups/6/tests/1 | quoted quote | PASS | {"keyword":"required","instancePath":"","schemaPath":"#/dependencies/foo'bar/required","message":"must have required property 'foo\"bar'"} |
| draft2020-12:optional/dependencies-compatibility.json#/groups/6/tests/2 | quoted tab invalid under dependent schema | PASS | {"keyword":"minProperties","instancePath":"","schemaPath":"#/dependencies/foo%09bar/minProperties","message":"must NOT have fewer than 4 properties"} |
| draft2020-12:optional/dependencies-compatibility.json#/groups/6/tests/3 | quoted quote invalid under dependent schema | PASS | {"keyword":"required","instancePath":"","schemaPath":"#/dependencies/foo'bar/required","message":"must have required property 'foo\"bar'"} |
| draft2020-12:optional/dynamicRef.json#/groups/0/tests/0 | integer property passes | WRONG | {"keyword":"type","instancePath":"/bar-item/content","schemaPath":"#/type","message":"must be object"} |
| draft2020-12:optional/dynamicRef.json#/groups/0/tests/1 | string property fails | PASS | {"keyword":"type","instancePath":"/bar-item/content","schemaPath":"#/type","message":"must be object"} |
| draft2020-12:optional/ecmascript-regex.json#/groups/0/tests/0 | matches in Python, but not in ECMA 262 | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/pattern","message":"must match pattern \"^abc$\""} |
| draft2020-12:optional/ecmascript-regex.json#/groups/1/tests/0 | does not match | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/pattern","message":"must match pattern \"^\\t$\""} |
| draft2020-12:optional/ecmascript-regex.json#/groups/2/tests/0 | does not match | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/pattern","message":"must match pattern \"^\\cC$\""} |
| draft2020-12:optional/ecmascript-regex.json#/groups/3/tests/0 | does not match | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/pattern","message":"must match pattern \"^\\cc$\""} |
| draft2020-12:optional/ecmascript-regex.json#/groups/4/tests/1 | NKO DIGIT ZERO does not match (unlike e.g. Python) | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/pattern","message":"must match pattern \"^\\d$\""} |
| draft2020-12:optional/ecmascript-regex.json#/groups/4/tests/2 | NKO DIGIT ZERO (as \u escape) does not match | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/pattern","message":"must match pattern \"^\\d$\""} |
| draft2020-12:optional/ecmascript-regex.json#/groups/5/tests/0 | ASCII zero does not match | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/pattern","message":"must match pattern \"^\\D$\""} |
| draft2020-12:optional/ecmascript-regex.json#/groups/6/tests/1 | latin-1 e-acute does not match (unlike e.g. Python) | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/pattern","message":"must match pattern \"^\\w$\""} |
| draft2020-12:optional/ecmascript-regex.json#/groups/7/tests/0 | ASCII 'a' does not match | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/pattern","message":"must match pattern \"^\\W$\""} |
| draft2020-12:optional/ecmascript-regex.json#/groups/8/tests/9 | Non-whitespace control does not match | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/pattern","message":"must match pattern \"^\\s$\""} |
| draft2020-12:optional/ecmascript-regex.json#/groups/8/tests/10 | Non-whitespace does not match | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/pattern","message":"must match pattern \"^\\s$\""} |
| draft2020-12:optional/ecmascript-regex.json#/groups/9/tests/0 | ASCII space does not match | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/pattern","message":"must match pattern \"^\\S$\""} |
| draft2020-12:optional/ecmascript-regex.json#/groups/9/tests/1 | Character tabulation does not match | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/pattern","message":"must match pattern \"^\\S$\""} |
| draft2020-12:optional/ecmascript-regex.json#/groups/9/tests/2 | Line tabulation does not match | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/pattern","message":"must match pattern \"^\\S$\""} |
| draft2020-12:optional/ecmascript-regex.json#/groups/9/tests/3 | Form feed does not match | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/pattern","message":"must match pattern \"^\\S$\""} |
| draft2020-12:optional/ecmascript-regex.json#/groups/9/tests/4 | latin-1 non-breaking-space does not match | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/pattern","message":"must match pattern \"^\\S$\""} |
| draft2020-12:optional/ecmascript-regex.json#/groups/9/tests/5 | zero-width whitespace does not match | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/pattern","message":"must match pattern \"^\\S$\""} |
| draft2020-12:optional/ecmascript-regex.json#/groups/9/tests/6 | line feed does not match (line terminator) | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/pattern","message":"must match pattern \"^\\S$\""} |
| draft2020-12:optional/ecmascript-regex.json#/groups/9/tests/7 | paragraph separator does not match (line terminator) | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/pattern","message":"must match pattern \"^\\S$\""} |
| draft2020-12:optional/ecmascript-regex.json#/groups/9/tests/8 | EM SPACE does not match (Space_Separator) | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/pattern","message":"must match pattern \"^\\S$\""} |
| draft2020-12:optional/ecmascript-regex.json#/groups/10/tests/3 | unicode matching is case-sensitive | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/pattern","message":"must match pattern \"\\p{Letter}cole\""} |
| draft2020-12:optional/ecmascript-regex.json#/groups/11/tests/1 | literal unicode character in json string | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/pattern","message":"must match pattern \"\\wcole\""} |
| draft2020-12:optional/ecmascript-regex.json#/groups/11/tests/2 | unicode character in hex format in string | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/pattern","message":"must match pattern \"\\wcole\""} |
| draft2020-12:optional/ecmascript-regex.json#/groups/11/tests/3 | unicode matching is case-sensitive | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/pattern","message":"must match pattern \"\\wcole\""} |
| draft2020-12:optional/ecmascript-regex.json#/groups/12/tests/0 | literal unicode character in json string | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/pattern","message":"must match pattern \"[a-z]cole\""} |
| draft2020-12:optional/ecmascript-regex.json#/groups/12/tests/1 | unicode character in hex format in string | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/pattern","message":"must match pattern \"[a-z]cole\""} |
| draft2020-12:optional/ecmascript-regex.json#/groups/13/tests/1 | ascii non-digits | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/pattern","message":"must match pattern \"^\\d+$\""} |
| draft2020-12:optional/ecmascript-regex.json#/groups/13/tests/2 | non-ascii digits (BENGALI DIGIT FOUR, BENGALI DIGIT TWO) | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/pattern","message":"must match pattern \"^\\d+$\""} |
| draft2020-12:optional/ecmascript-regex.json#/groups/14/tests/1 | ascii non-digits | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/pattern","message":"must match pattern \"^\\p{digit}+$\""} |
| draft2020-12:optional/ecmascript-regex.json#/groups/15/tests/3 | unicode matching is case-sensitive | PASS | {"keyword":"additionalProperties","instancePath":"","schemaPath":"#/additionalProperties","message":"must NOT have additional properties"} |
| draft2020-12:optional/ecmascript-regex.json#/groups/16/tests/1 | literal unicode character in json string | PASS | {"keyword":"additionalProperties","instancePath":"","schemaPath":"#/additionalProperties","message":"must NOT have additional properties"} |
| draft2020-12:optional/ecmascript-regex.json#/groups/16/tests/2 | unicode character in hex format in string | PASS | {"keyword":"additionalProperties","instancePath":"","schemaPath":"#/additionalProperties","message":"must NOT have additional properties"} |
| draft2020-12:optional/ecmascript-regex.json#/groups/16/tests/3 | unicode matching is case-sensitive | PASS | {"keyword":"additionalProperties","instancePath":"","schemaPath":"#/additionalProperties","message":"must NOT have additional properties"} |
| draft2020-12:optional/ecmascript-regex.json#/groups/17/tests/0 | literal unicode character in json string | PASS | {"keyword":"additionalProperties","instancePath":"","schemaPath":"#/additionalProperties","message":"must NOT have additional properties"} |
| draft2020-12:optional/ecmascript-regex.json#/groups/17/tests/1 | unicode character in hex format in string | PASS | {"keyword":"additionalProperties","instancePath":"","schemaPath":"#/additionalProperties","message":"must NOT have additional properties"} |
| draft2020-12:optional/ecmascript-regex.json#/groups/18/tests/1 | ascii non-digits | PASS | {"keyword":"additionalProperties","instancePath":"","schemaPath":"#/additionalProperties","message":"must NOT have additional properties"} |
| draft2020-12:optional/ecmascript-regex.json#/groups/18/tests/2 | non-ascii digits (BENGALI DIGIT FOUR, BENGALI DIGIT TWO) | PASS | {"keyword":"additionalProperties","instancePath":"","schemaPath":"#/additionalProperties","message":"must NOT have additional properties"} |
| draft2020-12:optional/ecmascript-regex.json#/groups/19/tests/1 | ascii non-digits | PASS | {"keyword":"additionalProperties","instancePath":"","schemaPath":"#/additionalProperties","message":"must NOT have additional properties"} |
| draft2020-12:optional/float-overflow.json#/groups/0/tests/0 | valid if optional overflow handling is implemented | WRONG | {"keyword":"multipleOf","instancePath":"","schemaPath":"#/multipleOf","message":"must be multiple of 0.5"} |
| draft2020-12:optional/format-assertion.json#/groups/0/tests/0 | format-assertion: false: valid string | COMPILE | FAST_SETUP_ERROR: can't resolve reference https://json-schema.org/draft/2020-12/meta/format-assertion from id http://localhost:1234/draft2020-12/format-assertion-false.json |
| draft2020-12:optional/format-assertion.json#/groups/0/tests/1 | format-assertion: false: invalid string | COMPILE | FAST_SETUP_ERROR: can't resolve reference https://json-schema.org/draft/2020-12/meta/format-assertion from id http://localhost:1234/draft2020-12/format-assertion-false.json |
| draft2020-12:optional/format-assertion.json#/groups/1/tests/0 | format-assertion: true: valid string | COMPILE | FAST_SETUP_ERROR: can't resolve reference https://json-schema.org/draft/2020-12/meta/format-assertion from id http://localhost:1234/draft2020-12/format-assertion-true.json |
| draft2020-12:optional/format-assertion.json#/groups/1/tests/1 | format-assertion: true: invalid string | COMPILE | FAST_SETUP_ERROR: can't resolve reference https://json-schema.org/draft/2020-12/meta/format-assertion from id http://localhost:1234/draft2020-12/format-assertion-true.json |
| draft2020-12:optional/format/date-time.json#/groups/0/tests/12 | an invalid date-time past leap second, UTC | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date-time\""} |
| draft2020-12:optional/format/date-time.json#/groups/0/tests/13 | an invalid date-time with leap second on a wrong minute, UTC | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date-time\""} |
| draft2020-12:optional/format/date-time.json#/groups/0/tests/14 | an invalid date-time with leap second on a wrong hour, UTC | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date-time\""} |
| draft2020-12:optional/format/date-time.json#/groups/0/tests/15 | an invalid day in date-time string | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date-time\""} |
| draft2020-12:optional/format/date-time.json#/groups/0/tests/16 | an invalid offset in date-time string | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date-time\""} |
| draft2020-12:optional/format/date-time.json#/groups/0/tests/17 | an invalid closing Z after time-zone offset | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date-time\""} |
| draft2020-12:optional/format/date-time.json#/groups/0/tests/18 | an invalid hour in date-time string | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date-time\""} |
| draft2020-12:optional/format/date-time.json#/groups/0/tests/19 | an invalid minute in date-time string | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date-time\""} |
| draft2020-12:optional/format/date-time.json#/groups/0/tests/20 | an invalid offset minute in date-time string | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date-time\""} |
| draft2020-12:optional/format/date-time.json#/groups/0/tests/21 | an invalid date-time string | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date-time\""} |
| draft2020-12:optional/format/date-time.json#/groups/0/tests/23 | only RFC3339 not all of ISO 8601 are valid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date-time\""} |
| draft2020-12:optional/format/date-time.json#/groups/0/tests/24 | invalid non-padded month dates | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date-time\""} |
| draft2020-12:optional/format/date-time.json#/groups/0/tests/25 | invalid non-padded day dates | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date-time\""} |
| draft2020-12:optional/format/date-time.json#/groups/0/tests/26 | invalid non-ASCII '৪' (a Bengali 4) in date portion | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date-time\""} |
| draft2020-12:optional/format/date-time.json#/groups/0/tests/27 | invalid non-ASCII '৪' (a Bengali 4) in time portion | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date-time\""} |
| draft2020-12:optional/format/date-time.json#/groups/0/tests/28 | invalid extended year | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date-time\""} |
| draft2020-12:optional/format/date.json#/groups/0/tests/8 | a invalid date string with 32 days in January | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date\""} |
| draft2020-12:optional/format/date.json#/groups/0/tests/10 | a invalid date string with 30 days in February (leap) | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date\""} |
| draft2020-12:optional/format/date.json#/groups/0/tests/12 | a invalid date string with 32 days in March | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date\""} |
| draft2020-12:optional/format/date.json#/groups/0/tests/14 | a invalid date string with 31 days in April | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date\""} |
| draft2020-12:optional/format/date.json#/groups/0/tests/16 | a invalid date string with 32 days in May | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date\""} |
| draft2020-12:optional/format/date.json#/groups/0/tests/18 | a invalid date string with 31 days in June | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date\""} |
| draft2020-12:optional/format/date.json#/groups/0/tests/20 | a invalid date string with 32 days in July | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date\""} |
| draft2020-12:optional/format/date.json#/groups/0/tests/22 | a invalid date string with 32 days in August | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date\""} |
| draft2020-12:optional/format/date.json#/groups/0/tests/24 | a invalid date string with 31 days in September | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date\""} |
| draft2020-12:optional/format/date.json#/groups/0/tests/26 | a invalid date string with 32 days in October | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date\""} |
| draft2020-12:optional/format/date.json#/groups/0/tests/28 | a invalid date string with 31 days in November | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date\""} |
| draft2020-12:optional/format/date.json#/groups/0/tests/30 | a invalid date string with 32 days in December | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date\""} |
| draft2020-12:optional/format/date.json#/groups/0/tests/31 | an invalid date string | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date\""} |
| draft2020-12:optional/format/date.json#/groups/0/tests/32 | only RFC3339 not all of ISO 8601 are valid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date\""} |
| draft2020-12:optional/format/date.json#/groups/0/tests/33 | non-padded month dates are not valid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date\""} |
| draft2020-12:optional/format/date.json#/groups/0/tests/34 | non-padded day dates are not valid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date\""} |
| draft2020-12:optional/format/date.json#/groups/0/tests/35 | invalid month | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date\""} |
| draft2020-12:optional/format/date.json#/groups/0/tests/36 | 2021 is not a leap year | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date\""} |
| draft2020-12:optional/format/date.json#/groups/0/tests/38 | invalid non-ASCII '৪' (a Bengali 4) | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date\""} |
| draft2020-12:optional/format/date.json#/groups/0/tests/39 | invalid: non-ASCII Bengali digit in month field | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date\""} |
| draft2020-12:optional/format/date.json#/groups/0/tests/40 | ISO8601 / non-RFC3339: YYYYMMDD without dashes (2023-03-28) | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date\""} |
| draft2020-12:optional/format/date.json#/groups/0/tests/41 | ISO8601 / non-RFC3339: week number implicit day of week (2023-01-02) | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date\""} |
| draft2020-12:optional/format/date.json#/groups/0/tests/42 | ISO8601 / non-RFC3339: week number with day of week (2023-03-28) | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date\""} |
| draft2020-12:optional/format/date.json#/groups/0/tests/43 | ISO8601 / non-RFC3339: week number rollover to next year (2023-01-01) | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date\""} |
| draft2020-12:optional/format/date.json#/groups/0/tests/44 | an invalid time string in date-time format | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date\""} |
| draft2020-12:optional/format/date.json#/groups/0/tests/45 | century year 0100 is not a leap year | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date\""} |
| draft2020-12:optional/format/date.json#/groups/0/tests/47 | century year 2100 is not a leap year | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date\""} |
| draft2020-12:optional/format/date.json#/groups/0/tests/48 | invalid: leading whitespace is not permitted | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date\""} |
| draft2020-12:optional/format/date.json#/groups/0/tests/49 | invalid: trailing whitespace is not permitted | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date\""} |
| draft2020-12:optional/format/date.json#/groups/0/tests/50 | invalid: month 00 is not valid per date-month range 01-12 | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date\""} |
| draft2020-12:optional/format/date.json#/groups/0/tests/51 | invalid: day 00 is not valid per date-mday minimum of 01 | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date\""} |
| draft2020-12:optional/format/date.json#/groups/0/tests/52 | invalid: empty string | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date\""} |
| draft2020-12:optional/format/date.json#/groups/0/tests/53 | invalid: embedded whitespace between year and month | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date\""} |
| draft2020-12:optional/format/date.json#/groups/0/tests/54 | invalid: trailing character after valid full-date | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date\""} |
| draft2020-12:optional/format/date.json#/groups/0/tests/55 | invalid: trailing Z after full-date | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date\""} |
| draft2020-12:optional/format/date.json#/groups/0/tests/56 | invalid: full-date followed by space and time component | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date\""} |
| draft2020-12:optional/format/date.json#/groups/0/tests/58 | invalid: two-digit year (N-2 digits) | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date\""} |
| draft2020-12:optional/format/date.json#/groups/0/tests/59 | invalid: three-digit year (N-1 digits) | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date\""} |
| draft2020-12:optional/format/date.json#/groups/0/tests/60 | invalid: five-digit year (N+1 digits) | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date\""} |
| draft2020-12:optional/format/date.json#/groups/0/tests/61 | invalid: positive sign prefix on year | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date\""} |
| draft2020-12:optional/format/date.json#/groups/0/tests/62 | invalid: negative sign prefix on year | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date\""} |
| draft2020-12:optional/format/date.json#/groups/0/tests/63 | invalid: non-ASCII Bengali digit in year field | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date\""} |
| draft2020-12:optional/format/date.json#/groups/0/tests/64 | invalid: alphabetic characters in year field | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date\""} |
| draft2020-12:optional/format/date.json#/groups/0/tests/65 | invalid: three-digit month (N+1 digits) | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date\""} |
| draft2020-12:optional/format/date.json#/groups/0/tests/66 | invalid: alphabetic characters in month field | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date\""} |
| draft2020-12:optional/format/date.json#/groups/0/tests/67 | invalid: three-digit day (N+1 digits) | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date\""} |
| draft2020-12:optional/format/date.json#/groups/0/tests/68 | invalid: alphabetic characters in day field | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date\""} |
| draft2020-12:optional/format/date.json#/groups/0/tests/69 | invalid: colon separators | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date\""} |
| draft2020-12:optional/format/date.json#/groups/0/tests/70 | invalid: dot separators | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date\""} |
| draft2020-12:optional/format/date.json#/groups/0/tests/71 | invalid: space separators | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date\""} |
| draft2020-12:optional/format/date.json#/groups/0/tests/72 | invalid: mixed slash and hyphen separators | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date\""} |
| draft2020-12:optional/format/date.json#/groups/0/tests/73 | invalid: duplicated first hyphen | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date\""} |
| draft2020-12:optional/format/date.json#/groups/0/tests/74 | invalid: duplicated second hyphen | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date\""} |
| draft2020-12:optional/format/duration.json#/groups/0/tests/7 | an invalid duration string | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"duration\""} |
| draft2020-12:optional/format/duration.json#/groups/0/tests/8 | must start with P | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"duration\""} |
| draft2020-12:optional/format/duration.json#/groups/0/tests/9 | no elements present | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"duration\""} |
| draft2020-12:optional/format/duration.json#/groups/0/tests/10 | no time elements present | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"duration\""} |
| draft2020-12:optional/format/duration.json#/groups/0/tests/11 | no date or time elements present | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"duration\""} |
| draft2020-12:optional/format/duration.json#/groups/0/tests/12 | elements out of order | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"duration\""} |
| draft2020-12:optional/format/duration.json#/groups/0/tests/13 | missing time separator | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"duration\""} |
| draft2020-12:optional/format/duration.json#/groups/0/tests/14 | time element in the date position | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"duration\""} |
| draft2020-12:optional/format/duration.json#/groups/0/tests/23 | weeks cannot be combined with other units | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"duration\""} |
| draft2020-12:optional/format/duration.json#/groups/0/tests/24 | invalid non-ASCII '২' (a Bengali 2) | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"duration\""} |
| draft2020-12:optional/format/duration.json#/groups/0/tests/25 | element without unit | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"duration\""} |
| draft2020-12:optional/format/duration.json#/groups/0/tests/32 | fractional duration is not allowed by RFC 3339 ABNF | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"duration\""} |
| draft2020-12:optional/format/duration.json#/groups/0/tests/33 | leading whitespace is invalid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"duration\""} |
| draft2020-12:optional/format/duration.json#/groups/0/tests/34 | trailing whitespace is invalid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"duration\""} |
| draft2020-12:optional/format/duration.json#/groups/0/tests/35 | empty string is invalid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"duration\""} |
| draft2020-12:optional/format/email.json#/groups/0/tests/7 | an invalid e-mail address | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"email\""} |
| draft2020-12:optional/format/email.json#/groups/0/tests/11 | a quoted string with a space in the local part is valid | WRONG | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"email\""} |
| draft2020-12:optional/format/email.json#/groups/0/tests/12 | a quoted string with a double dot in the local part is valid | WRONG | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"email\""} |
| draft2020-12:optional/format/email.json#/groups/0/tests/13 | a quoted string with a @ in the local part is valid | WRONG | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"email\""} |
| draft2020-12:optional/format/email.json#/groups/0/tests/14 | an IPv4-address-literal after the @ is valid | WRONG | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"email\""} |
| draft2020-12:optional/format/email.json#/groups/0/tests/15 | an IPv6-address-literal after the @ is valid | WRONG | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"email\""} |
| draft2020-12:optional/format/email.json#/groups/0/tests/16 | dot before local part is not valid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"email\""} |
| draft2020-12:optional/format/email.json#/groups/0/tests/17 | dot after local part is not valid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"email\""} |
| draft2020-12:optional/format/email.json#/groups/0/tests/19 | two subsequent dots inside local part are not valid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"email\""} |
| draft2020-12:optional/format/email.json#/groups/0/tests/20 | an invalid domain | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"email\""} |
| draft2020-12:optional/format/email.json#/groups/0/tests/21 | an invalid IPv4-address-literal | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"email\""} |
| draft2020-12:optional/format/email.json#/groups/0/tests/22 | two email addresses is not valid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"email\""} |
| draft2020-12:optional/format/email.json#/groups/0/tests/23 | full "From" header is invalid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"email\""} |
| draft2020-12:optional/format/email.json#/groups/0/tests/24 | local part is required | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"email\""} |
| draft2020-12:optional/format/email.json#/groups/0/tests/25 | domain is required | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"email\""} |
| draft2020-12:optional/format/email.json#/groups/0/tests/26 | unquoted space in local part is invalid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"email\""} |
| draft2020-12:optional/format/hostname.json#/groups/0/tests/11 | empty string | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"hostname\""} |
| draft2020-12:optional/format/hostname.json#/groups/0/tests/12 | single dot | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"hostname\""} |
| draft2020-12:optional/format/hostname.json#/groups/0/tests/13 | leading dot | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"hostname\""} |
| draft2020-12:optional/format/hostname.json#/groups/0/tests/15 | IDN label separator | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"hostname\""} |
| draft2020-12:optional/format/hostname.json#/groups/0/tests/17 | starts with hyphen | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"hostname\""} |
| draft2020-12:optional/format/hostname.json#/groups/0/tests/18 | ends with hyphen | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"hostname\""} |
| draft2020-12:optional/format/hostname.json#/groups/0/tests/19 | contains underscore | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"hostname\""} |
| draft2020-12:optional/format/hostname.json#/groups/0/tests/20 | exceeds maximum overall length (256) | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"hostname\""} |
| draft2020-12:optional/format/hostname.json#/groups/0/tests/22 | exceeds maximum label length (63) | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"hostname\""} |
| draft2020-12:optional/format/ipv4.json#/groups/0/tests/7 | an IP address with too many components | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv4\""} |
| draft2020-12:optional/format/ipv4.json#/groups/0/tests/8 | an IP address with out-of-range values | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv4\""} |
| draft2020-12:optional/format/ipv4.json#/groups/0/tests/9 | an IP address without 4 components | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv4\""} |
| draft2020-12:optional/format/ipv4.json#/groups/0/tests/10 | a 2-part address resolving to a routable IP (inet_aton shorthand) | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv4\""} |
| draft2020-12:optional/format/ipv4.json#/groups/0/tests/11 | a 3-part address resolving to a routable IP (inet_aton shorthand) | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv4\""} |
| draft2020-12:optional/format/ipv4.json#/groups/0/tests/12 | an IP address as an integer | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv4\""} |
| draft2020-12:optional/format/ipv4.json#/groups/0/tests/13 | an IP address as an integer (decimal) | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv4\""} |
| draft2020-12:optional/format/ipv4.json#/groups/0/tests/14 | invalid non-ASCII '২' (a Bengali 2) | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv4\""} |
| draft2020-12:optional/format/ipv4.json#/groups/0/tests/15 | invalid fullwidth digits (non-ASCII) | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv4\""} |
| draft2020-12:optional/format/ipv4.json#/groups/0/tests/16 | invalid mathematical bold digits (non-ASCII) | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv4\""} |
| draft2020-12:optional/format/ipv4.json#/groups/0/tests/17 | netmask is not a part of ipv4 address | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv4\""} |
| draft2020-12:optional/format/ipv4.json#/groups/0/tests/18 | leading whitespace is invalid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv4\""} |
| draft2020-12:optional/format/ipv4.json#/groups/0/tests/19 | trailing whitespace is invalid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv4\""} |
| draft2020-12:optional/format/ipv4.json#/groups/0/tests/20 | trailing newline is invalid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv4\""} |
| draft2020-12:optional/format/ipv4.json#/groups/0/tests/21 | hexadecimal notation is invalid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv4\""} |
| draft2020-12:optional/format/ipv4.json#/groups/0/tests/22 | octal notation explicit is invalid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv4\""} |
| draft2020-12:optional/format/ipv4.json#/groups/0/tests/23 | empty part (double dot) is invalid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv4\""} |
| draft2020-12:optional/format/ipv4.json#/groups/0/tests/24 | leading dot is invalid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv4\""} |
| draft2020-12:optional/format/ipv4.json#/groups/0/tests/25 | trailing dot is invalid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv4\""} |
| draft2020-12:optional/format/ipv4.json#/groups/0/tests/28 | empty string is invalid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv4\""} |
| draft2020-12:optional/format/ipv4.json#/groups/0/tests/29 | plus sign is invalid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv4\""} |
| draft2020-12:optional/format/ipv4.json#/groups/0/tests/30 | negative sign is invalid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv4\""} |
| draft2020-12:optional/format/ipv4.json#/groups/0/tests/31 | exponential notation is invalid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv4\""} |
| draft2020-12:optional/format/ipv4.json#/groups/0/tests/32 | alpha characters are invalid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv4\""} |
| draft2020-12:optional/format/ipv4.json#/groups/0/tests/33 | internal whitespace is invalid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv4\""} |
| draft2020-12:optional/format/ipv4.json#/groups/0/tests/34 | tab character is invalid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv4\""} |
| draft2020-12:optional/format/ipv4.json#/groups/0/tests/35 | additional content after an embedded NUL byte | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv4\""} |
| draft2020-12:optional/format/ipv4.json#/groups/0/tests/36 | with port number is invalid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv4\""} |
| draft2020-12:optional/format/ipv4.json#/groups/0/tests/37 | single octet out of range in last position | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv4\""} |
| draft2020-12:optional/format/ipv6.json#/groups/0/tests/7 | a group with 5 hex digits is invalid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv6\""} |
| draft2020-12:optional/format/ipv6.json#/groups/0/tests/9 | trailing 5 hex symbols is invalid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv6\""} |
| draft2020-12:optional/format/ipv6.json#/groups/0/tests/10 | an IPv6 address with too many components | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv6\""} |
| draft2020-12:optional/format/ipv6.json#/groups/0/tests/11 | an IPv6 address containing illegal characters | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv6\""} |
| draft2020-12:optional/format/ipv6.json#/groups/0/tests/15 | missing leading octet is invalid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv6\""} |
| draft2020-12:optional/format/ipv6.json#/groups/0/tests/16 | missing trailing octet is invalid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv6\""} |
| draft2020-12:optional/format/ipv6.json#/groups/0/tests/17 | missing leading octet with omitted octets later | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv6\""} |
| draft2020-12:optional/format/ipv6.json#/groups/0/tests/19 | two sets of double colons is invalid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv6\""} |
| draft2020-12:optional/format/ipv6.json#/groups/0/tests/22 | mixed format with ipv4 section with octet out of range | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv6\""} |
| draft2020-12:optional/format/ipv6.json#/groups/0/tests/23 | mixed format with ipv4 section with a hex octet | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv6\""} |
| draft2020-12:optional/format/ipv6.json#/groups/0/tests/25 | triple colons is invalid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv6\""} |
| draft2020-12:optional/format/ipv6.json#/groups/0/tests/27 | insufficient octets without double colons | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv6\""} |
| draft2020-12:optional/format/ipv6.json#/groups/0/tests/28 | no colons is invalid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv6\""} |
| draft2020-12:optional/format/ipv6.json#/groups/0/tests/29 | ipv4 is not ipv6 | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv6\""} |
| draft2020-12:optional/format/ipv6.json#/groups/0/tests/30 | ipv4 segment must have 4 octets | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv6\""} |
| draft2020-12:optional/format/ipv6.json#/groups/0/tests/31 | leading whitespace is invalid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv6\""} |
| draft2020-12:optional/format/ipv6.json#/groups/0/tests/32 | trailing whitespace is invalid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv6\""} |
| draft2020-12:optional/format/ipv6.json#/groups/0/tests/33 | netmask is not a part of ipv6 address | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv6\""} |
| draft2020-12:optional/format/ipv6.json#/groups/0/tests/34 | zone id is not a part of ipv6 address | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv6\""} |
| draft2020-12:optional/format/ipv6.json#/groups/0/tests/36 | a long invalid ipv6, below length limit, first | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv6\""} |
| draft2020-12:optional/format/ipv6.json#/groups/0/tests/37 | a long invalid ipv6, below length limit, second | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv6\""} |
| draft2020-12:optional/format/ipv6.json#/groups/0/tests/38 | invalid non-ASCII '৪' (a Bengali 4) | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv6\""} |
| draft2020-12:optional/format/ipv6.json#/groups/0/tests/39 | invalid non-ASCII '৪' (a Bengali 4) in the IPv4 portion | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv6\""} |
| draft2020-12:optional/format/json-pointer.json#/groups/0/tests/7 | not a valid JSON-pointer (~ not escaped) | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"json-pointer\""} |
| draft2020-12:optional/format/json-pointer.json#/groups/0/tests/27 | not a valid JSON-pointer (URI Fragment Identifier) #1 | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"json-pointer\""} |
| draft2020-12:optional/format/json-pointer.json#/groups/0/tests/28 | not a valid JSON-pointer (URI Fragment Identifier) #2 | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"json-pointer\""} |
| draft2020-12:optional/format/json-pointer.json#/groups/0/tests/29 | not a valid JSON-pointer (URI Fragment Identifier) #3 | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"json-pointer\""} |
| draft2020-12:optional/format/json-pointer.json#/groups/0/tests/30 | not a valid JSON-pointer (some escaped, but not all) #1 | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"json-pointer\""} |
| draft2020-12:optional/format/json-pointer.json#/groups/0/tests/31 | not a valid JSON-pointer (some escaped, but not all) #2 | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"json-pointer\""} |
| draft2020-12:optional/format/json-pointer.json#/groups/0/tests/32 | not a valid JSON-pointer (wrong escape character) #1 | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"json-pointer\""} |
| draft2020-12:optional/format/json-pointer.json#/groups/0/tests/33 | not a valid JSON-pointer (wrong escape character) #2 | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"json-pointer\""} |
| draft2020-12:optional/format/json-pointer.json#/groups/0/tests/34 | not a valid JSON-pointer (multiple characters not escaped) | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"json-pointer\""} |
| draft2020-12:optional/format/json-pointer.json#/groups/0/tests/35 | not a valid JSON-pointer (isn't empty nor starts with /) #1 | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"json-pointer\""} |
| draft2020-12:optional/format/json-pointer.json#/groups/0/tests/36 | not a valid JSON-pointer (isn't empty nor starts with /) #2 | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"json-pointer\""} |
| draft2020-12:optional/format/json-pointer.json#/groups/0/tests/37 | not a valid JSON-pointer (isn't empty nor starts with /) #3 | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"json-pointer\""} |
| draft2020-12:optional/format/regex.json#/groups/0/tests/7 | a regular expression with unclosed parens is invalid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"regex\""} |
| draft2020-12:optional/format/relative-json-pointer.json#/groups/0/tests/10 | an invalid RJP that is a valid JSON Pointer | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"relative-json-pointer\""} |
| draft2020-12:optional/format/relative-json-pointer.json#/groups/0/tests/11 | negative prefix | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"relative-json-pointer\""} |
| draft2020-12:optional/format/relative-json-pointer.json#/groups/0/tests/12 | explicit positive prefix | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"relative-json-pointer\""} |
| draft2020-12:optional/format/relative-json-pointer.json#/groups/0/tests/13 | non-ASCII digit in the prefix is not allowed | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"relative-json-pointer\""} |
| draft2020-12:optional/format/relative-json-pointer.json#/groups/0/tests/14 | ## is not a valid json-pointer | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"relative-json-pointer\""} |
| draft2020-12:optional/format/relative-json-pointer.json#/groups/0/tests/15 | zero cannot be followed by other digits, plus json-pointer | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"relative-json-pointer\""} |
| draft2020-12:optional/format/relative-json-pointer.json#/groups/0/tests/16 | zero cannot be followed by other digits, plus octothorpe | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"relative-json-pointer\""} |
| draft2020-12:optional/format/relative-json-pointer.json#/groups/0/tests/17 | empty string | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"relative-json-pointer\""} |
| draft2020-12:optional/format/time.json#/groups/0/tests/7 | invalid time string with extra leading zeros | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"time\""} |
| draft2020-12:optional/format/time.json#/groups/0/tests/8 | invalid time string with no leading zero for single digit | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"time\""} |
| draft2020-12:optional/format/time.json#/groups/0/tests/9 | hour, minute, second must be two digits | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"time\""} |
| draft2020-12:optional/format/time.json#/groups/0/tests/11 | invalid leap second, Zulu (wrong hour) | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"time\""} |
| draft2020-12:optional/format/time.json#/groups/0/tests/12 | invalid leap second, Zulu (wrong minute) | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"time\""} |
| draft2020-12:optional/format/time.json#/groups/0/tests/14 | invalid leap second, zero time-offset (wrong hour) | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"time\""} |
| draft2020-12:optional/format/time.json#/groups/0/tests/15 | invalid leap second, zero time-offset (wrong minute) | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"time\""} |
| draft2020-12:optional/format/time.json#/groups/0/tests/18 | invalid leap second, positive time-offset (wrong hour) | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"time\""} |
| draft2020-12:optional/format/time.json#/groups/0/tests/19 | invalid leap second, positive time-offset (wrong minute) | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"time\""} |
| draft2020-12:optional/format/time.json#/groups/0/tests/22 | invalid leap second, negative time-offset (wrong hour) | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"time\""} |
| draft2020-12:optional/format/time.json#/groups/0/tests/23 | invalid leap second, negative time-offset (wrong minute) | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"time\""} |
| draft2020-12:optional/format/time.json#/groups/0/tests/29 | hour, minute in time-offset must be two digits | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"time\""} |
| draft2020-12:optional/format/time.json#/groups/0/tests/31 | an invalid time string with invalid hour | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"time\""} |
| draft2020-12:optional/format/time.json#/groups/0/tests/32 | an invalid time string with invalid minute | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"time\""} |
| draft2020-12:optional/format/time.json#/groups/0/tests/33 | an invalid time string with invalid second | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"time\""} |
| draft2020-12:optional/format/time.json#/groups/0/tests/34 | an invalid time string with invalid leap second (wrong hour) | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"time\""} |
| draft2020-12:optional/format/time.json#/groups/0/tests/35 | an invalid time string with invalid leap second (wrong minute) | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"time\""} |
| draft2020-12:optional/format/time.json#/groups/0/tests/36 | an invalid time string with invalid time numoffset hour | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"time\""} |
| draft2020-12:optional/format/time.json#/groups/0/tests/37 | an invalid time string with invalid time numoffset minute | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"time\""} |
| draft2020-12:optional/format/time.json#/groups/0/tests/38 | an invalid time string with invalid time with both Z and numoffset | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"time\""} |
| draft2020-12:optional/format/time.json#/groups/0/tests/39 | an invalid offset indicator | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"time\""} |
| draft2020-12:optional/format/time.json#/groups/0/tests/40 | only RFC3339 not all of ISO 8601 are valid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"time\""} |
| draft2020-12:optional/format/time.json#/groups/0/tests/41 | no time offset | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"time\""} |
| draft2020-12:optional/format/time.json#/groups/0/tests/42 | no time offset with second fraction | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"time\""} |
| draft2020-12:optional/format/time.json#/groups/0/tests/43 | invalid non-ASCII '২' (a Bengali 2) | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"time\""} |
| draft2020-12:optional/format/time.json#/groups/0/tests/44 | offset not starting with plus or minus | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"time\""} |
| draft2020-12:optional/format/time.json#/groups/0/tests/45 | contains letters | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"time\""} |
| draft2020-12:optional/format/time.json#/groups/0/tests/46 | an invalid time string in date-time format | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"time\""} |
| draft2020-12:optional/format/uri-reference.json#/groups/0/tests/9 | an invalid URI Reference | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"uri-reference\""} |
| draft2020-12:optional/format/uri-reference.json#/groups/0/tests/12 | an invalid URI fragment | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"uri-reference\""} |
| draft2020-12:optional/format/uri-reference.json#/groups/0/tests/13 | unescaped non US-ASCII characters | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"uri-reference\""} |
| draft2020-12:optional/format/uri-reference.json#/groups/0/tests/14 | invalid backslash character | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"uri-reference\""} |
| draft2020-12:optional/format/uri-template.json#/groups/0/tests/7 | an invalid uri-template | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"uri-template\""} |
| draft2020-12:optional/format/uri.json#/groups/0/tests/19 | an invalid protocol-relative URI Reference | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"uri\""} |
| draft2020-12:optional/format/uri.json#/groups/0/tests/20 | an invalid relative URI Reference | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"uri\""} |
| draft2020-12:optional/format/uri.json#/groups/0/tests/21 | an invalid URI | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"uri\""} |
| draft2020-12:optional/format/uri.json#/groups/0/tests/22 | an invalid URI though valid URI reference | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"uri\""} |
| draft2020-12:optional/format/uri.json#/groups/0/tests/23 | an invalid URI with spaces | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"uri\""} |
| draft2020-12:optional/format/uri.json#/groups/0/tests/24 | an invalid URI with spaces and missing scheme | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"uri\""} |
| draft2020-12:optional/format/uri.json#/groups/0/tests/25 | an invalid URI with comma in scheme | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"uri\""} |
| draft2020-12:optional/format/uri.json#/groups/0/tests/26 | invalid userinfo | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"uri\""} |
| draft2020-12:optional/format/uri.json#/groups/0/tests/27 | unescaped non US-ASCII characters | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"uri\""} |
| draft2020-12:optional/format/uri.json#/groups/0/tests/28 | invalid backslash character | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"uri\""} |
| draft2020-12:optional/format/uri.json#/groups/0/tests/29 | invalid " character | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"uri\""} |
| draft2020-12:optional/format/uri.json#/groups/0/tests/30 | invalid <> characters | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"uri\""} |
| draft2020-12:optional/format/uri.json#/groups/0/tests/31 | invalid {} characters | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"uri\""} |
| draft2020-12:optional/format/uri.json#/groups/0/tests/32 | invalid ^ character | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"uri\""} |
| draft2020-12:optional/format/uri.json#/groups/0/tests/33 | invalid ` character | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"uri\""} |
| draft2020-12:optional/format/uri.json#/groups/0/tests/34 | invalid SPACE character | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"uri\""} |
| draft2020-12:optional/format/uri.json#/groups/0/tests/35 | invalid \| character | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"uri\""} |
| draft2020-12:optional/format/uri.json#/groups/0/tests/38 | invalid percent-encoding with non-hex digits | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"uri\""} |
| draft2020-12:optional/format/uri.json#/groups/0/tests/39 | incomplete percent-encoding triplet | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"uri\""} |
| draft2020-12:optional/format/uri.json#/groups/0/tests/40 | lone percent sign is invalid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"uri\""} |
| draft2020-12:optional/format/uri.json#/groups/0/tests/41 | scheme must start with a letter | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"uri\""} |
| draft2020-12:optional/format/uri.json#/groups/0/tests/42 | invalid character in scheme | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"uri\""} |
| draft2020-12:optional/format/uuid.json#/groups/0/tests/10 | wrong length | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"uuid\""} |
| draft2020-12:optional/format/uuid.json#/groups/0/tests/11 | missing section | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"uuid\""} |
| draft2020-12:optional/format/uuid.json#/groups/0/tests/12 | bad characters (not hex) | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"uuid\""} |
| draft2020-12:optional/format/uuid.json#/groups/0/tests/13 | no dashes | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"uuid\""} |
| draft2020-12:optional/format/uuid.json#/groups/0/tests/14 | too few dashes | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"uuid\""} |
| draft2020-12:optional/format/uuid.json#/groups/0/tests/15 | too many dashes | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"uuid\""} |
| draft2020-12:optional/format/uuid.json#/groups/0/tests/16 | dashes in the wrong spot | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"uuid\""} |
| draft2020-12:optional/format/uuid.json#/groups/0/tests/17 | shifted dashes | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"uuid\""} |
| draft2020-12:optional/format/uuid.json#/groups/0/tests/23 | trailing hyphen after a complete UUID is invalid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"uuid\""} |
| draft2020-12:optional/format/uuid.json#/groups/0/tests/24 | non-ASCII digit '২' (a Bengali 2) is invalid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"uuid\""} |
| draft2020-12:optional/id.json#/groups/0/tests/2 | no match on enum or $ref to $id | PASS | {"keyword":"enum","instancePath":"","schemaPath":"#/$defs/id_in_enum/enum","message":"must be equal to one of the allowed values"} |
| draft2020-12:optional/no-schema.json#/groups/0/tests/1 | a 1-character string is not valid | PASS | {"keyword":"minLength","instancePath":"","schemaPath":"#/minLength","message":"must NOT have fewer than 2 characters"} |
| draft2020-12:optional/non-bmp-regex.json#/groups/0/tests/3 | doesn't match one | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/pattern","message":"must match pattern \"^🐲*$\""} |
| draft2020-12:optional/non-bmp-regex.json#/groups/0/tests/4 | doesn't match two | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/pattern","message":"must match pattern \"^🐲*$\""} |
| draft2020-12:optional/non-bmp-regex.json#/groups/0/tests/5 | doesn't match one ASCII | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/pattern","message":"must match pattern \"^🐲*$\""} |
| draft2020-12:optional/non-bmp-regex.json#/groups/0/tests/6 | doesn't match two ASCII | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/pattern","message":"must match pattern \"^🐲*$\""} |
| draft2020-12:optional/non-bmp-regex.json#/groups/1/tests/3 | doesn't match one | PASS | {"keyword":"type","instancePath":"/🐲","schemaPath":"#/patternProperties/%5E%F0%9F%90%B2*%24/type","message":"must be integer"} |
| draft2020-12:optional/non-bmp-regex.json#/groups/1/tests/4 | doesn't match two | PASS | {"keyword":"type","instancePath":"/🐲🐲","schemaPath":"#/patternProperties/%5E%F0%9F%90%B2*%24/type","message":"must be integer"} |
| draft2020-12:optional/refOfUnknownKeyword.json#/groups/0/tests/1 | mismatch | PASS | {"keyword":"type","instancePath":"/bar","schemaPath":"#/unknown-keyword/type","message":"must be integer"} |
| draft2020-12:optional/refOfUnknownKeyword.json#/groups/1/tests/1 | mismatch | PASS | {"keyword":"type","instancePath":"/bar","schemaPath":"#/unknown~1keyword/type","message":"must be integer"} |
| draft2020-12:optional/refOfUnknownKeyword.json#/groups/2/tests/1 | mismatch | PASS | {"keyword":"type","instancePath":"/bar","schemaPath":"#/properties/foo/unknown-keyword/type","message":"must be integer"} |
| draft2020-12:optional/refOfUnknownKeyword.json#/groups/3/tests/1 | mismatch | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/examples/0/type","message":"must be string"} |
| draft2020-12:optional/refOfUnknownKeyword.json#/groups/4/tests/1 | mismatch | PASS | {"keyword":"type","instancePath":"/bar","schemaPath":"#/properties/foo/unknown~1keyword/type","message":"must be integer"} |
| draft2020-12:optional/unknownKeyword.json#/groups/0/tests/0 | type matches second anyOf, which has a real schema in it | COMPILE | FAST_SETUP_ERROR: reference "https://localhost:1234/draft2020-12/unknownKeyword/my_identifier.json" resolves to more than one schema |
| draft2020-12:optional/unknownKeyword.json#/groups/0/tests/1 | type matches non-schema in first anyOf | COMPILE | FAST_SETUP_ERROR: reference "https://localhost:1234/draft2020-12/unknownKeyword/my_identifier.json" resolves to more than one schema |
| draft2020-12:optional/unknownKeyword.json#/groups/0/tests/2 | type matches non-schema in third anyOf | COMPILE | FAST_SETUP_ERROR: reference "https://localhost:1234/draft2020-12/unknownKeyword/my_identifier.json" resolves to more than one schema |
| draft2020-12:pattern.json#/groups/0/tests/1 | a non-matching pattern is invalid | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/pattern","message":"must match pattern \"^a*$\""} |
| draft2020-12:pattern.json#/groups/2/tests/2 | Digits do not match | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/pattern","message":"must match pattern \"^\\p{Letter}+$\""} |
| draft2020-12:patternProperties.json#/groups/0/tests/2 | a single invalid match is invalid | PASS | {"keyword":"type","instancePath":"/foo","schemaPath":"#/patternProperties/f.*o/type","message":"must be integer"} |
| draft2020-12:patternProperties.json#/groups/0/tests/3 | multiple invalid matches is invalid | PASS | {"keyword":"type","instancePath":"/foo","schemaPath":"#/patternProperties/f.*o/type","message":"must be integer"} |
| draft2020-12:patternProperties.json#/groups/1/tests/3 | an invalid due to one is invalid | PASS | {"keyword":"type","instancePath":"/a","schemaPath":"#/patternProperties/a*/type","message":"must be integer"} |
| draft2020-12:patternProperties.json#/groups/1/tests/4 | an invalid due to the other is invalid | PASS | {"keyword":"maximum","instancePath":"/aaaa","schemaPath":"#/patternProperties/aaa*/maximum","message":"must be <= 20"} |
| draft2020-12:patternProperties.json#/groups/1/tests/5 | an invalid due to both is invalid | PASS | {"keyword":"type","instancePath":"/aaa","schemaPath":"#/patternProperties/a*/type","message":"must be integer"} |
| draft2020-12:patternProperties.json#/groups/2/tests/1 | recognized members are accounted for | PASS | {"keyword":"type","instancePath":"/a31b","schemaPath":"#/patternProperties/%5B0-9%5D%7B2%2C%7D/type","message":"must be boolean"} |
| draft2020-12:patternProperties.json#/groups/2/tests/3 | regexes are case sensitive, 2 | PASS | {"keyword":"type","instancePath":"/a_X_3","schemaPath":"#/patternProperties/X_/type","message":"must be string"} |
| draft2020-12:patternProperties.json#/groups/3/tests/1 | object with property matching schema false is invalid | PASS | {"keyword":"false schema","instancePath":"/bar","schemaPath":"#/patternProperties/b.*/false schema","message":"boolean schema is false"} |
| draft2020-12:patternProperties.json#/groups/3/tests/2 | object with both properties is invalid | PASS | {"keyword":"false schema","instancePath":"/bar","schemaPath":"#/patternProperties/b.*/false schema","message":"boolean schema is false"} |
| draft2020-12:patternProperties.json#/groups/3/tests/3 | object with a property matching both true and false is invalid | PASS | {"keyword":"false schema","instancePath":"/foobar","schemaPath":"#/patternProperties/b.*/false schema","message":"boolean schema is false"} |
| draft2020-12:prefixItems.json#/groups/0/tests/1 | wrong types | PASS | {"keyword":"type","instancePath":"/0","schemaPath":"#/prefixItems/0/type","message":"must be integer"} |
| draft2020-12:prefixItems.json#/groups/1/tests/1 | array with two items is invalid | PASS | {"keyword":"false schema","instancePath":"/1","schemaPath":"#/prefixItems/1/false schema","message":"boolean schema is false"} |
| draft2020-12:properties.json#/groups/0/tests/1 | one property invalid is invalid | PASS | {"keyword":"type","instancePath":"/bar","schemaPath":"#/properties/bar/type","message":"must be string"} |
| draft2020-12:properties.json#/groups/0/tests/2 | both properties invalid is invalid | PASS | {"keyword":"type","instancePath":"/foo","schemaPath":"#/properties/foo/type","message":"must be integer"} |
| draft2020-12:properties.json#/groups/1/tests/1 | property invalidates property | PASS | {"keyword":"maxItems","instancePath":"/foo","schemaPath":"#/properties/foo/maxItems","message":"must NOT have more than 3 items"} |
| draft2020-12:properties.json#/groups/1/tests/2 | patternProperty invalidates property | PASS | {"keyword":"minItems","instancePath":"/foo","schemaPath":"#/patternProperties/f.o/minItems","message":"must NOT have fewer than 2 items"} |
| draft2020-12:properties.json#/groups/1/tests/4 | patternProperty invalidates nonproperty | PASS | {"keyword":"minItems","instancePath":"/fxo","schemaPath":"#/patternProperties/f.o/minItems","message":"must NOT have fewer than 2 items"} |
| draft2020-12:properties.json#/groups/1/tests/7 | additionalProperty invalidates others | PASS | {"keyword":"type","instancePath":"/quux","schemaPath":"#/additionalProperties/type","message":"must be integer"} |
| draft2020-12:properties.json#/groups/2/tests/2 | only 'false' property present is invalid | PASS | {"keyword":"false schema","instancePath":"/bar","schemaPath":"#/properties/bar/false schema","message":"boolean schema is false"} |
| draft2020-12:properties.json#/groups/2/tests/3 | both properties present is invalid | PASS | {"keyword":"false schema","instancePath":"/bar","schemaPath":"#/properties/bar/false schema","message":"boolean schema is false"} |
| draft2020-12:properties.json#/groups/3/tests/1 | object with strings is invalid | PASS | {"keyword":"type","instancePath":"/foo\nbar","schemaPath":"#/properties/foo%0Abar/type","message":"must be number"} |
| draft2020-12:properties.json#/groups/5/tests/4 | toString not valid | PASS | {"keyword":"type","instancePath":"/toString/length","schemaPath":"#/properties/toString/properties/length/type","message":"must be string"} |
| draft2020-12:properties.json#/groups/5/tests/5 | constructor not valid | PASS | {"keyword":"type","instancePath":"/constructor","schemaPath":"#/properties/constructor/type","message":"must be number"} |
| draft2020-12:propertyNames.json#/groups/0/tests/1 | some property names invalid | PASS | {"keyword":"maxLength","instancePath":"","schemaPath":"#/propertyNames/maxLength","message":"must NOT have more than 3 characters"} |
| draft2020-12:propertyNames.json#/groups/1/tests/1 | non-matching property name is invalid | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/propertyNames/pattern","message":"must match pattern \"^a+$\""} |
| draft2020-12:propertyNames.json#/groups/3/tests/0 | object with any properties is invalid | PASS | {"keyword":"false schema","instancePath":"","schemaPath":"#/propertyNames/false schema","message":"boolean schema is false"} |
| draft2020-12:propertyNames.json#/groups/4/tests/1 | object with any other property is invalid | PASS | {"keyword":"const","instancePath":"","schemaPath":"#/propertyNames/const","message":"must be equal to constant"} |
| draft2020-12:propertyNames.json#/groups/5/tests/2 | object with any other property is invalid | PASS | {"keyword":"enum","instancePath":"","schemaPath":"#/propertyNames/enum","message":"must be equal to one of the allowed values"} |
| draft2020-12:ref.json#/groups/0/tests/2 | mismatch | PASS | {"keyword":"additionalProperties","instancePath":"","schemaPath":"#/additionalProperties","message":"must NOT have additional properties"} |
| draft2020-12:ref.json#/groups/0/tests/3 | recursive mismatch | PASS | {"keyword":"additionalProperties","instancePath":"/foo","schemaPath":"#/additionalProperties","message":"must NOT have additional properties"} |
| draft2020-12:ref.json#/groups/1/tests/1 | mismatch | PASS | {"keyword":"type","instancePath":"/bar","schemaPath":"#/properties/foo/type","message":"must be integer"} |
| draft2020-12:ref.json#/groups/2/tests/1 | mismatch array | PASS | {"keyword":"type","instancePath":"/1","schemaPath":"#/prefixItems/0/type","message":"must be integer"} |
| draft2020-12:ref.json#/groups/3/tests/0 | slash invalid | PASS | {"keyword":"type","instancePath":"/slash","schemaPath":"#/$defs/slash~1field/type","message":"must be integer"} |
| draft2020-12:ref.json#/groups/3/tests/1 | tilde invalid | PASS | {"keyword":"type","instancePath":"/tilde","schemaPath":"#/$defs/tilde~0field/type","message":"must be integer"} |
| draft2020-12:ref.json#/groups/3/tests/2 | percent invalid | PASS | {"keyword":"type","instancePath":"/percent","schemaPath":"#/$defs/percent%25field/type","message":"must be integer"} |
| draft2020-12:ref.json#/groups/4/tests/1 | nested ref invalid | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/$defs/c/type","message":"must be integer"} |
| draft2020-12:ref.json#/groups/5/tests/1 | ref valid, maxItems invalid | PASS | {"keyword":"maxItems","instancePath":"/foo","schemaPath":"#/properties/foo/maxItems","message":"must NOT have more than 2 items"} |
| draft2020-12:ref.json#/groups/5/tests/2 | ref invalid | PASS | {"keyword":"type","instancePath":"/foo","schemaPath":"#/$defs/reffed/type","message":"must be array"} |
| draft2020-12:ref.json#/groups/6/tests/1 | remote ref invalid | PASS | {"keyword":"minimum","instancePath":"/minLength","schemaPath":"#/$defs/nonNegativeIntegerDefault0/minimum","message":"must be >= 0"} |
| draft2020-12:ref.json#/groups/7/tests/1 | property named $ref invalid | PASS | {"keyword":"type","instancePath":"/$ref","schemaPath":"#/properties/%24ref/type","message":"must be string"} |
| draft2020-12:ref.json#/groups/8/tests/1 | property named $ref invalid | PASS | {"keyword":"type","instancePath":"/$ref","schemaPath":"#/$defs/is-string/type","message":"must be string"} |
| draft2020-12:ref.json#/groups/10/tests/0 | any value is invalid | PASS | {"keyword":"false schema","instancePath":"","schemaPath":"#/$defs/bool/false schema","message":"boolean schema is false"} |
| draft2020-12:ref.json#/groups/11/tests/1 | invalid tree | PASS | {"keyword":"type","instancePath":"/nodes/0/subtree/nodes/0/value","schemaPath":"#/properties/value/type","message":"must be number"} |
| draft2020-12:ref.json#/groups/12/tests/1 | object with strings is invalid | PASS | {"keyword":"type","instancePath":"/foo\"bar","schemaPath":"#/$defs/foo%22bar/type","message":"must be number"} |
| draft2020-12:ref.json#/groups/13/tests/0 | referenced subschema doesn't see annotations from properties | PASS | {"keyword":"unevaluatedProperties","instancePath":"","schemaPath":"#/$defs/A/unevaluatedProperties","message":"must NOT have unevaluated properties"} |
| draft2020-12:ref.json#/groups/14/tests/0 | do not evaluate the $ref inside the enum, matching any string | PASS | {"keyword":"enum","instancePath":"","schemaPath":"#/enum","message":"must be equal to one of the allowed values"} |
| draft2020-12:ref.json#/groups/14/tests/1 | do not evaluate the $ref inside the enum, definition exact match | PASS | {"keyword":"enum","instancePath":"","schemaPath":"#/enum","message":"must be equal to one of the allowed values"} |
| draft2020-12:ref.json#/groups/15/tests/0 | invalid on inner field | COMPILE | FAST_SETUP_ERROR: Maximum call stack size exceeded |
| draft2020-12:ref.json#/groups/15/tests/1 | invalid on outer field | COMPILE | FAST_SETUP_ERROR: Maximum call stack size exceeded |
| draft2020-12:ref.json#/groups/15/tests/2 | valid on both fields | COMPILE | FAST_SETUP_ERROR: Maximum call stack size exceeded |
| draft2020-12:ref.json#/groups/16/tests/0 | invalid on inner field | COMPILE | FAST_SETUP_ERROR: Maximum call stack size exceeded |
| draft2020-12:ref.json#/groups/16/tests/1 | invalid on outer field | COMPILE | FAST_SETUP_ERROR: Maximum call stack size exceeded |
| draft2020-12:ref.json#/groups/16/tests/2 | valid on both fields | COMPILE | FAST_SETUP_ERROR: Maximum call stack size exceeded |
| draft2020-12:ref.json#/groups/17/tests/1 | non-number is invalid | PASS | {"keyword":"type","instancePath":"","schemaPath":"http://example.com/b/d.json/type","message":"must be number"} |
| draft2020-12:ref.json#/groups/18/tests/1 | data is invalid against first definition | PASS | {"keyword":"maximum","instancePath":"","schemaPath":"int.json/maximum","message":"must be <= 10"} |
| draft2020-12:ref.json#/groups/19/tests/1 | data is invalid against first definition | PASS | {"keyword":"maximum","instancePath":"","schemaPath":"#bigint/maximum","message":"must be <= 10"} |
| draft2020-12:ref.json#/groups/20/tests/1 | data is invalid against nested sibling | PASS | {"keyword":"type","instancePath":"","schemaPath":"./bar.json/type","message":"must be number"} |
| draft2020-12:ref.json#/groups/21/tests/1 | invalid under the URN IDed schema | PASS | {"keyword":"minimum","instancePath":"/foo","schemaPath":"#/minimum","message":"must be >= 30"} |
| draft2020-12:ref.json#/groups/22/tests/1 | a non-string is invalid | PASS | {"keyword":"type","instancePath":"/foo","schemaPath":"#/$defs/bar/type","message":"must be string"} |
| draft2020-12:ref.json#/groups/23/tests/1 | a non-string is invalid | PASS | {"keyword":"type","instancePath":"/foo","schemaPath":"#/$defs/bar/type","message":"must be string"} |
| draft2020-12:ref.json#/groups/24/tests/1 | a non-string is invalid | PASS | {"keyword":"type","instancePath":"/foo","schemaPath":"#/$defs/bar/type","message":"must be string"} |
| draft2020-12:ref.json#/groups/25/tests/1 | a non-string is invalid | PASS | {"keyword":"type","instancePath":"/foo","schemaPath":"#/$defs/bar/type","message":"must be string"} |
| draft2020-12:ref.json#/groups/26/tests/1 | a non-string is invalid | PASS | {"keyword":"type","instancePath":"/foo","schemaPath":"urn:uuid:deadbeef-1234-0000-0000-4321feebdaed#/$defs/bar/type","message":"must be string"} |
| draft2020-12:ref.json#/groups/27/tests/1 | a non-string is invalid | PASS | {"keyword":"type","instancePath":"/foo","schemaPath":"urn:uuid:deadbeef-1234-ff00-00ff-4321feebdaed#something/type","message":"must be string"} |
| draft2020-12:ref.json#/groups/28/tests/0 | a string is valid | COMPILE | FAST_SETUP_ERROR: Maximum call stack size exceeded |
| draft2020-12:ref.json#/groups/28/tests/1 | a non-string is invalid | COMPILE | FAST_SETUP_ERROR: Maximum call stack size exceeded |
| draft2020-12:ref.json#/groups/29/tests/0 | a non-integer is invalid due to the $ref | PASS | {"keyword":"type","instancePath":"","schemaPath":"http://example.com/ref/if/type","message":"must be integer"} |
| draft2020-12:ref.json#/groups/30/tests/0 | a non-integer is invalid due to the $ref | PASS | {"keyword":"type","instancePath":"","schemaPath":"http://example.com/ref/then/type","message":"must be integer"} |
| draft2020-12:ref.json#/groups/31/tests/0 | a non-integer is invalid due to the $ref | PASS | {"keyword":"type","instancePath":"","schemaPath":"http://example.com/ref/else/type","message":"must be integer"} |
| draft2020-12:ref.json#/groups/32/tests/1 | an integer is invalid | PASS | {"keyword":"type","instancePath":"","schemaPath":"/absref/foobar.json/type","message":"must be string"} |
| draft2020-12:ref.json#/groups/33/tests/1 | non-number is invalid | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/$defs/foo/type","message":"must be number"} |
| draft2020-12:ref.json#/groups/34/tests/1 | non-number is invalid | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/$defs/foo/type","message":"must be number"} |
| draft2020-12:ref.json#/groups/35/tests/1 | non-number is invalid | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/$defs//$defs//type","message":"must be number"} |
| draft2020-12:refRemote.json#/groups/0/tests/1 | remote ref invalid | PASS | {"keyword":"type","instancePath":"","schemaPath":"http://localhost:1234/draft2020-12/integer.json/type","message":"must be integer"} |
| draft2020-12:refRemote.json#/groups/1/tests/1 | remote fragment invalid | PASS | {"keyword":"type","instancePath":"","schemaPath":"http://localhost:1234/draft2020-12/subSchemas.json#/$defs/integer/type","message":"must be integer"} |
| draft2020-12:refRemote.json#/groups/2/tests/1 | remote anchor invalid | PASS | {"keyword":"type","instancePath":"","schemaPath":"http://localhost:1234/draft2020-12/locationIndependentIdentifier.json#foo/type","message":"must be integer"} |
| draft2020-12:refRemote.json#/groups/3/tests/1 | ref within ref invalid | PASS | {"keyword":"type","instancePath":"","schemaPath":"http://localhost:1234/draft2020-12/subSchemas.json#/$defs/refToInteger/type","message":"must be integer"} |
| draft2020-12:refRemote.json#/groups/4/tests/1 | base URI change ref invalid | PASS | {"keyword":"type","instancePath":"/0/0","schemaPath":"folderInteger.json/type","message":"must be integer"} |
| draft2020-12:refRemote.json#/groups/5/tests/1 | string is invalid | PASS | {"keyword":"type","instancePath":"/list/0","schemaPath":"folderInteger.json/type","message":"must be integer"} |
| draft2020-12:refRemote.json#/groups/6/tests/1 | string is invalid | PASS | {"keyword":"type","instancePath":"/list/0","schemaPath":"folderInteger.json/type","message":"must be integer"} |
| draft2020-12:refRemote.json#/groups/7/tests/2 | object is invalid | PASS | {"keyword":"type","instancePath":"/name","schemaPath":"#/anyOf/0/type","message":"must be null"} |
| draft2020-12:refRemote.json#/groups/8/tests/0 | invalid | PASS | {"keyword":"type","instancePath":"/bar","schemaPath":"#/$defs/inner/properties/bar/type","message":"must be string"} |
| draft2020-12:refRemote.json#/groups/9/tests/1 | string is invalid | PASS | {"keyword":"type","instancePath":"","schemaPath":"#foo/type","message":"must be integer"} |
| draft2020-12:refRemote.json#/groups/10/tests/0 | number is invalid | PASS | {"keyword":"type","instancePath":"/name/foo","schemaPath":"string.json/type","message":"must be string"} |
| draft2020-12:refRemote.json#/groups/11/tests/0 | number is invalid | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/$defs/bar/type","message":"must be string"} |
| draft2020-12:refRemote.json#/groups/12/tests/0 | number is invalid | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/$defs/bar/type","message":"must be string"} |
| draft2020-12:refRemote.json#/groups/13/tests/0 | number is invalid | PASS | {"keyword":"type","instancePath":"","schemaPath":"http://localhost:1234/draft2020-12/the-nested-id.json/type","message":"must be string"} |
| draft2020-12:refRemote.json#/groups/14/tests/1 | non-number is invalid | PASS | {"keyword":"type","instancePath":"","schemaPath":"#detached/type","message":"must be integer"} |
| draft2020-12:required.json#/groups/0/tests/1 | non-present required property is invalid | PASS | {"keyword":"required","instancePath":"","schemaPath":"#/required","message":"must have required property 'foo'"} |
| draft2020-12:required.json#/groups/3/tests/1 | object with some properties missing is invalid | PASS | {"keyword":"required","instancePath":"","schemaPath":"#/required","message":"must have required property 'foo\\bar'"} |
| draft2020-12:required.json#/groups/4/tests/2 | none of the properties mentioned | PASS | {"keyword":"required","instancePath":"","schemaPath":"#/required","message":"must have required property '__proto__'"} |
| draft2020-12:required.json#/groups/4/tests/3 | __proto__ present | PASS | {"keyword":"required","instancePath":"","schemaPath":"#/required","message":"must have required property 'toString'"} |
| draft2020-12:required.json#/groups/4/tests/4 | toString present | PASS | {"keyword":"required","instancePath":"","schemaPath":"#/required","message":"must have required property '__proto__'"} |
| draft2020-12:required.json#/groups/4/tests/5 | constructor present | PASS | {"keyword":"required","instancePath":"","schemaPath":"#/required","message":"must have required property '__proto__'"} |
| draft2020-12:type.json#/groups/0/tests/2 | a float is not an integer | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be integer"} |
| draft2020-12:type.json#/groups/0/tests/3 | a string is not an integer | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be integer"} |
| draft2020-12:type.json#/groups/0/tests/4 | a string is still not an integer, even if it looks like one | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be integer"} |
| draft2020-12:type.json#/groups/0/tests/5 | an object is not an integer | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be integer"} |
| draft2020-12:type.json#/groups/0/tests/6 | an array is not an integer | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be integer"} |
| draft2020-12:type.json#/groups/0/tests/7 | a boolean is not an integer | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be integer"} |
| draft2020-12:type.json#/groups/0/tests/8 | null is not an integer | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be integer"} |
| draft2020-12:type.json#/groups/1/tests/3 | a string is not a number | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be number"} |
| draft2020-12:type.json#/groups/1/tests/4 | a string is still not a number, even if it looks like one | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be number"} |
| draft2020-12:type.json#/groups/1/tests/5 | an object is not a number | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be number"} |
| draft2020-12:type.json#/groups/1/tests/6 | an array is not a number | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be number"} |
| draft2020-12:type.json#/groups/1/tests/7 | a boolean is not a number | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be number"} |
| draft2020-12:type.json#/groups/1/tests/8 | null is not a number | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be number"} |
| draft2020-12:type.json#/groups/2/tests/0 | 1 is not a string | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be string"} |
| draft2020-12:type.json#/groups/2/tests/1 | a float is not a string | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be string"} |
| draft2020-12:type.json#/groups/2/tests/5 | an object is not a string | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be string"} |
| draft2020-12:type.json#/groups/2/tests/6 | an array is not a string | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be string"} |
| draft2020-12:type.json#/groups/2/tests/7 | a boolean is not a string | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be string"} |
| draft2020-12:type.json#/groups/2/tests/8 | null is not a string | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be string"} |
| draft2020-12:type.json#/groups/3/tests/0 | an integer is not an object | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be object"} |
| draft2020-12:type.json#/groups/3/tests/1 | a float is not an object | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be object"} |
| draft2020-12:type.json#/groups/3/tests/2 | a string is not an object | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be object"} |
| draft2020-12:type.json#/groups/3/tests/4 | an array is not an object | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be object"} |
| draft2020-12:type.json#/groups/3/tests/5 | a boolean is not an object | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be object"} |
| draft2020-12:type.json#/groups/3/tests/6 | null is not an object | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be object"} |
| draft2020-12:type.json#/groups/4/tests/0 | an integer is not an array | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be array"} |
| draft2020-12:type.json#/groups/4/tests/1 | a float is not an array | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be array"} |
| draft2020-12:type.json#/groups/4/tests/2 | a string is not an array | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be array"} |
| draft2020-12:type.json#/groups/4/tests/3 | an object is not an array | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be array"} |
| draft2020-12:type.json#/groups/4/tests/5 | a boolean is not an array | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be array"} |
| draft2020-12:type.json#/groups/4/tests/6 | null is not an array | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be array"} |
| draft2020-12:type.json#/groups/5/tests/0 | an integer is not a boolean | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be boolean"} |
| draft2020-12:type.json#/groups/5/tests/1 | zero is not a boolean | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be boolean"} |
| draft2020-12:type.json#/groups/5/tests/2 | a float is not a boolean | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be boolean"} |
| draft2020-12:type.json#/groups/5/tests/3 | a string is not a boolean | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be boolean"} |
| draft2020-12:type.json#/groups/5/tests/4 | an empty string is not a boolean | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be boolean"} |
| draft2020-12:type.json#/groups/5/tests/5 | an object is not a boolean | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be boolean"} |
| draft2020-12:type.json#/groups/5/tests/6 | an array is not a boolean | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be boolean"} |
| draft2020-12:type.json#/groups/5/tests/9 | null is not a boolean | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be boolean"} |
| draft2020-12:type.json#/groups/6/tests/0 | an integer is not null | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be null"} |
| draft2020-12:type.json#/groups/6/tests/1 | a float is not null | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be null"} |
| draft2020-12:type.json#/groups/6/tests/2 | zero is not null | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be null"} |
| draft2020-12:type.json#/groups/6/tests/3 | a string is not null | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be null"} |
| draft2020-12:type.json#/groups/6/tests/4 | an empty string is not null | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be null"} |
| draft2020-12:type.json#/groups/6/tests/5 | an object is not null | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be null"} |
| draft2020-12:type.json#/groups/6/tests/6 | an array is not null | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be null"} |
| draft2020-12:type.json#/groups/6/tests/7 | true is not null | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be null"} |
| draft2020-12:type.json#/groups/6/tests/8 | false is not null | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be null"} |
| draft2020-12:type.json#/groups/7/tests/2 | a float is invalid | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be integer,string"} |
| draft2020-12:type.json#/groups/7/tests/3 | an object is invalid | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be integer,string"} |
| draft2020-12:type.json#/groups/7/tests/4 | an array is invalid | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be integer,string"} |
| draft2020-12:type.json#/groups/7/tests/5 | a boolean is invalid | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be integer,string"} |
| draft2020-12:type.json#/groups/7/tests/6 | null is invalid | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be integer,string"} |
| draft2020-12:type.json#/groups/8/tests/1 | number is invalid | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be string"} |
| draft2020-12:type.json#/groups/9/tests/2 | number is invalid | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be array,object"} |
| draft2020-12:type.json#/groups/9/tests/3 | string is invalid | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be array,object"} |
| draft2020-12:type.json#/groups/9/tests/4 | null is invalid | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be array,object"} |
| draft2020-12:type.json#/groups/10/tests/3 | number is invalid | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be array,object,null"} |
| draft2020-12:type.json#/groups/10/tests/4 | string is invalid | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be array,object,null"} |
| draft2020-12:unevaluatedItems.json#/groups/1/tests/1 | with unevaluated items | PASS | {"keyword":"unevaluatedItems","instancePath":"","schemaPath":"#/unevaluatedItems","message":"must NOT have more than 0 items"} |
| draft2020-12:unevaluatedItems.json#/groups/2/tests/2 | with invalid unevaluated items | PASS | {"keyword":"type","instancePath":"/0","schemaPath":"#/unevaluatedItems/type","message":"must be string"} |
| draft2020-12:unevaluatedItems.json#/groups/4/tests/1 | with unevaluated items | PASS | {"keyword":"unevaluatedItems","instancePath":"","schemaPath":"#/unevaluatedItems","message":"must NOT have more than 1 items"} |
| draft2020-12:unevaluatedItems.json#/groups/6/tests/1 | invalid under items | PASS | {"keyword":"type","instancePath":"/0","schemaPath":"#/items/type","message":"must be number"} |
| draft2020-12:unevaluatedItems.json#/groups/7/tests/1 | with unevaluated items | PASS | {"keyword":"unevaluatedItems","instancePath":"","schemaPath":"#/unevaluatedItems","message":"must NOT have more than 2 items"} |
| draft2020-12:unevaluatedItems.json#/groups/8/tests/1 | with no additional items | WRONG | {"keyword":"type","instancePath":"/true","schemaPath":"#/unevaluatedItems/type","message":"must be boolean"} |
| draft2020-12:unevaluatedItems.json#/groups/11/tests/1 | when one schema matches and has unevaluated items | PASS | {"keyword":"unevaluatedItems","instancePath":"","schemaPath":"#/unevaluatedItems","message":"must NOT have more than 2 items"} |
| draft2020-12:unevaluatedItems.json#/groups/11/tests/3 | when two schemas match and has unevaluated items | PASS | {"keyword":"unevaluatedItems","instancePath":"","schemaPath":"#/unevaluatedItems","message":"must NOT have more than 3 items"} |
| draft2020-12:unevaluatedItems.json#/groups/12/tests/1 | with unevaluated items | PASS | {"keyword":"unevaluatedItems","instancePath":"","schemaPath":"#/unevaluatedItems","message":"must NOT have more than 2 items"} |
| draft2020-12:unevaluatedItems.json#/groups/13/tests/0 | with unevaluated items | PASS | {"keyword":"unevaluatedItems","instancePath":"","schemaPath":"#/unevaluatedItems","message":"must NOT have more than 1 items"} |
| draft2020-12:unevaluatedItems.json#/groups/14/tests/1 | when if matches and it has unevaluated items | PASS | {"keyword":"unevaluatedItems","instancePath":"","schemaPath":"#/unevaluatedItems","message":"must NOT have more than 3 items"} |
| draft2020-12:unevaluatedItems.json#/groups/14/tests/3 | when if doesn't match and it has unevaluated items | PASS | {"keyword":"unevaluatedItems","instancePath":"","schemaPath":"#/unevaluatedItems","message":"must NOT have more than 4 items"} |
| draft2020-12:unevaluatedItems.json#/groups/15/tests/1 | with unevaluated items | PASS | {"keyword":"unevaluatedItems","instancePath":"","schemaPath":"#/unevaluatedItems","message":"must NOT have more than 0 items"} |
| draft2020-12:unevaluatedItems.json#/groups/16/tests/1 | with unevaluated items | PASS | {"keyword":"unevaluatedItems","instancePath":"","schemaPath":"#/unevaluatedItems","message":"must NOT have more than 2 items"} |
| draft2020-12:unevaluatedItems.json#/groups/17/tests/1 | with unevaluated items | PASS | {"keyword":"unevaluatedItems","instancePath":"","schemaPath":"#/unevaluatedItems","message":"must NOT have more than 2 items"} |
| draft2020-12:unevaluatedItems.json#/groups/18/tests/0 | with no unevaluated items | WRONG | {"keyword":"unevaluatedItems","instancePath":"","schemaPath":"#/unevaluatedItems","message":"must NOT have more than 1 items"} |
| draft2020-12:unevaluatedItems.json#/groups/18/tests/1 | with unevaluated items | PASS | {"keyword":"unevaluatedItems","instancePath":"","schemaPath":"#/unevaluatedItems","message":"must NOT have more than 1 items"} |
| draft2020-12:unevaluatedItems.json#/groups/19/tests/0 | always fails | PASS | {"keyword":"unevaluatedItems","instancePath":"","schemaPath":"#/allOf/1/unevaluatedItems","message":"must NOT have more than 0 items"} |
| draft2020-12:unevaluatedItems.json#/groups/20/tests/1 | uncle keyword evaluation is not significant | PASS | {"keyword":"unevaluatedItems","instancePath":"/foo","schemaPath":"#/properties/foo/unevaluatedItems","message":"must NOT have more than 1 items"} |
| draft2020-12:unevaluatedItems.json#/groups/21/tests/1 | contains fails, second item is not evaluated | PASS | {"keyword":"type","instancePath":"/0","schemaPath":"#/contains/type","message":"must be string"} |
| draft2020-12:unevaluatedItems.json#/groups/24/tests/1 | no items evaluated by contains | PASS | {"keyword":"unevaluatedItems","instancePath":"","schemaPath":"#/unevaluatedItems","message":"must NOT have more than 0 items"} |
| draft2020-12:unevaluatedItems.json#/groups/24/tests/2 | some but not all items evaluated by contains | PASS | {"keyword":"unevaluatedItems","instancePath":"","schemaPath":"#/unevaluatedItems","message":"must NOT have more than 0 items"} |
| draft2020-12:unevaluatedItems.json#/groups/24/tests/3 | all items evaluated by contains | WRONG | {"keyword":"unevaluatedItems","instancePath":"","schemaPath":"#/unevaluatedItems","message":"must NOT have more than 0 items"} |
| draft2020-12:unevaluatedItems.json#/groups/27/tests/0 | valid in case if is evaluated | WRONG | {"keyword":"unevaluatedItems","instancePath":"","schemaPath":"#/unevaluatedItems","message":"must NOT have more than 0 items"} |
| draft2020-12:unevaluatedItems.json#/groups/27/tests/1 | invalid in case if is evaluated | PASS | {"keyword":"unevaluatedItems","instancePath":"","schemaPath":"#/unevaluatedItems","message":"must NOT have more than 0 items"} |
| draft2020-12:unevaluatedItems.json#/groups/28/tests/0 | with an unevaluated item that exists at another location | PASS | {"keyword":"unevaluatedItems","instancePath":"","schemaPath":"#/unevaluatedItems","message":"must NOT have more than 1 items"} |
| draft2020-12:unevaluatedProperties.json#/groups/1/tests/2 | with invalid unevaluated properties | PASS | {"keyword":"minLength","instancePath":"/foo","schemaPath":"#/unevaluatedProperties/minLength","message":"must NOT have fewer than 3 characters"} |
| draft2020-12:unevaluatedProperties.json#/groups/2/tests/1 | with unevaluated properties | PASS | {"keyword":"unevaluatedProperties","instancePath":"","schemaPath":"#/unevaluatedProperties","message":"must NOT have unevaluated properties"} |
| draft2020-12:unevaluatedProperties.json#/groups/3/tests/1 | with unevaluated properties | PASS | {"keyword":"unevaluatedProperties","instancePath":"","schemaPath":"#/unevaluatedProperties","message":"must NOT have unevaluated properties"} |
| draft2020-12:unevaluatedProperties.json#/groups/4/tests/1 | with unevaluated properties | PASS | {"keyword":"unevaluatedProperties","instancePath":"","schemaPath":"#/unevaluatedProperties","message":"must NOT have unevaluated properties"} |
| draft2020-12:unevaluatedProperties.json#/groups/7/tests/1 | with additional properties | PASS | {"keyword":"unevaluatedProperties","instancePath":"","schemaPath":"#/unevaluatedProperties","message":"must NOT have unevaluated properties"} |
| draft2020-12:unevaluatedProperties.json#/groups/8/tests/1 | with additional properties | PASS | {"keyword":"unevaluatedProperties","instancePath":"","schemaPath":"#/unevaluatedProperties","message":"must NOT have unevaluated properties"} |
| draft2020-12:unevaluatedProperties.json#/groups/11/tests/1 | when one matches and has unevaluated properties | PASS | {"keyword":"unevaluatedProperties","instancePath":"","schemaPath":"#/unevaluatedProperties","message":"must NOT have unevaluated properties"} |
| draft2020-12:unevaluatedProperties.json#/groups/11/tests/3 | when two match and has unevaluated properties | PASS | {"keyword":"unevaluatedProperties","instancePath":"","schemaPath":"#/unevaluatedProperties","message":"must NOT have unevaluated properties"} |
| draft2020-12:unevaluatedProperties.json#/groups/12/tests/1 | with unevaluated properties | PASS | {"keyword":"unevaluatedProperties","instancePath":"","schemaPath":"#/unevaluatedProperties","message":"must NOT have unevaluated properties"} |
| draft2020-12:unevaluatedProperties.json#/groups/13/tests/0 | with unevaluated properties | PASS | {"keyword":"unevaluatedProperties","instancePath":"","schemaPath":"#/unevaluatedProperties","message":"must NOT have unevaluated properties"} |
| draft2020-12:unevaluatedProperties.json#/groups/14/tests/1 | when if is true and has unevaluated properties | PASS | {"keyword":"unevaluatedProperties","instancePath":"","schemaPath":"#/unevaluatedProperties","message":"must NOT have unevaluated properties"} |
| draft2020-12:unevaluatedProperties.json#/groups/14/tests/3 | when if is false and has unevaluated properties | PASS | {"keyword":"unevaluatedProperties","instancePath":"","schemaPath":"#/unevaluatedProperties","message":"must NOT have unevaluated properties"} |
| draft2020-12:unevaluatedProperties.json#/groups/15/tests/0 | when if is true and has no unevaluated properties | WRONG | {"keyword":"unevaluatedProperties","instancePath":"","schemaPath":"#/unevaluatedProperties","message":"must NOT have unevaluated properties"} |
| draft2020-12:unevaluatedProperties.json#/groups/15/tests/1 | when if is true and has unevaluated properties | PASS | {"keyword":"unevaluatedProperties","instancePath":"","schemaPath":"#/unevaluatedProperties","message":"must NOT have unevaluated properties"} |
| draft2020-12:unevaluatedProperties.json#/groups/16/tests/1 | when if is true and has unevaluated properties | PASS | {"keyword":"unevaluatedProperties","instancePath":"","schemaPath":"#/unevaluatedProperties","message":"must NOT have unevaluated properties"} |
| draft2020-12:unevaluatedProperties.json#/groups/16/tests/2 | when if is false and has no unevaluated properties | PASS | {"keyword":"unevaluatedProperties","instancePath":"","schemaPath":"#/unevaluatedProperties","message":"must NOT have unevaluated properties"} |
| draft2020-12:unevaluatedProperties.json#/groups/16/tests/3 | when if is false and has unevaluated properties | PASS | {"keyword":"unevaluatedProperties","instancePath":"","schemaPath":"#/unevaluatedProperties","message":"must NOT have unevaluated properties"} |
| draft2020-12:unevaluatedProperties.json#/groups/17/tests/1 | with unevaluated properties | PASS | {"keyword":"unevaluatedProperties","instancePath":"","schemaPath":"#/unevaluatedProperties","message":"must NOT have unevaluated properties"} |
| draft2020-12:unevaluatedProperties.json#/groups/18/tests/1 | with unevaluated properties | PASS | {"keyword":"unevaluatedProperties","instancePath":"","schemaPath":"#/unevaluatedProperties","message":"must NOT have unevaluated properties"} |
| draft2020-12:unevaluatedProperties.json#/groups/19/tests/1 | with unevaluated properties | PASS | {"keyword":"unevaluatedProperties","instancePath":"","schemaPath":"#/unevaluatedProperties","message":"must NOT have unevaluated properties"} |
| draft2020-12:unevaluatedProperties.json#/groups/20/tests/1 | with unevaluated properties | PASS | {"keyword":"unevaluatedProperties","instancePath":"","schemaPath":"#/unevaluatedProperties","message":"must NOT have unevaluated properties"} |
| draft2020-12:unevaluatedProperties.json#/groups/21/tests/0 | with no unevaluated properties | WRONG | {"keyword":"unevaluatedProperties","instancePath":"","schemaPath":"#/unevaluatedProperties","message":"must NOT have unevaluated properties"} |
| draft2020-12:unevaluatedProperties.json#/groups/21/tests/1 | with unevaluated properties | PASS | {"keyword":"unevaluatedProperties","instancePath":"","schemaPath":"#/unevaluatedProperties","message":"must NOT have unevaluated properties"} |
| draft2020-12:unevaluatedProperties.json#/groups/22/tests/0 | always fails | PASS | {"keyword":"unevaluatedProperties","instancePath":"","schemaPath":"#/allOf/1/unevaluatedProperties","message":"must NOT have unevaluated properties"} |
| draft2020-12:unevaluatedProperties.json#/groups/23/tests/0 | always fails | PASS | {"keyword":"unevaluatedProperties","instancePath":"","schemaPath":"#/allOf/0/unevaluatedProperties","message":"must NOT have unevaluated properties"} |
| draft2020-12:unevaluatedProperties.json#/groups/26/tests/0 | with no nested unevaluated properties | PASS | {"keyword":"unevaluatedProperties","instancePath":"","schemaPath":"#/allOf/0/unevaluatedProperties","message":"must NOT have unevaluated properties"} |
| draft2020-12:unevaluatedProperties.json#/groups/26/tests/1 | with nested unevaluated properties | PASS | {"keyword":"unevaluatedProperties","instancePath":"","schemaPath":"#/allOf/0/unevaluatedProperties","message":"must NOT have unevaluated properties"} |
| draft2020-12:unevaluatedProperties.json#/groups/27/tests/1 | with nested unevaluated properties | PASS | {"keyword":"unevaluatedProperties","instancePath":"","schemaPath":"#/allOf/0/unevaluatedProperties","message":"must NOT have unevaluated properties"} |
| draft2020-12:unevaluatedProperties.json#/groups/28/tests/0 | with no nested unevaluated properties | PASS | {"keyword":"unevaluatedProperties","instancePath":"","schemaPath":"#/allOf/1/unevaluatedProperties","message":"must NOT have unevaluated properties"} |
| draft2020-12:unevaluatedProperties.json#/groups/28/tests/1 | with nested unevaluated properties | PASS | {"keyword":"unevaluatedProperties","instancePath":"","schemaPath":"#/allOf/1/unevaluatedProperties","message":"must NOT have unevaluated properties"} |
| draft2020-12:unevaluatedProperties.json#/groups/29/tests/1 | with nested unevaluated properties | PASS | {"keyword":"unevaluatedProperties","instancePath":"","schemaPath":"#/allOf/1/unevaluatedProperties","message":"must NOT have unevaluated properties"} |
| draft2020-12:unevaluatedProperties.json#/groups/30/tests/1 | uncle keyword evaluation is not significant | PASS | {"keyword":"unevaluatedProperties","instancePath":"/foo","schemaPath":"#/properties/foo/unevaluatedProperties","message":"must NOT have unevaluated properties"} |
| draft2020-12:unevaluatedProperties.json#/groups/31/tests/0 | base case: both properties present | PASS | {"keyword":"unevaluatedProperties","instancePath":"","schemaPath":"#/allOf/0/unevaluatedProperties","message":"must NOT have unevaluated properties"} |
| draft2020-12:unevaluatedProperties.json#/groups/31/tests/2 | in place applicator siblings, foo is missing | PASS | {"keyword":"unevaluatedProperties","instancePath":"","schemaPath":"#/allOf/0/unevaluatedProperties","message":"must NOT have unevaluated properties"} |
| draft2020-12:unevaluatedProperties.json#/groups/32/tests/0 | base case: both properties present | PASS | {"keyword":"unevaluatedProperties","instancePath":"","schemaPath":"#/anyOf/0/unevaluatedProperties","message":"must NOT have unevaluated properties"} |
| draft2020-12:unevaluatedProperties.json#/groups/32/tests/1 | in place applicator siblings, bar is missing | PASS | {"keyword":"unevaluatedProperties","instancePath":"","schemaPath":"#/anyOf/0/unevaluatedProperties","message":"must NOT have unevaluated properties"} |
| draft2020-12:unevaluatedProperties.json#/groups/33/tests/2 | Unevaluated on 1st level is invalid | PASS | {"keyword":"unevaluatedProperties","instancePath":"","schemaPath":"#/unevaluatedProperties","message":"must NOT have unevaluated properties"} |
| draft2020-12:unevaluatedProperties.json#/groups/33/tests/4 | Unevaluated on 2nd level is invalid | PASS | {"keyword":"unevaluatedProperties","instancePath":"/x","schemaPath":"#/unevaluatedProperties","message":"must NOT have unevaluated properties"} |
| draft2020-12:unevaluatedProperties.json#/groups/33/tests/6 | Unevaluated on 3rd level is invalid | PASS | {"keyword":"unevaluatedProperties","instancePath":"/x/x","schemaPath":"#/unevaluatedProperties","message":"must NOT have unevaluated properties"} |
| draft2020-12:unevaluatedProperties.json#/groups/34/tests/0 | Empty is invalid (no x or y) | PASS | {"keyword":"required","instancePath":"","schemaPath":"#/$defs/two/required","message":"must have required property 'x'"} |
| draft2020-12:unevaluatedProperties.json#/groups/34/tests/1 | a and b are invalid (no x or y) | PASS | {"keyword":"required","instancePath":"","schemaPath":"#/$defs/two/required","message":"must have required property 'x'"} |
| draft2020-12:unevaluatedProperties.json#/groups/34/tests/2 | x and y are invalid | PASS | {"keyword":"oneOf","instancePath":"","schemaPath":"#/allOf/2/oneOf","message":"must match exactly one schema in oneOf"} |
| draft2020-12:unevaluatedProperties.json#/groups/34/tests/7 | a and b and x and y are invalid | PASS | {"keyword":"oneOf","instancePath":"","schemaPath":"#/allOf/2/oneOf","message":"must match exactly one schema in oneOf"} |
| draft2020-12:unevaluatedProperties.json#/groups/35/tests/0 | Empty is invalid | PASS | {"keyword":"required","instancePath":"","schemaPath":"#/$defs/two/oneOf/0/required","message":"must have required property 'c'"} |
| draft2020-12:unevaluatedProperties.json#/groups/35/tests/5 | a + b is invalid | PASS | {"keyword":"oneOf","instancePath":"","schemaPath":"#/oneOf","message":"must match exactly one schema in oneOf"} |
| draft2020-12:unevaluatedProperties.json#/groups/35/tests/6 | a + c is invalid | PASS | {"keyword":"oneOf","instancePath":"","schemaPath":"#/oneOf","message":"must match exactly one schema in oneOf"} |
| draft2020-12:unevaluatedProperties.json#/groups/35/tests/7 | a + d is invalid | PASS | {"keyword":"oneOf","instancePath":"","schemaPath":"#/oneOf","message":"must match exactly one schema in oneOf"} |
| draft2020-12:unevaluatedProperties.json#/groups/35/tests/8 | b + c is invalid | PASS | {"keyword":"oneOf","instancePath":"","schemaPath":"#/oneOf","message":"must match exactly one schema in oneOf"} |
| draft2020-12:unevaluatedProperties.json#/groups/35/tests/9 | b + d is invalid | PASS | {"keyword":"oneOf","instancePath":"","schemaPath":"#/oneOf","message":"must match exactly one schema in oneOf"} |
| draft2020-12:unevaluatedProperties.json#/groups/35/tests/10 | c + d is invalid | PASS | {"keyword":"oneOf","instancePath":"","schemaPath":"#/$defs/two/oneOf","message":"must match exactly one schema in oneOf"} |
| draft2020-12:unevaluatedProperties.json#/groups/35/tests/13 | xx + foo is invalid | PASS | {"keyword":"unevaluatedProperties","instancePath":"","schemaPath":"#/unevaluatedProperties","message":"must NOT have unevaluated properties"} |
| draft2020-12:unevaluatedProperties.json#/groups/35/tests/14 | xx + a is invalid | PASS | {"keyword":"oneOf","instancePath":"","schemaPath":"#/oneOf","message":"must match exactly one schema in oneOf"} |
| draft2020-12:unevaluatedProperties.json#/groups/35/tests/15 | xx + b is invalid | PASS | {"keyword":"required","instancePath":"","schemaPath":"#/$defs/two/oneOf/0/required","message":"must have required property 'c'"} |
| draft2020-12:unevaluatedProperties.json#/groups/35/tests/16 | xx + c is invalid | PASS | {"keyword":"required","instancePath":"","schemaPath":"#/oneOf/1/required","message":"must have required property 'b'"} |
| draft2020-12:unevaluatedProperties.json#/groups/35/tests/17 | xx + d is invalid | PASS | {"keyword":"required","instancePath":"","schemaPath":"#/oneOf/1/required","message":"must have required property 'b'"} |
| draft2020-12:unevaluatedProperties.json#/groups/35/tests/20 | all + a is invalid | PASS | {"keyword":"oneOf","instancePath":"","schemaPath":"#/oneOf","message":"must match exactly one schema in oneOf"} |
| draft2020-12:unevaluatedProperties.json#/groups/38/tests/1 | string property is invalid | PASS | {"keyword":"type","instancePath":"/a","schemaPath":"#/unevaluatedProperties/type","message":"must be number"} |
| draft2020-12:unevaluatedProperties.json#/groups/39/tests/0 | valid in case if is evaluated | WRONG | {"keyword":"unevaluatedProperties","instancePath":"","schemaPath":"#/unevaluatedProperties","message":"must NOT have unevaluated properties"} |
| draft2020-12:unevaluatedProperties.json#/groups/39/tests/1 | invalid in case if is evaluated | PASS | {"keyword":"unevaluatedProperties","instancePath":"","schemaPath":"#/unevaluatedProperties","message":"must NOT have unevaluated properties"} |
| draft2020-12:unevaluatedProperties.json#/groups/40/tests/0 | unevaluatedProperties doesn't consider dependentSchemas | PASS | {"keyword":"unevaluatedProperties","instancePath":"","schemaPath":"#/unevaluatedProperties","message":"must NOT have unevaluated properties"} |
| draft2020-12:unevaluatedProperties.json#/groups/40/tests/1 | unevaluatedProperties doesn't see bar when foo2 is absent | PASS | {"keyword":"unevaluatedProperties","instancePath":"","schemaPath":"#/unevaluatedProperties","message":"must NOT have unevaluated properties"} |
| draft2020-12:unevaluatedProperties.json#/groups/41/tests/0 | with an unevaluated property that exists at another location | PASS | {"keyword":"unevaluatedProperties","instancePath":"","schemaPath":"#/unevaluatedProperties","message":"must NOT have unevaluated properties"} |
| draft2020-12:unevaluatedProperties.json#/groups/42/tests/1 | with an unevaluated property that exists at another location | PASS | {"keyword":"unevaluatedProperties","instancePath":"","schemaPath":"#/unevaluatedProperties","message":"must NOT have unevaluated properties"} |
| draft2020-12:unevaluatedProperties.json#/groups/43/tests/1 | with an unevaluated property that exists at another location | PASS | {"keyword":"unevaluatedProperties","instancePath":"","schemaPath":"#/unevaluatedProperties","message":"must NOT have unevaluated properties"} |
| draft2020-12:uniqueItems.json#/groups/0/tests/1 | non-unique array of integers is invalid | PASS | {"keyword":"uniqueItems","instancePath":"","schemaPath":"#/uniqueItems","message":"must NOT have duplicate items (items ## 0 and 1 are identical)"} |
| draft2020-12:uniqueItems.json#/groups/0/tests/2 | non-unique array of more than two integers is invalid | PASS | {"keyword":"uniqueItems","instancePath":"","schemaPath":"#/uniqueItems","message":"must NOT have duplicate items (items ## 0 and 2 are identical)"} |
| draft2020-12:uniqueItems.json#/groups/0/tests/3 | numbers are unique if mathematically unequal | PASS | {"keyword":"uniqueItems","instancePath":"","schemaPath":"#/uniqueItems","message":"must NOT have duplicate items (items ## 1 and 2 are identical)"} |
| draft2020-12:uniqueItems.json#/groups/0/tests/7 | non-unique array of strings is invalid | PASS | {"keyword":"uniqueItems","instancePath":"","schemaPath":"#/uniqueItems","message":"must NOT have duplicate items (items ## 0 and 2 are identical)"} |
| draft2020-12:uniqueItems.json#/groups/0/tests/9 | non-unique array of objects is invalid | PASS | {"keyword":"uniqueItems","instancePath":"","schemaPath":"#/uniqueItems","message":"must NOT have duplicate items (items ## 0 and 1 are identical)"} |
| draft2020-12:uniqueItems.json#/groups/0/tests/10 | property order of array of objects is ignored | PASS | {"keyword":"uniqueItems","instancePath":"","schemaPath":"#/uniqueItems","message":"must NOT have duplicate items (items ## 0 and 1 are identical)"} |
| draft2020-12:uniqueItems.json#/groups/0/tests/12 | non-unique array of nested objects is invalid | PASS | {"keyword":"uniqueItems","instancePath":"","schemaPath":"#/uniqueItems","message":"must NOT have duplicate items (items ## 0 and 1 are identical)"} |
| draft2020-12:uniqueItems.json#/groups/0/tests/14 | non-unique array of arrays is invalid | PASS | {"keyword":"uniqueItems","instancePath":"","schemaPath":"#/uniqueItems","message":"must NOT have duplicate items (items ## 0 and 1 are identical)"} |
| draft2020-12:uniqueItems.json#/groups/0/tests/15 | non-unique array of more than two arrays is invalid | PASS | {"keyword":"uniqueItems","instancePath":"","schemaPath":"#/uniqueItems","message":"must NOT have duplicate items (items ## 0 and 2 are identical)"} |
| draft2020-12:uniqueItems.json#/groups/0/tests/23 | non-unique heterogeneous types are invalid | PASS | {"keyword":"uniqueItems","instancePath":"","schemaPath":"#/uniqueItems","message":"must NOT have duplicate items (items ## 0 and 4 are identical)"} |
| draft2020-12:uniqueItems.json#/groups/0/tests/25 | objects are non-unique despite key order | PASS | {"keyword":"uniqueItems","instancePath":"","schemaPath":"#/uniqueItems","message":"must NOT have duplicate items (items ## 0 and 1 are identical)"} |
| draft2020-12:uniqueItems.json#/groups/1/tests/2 | [false, false] from items array is not valid | PASS | {"keyword":"uniqueItems","instancePath":"","schemaPath":"#/uniqueItems","message":"must NOT have duplicate items (items ## 0 and 1 are identical)"} |
| draft2020-12:uniqueItems.json#/groups/1/tests/3 | [true, true] from items array is not valid | PASS | {"keyword":"uniqueItems","instancePath":"","schemaPath":"#/uniqueItems","message":"must NOT have duplicate items (items ## 0 and 1 are identical)"} |
| draft2020-12:uniqueItems.json#/groups/1/tests/6 | non-unique array extended from [false, true] is not valid | PASS | {"keyword":"uniqueItems","instancePath":"","schemaPath":"#/uniqueItems","message":"must NOT have duplicate items (items ## 2 and 3 are identical)"} |
| draft2020-12:uniqueItems.json#/groups/1/tests/7 | non-unique array extended from [true, false] is not valid | PASS | {"keyword":"uniqueItems","instancePath":"","schemaPath":"#/uniqueItems","message":"must NOT have duplicate items (items ## 2 and 3 are identical)"} |
| draft2020-12:uniqueItems.json#/groups/2/tests/2 | [false, false] from items array is not valid | PASS | {"keyword":"uniqueItems","instancePath":"","schemaPath":"#/uniqueItems","message":"must NOT have duplicate items (items ## 0 and 1 are identical)"} |
| draft2020-12:uniqueItems.json#/groups/2/tests/3 | [true, true] from items array is not valid | PASS | {"keyword":"uniqueItems","instancePath":"","schemaPath":"#/uniqueItems","message":"must NOT have duplicate items (items ## 0 and 1 are identical)"} |
| draft2020-12:uniqueItems.json#/groups/2/tests/4 | extra items are invalid even if unique | PASS | {"keyword":"items","instancePath":"","schemaPath":"#/items","message":"must NOT have more than 2 items"} |
| draft2020-12:uniqueItems.json#/groups/5/tests/4 | extra items are invalid even if unique | PASS | {"keyword":"items","instancePath":"","schemaPath":"#/items","message":"must NOT have more than 2 items"} |
| draft2020-12:vocabulary.json#/groups/0/tests/0 | applicator vocabulary still works | PASS | {"keyword":"false schema","instancePath":"/badProperty","schemaPath":"#/properties/badProperty/false schema","message":"boolean schema is false"} |
| draft2020-12:vocabulary.json#/groups/0/tests/2 | no validation: invalid number, but it still validates | WRONG | {"keyword":"minimum","instancePath":"/numberProperty","schemaPath":"#/properties/numberProperty/minimum","message":"must be >= 10"} |
| draft2020-12:vocabulary.json#/groups/1/tests/0 | string value | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be number"} |
