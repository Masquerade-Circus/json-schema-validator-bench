# Conformance: [djv](https://www.npmjs.com/package/djv) (2.1.4) draft6

## Report options

| Profile | Options | SHA-256 |
| --- | --- | --- |
| base | {"formatProfile":"base","version":"draft-06"} | 7c5dd4b23815e3dcd63a401cc6651900cd9a9e67d7f1726b2ed0937e66e2054e |
| format-assertion | {"formatProfile":"format-assertion","version":"draft-06"} | b26c80e9f4478f71b3b2aa9cc859835a6e18c1c2c9827b0a1db2abbe72e214cc |

## Counts

| Profile | Status | Cases | Percentage |
| --- | --- | ---: | ---: |
| base | PASS | 807 | 85.40% |
| base | WRONG | 98 | 10.37% |
| base | COMPILE | 15 | 1.59% |
| base | RUNTIME | 25 | 2.65% |
| base | UNSUPPORTED | 0 | 0.00% |
| format-assertion | PASS | 217 | 79.49% |
| format-assertion | WRONG | 54 | 19.78% |
| format-assertion | COMPILE | 0 | 0.00% |
| format-assertion | RUNTIME | 2 | 0.73% |
| format-assertion | UNSUPPORTED | 0 | 0.00% |

## Non-PASS cases

