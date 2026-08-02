# draft6 base [djv](https://www.npmjs.com/package/djv) (2.1.4) RUNTIME errors

Phase: cold-execution

Exact matching records: 25

| Case ID | Description | Status | Error |
| --- | --- | --- | --- |
| draft6:const.json#/groups/15/tests/0 | character uses the same codepoint | RUNTIME | FAST_RUNTIME_ERROR: URI malformed |
| draft6:const.json#/groups/15/tests/1 | character looks the same but uses a different codepoint | RUNTIME | FAST_RUNTIME_ERROR: URI malformed |
| draft6:const.json#/groups/16/tests/0 | character uses the same codepoint | RUNTIME | FAST_RUNTIME_ERROR: URI malformed |
| draft6:const.json#/groups/16/tests/1 | character looks the same but uses combining marks | RUNTIME | FAST_RUNTIME_ERROR: URI malformed |
| draft6:definitions.json#/groups/0/tests/0 | valid definition schema | RUNTIME | FAST_RUNTIME_ERROR: Maximum call stack size exceeded |
| draft6:definitions.json#/groups/0/tests/1 | invalid definition schema | RUNTIME | FAST_RUNTIME_ERROR: Maximum call stack size exceeded |
| draft6:format.json#/groups/3/tests/5 | all string formats ignore nulls | RUNTIME | FAST_RUNTIME_ERROR: Cannot read properties of null (reading 'length') |
| draft6:format.json#/groups/4/tests/0 | all string formats ignore integers | RUNTIME | FAST_RUNTIME_ERROR: data.indexOf is not a function |
| draft6:minProperties.json#/groups/0/tests/6 | ignores null | RUNTIME | FAST_RUNTIME_ERROR: Cannot convert undefined or null to object |
| draft6:optional/id.json#/groups/0/tests/1 | match $ref to id | RUNTIME | FAST_RUNTIME_ERROR: Maximum call stack size exceeded |
| draft6:optional/id.json#/groups/0/tests/2 | no match on enum or $ref to id | RUNTIME | FAST_RUNTIME_ERROR: Maximum call stack size exceeded |
| draft6:optional/unknownKeyword.json#/groups/0/tests/0 | type matches second anyOf, which has a real schema in it | RUNTIME | FAST_RUNTIME_ERROR: Maximum call stack size exceeded |
| draft6:optional/unknownKeyword.json#/groups/0/tests/1 | type matches non-schema in first anyOf | RUNTIME | FAST_RUNTIME_ERROR: Maximum call stack size exceeded |
| draft6:optional/unknownKeyword.json#/groups/0/tests/2 | type matches non-schema in third anyOf | RUNTIME | FAST_RUNTIME_ERROR: Maximum call stack size exceeded |
| draft6:propertyNames.json#/groups/0/tests/6 | ignores null | RUNTIME | FAST_RUNTIME_ERROR: Cannot convert undefined or null to object |
| draft6:ref.json#/groups/6/tests/0 | $ref resolves to /definitions/base_foo, data does not validate | RUNTIME | FAST_RUNTIME_ERROR: Maximum call stack size exceeded |
| draft6:ref.json#/groups/6/tests/1 | $ref resolves to /definitions/base_foo, data validates | RUNTIME | FAST_RUNTIME_ERROR: Maximum call stack size exceeded |
| draft6:ref.json#/groups/7/tests/0 | remote ref valid | RUNTIME | FAST_RUNTIME_ERROR: Maximum call stack size exceeded |
| draft6:ref.json#/groups/7/tests/1 | remote ref invalid | RUNTIME | FAST_RUNTIME_ERROR: Maximum call stack size exceeded |
| draft6:ref.json#/groups/14/tests/0 | match | RUNTIME | FAST_RUNTIME_ERROR: Maximum call stack size exceeded |
| draft6:ref.json#/groups/14/tests/1 | mismatch | RUNTIME | FAST_RUNTIME_ERROR: Maximum call stack size exceeded |
| draft6:ref.json#/groups/15/tests/0 | match | RUNTIME | FAST_RUNTIME_ERROR: Maximum call stack size exceeded |
| draft6:ref.json#/groups/15/tests/1 | mismatch | RUNTIME | FAST_RUNTIME_ERROR: Maximum call stack size exceeded |
| draft6:ref.json#/groups/16/tests/0 | match | RUNTIME | FAST_RUNTIME_ERROR: Maximum call stack size exceeded |
| draft6:ref.json#/groups/16/tests/1 | mismatch | RUNTIME | FAST_RUNTIME_ERROR: Maximum call stack size exceeded |
