# draft2020-12 base [ajv](https://www.npmjs.com/package/ajv) (8.20.0) COMPILE errors

Phase: compile

Exact matching records: 24

| Case ID | Description | Status | Error |
| --- | --- | --- | --- |
| draft2020-12:dynamicRef.json#/groups/9/tests/0 | The recursive part is valid against the root | COMPILE | FAST_COMPILE_ERROR: "$dynamicRef" only supports hash fragment reference |
| draft2020-12:dynamicRef.json#/groups/9/tests/1 | The recursive part is not valid against the root | COMPILE | FAST_COMPILE_ERROR: "$dynamicRef" only supports hash fragment reference |
| draft2020-12:dynamicRef.json#/groups/10/tests/0 | The recursive part doesn't need to validate against the root | COMPILE | FAST_COMPILE_ERROR: "$dynamicRef" only supports hash fragment reference |
| draft2020-12:dynamicRef.json#/groups/12/tests/0 | string matches /$defs/thingy, but the $dynamicRef does not stop here | COMPILE | FAST_COMPILE_ERROR: "$dynamicRef" only supports hash fragment reference |
| draft2020-12:dynamicRef.json#/groups/12/tests/1 | first_scope is not in dynamic scope for the $dynamicRef | COMPILE | FAST_COMPILE_ERROR: "$dynamicRef" only supports hash fragment reference |
| draft2020-12:dynamicRef.json#/groups/12/tests/2 | /then/$defs/thingy is the final stop for the $dynamicRef | COMPILE | FAST_COMPILE_ERROR: "$dynamicRef" only supports hash fragment reference |
| draft2020-12:enum.json#/groups/14/tests/0 | string is invalid | COMPILE | FAST_COMPILE_ERROR: enum must have non-empty array |
| draft2020-12:enum.json#/groups/14/tests/1 | number is invalid | COMPILE | FAST_COMPILE_ERROR: enum must have non-empty array |
| draft2020-12:enum.json#/groups/14/tests/2 | null is invalid | COMPILE | FAST_COMPILE_ERROR: enum must have non-empty array |
| draft2020-12:enum.json#/groups/14/tests/3 | object is invalid | COMPILE | FAST_COMPILE_ERROR: enum must have non-empty array |
| draft2020-12:enum.json#/groups/14/tests/4 | array is invalid | COMPILE | FAST_COMPILE_ERROR: enum must have non-empty array |
| draft2020-12:enum.json#/groups/14/tests/5 | boolean is invalid | COMPILE | FAST_COMPILE_ERROR: enum must have non-empty array |
| draft2020-12:optional/cross-draft.json#/groups/0/tests/0 | first item not a string is valid | COMPILE | FAST_COMPILE_ERROR: no schema with key or ref "https://json-schema.org/draft/2019-09/schema" |
| draft2020-12:optional/unknownKeyword.json#/groups/0/tests/0 | type matches second anyOf, which has a real schema in it | COMPILE | FAST_COMPILE_ERROR: reference "https://localhost:1234/draft2020-12/unknownKeyword/my_identifier.json" resolves to more than one schema |
| draft2020-12:optional/unknownKeyword.json#/groups/0/tests/1 | type matches non-schema in first anyOf | COMPILE | FAST_COMPILE_ERROR: reference "https://localhost:1234/draft2020-12/unknownKeyword/my_identifier.json" resolves to more than one schema |
| draft2020-12:optional/unknownKeyword.json#/groups/0/tests/2 | type matches non-schema in third anyOf | COMPILE | FAST_COMPILE_ERROR: reference "https://localhost:1234/draft2020-12/unknownKeyword/my_identifier.json" resolves to more than one schema |
| draft2020-12:ref.json#/groups/15/tests/0 | invalid on inner field | COMPILE | FAST_COMPILE_ERROR: Maximum call stack size exceeded |
| draft2020-12:ref.json#/groups/15/tests/1 | invalid on outer field | COMPILE | FAST_COMPILE_ERROR: Maximum call stack size exceeded |
| draft2020-12:ref.json#/groups/15/tests/2 | valid on both fields | COMPILE | FAST_COMPILE_ERROR: Maximum call stack size exceeded |
| draft2020-12:ref.json#/groups/16/tests/0 | invalid on inner field | COMPILE | FAST_COMPILE_ERROR: Maximum call stack size exceeded |
| draft2020-12:ref.json#/groups/16/tests/1 | invalid on outer field | COMPILE | FAST_COMPILE_ERROR: Maximum call stack size exceeded |
| draft2020-12:ref.json#/groups/16/tests/2 | valid on both fields | COMPILE | FAST_COMPILE_ERROR: Maximum call stack size exceeded |
| draft2020-12:ref.json#/groups/28/tests/0 | a string is valid | COMPILE | FAST_COMPILE_ERROR: Maximum call stack size exceeded |
| draft2020-12:ref.json#/groups/28/tests/1 | a non-string is invalid | COMPILE | FAST_COMPILE_ERROR: Maximum call stack size exceeded |