| Case ID | Description | Expected | Observed | Status | Error |
| --- | --- | --- | --- | --- | --- |
| draft6:const.json#/groups/4/tests/0 | false is valid | true | false | WRONG | [object Object] |
| draft6:const.json#/groups/5/tests/0 | true is valid | true | false | WRONG | [object Object] |
| draft6:const.json#/groups/6/tests/0 | [false] is valid | true | false | WRONG | [object Object] |
| draft6:const.json#/groups/7/tests/0 | [true] is valid | true | false | WRONG | [object Object] |
| draft6:const.json#/groups/8/tests/0 | {"a": false} is valid | true | false | WRONG | [object Object] |
| draft6:const.json#/groups/9/tests/0 | {"a": true} is valid | true | false | WRONG | [object Object] |
| draft6:const.json#/groups/10/tests/0 | false is invalid | false | true | WRONG |  |
| draft6:const.json#/groups/11/tests/0 | true is invalid | false | true | WRONG |  |
| draft6:const.json#/groups/15/tests/0 | character uses the same codepoint | true |  | RUNTIME | FAST_RUNTIME_ERROR: URI malformed |
| draft6:const.json#/groups/15/tests/1 | character looks the same but uses a different codepoint | false |  | RUNTIME | FAST_RUNTIME_ERROR: URI malformed |
| draft6:const.json#/groups/16/tests/0 | character uses the same codepoint | true |  | RUNTIME | FAST_RUNTIME_ERROR: URI malformed |
| draft6:const.json#/groups/16/tests/1 | character looks the same but uses combining marks | false |  | RUNTIME | FAST_RUNTIME_ERROR: URI malformed |
| draft6:contains.json#/groups/4/tests/0 | matches items, does not match contains | false | true | WRONG |  |
| draft6:definitions.json#/groups/0/tests/0 | valid definition schema | true |  | RUNTIME | FAST_RUNTIME_ERROR: Maximum call stack size exceeded |
| draft6:definitions.json#/groups/0/tests/1 | invalid definition schema | false |  | RUNTIME | FAST_RUNTIME_ERROR: Maximum call stack size exceeded |
| draft6:dependencies.json#/groups/6/tests/0 | matches root | false | true | WRONG |  |
| draft6:enum.json#/groups/5/tests/0 | false is valid | true | false | WRONG | [object Object] |
| draft6:enum.json#/groups/7/tests/0 | true is valid | true | false | WRONG | [object Object] |
| draft6:enum.json#/groups/9/tests/0 | false is invalid | false | true | WRONG |  |
| draft6:enum.json#/groups/11/tests/0 | true is invalid | false | true | WRONG |  |
| draft6:format.json#/groups/0/tests/0 | all string formats ignore integers | true | false | WRONG | [object Object] |
| draft6:format.json#/groups/0/tests/1 | all string formats ignore floats | true | false | WRONG | [object Object] |
| draft6:format.json#/groups/0/tests/2 | all string formats ignore objects | true | false | WRONG | [object Object] |
| draft6:format.json#/groups/0/tests/3 | all string formats ignore arrays | true | false | WRONG | [object Object] |
| draft6:format.json#/groups/0/tests/4 | all string formats ignore booleans | true | false | WRONG | [object Object] |
| draft6:format.json#/groups/0/tests/5 | all string formats ignore nulls | true | false | WRONG | [object Object] |
| draft6:format.json#/groups/1/tests/0 | all string formats ignore integers | true | false | WRONG | [object Object] |
| draft6:format.json#/groups/1/tests/1 | all string formats ignore floats | true | false | WRONG | [object Object] |
| draft6:format.json#/groups/1/tests/2 | all string formats ignore objects | true | false | WRONG | [object Object] |
| draft6:format.json#/groups/1/tests/3 | all string formats ignore arrays | true | false | WRONG | [object Object] |
| draft6:format.json#/groups/1/tests/4 | all string formats ignore booleans | true | false | WRONG | [object Object] |
| draft6:format.json#/groups/1/tests/5 | all string formats ignore nulls | true | false | WRONG | [object Object] |
| draft6:format.json#/groups/2/tests/0 | all string formats ignore integers | true | false | WRONG | [object Object] |
| draft6:format.json#/groups/2/tests/1 | all string formats ignore floats | true | false | WRONG | [object Object] |
| draft6:format.json#/groups/2/tests/2 | all string formats ignore objects | true | false | WRONG | [object Object] |
| draft6:format.json#/groups/2/tests/3 | all string formats ignore arrays | true | false | WRONG | [object Object] |
| draft6:format.json#/groups/2/tests/4 | all string formats ignore booleans | true | false | WRONG | [object Object] |
| draft6:format.json#/groups/2/tests/5 | all string formats ignore nulls | true | false | WRONG | [object Object] |
| draft6:format.json#/groups/3/tests/2 | all string formats ignore objects | true | false | WRONG | [object Object] |
| draft6:format.json#/groups/3/tests/3 | all string formats ignore arrays | true | false | WRONG | [object Object] |
| draft6:format.json#/groups/3/tests/5 | all string formats ignore nulls | true |  | RUNTIME | FAST_RUNTIME_ERROR: Cannot read properties of null (reading 'length') |
| draft6:format.json#/groups/4/tests/0 | all string formats ignore integers | true |  | RUNTIME | FAST_RUNTIME_ERROR: data.indexOf is not a function |
| draft6:format.json#/groups/4/tests/1 | all string formats ignore floats | true | false | WRONG | [object Object] |
| draft6:format.json#/groups/4/tests/2 | all string formats ignore objects | true | false | WRONG | [object Object] |
| draft6:format.json#/groups/4/tests/3 | all string formats ignore arrays | true | false | WRONG | [object Object] |
| draft6:format.json#/groups/4/tests/4 | all string formats ignore booleans | true | false | WRONG | [object Object] |
| draft6:format.json#/groups/4/tests/5 | all string formats ignore nulls | true | false | WRONG | [object Object] |
| draft6:format.json#/groups/5/tests/0 | all string formats ignore integers | true | false | WRONG | [object Object] |
| draft6:format.json#/groups/5/tests/1 | all string formats ignore floats | true | false | WRONG | [object Object] |
| draft6:format.json#/groups/5/tests/2 | all string formats ignore objects | true | false | WRONG | [object Object] |
| draft6:format.json#/groups/5/tests/4 | all string formats ignore booleans | true | false | WRONG | [object Object] |
| draft6:format.json#/groups/5/tests/5 | all string formats ignore nulls | true | false | WRONG | [object Object] |
| draft6:format.json#/groups/6/tests/0 | all string formats ignore integers | true | false | WRONG | [object Object] |
| draft6:format.json#/groups/6/tests/1 | all string formats ignore floats | true | false | WRONG | [object Object] |
| draft6:format.json#/groups/6/tests/2 | all string formats ignore objects | true | false | WRONG | [object Object] |
| draft6:format.json#/groups/6/tests/3 | all string formats ignore arrays | true | false | WRONG | [object Object] |
| draft6:format.json#/groups/6/tests/4 | all string formats ignore booleans | true | false | WRONG | [object Object] |
| draft6:format.json#/groups/6/tests/5 | all string formats ignore nulls | true | false | WRONG | [object Object] |
| draft6:format.json#/groups/7/tests/2 | all string formats ignore objects | true | false | WRONG | [object Object] |
| draft6:format.json#/groups/8/tests/2 | all string formats ignore objects | true | false | WRONG | [object Object] |
| draft6:minProperties.json#/groups/0/tests/6 | ignores null | true |  | RUNTIME | FAST_RUNTIME_ERROR: Cannot convert undefined or null to object |
| draft6:optional/ecmascript-regex.json#/groups/10/tests/0 | ascii character in json string | true | false | WRONG | [object Object] |
| draft6:optional/ecmascript-regex.json#/groups/10/tests/1 | literal unicode character in json string | true | false | WRONG | [object Object] |
| draft6:optional/ecmascript-regex.json#/groups/10/tests/2 | unicode character in hex format in string | true | false | WRONG | [object Object] |
| draft6:optional/ecmascript-regex.json#/groups/14/tests/0 | ascii digits | true | false | WRONG | [object Object] |
| draft6:optional/ecmascript-regex.json#/groups/14/tests/2 | non-ascii digits (BENGALI DIGIT FOUR, BENGALI DIGIT TWO) | true | false | WRONG | [object Object] |
| draft6:optional/ecmascript-regex.json#/groups/15/tests/0 | ascii character in json string | true | false | WRONG | [object Object] |
| draft6:optional/ecmascript-regex.json#/groups/15/tests/1 | literal unicode character in json string | true | false | WRONG | [object Object] |
| draft6:optional/ecmascript-regex.json#/groups/15/tests/2 | unicode character in hex format in string | true | false | WRONG | [object Object] |
| draft6:optional/ecmascript-regex.json#/groups/19/tests/0 | ascii digits | true | false | WRONG | [object Object] |
| draft6:optional/ecmascript-regex.json#/groups/19/tests/2 | non-ascii digits (BENGALI DIGIT FOUR, BENGALI DIGIT TWO) | true | false | WRONG | [object Object] |
| draft6:optional/float-overflow.json#/groups/0/tests/0 | valid if optional overflow handling is implemented | true | false | WRONG | [object Object] |
| draft6:optional/format/date-time.json#/groups/0/tests/0 | all string formats ignore integers | true |  | RUNTIME | FAST_RUNTIME_ERROR: data.indexOf is not a function |
| draft6:optional/format/date-time.json#/groups/0/tests/1 | all string formats ignore floats | true | false | WRONG | [object Object] |
| draft6:optional/format/date-time.json#/groups/0/tests/2 | all string formats ignore objects | true | false | WRONG | [object Object] |
| draft6:optional/format/date-time.json#/groups/0/tests/3 | all string formats ignore arrays | true | false | WRONG | [object Object] |
| draft6:optional/format/date-time.json#/groups/0/tests/4 | all string formats ignore booleans | true | false | WRONG | [object Object] |
| draft6:optional/format/date-time.json#/groups/0/tests/5 | all string formats ignore nulls | true | false | WRONG | [object Object] |
| draft6:optional/format/date-time.json#/groups/0/tests/10 | a valid date-time with a leap second, UTC | true | false | WRONG | [object Object] |
| draft6:optional/format/date-time.json#/groups/0/tests/11 | a valid date-time with a leap second, with minus offset | true | false | WRONG | [object Object] |
| draft6:optional/format/date-time.json#/groups/0/tests/15 | an invalid hour in date-time string | false | true | WRONG |  |
| draft6:optional/format/date-time.json#/groups/0/tests/18 | an invalid day in date-time string | false | true | WRONG |  |
| draft6:optional/format/email.json#/groups/0/tests/0 | all string formats ignore integers | true | false | WRONG | [object Object] |
| draft6:optional/format/email.json#/groups/0/tests/1 | all string formats ignore floats | true | false | WRONG | [object Object] |
| draft6:optional/format/email.json#/groups/0/tests/2 | all string formats ignore objects | true | false | WRONG | [object Object] |
| draft6:optional/format/email.json#/groups/0/tests/3 | all string formats ignore arrays | true | false | WRONG | [object Object] |
| draft6:optional/format/email.json#/groups/0/tests/4 | all string formats ignore booleans | true | false | WRONG | [object Object] |
| draft6:optional/format/email.json#/groups/0/tests/5 | all string formats ignore nulls | true | false | WRONG | [object Object] |
| draft6:optional/format/email.json#/groups/0/tests/11 | dot before local part is not valid | false | true | WRONG |  |
| draft6:optional/format/email.json#/groups/0/tests/12 | dot after local part is not valid | false | true | WRONG |  |
| draft6:optional/format/email.json#/groups/0/tests/14 | two subsequent dots inside local part are not valid | false | true | WRONG |  |
| draft6:optional/format/email.json#/groups/0/tests/16 | full "From" header is invalid | false | true | WRONG |  |
| draft6:optional/format/email.json#/groups/0/tests/19 | unquoted space in local part is invalid | false | true | WRONG |  |
| draft6:optional/format/hostname.json#/groups/0/tests/2 | all string formats ignore objects | true | false | WRONG | [object Object] |
| draft6:optional/format/hostname.json#/groups/0/tests/3 | all string formats ignore arrays | true | false | WRONG | [object Object] |
| draft6:optional/format/hostname.json#/groups/0/tests/5 | all string formats ignore nulls | true |  | RUNTIME | FAST_RUNTIME_ERROR: Cannot read properties of null (reading 'length') |
| draft6:optional/format/ipv4.json#/groups/0/tests/0 | all string formats ignore integers | true | false | WRONG | [object Object] |
| draft6:optional/format/ipv4.json#/groups/0/tests/1 | all string formats ignore floats | true | false | WRONG | [object Object] |
| draft6:optional/format/ipv4.json#/groups/0/tests/2 | all string formats ignore objects | true | false | WRONG | [object Object] |
| draft6:optional/format/ipv4.json#/groups/0/tests/3 | all string formats ignore arrays | true | false | WRONG | [object Object] |
| draft6:optional/format/ipv4.json#/groups/0/tests/4 | all string formats ignore booleans | true | false | WRONG | [object Object] |
| draft6:optional/format/ipv4.json#/groups/0/tests/5 | all string formats ignore nulls | true | false | WRONG | [object Object] |
| draft6:optional/format/ipv4.json#/groups/0/tests/23 | empty part (double dot) is invalid | false | true | WRONG |  |
| draft6:optional/format/ipv6.json#/groups/0/tests/0 | all string formats ignore integers | true | false | WRONG | [object Object] |
| draft6:optional/format/ipv6.json#/groups/0/tests/1 | all string formats ignore floats | true | false | WRONG | [object Object] |
| draft6:optional/format/ipv6.json#/groups/0/tests/2 | all string formats ignore objects | true | false | WRONG | [object Object] |
| draft6:optional/format/ipv6.json#/groups/0/tests/3 | all string formats ignore arrays | true | false | WRONG | [object Object] |
| draft6:optional/format/ipv6.json#/groups/0/tests/4 | all string formats ignore booleans | true | false | WRONG | [object Object] |
| draft6:optional/format/ipv6.json#/groups/0/tests/5 | all string formats ignore nulls | true | false | WRONG | [object Object] |
| draft6:optional/format/ipv6.json#/groups/0/tests/8 | trailing 4 hex symbols is valid | true | false | WRONG | [object Object] |
| draft6:optional/format/ipv6.json#/groups/0/tests/13 | leading colons is valid | true | false | WRONG | [object Object] |
| draft6:optional/format/ipv6.json#/groups/0/tests/14 | trailing colons is valid | true | false | WRONG | [object Object] |
| draft6:optional/format/ipv6.json#/groups/0/tests/18 | single set of double colons in the middle is valid | true | false | WRONG | [object Object] |
| draft6:optional/format/ipv6.json#/groups/0/tests/20 | mixed format with the ipv4 section as decimal octets | true | false | WRONG | [object Object] |
| draft6:optional/format/ipv6.json#/groups/0/tests/24 | mixed format with leading double colons (ipv4-mapped ipv6 address) | true | false | WRONG | [object Object] |
| draft6:optional/format/json-pointer.json#/groups/0/tests/0 | all string formats ignore integers | true | false | WRONG | [object Object] |
| draft6:optional/format/json-pointer.json#/groups/0/tests/1 | all string formats ignore floats | true | false | WRONG | [object Object] |
| draft6:optional/format/json-pointer.json#/groups/0/tests/2 | all string formats ignore objects | true | false | WRONG | [object Object] |
| draft6:optional/format/json-pointer.json#/groups/0/tests/4 | all string formats ignore booleans | true | false | WRONG | [object Object] |
| draft6:optional/format/json-pointer.json#/groups/0/tests/5 | all string formats ignore nulls | true | false | WRONG | [object Object] |
| draft6:optional/format/uri-reference.json#/groups/0/tests/2 | all string formats ignore objects | true | false | WRONG | [object Object] |
| draft6:optional/format/uri-template.json#/groups/0/tests/2 | all string formats ignore objects | true | false | WRONG | [object Object] |
| draft6:optional/format/uri.json#/groups/0/tests/0 | all string formats ignore integers | true | false | WRONG | [object Object] |
| draft6:optional/format/uri.json#/groups/0/tests/1 | all string formats ignore floats | true | false | WRONG | [object Object] |
| draft6:optional/format/uri.json#/groups/0/tests/2 | all string formats ignore objects | true | false | WRONG | [object Object] |
| draft6:optional/format/uri.json#/groups/0/tests/3 | all string formats ignore arrays | true | false | WRONG | [object Object] |
| draft6:optional/format/uri.json#/groups/0/tests/4 | all string formats ignore booleans | true | false | WRONG | [object Object] |
| draft6:optional/format/uri.json#/groups/0/tests/5 | all string formats ignore nulls | true | false | WRONG | [object Object] |
| draft6:optional/id.json#/groups/0/tests/1 | match $ref to id | true |  | RUNTIME | FAST_RUNTIME_ERROR: Maximum call stack size exceeded |
| draft6:optional/id.json#/groups/0/tests/2 | no match on enum or $ref to id | false |  | RUNTIME | FAST_RUNTIME_ERROR: Maximum call stack size exceeded |
| draft6:optional/non-bmp-regex.json#/groups/0/tests/0 | matches empty | true | false | WRONG | [object Object] |
| draft6:optional/non-bmp-regex.json#/groups/0/tests/2 | matches two | true | false | WRONG | [object Object] |
| draft6:optional/non-bmp-regex.json#/groups/1/tests/4 | doesn't match two | false | true | WRONG |  |
| draft6:optional/unknownKeyword.json#/groups/0/tests/0 | type matches second anyOf, which has a real schema in it | true |  | RUNTIME | FAST_RUNTIME_ERROR: Maximum call stack size exceeded |
| draft6:optional/unknownKeyword.json#/groups/0/tests/1 | type matches non-schema in first anyOf | false |  | RUNTIME | FAST_RUNTIME_ERROR: Maximum call stack size exceeded |
| draft6:optional/unknownKeyword.json#/groups/0/tests/2 | type matches non-schema in third anyOf | false |  | RUNTIME | FAST_RUNTIME_ERROR: Maximum call stack size exceeded |
| draft6:propertyNames.json#/groups/0/tests/6 | ignores null | true |  | RUNTIME | FAST_RUNTIME_ERROR: Cannot convert undefined or null to object |
| draft6:ref.json#/groups/6/tests/0 | $ref resolves to /definitions/base_foo, data does not validate | false |  | RUNTIME | FAST_RUNTIME_ERROR: Maximum call stack size exceeded |
| draft6:ref.json#/groups/6/tests/1 | $ref resolves to /definitions/base_foo, data validates | true |  | RUNTIME | FAST_RUNTIME_ERROR: Maximum call stack size exceeded |
| draft6:ref.json#/groups/7/tests/0 | remote ref valid | true |  | RUNTIME | FAST_RUNTIME_ERROR: Maximum call stack size exceeded |
| draft6:ref.json#/groups/7/tests/1 | remote ref invalid | false |  | RUNTIME | FAST_RUNTIME_ERROR: Maximum call stack size exceeded |
| draft6:ref.json#/groups/14/tests/0 | match | true |  | RUNTIME | FAST_RUNTIME_ERROR: Maximum call stack size exceeded |
| draft6:ref.json#/groups/14/tests/1 | mismatch | false |  | RUNTIME | FAST_RUNTIME_ERROR: Maximum call stack size exceeded |
| draft6:ref.json#/groups/15/tests/0 | match | true |  | RUNTIME | FAST_RUNTIME_ERROR: Maximum call stack size exceeded |
| draft6:ref.json#/groups/15/tests/1 | mismatch | false |  | RUNTIME | FAST_RUNTIME_ERROR: Maximum call stack size exceeded |
| draft6:ref.json#/groups/16/tests/0 | match | true |  | RUNTIME | FAST_RUNTIME_ERROR: Maximum call stack size exceeded |
| draft6:ref.json#/groups/16/tests/1 | mismatch | false |  | RUNTIME | FAST_RUNTIME_ERROR: Maximum call stack size exceeded |
| draft6:ref.json#/groups/18/tests/0 | invalid on inner field | false |  | COMPILE | FAST_SETUP_ERROR: Cannot read properties of undefined (reading 'inner') |
| draft6:ref.json#/groups/18/tests/1 | invalid on outer field | false |  | COMPILE | FAST_SETUP_ERROR: Cannot read properties of undefined (reading 'inner') |
| draft6:ref.json#/groups/18/tests/2 | valid on both fields | true |  | COMPILE | FAST_SETUP_ERROR: Cannot read properties of undefined (reading 'inner') |
| draft6:ref.json#/groups/19/tests/0 | invalid on inner field | false |  | COMPILE | FAST_SETUP_ERROR: Cannot read properties of undefined (reading 'inner') |
| draft6:ref.json#/groups/19/tests/1 | invalid on outer field | false |  | COMPILE | FAST_SETUP_ERROR: Cannot read properties of undefined (reading 'inner') |
| draft6:ref.json#/groups/19/tests/2 | valid on both fields | true |  | COMPILE | FAST_SETUP_ERROR: Cannot read properties of undefined (reading 'inner') |
| draft6:ref.json#/groups/26/tests/1 | a non-string is invalid | false | true | WRONG |  |
| draft6:ref.json#/groups/27/tests/0 | a string is valid | true |  | COMPILE | FAST_SETUP_ERROR: Cannot read properties of undefined (reading 'absref') |
| draft6:ref.json#/groups/27/tests/1 | an integer is invalid | false |  | COMPILE | FAST_SETUP_ERROR: Cannot read properties of undefined (reading 'absref') |
| draft6:refRemote.json#/groups/6/tests/0 | string is valid | true |  | COMPILE | FAST_SETUP_ERROR: Cannot read properties of undefined (reading 'orNull') |
| draft6:refRemote.json#/groups/6/tests/1 | null is valid | true |  | COMPILE | FAST_SETUP_ERROR: Cannot read properties of undefined (reading 'orNull') |
| draft6:refRemote.json#/groups/6/tests/2 | object is invalid | false |  | COMPILE | FAST_SETUP_ERROR: Cannot read properties of undefined (reading 'orNull') |
| draft6:refRemote.json#/groups/7/tests/0 | invalid | false |  | COMPILE | FAST_SETUP_ERROR: Cannot read properties of undefined (reading 'ref-and-definitions.json') |
| draft6:refRemote.json#/groups/7/tests/1 | valid | true |  | COMPILE | FAST_SETUP_ERROR: Cannot read properties of undefined (reading 'ref-and-definitions.json') |
| draft6:refRemote.json#/groups/8/tests/1 | string is invalid | false | true | WRONG |  |
| draft6:refRemote.json#/groups/9/tests/0 | number is invalid | false |  | COMPILE | FAST_SETUP_ERROR: Cannot read properties of undefined (reading 'foo-ref-string.json') |
| draft6:refRemote.json#/groups/9/tests/1 | string is valid | true |  | COMPILE | FAST_SETUP_ERROR: Cannot read properties of undefined (reading 'foo-ref-string.json') |
| draft6:uniqueItems.json#/groups/0/tests/10 | property order of array of objects is ignored | false | true | WRONG |  |
| draft6:uniqueItems.json#/groups/0/tests/22 | unique heterogeneous types are valid | true | false | WRONG | [object Object] |
| draft6:uniqueItems.json#/groups/0/tests/25 | objects are non-unique despite key order | false | true | WRONG |  |
| draft6:uniqueItems.json#/groups/3/tests/0 | unique array of integers is valid | true | false | WRONG | [object Object] |
| draft6:uniqueItems.json#/groups/3/tests/1 | non-unique array of integers is valid | true | false | WRONG | [object Object] |
| draft6:uniqueItems.json#/groups/3/tests/2 | numbers are unique if mathematically unequal | true | false | WRONG | [object Object] |
| draft6:uniqueItems.json#/groups/3/tests/3 | false is not equal to zero | true | false | WRONG | [object Object] |
| draft6:uniqueItems.json#/groups/3/tests/4 | true is not equal to one | true | false | WRONG | [object Object] |
| draft6:uniqueItems.json#/groups/3/tests/5 | unique array of objects is valid | true | false | WRONG | [object Object] |
| draft6:uniqueItems.json#/groups/3/tests/6 | non-unique array of objects is valid | true | false | WRONG | [object Object] |
| draft6:uniqueItems.json#/groups/3/tests/7 | unique array of nested objects is valid | true | false | WRONG | [object Object] |
| draft6:uniqueItems.json#/groups/3/tests/8 | non-unique array of nested objects is valid | true | false | WRONG | [object Object] |
| draft6:uniqueItems.json#/groups/3/tests/9 | unique array of arrays is valid | true | false | WRONG | [object Object] |
| draft6:uniqueItems.json#/groups/3/tests/10 | non-unique array of arrays is valid | true | false | WRONG | [object Object] |
| draft6:uniqueItems.json#/groups/3/tests/11 | 1 and true are unique | true | false | WRONG | [object Object] |
| draft6:uniqueItems.json#/groups/3/tests/12 | 0 and false are unique | true | false | WRONG | [object Object] |
| draft6:uniqueItems.json#/groups/3/tests/13 | unique heterogeneous types are valid | true | false | WRONG | [object Object] |
| draft6:uniqueItems.json#/groups/3/tests/14 | non-unique heterogeneous types are valid | true | false | WRONG | [object Object] |
| draft6:uniqueItems.json#/groups/4/tests/0 | [false, true] from items array is valid | true | false | WRONG | [object Object] |
| draft6:uniqueItems.json#/groups/4/tests/1 | [true, false] from items array is valid | true | false | WRONG | [object Object] |
| draft6:uniqueItems.json#/groups/4/tests/2 | [false, false] from items array is valid | true | false | WRONG | [object Object] |
| draft6:uniqueItems.json#/groups/4/tests/3 | [true, true] from items array is valid | true | false | WRONG | [object Object] |
| draft6:uniqueItems.json#/groups/4/tests/4 | unique array extended from [false, true] is valid | true | false | WRONG | [object Object] |
| draft6:uniqueItems.json#/groups/4/tests/5 | unique array extended from [true, false] is valid | true | false | WRONG | [object Object] |
| draft6:uniqueItems.json#/groups/4/tests/6 | non-unique array extended from [false, true] is valid | true | false | WRONG | [object Object] |
| draft6:uniqueItems.json#/groups/4/tests/7 | non-unique array extended from [true, false] is valid | true | false | WRONG | [object Object] |
| draft6:uniqueItems.json#/groups/5/tests/0 | [false, true] from items array is valid | true | false | WRONG | [object Object] |
| draft6:uniqueItems.json#/groups/5/tests/1 | [true, false] from items array is valid | true | false | WRONG | [object Object] |
| draft6:uniqueItems.json#/groups/5/tests/2 | [false, false] from items array is valid | true | false | WRONG | [object Object] |
| draft6:uniqueItems.json#/groups/5/tests/3 | [true, true] from items array is valid | true | false | WRONG | [object Object] |

## Detailed errors for invalid results

| Case ID | Description | Status | Error |
| --- | --- | --- | --- |
| draft6:additionalItems.json#/groups/0/tests/1 | additional items do not match schema | PASS | [object Object] |
| draft6:additionalItems.json#/groups/1/tests/1 | invalid with a array of mixed types | PASS | [object Object] |
| draft6:additionalItems.json#/groups/3/tests/4 | additional items are not permitted | PASS | [object Object] |
| draft6:additionalItems.json#/groups/6/tests/0 | items defined in allOf are not examined | PASS | [object Object] |
| draft6:additionalItems.json#/groups/7/tests/1 | wrong type of second item | PASS | [object Object] |
| draft6:additionalItems.json#/groups/8/tests/0 | heterogeneous invalid instance | PASS | [object Object] |
| draft6:additionalProperties.json#/groups/0/tests/1 | an additional property is invalid | PASS | [object Object] |
| draft6:additionalProperties.json#/groups/1/tests/1 | not matching the pattern is invalid | PASS | [object Object] |
| draft6:additionalProperties.json#/groups/2/tests/2 | an additional invalid property is invalid | PASS | [object Object] |
| draft6:additionalProperties.json#/groups/3/tests/1 | an additional invalid property is invalid | PASS | [object Object] |
| draft6:additionalProperties.json#/groups/5/tests/0 | properties defined in allOf are not examined | PASS | [object Object] |
| draft6:allOf.json#/groups/0/tests/1 | mismatch second | PASS | [object Object] |
| draft6:allOf.json#/groups/0/tests/2 | mismatch first | PASS | [object Object] |
| draft6:allOf.json#/groups/0/tests/3 | wrong type | PASS | [object Object] |
| draft6:allOf.json#/groups/1/tests/1 | mismatch base schema | PASS | [object Object] |
| draft6:allOf.json#/groups/1/tests/2 | mismatch first allOf | PASS | [object Object] |
| draft6:allOf.json#/groups/1/tests/3 | mismatch second allOf | PASS | [object Object] |
| draft6:allOf.json#/groups/1/tests/4 | mismatch both | PASS | [object Object] |
| draft6:allOf.json#/groups/2/tests/1 | mismatch one | PASS | [object Object] |
| draft6:allOf.json#/groups/4/tests/0 | any value is invalid | PASS | [object Object] |
| draft6:allOf.json#/groups/5/tests/0 | any value is invalid | PASS | [object Object] |
| draft6:allOf.json#/groups/8/tests/1 | string is invalid | PASS | [object Object] |
| draft6:allOf.json#/groups/9/tests/1 | string is invalid | PASS | [object Object] |
| draft6:allOf.json#/groups/10/tests/1 | anything non-null is invalid | PASS | [object Object] |
| draft6:allOf.json#/groups/11/tests/0 | allOf: false, anyOf: false, oneOf: false | PASS | [object Object] |
| draft6:allOf.json#/groups/11/tests/1 | allOf: false, anyOf: false, oneOf: true | PASS | [object Object] |
| draft6:allOf.json#/groups/11/tests/2 | allOf: false, anyOf: true, oneOf: false | PASS | [object Object] |
| draft6:allOf.json#/groups/11/tests/3 | allOf: false, anyOf: true, oneOf: true | PASS | [object Object] |
| draft6:allOf.json#/groups/11/tests/4 | allOf: true, anyOf: false, oneOf: false | PASS | [object Object] |
| draft6:allOf.json#/groups/11/tests/5 | allOf: true, anyOf: false, oneOf: true | PASS | [object Object] |
| draft6:allOf.json#/groups/11/tests/6 | allOf: true, anyOf: true, oneOf: false | PASS | [object Object] |
| draft6:anyOf.json#/groups/0/tests/3 | neither anyOf valid | PASS | [object Object] |
| draft6:anyOf.json#/groups/1/tests/0 | mismatch base schema | PASS | [object Object] |
| draft6:anyOf.json#/groups/1/tests/2 | both anyOf invalid | PASS | [object Object] |
| draft6:anyOf.json#/groups/4/tests/0 | any value is invalid | PASS | [object Object] |
| draft6:anyOf.json#/groups/5/tests/3 | neither anyOf valid (complex) | PASS | [object Object] |
| draft6:anyOf.json#/groups/7/tests/1 | anything non-null is invalid | PASS | [object Object] |
| draft6:boolean_schema.json#/groups/1/tests/0 | number is invalid | PASS | [object Object] |
| draft6:boolean_schema.json#/groups/1/tests/1 | string is invalid | PASS | [object Object] |
| draft6:boolean_schema.json#/groups/1/tests/2 | boolean true is invalid | PASS | [object Object] |
| draft6:boolean_schema.json#/groups/1/tests/3 | boolean false is invalid | PASS | [object Object] |
| draft6:boolean_schema.json#/groups/1/tests/4 | null is invalid | PASS | [object Object] |
| draft6:boolean_schema.json#/groups/1/tests/5 | object is invalid | PASS | [object Object] |
| draft6:boolean_schema.json#/groups/1/tests/6 | empty object is invalid | PASS | [object Object] |
| draft6:boolean_schema.json#/groups/1/tests/7 | array is invalid | PASS | [object Object] |
| draft6:boolean_schema.json#/groups/1/tests/8 | empty array is invalid | PASS | [object Object] |
| draft6:const.json#/groups/0/tests/1 | another value is invalid | PASS | [object Object] |
| draft6:const.json#/groups/0/tests/2 | another type is invalid | PASS | [object Object] |
| draft6:const.json#/groups/1/tests/2 | another object is invalid | PASS | [object Object] |
| draft6:const.json#/groups/1/tests/3 | another type is invalid | PASS | [object Object] |
| draft6:const.json#/groups/2/tests/1 | another array item is invalid | PASS | [object Object] |
| draft6:const.json#/groups/2/tests/2 | array with additional items is invalid | PASS | [object Object] |
| draft6:const.json#/groups/3/tests/1 | not null is invalid | PASS | [object Object] |
| draft6:const.json#/groups/4/tests/0 | false is valid | WRONG | [object Object] |
| draft6:const.json#/groups/4/tests/1 | integer zero is invalid | PASS | [object Object] |
| draft6:const.json#/groups/4/tests/2 | float zero is invalid | PASS | [object Object] |
| draft6:const.json#/groups/5/tests/0 | true is valid | WRONG | [object Object] |
| draft6:const.json#/groups/5/tests/1 | integer one is invalid | PASS | [object Object] |
| draft6:const.json#/groups/5/tests/2 | float one is invalid | PASS | [object Object] |
| draft6:const.json#/groups/6/tests/0 | [false] is valid | WRONG | [object Object] |
| draft6:const.json#/groups/6/tests/1 | [0] is invalid | PASS | [object Object] |
| draft6:const.json#/groups/6/tests/2 | [0.0] is invalid | PASS | [object Object] |
| draft6:const.json#/groups/7/tests/0 | [true] is valid | WRONG | [object Object] |
| draft6:const.json#/groups/7/tests/1 | [1] is invalid | PASS | [object Object] |
| draft6:const.json#/groups/7/tests/2 | [1.0] is invalid | PASS | [object Object] |
| draft6:const.json#/groups/8/tests/0 | {"a": false} is valid | WRONG | [object Object] |
| draft6:const.json#/groups/8/tests/1 | {"a": 0} is invalid | PASS | [object Object] |
| draft6:const.json#/groups/8/tests/2 | {"a": 0.0} is invalid | PASS | [object Object] |
| draft6:const.json#/groups/9/tests/0 | {"a": true} is valid | WRONG | [object Object] |
| draft6:const.json#/groups/9/tests/1 | {"a": 1} is invalid | PASS | [object Object] |
| draft6:const.json#/groups/9/tests/2 | {"a": 1.0} is invalid | PASS | [object Object] |
| draft6:const.json#/groups/10/tests/3 | empty object is invalid | PASS | [object Object] |
| draft6:const.json#/groups/10/tests/4 | empty array is invalid | PASS | [object Object] |
| draft6:const.json#/groups/10/tests/5 | empty string is invalid | PASS | [object Object] |
| draft6:const.json#/groups/12/tests/1 | integer 2 is invalid | PASS | [object Object] |
| draft6:const.json#/groups/12/tests/3 | float 2.0 is invalid | PASS | [object Object] |
| draft6:const.json#/groups/12/tests/4 | float -2.00001 is invalid | PASS | [object Object] |
| draft6:const.json#/groups/13/tests/1 | integer minus one is invalid | PASS | [object Object] |
| draft6:const.json#/groups/13/tests/3 | float minus one is invalid | PASS | [object Object] |
| draft6:const.json#/groups/14/tests/1 | do not match string lacking nul | PASS | [object Object] |
| draft6:const.json#/groups/15/tests/0 | character uses the same codepoint | RUNTIME | FAST_RUNTIME_ERROR: URI malformed |
| draft6:const.json#/groups/15/tests/1 | character looks the same but uses a different codepoint | RUNTIME | FAST_RUNTIME_ERROR: URI malformed |
| draft6:const.json#/groups/16/tests/0 | character uses the same codepoint | RUNTIME | FAST_RUNTIME_ERROR: URI malformed |
| draft6:const.json#/groups/16/tests/1 | character looks the same but uses combining marks | RUNTIME | FAST_RUNTIME_ERROR: URI malformed |
| draft6:contains.json#/groups/0/tests/3 | array without items matching schema is invalid | PASS | [object Object] |
| draft6:contains.json#/groups/0/tests/4 | empty array is invalid | PASS | [object Object] |
| draft6:contains.json#/groups/1/tests/2 | array without item 5 is invalid | PASS | [object Object] |
| draft6:contains.json#/groups/2/tests/1 | empty array is invalid | PASS | [object Object] |
| draft6:contains.json#/groups/3/tests/0 | any non-empty array is invalid | PASS | [object Object] |
| draft6:contains.json#/groups/3/tests/1 | empty array is invalid | PASS | [object Object] |
| draft6:contains.json#/groups/4/tests/1 | does not match items, matches contains | PASS | [object Object] |
| draft6:contains.json#/groups/4/tests/3 | matches neither items nor contains | PASS | [object Object] |
| draft6:default.json#/groups/2/tests/1 | an explicit property value is checked against maximum (failing) | PASS | [object Object] |
| draft6:definitions.json#/groups/0/tests/0 | valid definition schema | RUNTIME | FAST_RUNTIME_ERROR: Maximum call stack size exceeded |
| draft6:definitions.json#/groups/0/tests/1 | invalid definition schema | RUNTIME | FAST_RUNTIME_ERROR: Maximum call stack size exceeded |
| draft6:dependencies.json#/groups/0/tests/3 | missing dependency | PASS | [object Object] |
| draft6:dependencies.json#/groups/2/tests/3 | missing dependency | PASS | [object Object] |
| draft6:dependencies.json#/groups/2/tests/4 | missing other dependency | PASS | [object Object] |
| draft6:dependencies.json#/groups/2/tests/5 | missing both dependencies | PASS | [object Object] |
| draft6:dependencies.json#/groups/3/tests/2 | wrong type | PASS | [object Object] |
| draft6:dependencies.json#/groups/3/tests/3 | wrong type other | PASS | [object Object] |
| draft6:dependencies.json#/groups/3/tests/4 | wrong type both | PASS | [object Object] |
| draft6:dependencies.json#/groups/4/tests/1 | object with property having schema false is invalid | PASS | [object Object] |
| draft6:dependencies.json#/groups/4/tests/2 | object with both properties is invalid | PASS | [object Object] |
| draft6:dependencies.json#/groups/5/tests/3 | invalid object 1 | PASS | [object Object] |
| draft6:dependencies.json#/groups/5/tests/4 | invalid object 2 | PASS | [object Object] |
| draft6:dependencies.json#/groups/5/tests/5 | invalid object 3 | PASS | [object Object] |
| draft6:dependencies.json#/groups/5/tests/6 | invalid object 4 | PASS | [object Object] |
| draft6:dependencies.json#/groups/6/tests/2 | matches both | PASS | [object Object] |
| draft6:enum.json#/groups/0/tests/1 | something else is invalid | PASS | [object Object] |
| draft6:enum.json#/groups/1/tests/1 | something else is invalid | PASS | [object Object] |
| draft6:enum.json#/groups/1/tests/2 | objects are deep compared | PASS | [object Object] |
| draft6:enum.json#/groups/1/tests/4 | extra properties in object is invalid | PASS | [object Object] |
| draft6:enum.json#/groups/2/tests/2 | something else is invalid | PASS | [object Object] |
| draft6:enum.json#/groups/3/tests/1 | wrong foo value | PASS | [object Object] |
| draft6:enum.json#/groups/3/tests/2 | wrong bar value | PASS | [object Object] |
| draft6:enum.json#/groups/3/tests/4 | missing required property is invalid | PASS | [object Object] |
| draft6:enum.json#/groups/3/tests/5 | missing all properties is invalid | PASS | [object Object] |
| draft6:enum.json#/groups/4/tests/2 | another string is invalid | PASS | [object Object] |
| draft6:enum.json#/groups/5/tests/0 | false is valid | WRONG | [object Object] |
| draft6:enum.json#/groups/5/tests/1 | integer zero is invalid | PASS | [object Object] |
| draft6:enum.json#/groups/5/tests/2 | float zero is invalid | PASS | [object Object] |
| draft6:enum.json#/groups/6/tests/1 | [0] is invalid | PASS | [object Object] |
| draft6:enum.json#/groups/6/tests/2 | [0.0] is invalid | PASS | [object Object] |
| draft6:enum.json#/groups/7/tests/0 | true is valid | WRONG | [object Object] |
| draft6:enum.json#/groups/7/tests/1 | integer one is invalid | PASS | [object Object] |
| draft6:enum.json#/groups/7/tests/2 | float one is invalid | PASS | [object Object] |
| draft6:enum.json#/groups/8/tests/1 | [1] is invalid | PASS | [object Object] |
| draft6:enum.json#/groups/8/tests/2 | [1.0] is invalid | PASS | [object Object] |
| draft6:enum.json#/groups/10/tests/0 | [false] is invalid | PASS | [object Object] |
| draft6:enum.json#/groups/12/tests/0 | [true] is invalid | PASS | [object Object] |
| draft6:enum.json#/groups/13/tests/1 | do not match string lacking nul | PASS | [object Object] |
| draft6:exclusiveMaximum.json#/groups/0/tests/1 | boundary point is invalid | PASS | [object Object] |
| draft6:exclusiveMaximum.json#/groups/0/tests/2 | above the exclusiveMaximum is invalid | PASS | [object Object] |
| draft6:exclusiveMinimum.json#/groups/0/tests/1 | boundary point is invalid | PASS | [object Object] |
| draft6:exclusiveMinimum.json#/groups/0/tests/2 | below the exclusiveMinimum is invalid | PASS | [object Object] |
| draft6:format.json#/groups/0/tests/0 | all string formats ignore integers | WRONG | [object Object] |
| draft6:format.json#/groups/0/tests/1 | all string formats ignore floats | WRONG | [object Object] |
| draft6:format.json#/groups/0/tests/2 | all string formats ignore objects | WRONG | [object Object] |
| draft6:format.json#/groups/0/tests/3 | all string formats ignore arrays | WRONG | [object Object] |
| draft6:format.json#/groups/0/tests/4 | all string formats ignore booleans | WRONG | [object Object] |
| draft6:format.json#/groups/0/tests/5 | all string formats ignore nulls | WRONG | [object Object] |
| draft6:format.json#/groups/1/tests/0 | all string formats ignore integers | WRONG | [object Object] |
| draft6:format.json#/groups/1/tests/1 | all string formats ignore floats | WRONG | [object Object] |
| draft6:format.json#/groups/1/tests/2 | all string formats ignore objects | WRONG | [object Object] |
| draft6:format.json#/groups/1/tests/3 | all string formats ignore arrays | WRONG | [object Object] |
| draft6:format.json#/groups/1/tests/4 | all string formats ignore booleans | WRONG | [object Object] |
| draft6:format.json#/groups/1/tests/5 | all string formats ignore nulls | WRONG | [object Object] |
| draft6:format.json#/groups/2/tests/0 | all string formats ignore integers | WRONG | [object Object] |
| draft6:format.json#/groups/2/tests/1 | all string formats ignore floats | WRONG | [object Object] |
| draft6:format.json#/groups/2/tests/2 | all string formats ignore objects | WRONG | [object Object] |
| draft6:format.json#/groups/2/tests/3 | all string formats ignore arrays | WRONG | [object Object] |
| draft6:format.json#/groups/2/tests/4 | all string formats ignore booleans | WRONG | [object Object] |
| draft6:format.json#/groups/2/tests/5 | all string formats ignore nulls | WRONG | [object Object] |
| draft6:format.json#/groups/3/tests/2 | all string formats ignore objects | WRONG | [object Object] |
| draft6:format.json#/groups/3/tests/3 | all string formats ignore arrays | WRONG | [object Object] |
| draft6:format.json#/groups/3/tests/5 | all string formats ignore nulls | RUNTIME | FAST_RUNTIME_ERROR: Cannot read properties of null (reading 'length') |
| draft6:format.json#/groups/4/tests/0 | all string formats ignore integers | RUNTIME | FAST_RUNTIME_ERROR: data.indexOf is not a function |
| draft6:format.json#/groups/4/tests/1 | all string formats ignore floats | WRONG | [object Object] |
| draft6:format.json#/groups/4/tests/2 | all string formats ignore objects | WRONG | [object Object] |
| draft6:format.json#/groups/4/tests/3 | all string formats ignore arrays | WRONG | [object Object] |
| draft6:format.json#/groups/4/tests/4 | all string formats ignore booleans | WRONG | [object Object] |
| draft6:format.json#/groups/4/tests/5 | all string formats ignore nulls | WRONG | [object Object] |
| draft6:format.json#/groups/5/tests/0 | all string formats ignore integers | WRONG | [object Object] |
| draft6:format.json#/groups/5/tests/1 | all string formats ignore floats | WRONG | [object Object] |
| draft6:format.json#/groups/5/tests/2 | all string formats ignore objects | WRONG | [object Object] |
| draft6:format.json#/groups/5/tests/4 | all string formats ignore booleans | WRONG | [object Object] |
| draft6:format.json#/groups/5/tests/5 | all string formats ignore nulls | WRONG | [object Object] |
| draft6:format.json#/groups/6/tests/0 | all string formats ignore integers | WRONG | [object Object] |
| draft6:format.json#/groups/6/tests/1 | all string formats ignore floats | WRONG | [object Object] |
| draft6:format.json#/groups/6/tests/2 | all string formats ignore objects | WRONG | [object Object] |
| draft6:format.json#/groups/6/tests/3 | all string formats ignore arrays | WRONG | [object Object] |
| draft6:format.json#/groups/6/tests/4 | all string formats ignore booleans | WRONG | [object Object] |
| draft6:format.json#/groups/6/tests/5 | all string formats ignore nulls | WRONG | [object Object] |
| draft6:format.json#/groups/7/tests/2 | all string formats ignore objects | WRONG | [object Object] |
| draft6:format.json#/groups/8/tests/2 | all string formats ignore objects | WRONG | [object Object] |
| draft6:infinite-loop-detection.json#/groups/0/tests/1 | failing case | PASS | [object Object] |
| draft6:items.json#/groups/0/tests/1 | wrong type of items | PASS | [object Object] |
| draft6:items.json#/groups/1/tests/1 | wrong types | PASS | [object Object] |
| draft6:items.json#/groups/3/tests/0 | any non-empty array is invalid | PASS | [object Object] |
| draft6:items.json#/groups/4/tests/1 | array with two items is invalid | PASS | [object Object] |
| draft6:items.json#/groups/5/tests/1 | too many items | PASS | [object Object] |
| draft6:items.json#/groups/5/tests/2 | too many sub-items | PASS | [object Object] |
| draft6:items.json#/groups/5/tests/3 | wrong item | PASS | [object Object] |
| draft6:items.json#/groups/5/tests/4 | wrong sub-item | PASS | [object Object] |
| draft6:items.json#/groups/6/tests/1 | nested array with invalid type | PASS | [object Object] |
| draft6:items.json#/groups/6/tests/2 | not deep enough | PASS | [object Object] |
| draft6:maximum.json#/groups/0/tests/2 | above the maximum is invalid | PASS | [object Object] |
| draft6:maximum.json#/groups/1/tests/3 | above the maximum is invalid | PASS | [object Object] |
| draft6:maxItems.json#/groups/0/tests/2 | too long is invalid | PASS | [object Object] |
| draft6:maxItems.json#/groups/1/tests/1 | too long is invalid | PASS | [object Object] |
| draft6:maxLength.json#/groups/0/tests/2 | too long is invalid | PASS | [object Object] |
| draft6:maxLength.json#/groups/1/tests/1 | too long is invalid | PASS | [object Object] |
| draft6:maxProperties.json#/groups/0/tests/2 | too long is invalid | PASS | [object Object] |
| draft6:maxProperties.json#/groups/1/tests/1 | too long is invalid | PASS | [object Object] |
| draft6:maxProperties.json#/groups/2/tests/1 | one property is invalid | PASS | [object Object] |
| draft6:minimum.json#/groups/0/tests/2 | below the minimum is invalid | PASS | [object Object] |
| draft6:minimum.json#/groups/1/tests/4 | float below the minimum is invalid | PASS | [object Object] |
| draft6:minimum.json#/groups/1/tests/5 | int below the minimum is invalid | PASS | [object Object] |
| draft6:minItems.json#/groups/0/tests/2 | too short is invalid | PASS | [object Object] |
| draft6:minItems.json#/groups/1/tests/1 | too short is invalid | PASS | [object Object] |
| draft6:minLength.json#/groups/0/tests/2 | too short is invalid | PASS | [object Object] |
| draft6:minLength.json#/groups/0/tests/4 | one grapheme is not long enough | PASS | [object Object] |
| draft6:minLength.json#/groups/1/tests/1 | too short is invalid | PASS | [object Object] |
| draft6:minProperties.json#/groups/0/tests/2 | too short is invalid | PASS | [object Object] |
| draft6:minProperties.json#/groups/0/tests/6 | ignores null | RUNTIME | FAST_RUNTIME_ERROR: Cannot convert undefined or null to object |
| draft6:minProperties.json#/groups/1/tests/1 | too short is invalid | PASS | [object Object] |
| draft6:multipleOf.json#/groups/0/tests/1 | int by int fail | PASS | [object Object] |
| draft6:multipleOf.json#/groups/1/tests/3 | 35 is not multiple of 1.5 | PASS | [object Object] |
| draft6:multipleOf.json#/groups/2/tests/1 | 0.00751 is not multiple of 0.0001 | PASS | [object Object] |
| draft6:multipleOf.json#/groups/3/tests/0 | always invalid, but naive implementations may raise an overflow error | PASS | [object Object] |
| draft6:not.json#/groups/0/tests/1 | disallowed | PASS | [object Object] |
| draft6:not.json#/groups/1/tests/1 | mismatch | PASS | [object Object] |
| draft6:not.json#/groups/1/tests/2 | other mismatch | PASS | [object Object] |
| draft6:not.json#/groups/2/tests/2 | mismatch | PASS | [object Object] |
| draft6:not.json#/groups/3/tests/0 | property present | PASS | [object Object] |
| draft6:not.json#/groups/4/tests/0 | number is invalid | PASS | [object Object] |
| draft6:not.json#/groups/4/tests/1 | string is invalid | PASS | [object Object] |
| draft6:not.json#/groups/4/tests/2 | boolean true is invalid | PASS | [object Object] |
| draft6:not.json#/groups/4/tests/3 | boolean false is invalid | PASS | [object Object] |
| draft6:not.json#/groups/4/tests/4 | null is invalid | PASS | [object Object] |
| draft6:not.json#/groups/4/tests/5 | object is invalid | PASS | [object Object] |
| draft6:not.json#/groups/4/tests/6 | empty object is invalid | PASS | [object Object] |
| draft6:not.json#/groups/4/tests/7 | array is invalid | PASS | [object Object] |
| draft6:not.json#/groups/4/tests/8 | empty array is invalid | PASS | [object Object] |
| draft6:not.json#/groups/5/tests/0 | number is invalid | PASS | [object Object] |
| draft6:not.json#/groups/5/tests/1 | string is invalid | PASS | [object Object] |
| draft6:not.json#/groups/5/tests/2 | boolean true is invalid | PASS | [object Object] |
| draft6:not.json#/groups/5/tests/3 | boolean false is invalid | PASS | [object Object] |
| draft6:not.json#/groups/5/tests/4 | null is invalid | PASS | [object Object] |
| draft6:not.json#/groups/5/tests/5 | object is invalid | PASS | [object Object] |
| draft6:not.json#/groups/5/tests/6 | empty object is invalid | PASS | [object Object] |
| draft6:not.json#/groups/5/tests/7 | array is invalid | PASS | [object Object] |
| draft6:not.json#/groups/5/tests/8 | empty array is invalid | PASS | [object Object] |
| draft6:oneOf.json#/groups/0/tests/2 | both oneOf valid | PASS | [object Object] |
| draft6:oneOf.json#/groups/0/tests/3 | neither oneOf valid | PASS | [object Object] |
| draft6:oneOf.json#/groups/1/tests/0 | mismatch base schema | PASS | [object Object] |
| draft6:oneOf.json#/groups/1/tests/2 | both oneOf valid | PASS | [object Object] |
| draft6:oneOf.json#/groups/2/tests/0 | any value is invalid | PASS | [object Object] |
| draft6:oneOf.json#/groups/4/tests/0 | any value is invalid | PASS | [object Object] |
| draft6:oneOf.json#/groups/5/tests/0 | any value is invalid | PASS | [object Object] |
| draft6:oneOf.json#/groups/6/tests/2 | both oneOf valid (complex) | PASS | [object Object] |
| draft6:oneOf.json#/groups/6/tests/3 | neither oneOf valid (complex) | PASS | [object Object] |
| draft6:oneOf.json#/groups/7/tests/1 | both valid - invalid | PASS | [object Object] |
| draft6:oneOf.json#/groups/8/tests/0 | both invalid - invalid | PASS | [object Object] |
| draft6:oneOf.json#/groups/8/tests/3 | both valid - invalid | PASS | [object Object] |
| draft6:oneOf.json#/groups/9/tests/2 | both oneOf valid | PASS | [object Object] |
| draft6:oneOf.json#/groups/9/tests/3 | neither oneOf valid | PASS | [object Object] |
| draft6:oneOf.json#/groups/10/tests/1 | anything non-null is invalid | PASS | [object Object] |
| draft6:optional/bignum.json#/groups/2/tests/0 | a bignum is not a string | PASS | [object Object] |
| draft6:optional/bignum.json#/groups/4/tests/0 | comparison works for high numbers | PASS | [object Object] |
| draft6:optional/bignum.json#/groups/6/tests/0 | comparison works for very negative numbers | PASS | [object Object] |
| draft6:optional/ecmascript-regex.json#/groups/0/tests/0 | matches in Python, but not in ECMA 262 | PASS | [object Object] |
| draft6:optional/ecmascript-regex.json#/groups/1/tests/0 | does not match | PASS | [object Object] |
| draft6:optional/ecmascript-regex.json#/groups/2/tests/0 | does not match | PASS | [object Object] |
| draft6:optional/ecmascript-regex.json#/groups/3/tests/0 | does not match | PASS | [object Object] |
| draft6:optional/ecmascript-regex.json#/groups/4/tests/1 | NKO DIGIT ZERO does not match (unlike e.g. Python) | PASS | [object Object] |
| draft6:optional/ecmascript-regex.json#/groups/4/tests/2 | NKO DIGIT ZERO (as \u escape) does not match | PASS | [object Object] |
| draft6:optional/ecmascript-regex.json#/groups/5/tests/0 | ASCII zero does not match | PASS | [object Object] |
| draft6:optional/ecmascript-regex.json#/groups/6/tests/1 | latin-1 e-acute does not match (unlike e.g. Python) | PASS | [object Object] |
| draft6:optional/ecmascript-regex.json#/groups/7/tests/0 | ASCII 'a' does not match | PASS | [object Object] |
| draft6:optional/ecmascript-regex.json#/groups/8/tests/9 | Non-whitespace control does not match | PASS | [object Object] |
| draft6:optional/ecmascript-regex.json#/groups/8/tests/10 | Non-whitespace does not match | PASS | [object Object] |
| draft6:optional/ecmascript-regex.json#/groups/9/tests/0 | ASCII space does not match | PASS | [object Object] |
| draft6:optional/ecmascript-regex.json#/groups/9/tests/1 | Character tabulation does not match | PASS | [object Object] |
| draft6:optional/ecmascript-regex.json#/groups/9/tests/2 | Line tabulation does not match | PASS | [object Object] |
| draft6:optional/ecmascript-regex.json#/groups/9/tests/3 | Form feed does not match | PASS | [object Object] |
| draft6:optional/ecmascript-regex.json#/groups/9/tests/4 | latin-1 non-breaking-space does not match | PASS | [object Object] |
| draft6:optional/ecmascript-regex.json#/groups/9/tests/5 | zero-width whitespace does not match | PASS | [object Object] |
| draft6:optional/ecmascript-regex.json#/groups/9/tests/6 | line feed does not match (line terminator) | PASS | [object Object] |
| draft6:optional/ecmascript-regex.json#/groups/9/tests/7 | paragraph separator does not match (line terminator) | PASS | [object Object] |
| draft6:optional/ecmascript-regex.json#/groups/9/tests/8 | EM SPACE does not match (Space_Separator) | PASS | [object Object] |
| draft6:optional/ecmascript-regex.json#/groups/10/tests/0 | ascii character in json string | WRONG | [object Object] |
| draft6:optional/ecmascript-regex.json#/groups/10/tests/1 | literal unicode character in json string | WRONG | [object Object] |
| draft6:optional/ecmascript-regex.json#/groups/10/tests/2 | unicode character in hex format in string | WRONG | [object Object] |
| draft6:optional/ecmascript-regex.json#/groups/10/tests/3 | unicode matching is case-sensitive | PASS | [object Object] |
| draft6:optional/ecmascript-regex.json#/groups/11/tests/1 | literal unicode character in json string | PASS | [object Object] |
| draft6:optional/ecmascript-regex.json#/groups/11/tests/2 | unicode character in hex format in string | PASS | [object Object] |
| draft6:optional/ecmascript-regex.json#/groups/11/tests/3 | unicode matching is case-sensitive | PASS | [object Object] |
| draft6:optional/ecmascript-regex.json#/groups/12/tests/0 | literal unicode character in json string | PASS | [object Object] |
| draft6:optional/ecmascript-regex.json#/groups/12/tests/1 | unicode character in hex format in string | PASS | [object Object] |
| draft6:optional/ecmascript-regex.json#/groups/13/tests/1 | ascii non-digits | PASS | [object Object] |
| draft6:optional/ecmascript-regex.json#/groups/13/tests/2 | non-ascii digits (BENGALI DIGIT FOUR, BENGALI DIGIT TWO) | PASS | [object Object] |
| draft6:optional/ecmascript-regex.json#/groups/14/tests/0 | ascii digits | WRONG | [object Object] |
| draft6:optional/ecmascript-regex.json#/groups/14/tests/1 | ascii non-digits | PASS | [object Object] |
| draft6:optional/ecmascript-regex.json#/groups/14/tests/2 | non-ascii digits (BENGALI DIGIT FOUR, BENGALI DIGIT TWO) | WRONG | [object Object] |
| draft6:optional/ecmascript-regex.json#/groups/15/tests/0 | ascii character in json string | WRONG | [object Object] |
| draft6:optional/ecmascript-regex.json#/groups/15/tests/1 | literal unicode character in json string | WRONG | [object Object] |
| draft6:optional/ecmascript-regex.json#/groups/15/tests/2 | unicode character in hex format in string | WRONG | [object Object] |
| draft6:optional/ecmascript-regex.json#/groups/15/tests/3 | unicode matching is case-sensitive | PASS | [object Object] |
| draft6:optional/ecmascript-regex.json#/groups/16/tests/1 | literal unicode character in json string | PASS | [object Object] |
| draft6:optional/ecmascript-regex.json#/groups/16/tests/2 | unicode character in hex format in string | PASS | [object Object] |
| draft6:optional/ecmascript-regex.json#/groups/16/tests/3 | unicode matching is case-sensitive | PASS | [object Object] |
| draft6:optional/ecmascript-regex.json#/groups/17/tests/0 | literal unicode character in json string | PASS | [object Object] |
| draft6:optional/ecmascript-regex.json#/groups/17/tests/1 | unicode character in hex format in string | PASS | [object Object] |
| draft6:optional/ecmascript-regex.json#/groups/18/tests/1 | ascii non-digits | PASS | [object Object] |
| draft6:optional/ecmascript-regex.json#/groups/18/tests/2 | non-ascii digits (BENGALI DIGIT FOUR, BENGALI DIGIT TWO) | PASS | [object Object] |
| draft6:optional/ecmascript-regex.json#/groups/19/tests/0 | ascii digits | WRONG | [object Object] |
| draft6:optional/ecmascript-regex.json#/groups/19/tests/1 | ascii non-digits | PASS | [object Object] |
| draft6:optional/ecmascript-regex.json#/groups/19/tests/2 | non-ascii digits (BENGALI DIGIT FOUR, BENGALI DIGIT TWO) | WRONG | [object Object] |
| draft6:optional/float-overflow.json#/groups/0/tests/0 | valid if optional overflow handling is implemented | WRONG | [object Object] |
| draft6:optional/format/date-time.json#/groups/0/tests/0 | all string formats ignore integers | RUNTIME | FAST_RUNTIME_ERROR: data.indexOf is not a function |
| draft6:optional/format/date-time.json#/groups/0/tests/1 | all string formats ignore floats | WRONG | [object Object] |
| draft6:optional/format/date-time.json#/groups/0/tests/2 | all string formats ignore objects | WRONG | [object Object] |
| draft6:optional/format/date-time.json#/groups/0/tests/3 | all string formats ignore arrays | WRONG | [object Object] |
| draft6:optional/format/date-time.json#/groups/0/tests/4 | all string formats ignore booleans | WRONG | [object Object] |
| draft6:optional/format/date-time.json#/groups/0/tests/5 | all string formats ignore nulls | WRONG | [object Object] |
| draft6:optional/format/date-time.json#/groups/0/tests/10 | a valid date-time with a leap second, UTC | WRONG | [object Object] |
| draft6:optional/format/date-time.json#/groups/0/tests/11 | a valid date-time with a leap second, with minus offset | WRONG | [object Object] |
| draft6:optional/format/date-time.json#/groups/0/tests/12 | an invalid date-time past leap second, UTC | PASS | [object Object] |
| draft6:optional/format/date-time.json#/groups/0/tests/13 | an invalid date-time with leap second on a wrong minute, UTC | PASS | [object Object] |
| draft6:optional/format/date-time.json#/groups/0/tests/14 | an invalid date-time with leap second on a wrong hour, UTC | PASS | [object Object] |
| draft6:optional/format/date-time.json#/groups/0/tests/16 | an invalid minute in date-time string | PASS | [object Object] |
| draft6:optional/format/date-time.json#/groups/0/tests/17 | an invalid offset minute in date-time string | PASS | [object Object] |
| draft6:optional/format/date-time.json#/groups/0/tests/19 | an invalid offset in date-time string | PASS | [object Object] |
| draft6:optional/format/date-time.json#/groups/0/tests/20 | an invalid closing Z after time-zone offset | PASS | [object Object] |
| draft6:optional/format/date-time.json#/groups/0/tests/21 | an invalid date-time string | PASS | [object Object] |
| draft6:optional/format/date-time.json#/groups/0/tests/23 | only RFC3339 not all of ISO 8601 are valid | PASS | [object Object] |
| draft6:optional/format/date-time.json#/groups/0/tests/24 | invalid non-padded month dates | PASS | [object Object] |
| draft6:optional/format/date-time.json#/groups/0/tests/25 | invalid non-padded day dates | PASS | [object Object] |
| draft6:optional/format/date-time.json#/groups/0/tests/26 | invalid non-ASCII '৪' (a Bengali 4) in date portion | PASS | [object Object] |
| draft6:optional/format/date-time.json#/groups/0/tests/27 | invalid non-ASCII '৪' (a Bengali 4) in time portion | PASS | [object Object] |
| draft6:optional/format/date-time.json#/groups/0/tests/28 | invalid extended year | PASS | [object Object] |
| draft6:optional/format/email.json#/groups/0/tests/0 | all string formats ignore integers | WRONG | [object Object] |
| draft6:optional/format/email.json#/groups/0/tests/1 | all string formats ignore floats | WRONG | [object Object] |
| draft6:optional/format/email.json#/groups/0/tests/2 | all string formats ignore objects | WRONG | [object Object] |
| draft6:optional/format/email.json#/groups/0/tests/3 | all string formats ignore arrays | WRONG | [object Object] |
| draft6:optional/format/email.json#/groups/0/tests/4 | all string formats ignore booleans | WRONG | [object Object] |
| draft6:optional/format/email.json#/groups/0/tests/5 | all string formats ignore nulls | WRONG | [object Object] |
| draft6:optional/format/email.json#/groups/0/tests/7 | an invalid e-mail address | PASS | [object Object] |
| draft6:optional/format/email.json#/groups/0/tests/15 | two email addresses is not valid | PASS | [object Object] |
| draft6:optional/format/email.json#/groups/0/tests/17 | local part is required | PASS | [object Object] |
| draft6:optional/format/email.json#/groups/0/tests/18 | domain is required | PASS | [object Object] |
| draft6:optional/format/hostname.json#/groups/0/tests/2 | all string formats ignore objects | WRONG | [object Object] |
| draft6:optional/format/hostname.json#/groups/0/tests/3 | all string formats ignore arrays | WRONG | [object Object] |
| draft6:optional/format/hostname.json#/groups/0/tests/5 | all string formats ignore nulls | RUNTIME | FAST_RUNTIME_ERROR: Cannot read properties of null (reading 'length') |
| draft6:optional/format/hostname.json#/groups/0/tests/9 | a host name starting with an illegal character | PASS | [object Object] |
| draft6:optional/format/hostname.json#/groups/0/tests/10 | a host name containing illegal characters | PASS | [object Object] |
| draft6:optional/format/hostname.json#/groups/0/tests/11 | a host name with a component too long | PASS | [object Object] |
| draft6:optional/format/hostname.json#/groups/0/tests/12 | starts with hyphen | PASS | [object Object] |
| draft6:optional/format/hostname.json#/groups/0/tests/13 | ends with hyphen | PASS | [object Object] |
| draft6:optional/format/hostname.json#/groups/0/tests/14 | starts with underscore | PASS | [object Object] |
| draft6:optional/format/hostname.json#/groups/0/tests/15 | ends with underscore | PASS | [object Object] |
| draft6:optional/format/hostname.json#/groups/0/tests/16 | contains underscore | PASS | [object Object] |
| draft6:optional/format/hostname.json#/groups/0/tests/18 | exceeds maximum label length | PASS | [object Object] |
| draft6:optional/format/hostname.json#/groups/0/tests/23 | empty string | PASS | [object Object] |
| draft6:optional/format/hostname.json#/groups/0/tests/24 | single dot | PASS | [object Object] |
| draft6:optional/format/hostname.json#/groups/0/tests/25 | leading dot | PASS | [object Object] |
| draft6:optional/format/hostname.json#/groups/0/tests/26 | trailing dot | PASS | [object Object] |
| draft6:optional/format/hostname.json#/groups/0/tests/27 | IDN label separator | PASS | [object Object] |
| draft6:optional/format/ipv4.json#/groups/0/tests/0 | all string formats ignore integers | WRONG | [object Object] |
| draft6:optional/format/ipv4.json#/groups/0/tests/1 | all string formats ignore floats | WRONG | [object Object] |
| draft6:optional/format/ipv4.json#/groups/0/tests/2 | all string formats ignore objects | WRONG | [object Object] |
| draft6:optional/format/ipv4.json#/groups/0/tests/3 | all string formats ignore arrays | WRONG | [object Object] |
| draft6:optional/format/ipv4.json#/groups/0/tests/4 | all string formats ignore booleans | WRONG | [object Object] |
| draft6:optional/format/ipv4.json#/groups/0/tests/5 | all string formats ignore nulls | WRONG | [object Object] |
| draft6:optional/format/ipv4.json#/groups/0/tests/7 | an IP address with too many components | PASS | [object Object] |
| draft6:optional/format/ipv4.json#/groups/0/tests/8 | an IP address with out-of-range values | PASS | [object Object] |
| draft6:optional/format/ipv4.json#/groups/0/tests/9 | an IP address without 4 components | PASS | [object Object] |
| draft6:optional/format/ipv4.json#/groups/0/tests/10 | a 2-part address resolving to a routable IP (inet_aton shorthand) | PASS | [object Object] |
| draft6:optional/format/ipv4.json#/groups/0/tests/11 | a 3-part address resolving to a routable IP (inet_aton shorthand) | PASS | [object Object] |
| draft6:optional/format/ipv4.json#/groups/0/tests/12 | an IP address as an integer | PASS | [object Object] |
| draft6:optional/format/ipv4.json#/groups/0/tests/13 | an IP address as an integer (decimal) | PASS | [object Object] |
| draft6:optional/format/ipv4.json#/groups/0/tests/14 | invalid non-ASCII '২' (a Bengali 2) | PASS | [object Object] |
| draft6:optional/format/ipv4.json#/groups/0/tests/15 | invalid fullwidth digits (non-ASCII) | PASS | [object Object] |
| draft6:optional/format/ipv4.json#/groups/0/tests/16 | invalid mathematical bold digits (non-ASCII) | PASS | [object Object] |
| draft6:optional/format/ipv4.json#/groups/0/tests/17 | netmask is not a part of ipv4 address | PASS | [object Object] |
| draft6:optional/format/ipv4.json#/groups/0/tests/18 | leading whitespace is invalid | PASS | [object Object] |
| draft6:optional/format/ipv4.json#/groups/0/tests/19 | trailing whitespace is invalid | PASS | [object Object] |
| draft6:optional/format/ipv4.json#/groups/0/tests/20 | trailing newline is invalid | PASS | [object Object] |
| draft6:optional/format/ipv4.json#/groups/0/tests/21 | hexadecimal notation is invalid | PASS | [object Object] |
| draft6:optional/format/ipv4.json#/groups/0/tests/22 | octal notation explicit is invalid | PASS | [object Object] |
| draft6:optional/format/ipv4.json#/groups/0/tests/24 | leading dot is invalid | PASS | [object Object] |
| draft6:optional/format/ipv4.json#/groups/0/tests/25 | trailing dot is invalid | PASS | [object Object] |
| draft6:optional/format/ipv4.json#/groups/0/tests/28 | empty string is invalid | PASS | [object Object] |
| draft6:optional/format/ipv4.json#/groups/0/tests/29 | plus sign is invalid | PASS | [object Object] |
| draft6:optional/format/ipv4.json#/groups/0/tests/30 | negative sign is invalid | PASS | [object Object] |
| draft6:optional/format/ipv4.json#/groups/0/tests/31 | exponential notation is invalid | PASS | [object Object] |
| draft6:optional/format/ipv4.json#/groups/0/tests/32 | alpha characters are invalid | PASS | [object Object] |
| draft6:optional/format/ipv4.json#/groups/0/tests/33 | internal whitespace is invalid | PASS | [object Object] |
| draft6:optional/format/ipv4.json#/groups/0/tests/34 | tab character is invalid | PASS | [object Object] |
| draft6:optional/format/ipv4.json#/groups/0/tests/35 | additional content after an embedded NUL byte | PASS | [object Object] |
| draft6:optional/format/ipv4.json#/groups/0/tests/36 | with port number is invalid | PASS | [object Object] |
| draft6:optional/format/ipv4.json#/groups/0/tests/37 | single octet out of range in last position | PASS | [object Object] |
| draft6:optional/format/ipv6.json#/groups/0/tests/0 | all string formats ignore integers | WRONG | [object Object] |
| draft6:optional/format/ipv6.json#/groups/0/tests/1 | all string formats ignore floats | WRONG | [object Object] |
| draft6:optional/format/ipv6.json#/groups/0/tests/2 | all string formats ignore objects | WRONG | [object Object] |
| draft6:optional/format/ipv6.json#/groups/0/tests/3 | all string formats ignore arrays | WRONG | [object Object] |
| draft6:optional/format/ipv6.json#/groups/0/tests/4 | all string formats ignore booleans | WRONG | [object Object] |
| draft6:optional/format/ipv6.json#/groups/0/tests/5 | all string formats ignore nulls | WRONG | [object Object] |
| draft6:optional/format/ipv6.json#/groups/0/tests/7 | a group with 5 hex digits is invalid | PASS | [object Object] |
| draft6:optional/format/ipv6.json#/groups/0/tests/8 | trailing 4 hex symbols is valid | WRONG | [object Object] |
| draft6:optional/format/ipv6.json#/groups/0/tests/9 | trailing 5 hex symbols is invalid | PASS | [object Object] |
| draft6:optional/format/ipv6.json#/groups/0/tests/10 | an IPv6 address with too many components | PASS | [object Object] |
| draft6:optional/format/ipv6.json#/groups/0/tests/11 | an IPv6 address containing illegal characters | PASS | [object Object] |
| draft6:optional/format/ipv6.json#/groups/0/tests/13 | leading colons is valid | WRONG | [object Object] |
| draft6:optional/format/ipv6.json#/groups/0/tests/14 | trailing colons is valid | WRONG | [object Object] |
| draft6:optional/format/ipv6.json#/groups/0/tests/15 | missing leading octet is invalid | PASS | [object Object] |
| draft6:optional/format/ipv6.json#/groups/0/tests/16 | missing trailing octet is invalid | PASS | [object Object] |
| draft6:optional/format/ipv6.json#/groups/0/tests/17 | missing leading octet with omitted octets later | PASS | [object Object] |
| draft6:optional/format/ipv6.json#/groups/0/tests/18 | single set of double colons in the middle is valid | WRONG | [object Object] |
| draft6:optional/format/ipv6.json#/groups/0/tests/19 | two sets of double colons is invalid | PASS | [object Object] |
| draft6:optional/format/ipv6.json#/groups/0/tests/20 | mixed format with the ipv4 section as decimal octets | WRONG | [object Object] |
| draft6:optional/format/ipv6.json#/groups/0/tests/22 | mixed format with ipv4 section with octet out of range | PASS | [object Object] |
| draft6:optional/format/ipv6.json#/groups/0/tests/23 | mixed format with ipv4 section with a hex octet | PASS | [object Object] |
| draft6:optional/format/ipv6.json#/groups/0/tests/24 | mixed format with leading double colons (ipv4-mapped ipv6 address) | WRONG | [object Object] |
| draft6:optional/format/ipv6.json#/groups/0/tests/25 | triple colons is invalid | PASS | [object Object] |
| draft6:optional/format/ipv6.json#/groups/0/tests/27 | insufficient octets without double colons | PASS | [object Object] |
| draft6:optional/format/ipv6.json#/groups/0/tests/28 | no colons is invalid | PASS | [object Object] |
| draft6:optional/format/ipv6.json#/groups/0/tests/29 | ipv4 is not ipv6 | PASS | [object Object] |
| draft6:optional/format/ipv6.json#/groups/0/tests/30 | ipv4 segment must have 4 octets | PASS | [object Object] |
| draft6:optional/format/ipv6.json#/groups/0/tests/31 | leading whitespace is invalid | PASS | [object Object] |
| draft6:optional/format/ipv6.json#/groups/0/tests/32 | trailing whitespace is invalid | PASS | [object Object] |
| draft6:optional/format/ipv6.json#/groups/0/tests/33 | netmask is not a part of ipv6 address | PASS | [object Object] |
| draft6:optional/format/ipv6.json#/groups/0/tests/34 | zone id is not a part of ipv6 address | PASS | [object Object] |
| draft6:optional/format/ipv6.json#/groups/0/tests/36 | a long invalid ipv6, below length limit, first | PASS | [object Object] |
| draft6:optional/format/ipv6.json#/groups/0/tests/37 | a long invalid ipv6, below length limit, second | PASS | [object Object] |
| draft6:optional/format/ipv6.json#/groups/0/tests/38 | invalid non-ASCII '৪' (a Bengali 4) | PASS | [object Object] |
| draft6:optional/format/ipv6.json#/groups/0/tests/39 | invalid non-ASCII '৪' (a Bengali 4) in the IPv4 portion | PASS | [object Object] |
| draft6:optional/format/json-pointer.json#/groups/0/tests/0 | all string formats ignore integers | WRONG | [object Object] |
| draft6:optional/format/json-pointer.json#/groups/0/tests/1 | all string formats ignore floats | WRONG | [object Object] |
| draft6:optional/format/json-pointer.json#/groups/0/tests/2 | all string formats ignore objects | WRONG | [object Object] |
| draft6:optional/format/json-pointer.json#/groups/0/tests/4 | all string formats ignore booleans | WRONG | [object Object] |
| draft6:optional/format/json-pointer.json#/groups/0/tests/5 | all string formats ignore nulls | WRONG | [object Object] |
| draft6:optional/format/json-pointer.json#/groups/0/tests/7 | not a valid JSON-pointer (~ not escaped) | PASS | [object Object] |
| draft6:optional/format/json-pointer.json#/groups/0/tests/27 | not a valid JSON-pointer (URI Fragment Identifier) #1 | PASS | [object Object] |
| draft6:optional/format/json-pointer.json#/groups/0/tests/28 | not a valid JSON-pointer (URI Fragment Identifier) #2 | PASS | [object Object] |
| draft6:optional/format/json-pointer.json#/groups/0/tests/29 | not a valid JSON-pointer (URI Fragment Identifier) #3 | PASS | [object Object] |
| draft6:optional/format/json-pointer.json#/groups/0/tests/30 | not a valid JSON-pointer (some escaped, but not all) #1 | PASS | [object Object] |
| draft6:optional/format/json-pointer.json#/groups/0/tests/31 | not a valid JSON-pointer (some escaped, but not all) #2 | PASS | [object Object] |
| draft6:optional/format/json-pointer.json#/groups/0/tests/32 | not a valid JSON-pointer (wrong escape character) #1 | PASS | [object Object] |
| draft6:optional/format/json-pointer.json#/groups/0/tests/33 | not a valid JSON-pointer (wrong escape character) #2 | PASS | [object Object] |
| draft6:optional/format/json-pointer.json#/groups/0/tests/34 | not a valid JSON-pointer (multiple characters not escaped) | PASS | [object Object] |
| draft6:optional/format/json-pointer.json#/groups/0/tests/35 | not a valid JSON-pointer (isn't empty nor starts with /) #1 | PASS | [object Object] |
| draft6:optional/format/json-pointer.json#/groups/0/tests/36 | not a valid JSON-pointer (isn't empty nor starts with /) #2 | PASS | [object Object] |
| draft6:optional/format/json-pointer.json#/groups/0/tests/37 | not a valid JSON-pointer (isn't empty nor starts with /) #3 | PASS | [object Object] |
| draft6:optional/format/uri-reference.json#/groups/0/tests/2 | all string formats ignore objects | WRONG | [object Object] |
| draft6:optional/format/uri-reference.json#/groups/0/tests/9 | an invalid URI Reference | PASS | [object Object] |
| draft6:optional/format/uri-reference.json#/groups/0/tests/12 | an invalid URI fragment | PASS | [object Object] |
| draft6:optional/format/uri-reference.json#/groups/0/tests/13 | unescaped non US-ASCII characters | PASS | [object Object] |
| draft6:optional/format/uri-reference.json#/groups/0/tests/14 | invalid backslash character | PASS | [object Object] |
| draft6:optional/format/uri-template.json#/groups/0/tests/2 | all string formats ignore objects | WRONG | [object Object] |
| draft6:optional/format/uri-template.json#/groups/0/tests/7 | an invalid uri-template | PASS | [object Object] |
| draft6:optional/format/uri.json#/groups/0/tests/0 | all string formats ignore integers | WRONG | [object Object] |
| draft6:optional/format/uri.json#/groups/0/tests/1 | all string formats ignore floats | WRONG | [object Object] |
| draft6:optional/format/uri.json#/groups/0/tests/2 | all string formats ignore objects | WRONG | [object Object] |
| draft6:optional/format/uri.json#/groups/0/tests/3 | all string formats ignore arrays | WRONG | [object Object] |
| draft6:optional/format/uri.json#/groups/0/tests/4 | all string formats ignore booleans | WRONG | [object Object] |
| draft6:optional/format/uri.json#/groups/0/tests/5 | all string formats ignore nulls | WRONG | [object Object] |
| draft6:optional/format/uri.json#/groups/0/tests/19 | an invalid protocol-relative URI Reference | PASS | [object Object] |
| draft6:optional/format/uri.json#/groups/0/tests/20 | an invalid relative URI Reference | PASS | [object Object] |
| draft6:optional/format/uri.json#/groups/0/tests/21 | an invalid URI | PASS | [object Object] |
| draft6:optional/format/uri.json#/groups/0/tests/22 | an invalid URI though valid URI reference | PASS | [object Object] |
| draft6:optional/format/uri.json#/groups/0/tests/23 | an invalid URI with spaces | PASS | [object Object] |
| draft6:optional/format/uri.json#/groups/0/tests/24 | an invalid URI with spaces and missing scheme | PASS | [object Object] |
| draft6:optional/format/uri.json#/groups/0/tests/25 | an invalid URI with comma in scheme | PASS | [object Object] |
| draft6:optional/format/uri.json#/groups/0/tests/26 | invalid userinfo | PASS | [object Object] |
| draft6:optional/format/uri.json#/groups/0/tests/27 | unescaped non US-ASCII characters | PASS | [object Object] |
| draft6:optional/format/uri.json#/groups/0/tests/28 | invalid backslash character | PASS | [object Object] |
| draft6:optional/format/uri.json#/groups/0/tests/29 | invalid " character | PASS | [object Object] |
| draft6:optional/format/uri.json#/groups/0/tests/30 | invalid <> characters | PASS | [object Object] |
| draft6:optional/format/uri.json#/groups/0/tests/31 | invalid {} characters | PASS | [object Object] |
| draft6:optional/format/uri.json#/groups/0/tests/32 | invalid ^ character | PASS | [object Object] |
| draft6:optional/format/uri.json#/groups/0/tests/33 | invalid ` character | PASS | [object Object] |
| draft6:optional/format/uri.json#/groups/0/tests/34 | invalid SPACE character | PASS | [object Object] |
| draft6:optional/format/uri.json#/groups/0/tests/35 | invalid \| character | PASS | [object Object] |
| draft6:optional/format/uri.json#/groups/0/tests/38 | invalid percent-encoding with non-hex digits | PASS | [object Object] |
| draft6:optional/format/uri.json#/groups/0/tests/39 | incomplete percent-encoding triplet | PASS | [object Object] |
| draft6:optional/format/uri.json#/groups/0/tests/40 | lone percent sign is invalid | PASS | [object Object] |
| draft6:optional/format/uri.json#/groups/0/tests/41 | scheme must start with a letter | PASS | [object Object] |
| draft6:optional/format/uri.json#/groups/0/tests/42 | invalid character in scheme | PASS | [object Object] |
| draft6:optional/format/uri.json#/groups/0/tests/43 | non-numeric port is invalid | PASS | [object Object] |
| draft6:optional/id.json#/groups/0/tests/1 | match $ref to id | RUNTIME | FAST_RUNTIME_ERROR: Maximum call stack size exceeded |
| draft6:optional/id.json#/groups/0/tests/2 | no match on enum or $ref to id | RUNTIME | FAST_RUNTIME_ERROR: Maximum call stack size exceeded |
| draft6:optional/id.json#/groups/1/tests/1 | const at const_not_anchor does not match | PASS | [object Object] |
| draft6:optional/id.json#/groups/2/tests/1 | const at const_not_id does not match | PASS | [object Object] |
| draft6:optional/non-bmp-regex.json#/groups/0/tests/0 | matches empty | WRONG | [object Object] |
| draft6:optional/non-bmp-regex.json#/groups/0/tests/2 | matches two | WRONG | [object Object] |
| draft6:optional/non-bmp-regex.json#/groups/0/tests/3 | doesn't match one | PASS | [object Object] |
| draft6:optional/non-bmp-regex.json#/groups/0/tests/4 | doesn't match two | PASS | [object Object] |
| draft6:optional/non-bmp-regex.json#/groups/0/tests/5 | doesn't match one ASCII | PASS | [object Object] |
| draft6:optional/non-bmp-regex.json#/groups/0/tests/6 | doesn't match two ASCII | PASS | [object Object] |
| draft6:optional/non-bmp-regex.json#/groups/1/tests/3 | doesn't match one | PASS | [object Object] |
| draft6:optional/unknownKeyword.json#/groups/0/tests/0 | type matches second anyOf, which has a real schema in it | RUNTIME | FAST_RUNTIME_ERROR: Maximum call stack size exceeded |
| draft6:optional/unknownKeyword.json#/groups/0/tests/1 | type matches non-schema in first anyOf | RUNTIME | FAST_RUNTIME_ERROR: Maximum call stack size exceeded |
| draft6:optional/unknownKeyword.json#/groups/0/tests/2 | type matches non-schema in third anyOf | RUNTIME | FAST_RUNTIME_ERROR: Maximum call stack size exceeded |
| draft6:pattern.json#/groups/0/tests/1 | a non-matching pattern is invalid | PASS | [object Object] |
| draft6:patternProperties.json#/groups/0/tests/2 | a single invalid match is invalid | PASS | [object Object] |
| draft6:patternProperties.json#/groups/0/tests/3 | multiple invalid matches is invalid | PASS | [object Object] |
| draft6:patternProperties.json#/groups/1/tests/3 | an invalid due to one is invalid | PASS | [object Object] |
| draft6:patternProperties.json#/groups/1/tests/4 | an invalid due to the other is invalid | PASS | [object Object] |
| draft6:patternProperties.json#/groups/1/tests/5 | an invalid due to both is invalid | PASS | [object Object] |
| draft6:patternProperties.json#/groups/2/tests/1 | recognized members are accounted for | PASS | [object Object] |
| draft6:patternProperties.json#/groups/2/tests/3 | regexes are case sensitive, 2 | PASS | [object Object] |
| draft6:patternProperties.json#/groups/3/tests/1 | object with property matching schema false is invalid | PASS | [object Object] |
| draft6:patternProperties.json#/groups/3/tests/2 | object with both properties is invalid | PASS | [object Object] |
| draft6:patternProperties.json#/groups/3/tests/3 | object with a property matching both true and false is invalid | PASS | [object Object] |
| draft6:properties.json#/groups/0/tests/1 | one property invalid is invalid | PASS | [object Object] |
| draft6:properties.json#/groups/0/tests/2 | both properties invalid is invalid | PASS | [object Object] |
| draft6:properties.json#/groups/1/tests/1 | property invalidates property | PASS | [object Object] |
| draft6:properties.json#/groups/1/tests/2 | patternProperty invalidates property | PASS | [object Object] |
| draft6:properties.json#/groups/1/tests/4 | patternProperty invalidates nonproperty | PASS | [object Object] |
| draft6:properties.json#/groups/1/tests/7 | additionalProperty invalidates others | PASS | [object Object] |
| draft6:properties.json#/groups/2/tests/2 | only 'false' property present is invalid | PASS | [object Object] |
| draft6:properties.json#/groups/2/tests/3 | both properties present is invalid | PASS | [object Object] |
| draft6:properties.json#/groups/3/tests/1 | object with strings is invalid | PASS | [object Object] |
| draft6:properties.json#/groups/5/tests/3 | __proto__ not valid | PASS | [object Object] |
| draft6:properties.json#/groups/5/tests/4 | toString not valid | PASS | [object Object] |
| draft6:properties.json#/groups/5/tests/5 | constructor not valid | PASS | [object Object] |
| draft6:propertyNames.json#/groups/0/tests/1 | some property names invalid | PASS | [object Object] |
| draft6:propertyNames.json#/groups/0/tests/6 | ignores null | RUNTIME | FAST_RUNTIME_ERROR: Cannot convert undefined or null to object |
| draft6:propertyNames.json#/groups/1/tests/1 | non-matching property name is invalid | PASS | [object Object] |
| draft6:propertyNames.json#/groups/3/tests/0 | object with any properties is invalid | PASS | [object Object] |
| draft6:propertyNames.json#/groups/4/tests/1 | object with any other property is invalid | PASS | [object Object] |
| draft6:propertyNames.json#/groups/5/tests/2 | object with any other property is invalid | PASS | [object Object] |
| draft6:ref.json#/groups/0/tests/2 | mismatch | PASS | [object Object] |
| draft6:ref.json#/groups/0/tests/3 | recursive mismatch | PASS | [object Object] |
| draft6:ref.json#/groups/1/tests/1 | mismatch | PASS | [object Object] |
| draft6:ref.json#/groups/2/tests/1 | mismatch array | PASS | [object Object] |
| draft6:ref.json#/groups/3/tests/0 | slash invalid | PASS | [object Object] |
| draft6:ref.json#/groups/3/tests/1 | tilde invalid | PASS | [object Object] |
| draft6:ref.json#/groups/3/tests/2 | percent invalid | PASS | [object Object] |
| draft6:ref.json#/groups/4/tests/1 | nested ref invalid | PASS | [object Object] |
| draft6:ref.json#/groups/5/tests/2 | ref invalid | PASS | [object Object] |
| draft6:ref.json#/groups/6/tests/0 | $ref resolves to /definitions/base_foo, data does not validate | RUNTIME | FAST_RUNTIME_ERROR: Maximum call stack size exceeded |
| draft6:ref.json#/groups/6/tests/1 | $ref resolves to /definitions/base_foo, data validates | RUNTIME | FAST_RUNTIME_ERROR: Maximum call stack size exceeded |
| draft6:ref.json#/groups/7/tests/0 | remote ref valid | RUNTIME | FAST_RUNTIME_ERROR: Maximum call stack size exceeded |
| draft6:ref.json#/groups/7/tests/1 | remote ref invalid | RUNTIME | FAST_RUNTIME_ERROR: Maximum call stack size exceeded |
| draft6:ref.json#/groups/8/tests/1 | property named $ref invalid | PASS | [object Object] |
| draft6:ref.json#/groups/9/tests/1 | property named $ref invalid | PASS | [object Object] |
| draft6:ref.json#/groups/11/tests/0 | any value is invalid | PASS | [object Object] |
| draft6:ref.json#/groups/12/tests/1 | invalid tree | PASS | [object Object] |
| draft6:ref.json#/groups/13/tests/1 | object with strings is invalid | PASS | [object Object] |
| draft6:ref.json#/groups/14/tests/0 | match | RUNTIME | FAST_RUNTIME_ERROR: Maximum call stack size exceeded |
| draft6:ref.json#/groups/14/tests/1 | mismatch | RUNTIME | FAST_RUNTIME_ERROR: Maximum call stack size exceeded |
| draft6:ref.json#/groups/15/tests/0 | match | RUNTIME | FAST_RUNTIME_ERROR: Maximum call stack size exceeded |
| draft6:ref.json#/groups/15/tests/1 | mismatch | RUNTIME | FAST_RUNTIME_ERROR: Maximum call stack size exceeded |
| draft6:ref.json#/groups/16/tests/0 | match | RUNTIME | FAST_RUNTIME_ERROR: Maximum call stack size exceeded |
| draft6:ref.json#/groups/16/tests/1 | mismatch | RUNTIME | FAST_RUNTIME_ERROR: Maximum call stack size exceeded |
| draft6:ref.json#/groups/17/tests/0 | do not evaluate the $ref inside the enum, matching any string | PASS | [object Object] |
| draft6:ref.json#/groups/17/tests/1 | do not evaluate the $ref inside the enum, definition exact match | PASS | [object Object] |
| draft6:ref.json#/groups/18/tests/0 | invalid on inner field | COMPILE | FAST_SETUP_ERROR: Cannot read properties of undefined (reading 'inner') |
| draft6:ref.json#/groups/18/tests/1 | invalid on outer field | COMPILE | FAST_SETUP_ERROR: Cannot read properties of undefined (reading 'inner') |
| draft6:ref.json#/groups/18/tests/2 | valid on both fields | COMPILE | FAST_SETUP_ERROR: Cannot read properties of undefined (reading 'inner') |
| draft6:ref.json#/groups/19/tests/0 | invalid on inner field | COMPILE | FAST_SETUP_ERROR: Cannot read properties of undefined (reading 'inner') |
| draft6:ref.json#/groups/19/tests/1 | invalid on outer field | COMPILE | FAST_SETUP_ERROR: Cannot read properties of undefined (reading 'inner') |
| draft6:ref.json#/groups/19/tests/2 | valid on both fields | COMPILE | FAST_SETUP_ERROR: Cannot read properties of undefined (reading 'inner') |
| draft6:ref.json#/groups/20/tests/1 | invalid under the URN IDed schema | PASS | [object Object] |
| draft6:ref.json#/groups/21/tests/1 | a non-string is invalid | PASS | [object Object] |
| draft6:ref.json#/groups/22/tests/1 | a non-string is invalid | PASS | [object Object] |
| draft6:ref.json#/groups/23/tests/1 | a non-string is invalid | PASS | [object Object] |
| draft6:ref.json#/groups/24/tests/1 | a non-string is invalid | PASS | [object Object] |
| draft6:ref.json#/groups/25/tests/1 | a non-string is invalid | PASS | [object Object] |
| draft6:ref.json#/groups/27/tests/0 | a string is valid | COMPILE | FAST_SETUP_ERROR: Cannot read properties of undefined (reading 'absref') |
| draft6:ref.json#/groups/27/tests/1 | an integer is invalid | COMPILE | FAST_SETUP_ERROR: Cannot read properties of undefined (reading 'absref') |
| draft6:ref.json#/groups/28/tests/1 | non-number is invalid | PASS | [object Object] |
| draft6:ref.json#/groups/29/tests/1 | non-number is invalid | PASS | [object Object] |
| draft6:ref.json#/groups/30/tests/1 | non-number is invalid | PASS | [object Object] |
| draft6:refRemote.json#/groups/0/tests/1 | remote ref invalid | PASS | [object Object] |
| draft6:refRemote.json#/groups/1/tests/1 | remote fragment invalid | PASS | [object Object] |
| draft6:refRemote.json#/groups/2/tests/1 | ref within ref invalid | PASS | [object Object] |
| draft6:refRemote.json#/groups/3/tests/1 | base URI change ref invalid | PASS | [object Object] |
| draft6:refRemote.json#/groups/4/tests/1 | string is invalid | PASS | [object Object] |
| draft6:refRemote.json#/groups/5/tests/1 | string is invalid | PASS | [object Object] |
| draft6:refRemote.json#/groups/6/tests/0 | string is valid | COMPILE | FAST_SETUP_ERROR: Cannot read properties of undefined (reading 'orNull') |
| draft6:refRemote.json#/groups/6/tests/1 | null is valid | COMPILE | FAST_SETUP_ERROR: Cannot read properties of undefined (reading 'orNull') |
| draft6:refRemote.json#/groups/6/tests/2 | object is invalid | COMPILE | FAST_SETUP_ERROR: Cannot read properties of undefined (reading 'orNull') |
| draft6:refRemote.json#/groups/7/tests/0 | invalid | COMPILE | FAST_SETUP_ERROR: Cannot read properties of undefined (reading 'ref-and-definitions.json') |
| draft6:refRemote.json#/groups/7/tests/1 | valid | COMPILE | FAST_SETUP_ERROR: Cannot read properties of undefined (reading 'ref-and-definitions.json') |
| draft6:refRemote.json#/groups/9/tests/0 | number is invalid | COMPILE | FAST_SETUP_ERROR: Cannot read properties of undefined (reading 'foo-ref-string.json') |
| draft6:refRemote.json#/groups/9/tests/1 | string is valid | COMPILE | FAST_SETUP_ERROR: Cannot read properties of undefined (reading 'foo-ref-string.json') |
| draft6:refRemote.json#/groups/10/tests/1 | non-number is invalid | PASS | [object Object] |
| draft6:required.json#/groups/0/tests/1 | non-present required property is invalid | PASS | [object Object] |
| draft6:required.json#/groups/3/tests/1 | object with some properties missing is invalid | PASS | [object Object] |
| draft6:required.json#/groups/4/tests/2 | none of the properties mentioned | PASS | [object Object] |
| draft6:required.json#/groups/4/tests/3 | __proto__ present | PASS | [object Object] |
| draft6:required.json#/groups/4/tests/4 | toString present | PASS | [object Object] |
| draft6:required.json#/groups/4/tests/5 | constructor present | PASS | [object Object] |
| draft6:type.json#/groups/0/tests/2 | a float is not an integer | PASS | [object Object] |
| draft6:type.json#/groups/0/tests/3 | a string is not an integer | PASS | [object Object] |
| draft6:type.json#/groups/0/tests/4 | a string is still not an integer, even if it looks like one | PASS | [object Object] |
| draft6:type.json#/groups/0/tests/5 | an object is not an integer | PASS | [object Object] |
| draft6:type.json#/groups/0/tests/6 | an array is not an integer | PASS | [object Object] |
| draft6:type.json#/groups/0/tests/7 | a boolean is not an integer | PASS | [object Object] |
| draft6:type.json#/groups/0/tests/8 | null is not an integer | PASS | [object Object] |
| draft6:type.json#/groups/1/tests/3 | a string is not a number | PASS | [object Object] |
| draft6:type.json#/groups/1/tests/4 | a string is still not a number, even if it looks like one | PASS | [object Object] |
| draft6:type.json#/groups/1/tests/5 | an object is not a number | PASS | [object Object] |
| draft6:type.json#/groups/1/tests/6 | an array is not a number | PASS | [object Object] |
| draft6:type.json#/groups/1/tests/7 | a boolean is not a number | PASS | [object Object] |
| draft6:type.json#/groups/1/tests/8 | null is not a number | PASS | [object Object] |
| draft6:type.json#/groups/2/tests/0 | 1 is not a string | PASS | [object Object] |
| draft6:type.json#/groups/2/tests/1 | a float is not a string | PASS | [object Object] |
| draft6:type.json#/groups/2/tests/5 | an object is not a string | PASS | [object Object] |
| draft6:type.json#/groups/2/tests/6 | an array is not a string | PASS | [object Object] |
| draft6:type.json#/groups/2/tests/7 | a boolean is not a string | PASS | [object Object] |
| draft6:type.json#/groups/2/tests/8 | null is not a string | PASS | [object Object] |
| draft6:type.json#/groups/3/tests/0 | an integer is not an object | PASS | [object Object] |
| draft6:type.json#/groups/3/tests/1 | a float is not an object | PASS | [object Object] |
| draft6:type.json#/groups/3/tests/2 | a string is not an object | PASS | [object Object] |
| draft6:type.json#/groups/3/tests/4 | an array is not an object | PASS | [object Object] |
| draft6:type.json#/groups/3/tests/5 | a boolean is not an object | PASS | [object Object] |
| draft6:type.json#/groups/3/tests/6 | null is not an object | PASS | [object Object] |
| draft6:type.json#/groups/4/tests/0 | an integer is not an array | PASS | [object Object] |
| draft6:type.json#/groups/4/tests/1 | a float is not an array | PASS | [object Object] |
| draft6:type.json#/groups/4/tests/2 | a string is not an array | PASS | [object Object] |
| draft6:type.json#/groups/4/tests/3 | an object is not an array | PASS | [object Object] |
| draft6:type.json#/groups/4/tests/5 | a boolean is not an array | PASS | [object Object] |
| draft6:type.json#/groups/4/tests/6 | null is not an array | PASS | [object Object] |
| draft6:type.json#/groups/5/tests/0 | an integer is not a boolean | PASS | [object Object] |
| draft6:type.json#/groups/5/tests/1 | zero is not a boolean | PASS | [object Object] |
| draft6:type.json#/groups/5/tests/2 | a float is not a boolean | PASS | [object Object] |
| draft6:type.json#/groups/5/tests/3 | a string is not a boolean | PASS | [object Object] |
| draft6:type.json#/groups/5/tests/4 | an empty string is not a boolean | PASS | [object Object] |
| draft6:type.json#/groups/5/tests/5 | an object is not a boolean | PASS | [object Object] |
| draft6:type.json#/groups/5/tests/6 | an array is not a boolean | PASS | [object Object] |
| draft6:type.json#/groups/5/tests/9 | null is not a boolean | PASS | [object Object] |
| draft6:type.json#/groups/6/tests/0 | an integer is not null | PASS | [object Object] |
| draft6:type.json#/groups/6/tests/1 | a float is not null | PASS | [object Object] |
| draft6:type.json#/groups/6/tests/2 | zero is not null | PASS | [object Object] |
| draft6:type.json#/groups/6/tests/3 | a string is not null | PASS | [object Object] |
| draft6:type.json#/groups/6/tests/4 | an empty string is not null | PASS | [object Object] |
| draft6:type.json#/groups/6/tests/5 | an object is not null | PASS | [object Object] |
| draft6:type.json#/groups/6/tests/6 | an array is not null | PASS | [object Object] |
| draft6:type.json#/groups/6/tests/7 | true is not null | PASS | [object Object] |
| draft6:type.json#/groups/6/tests/8 | false is not null | PASS | [object Object] |
| draft6:type.json#/groups/7/tests/2 | a float is invalid | PASS | [object Object] |
| draft6:type.json#/groups/7/tests/3 | an object is invalid | PASS | [object Object] |
| draft6:type.json#/groups/7/tests/4 | an array is invalid | PASS | [object Object] |
| draft6:type.json#/groups/7/tests/5 | a boolean is invalid | PASS | [object Object] |
| draft6:type.json#/groups/7/tests/6 | null is invalid | PASS | [object Object] |
| draft6:type.json#/groups/8/tests/1 | number is invalid | PASS | [object Object] |
| draft6:type.json#/groups/9/tests/2 | number is invalid | PASS | [object Object] |
| draft6:type.json#/groups/9/tests/3 | string is invalid | PASS | [object Object] |
| draft6:type.json#/groups/9/tests/4 | null is invalid | PASS | [object Object] |
| draft6:type.json#/groups/10/tests/3 | number is invalid | PASS | [object Object] |
| draft6:type.json#/groups/10/tests/4 | string is invalid | PASS | [object Object] |
| draft6:uniqueItems.json#/groups/0/tests/1 | non-unique array of integers is invalid | PASS | [object Object] |
| draft6:uniqueItems.json#/groups/0/tests/2 | non-unique array of more than two integers is invalid | PASS | [object Object] |
| draft6:uniqueItems.json#/groups/0/tests/3 | numbers are unique if mathematically unequal | PASS | [object Object] |
| draft6:uniqueItems.json#/groups/0/tests/7 | non-unique array of strings is invalid | PASS | [object Object] |
| draft6:uniqueItems.json#/groups/0/tests/9 | non-unique array of objects is invalid | PASS | [object Object] |
| draft6:uniqueItems.json#/groups/0/tests/12 | non-unique array of nested objects is invalid | PASS | [object Object] |
| draft6:uniqueItems.json#/groups/0/tests/14 | non-unique array of arrays is invalid | PASS | [object Object] |
| draft6:uniqueItems.json#/groups/0/tests/15 | non-unique array of more than two arrays is invalid | PASS | [object Object] |
| draft6:uniqueItems.json#/groups/0/tests/22 | unique heterogeneous types are valid | WRONG | [object Object] |
| draft6:uniqueItems.json#/groups/0/tests/23 | non-unique heterogeneous types are invalid | PASS | [object Object] |
| draft6:uniqueItems.json#/groups/1/tests/2 | [false, false] from items array is not valid | PASS | [object Object] |
| draft6:uniqueItems.json#/groups/1/tests/3 | [true, true] from items array is not valid | PASS | [object Object] |
| draft6:uniqueItems.json#/groups/1/tests/6 | non-unique array extended from [false, true] is not valid | PASS | [object Object] |
| draft6:uniqueItems.json#/groups/1/tests/7 | non-unique array extended from [true, false] is not valid | PASS | [object Object] |
| draft6:uniqueItems.json#/groups/2/tests/2 | [false, false] from items array is not valid | PASS | [object Object] |
| draft6:uniqueItems.json#/groups/2/tests/3 | [true, true] from items array is not valid | PASS | [object Object] |
| draft6:uniqueItems.json#/groups/2/tests/4 | extra items are invalid even if unique | PASS | [object Object] |
| draft6:uniqueItems.json#/groups/3/tests/0 | unique array of integers is valid | WRONG | [object Object] |
| draft6:uniqueItems.json#/groups/3/tests/1 | non-unique array of integers is valid | WRONG | [object Object] |
| draft6:uniqueItems.json#/groups/3/tests/2 | numbers are unique if mathematically unequal | WRONG | [object Object] |
| draft6:uniqueItems.json#/groups/3/tests/3 | false is not equal to zero | WRONG | [object Object] |
| draft6:uniqueItems.json#/groups/3/tests/4 | true is not equal to one | WRONG | [object Object] |
| draft6:uniqueItems.json#/groups/3/tests/5 | unique array of objects is valid | WRONG | [object Object] |
| draft6:uniqueItems.json#/groups/3/tests/6 | non-unique array of objects is valid | WRONG | [object Object] |
| draft6:uniqueItems.json#/groups/3/tests/7 | unique array of nested objects is valid | WRONG | [object Object] |
| draft6:uniqueItems.json#/groups/3/tests/8 | non-unique array of nested objects is valid | WRONG | [object Object] |
| draft6:uniqueItems.json#/groups/3/tests/9 | unique array of arrays is valid | WRONG | [object Object] |
| draft6:uniqueItems.json#/groups/3/tests/10 | non-unique array of arrays is valid | WRONG | [object Object] |
| draft6:uniqueItems.json#/groups/3/tests/11 | 1 and true are unique | WRONG | [object Object] |
| draft6:uniqueItems.json#/groups/3/tests/12 | 0 and false are unique | WRONG | [object Object] |
| draft6:uniqueItems.json#/groups/3/tests/13 | unique heterogeneous types are valid | WRONG | [object Object] |
| draft6:uniqueItems.json#/groups/3/tests/14 | non-unique heterogeneous types are valid | WRONG | [object Object] |
| draft6:uniqueItems.json#/groups/4/tests/0 | [false, true] from items array is valid | WRONG | [object Object] |
| draft6:uniqueItems.json#/groups/4/tests/1 | [true, false] from items array is valid | WRONG | [object Object] |
| draft6:uniqueItems.json#/groups/4/tests/2 | [false, false] from items array is valid | WRONG | [object Object] |
| draft6:uniqueItems.json#/groups/4/tests/3 | [true, true] from items array is valid | WRONG | [object Object] |
| draft6:uniqueItems.json#/groups/4/tests/4 | unique array extended from [false, true] is valid | WRONG | [object Object] |
| draft6:uniqueItems.json#/groups/4/tests/5 | unique array extended from [true, false] is valid | WRONG | [object Object] |
| draft6:uniqueItems.json#/groups/4/tests/6 | non-unique array extended from [false, true] is valid | WRONG | [object Object] |
| draft6:uniqueItems.json#/groups/4/tests/7 | non-unique array extended from [true, false] is valid | WRONG | [object Object] |
| draft6:uniqueItems.json#/groups/5/tests/0 | [false, true] from items array is valid | WRONG | [object Object] |
| draft6:uniqueItems.json#/groups/5/tests/1 | [true, false] from items array is valid | WRONG | [object Object] |
| draft6:uniqueItems.json#/groups/5/tests/2 | [false, false] from items array is valid | WRONG | [object Object] |
| draft6:uniqueItems.json#/groups/5/tests/3 | [true, true] from items array is valid | WRONG | [object Object] |
| draft6:uniqueItems.json#/groups/5/tests/4 | extra items are invalid even if unique | PASS | [object Object] |
