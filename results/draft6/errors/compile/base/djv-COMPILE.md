# draft6 base [djv](https://www.npmjs.com/package/djv) (2.1.4) COMPILE errors

Phase: compile

Exact matching records: 15

| Case ID | Description | Status | Error |
| --- | --- | --- | --- |
| draft6:ref.json#/groups/18/tests/0 | invalid on inner field | COMPILE | FAST_COMPILE_ERROR: Cannot read properties of undefined (reading 'inner') |
| draft6:ref.json#/groups/18/tests/1 | invalid on outer field | COMPILE | FAST_COMPILE_ERROR: Cannot read properties of undefined (reading 'inner') |
| draft6:ref.json#/groups/18/tests/2 | valid on both fields | COMPILE | FAST_COMPILE_ERROR: Cannot read properties of undefined (reading 'inner') |
| draft6:ref.json#/groups/19/tests/0 | invalid on inner field | COMPILE | FAST_COMPILE_ERROR: Cannot read properties of undefined (reading 'inner') |
| draft6:ref.json#/groups/19/tests/1 | invalid on outer field | COMPILE | FAST_COMPILE_ERROR: Cannot read properties of undefined (reading 'inner') |
| draft6:ref.json#/groups/19/tests/2 | valid on both fields | COMPILE | FAST_COMPILE_ERROR: Cannot read properties of undefined (reading 'inner') |
| draft6:ref.json#/groups/27/tests/0 | a string is valid | COMPILE | FAST_COMPILE_ERROR: Cannot read properties of undefined (reading 'absref') |
| draft6:ref.json#/groups/27/tests/1 | an integer is invalid | COMPILE | FAST_COMPILE_ERROR: Cannot read properties of undefined (reading 'absref') |
| draft6:refRemote.json#/groups/6/tests/0 | string is valid | COMPILE | FAST_COMPILE_ERROR: Cannot read properties of undefined (reading 'orNull') |
| draft6:refRemote.json#/groups/6/tests/1 | null is valid | COMPILE | FAST_COMPILE_ERROR: Cannot read properties of undefined (reading 'orNull') |
| draft6:refRemote.json#/groups/6/tests/2 | object is invalid | COMPILE | FAST_COMPILE_ERROR: Cannot read properties of undefined (reading 'orNull') |
| draft6:refRemote.json#/groups/7/tests/0 | invalid | COMPILE | FAST_COMPILE_ERROR: Cannot read properties of undefined (reading 'ref-and-definitions.json') |
| draft6:refRemote.json#/groups/7/tests/1 | valid | COMPILE | FAST_COMPILE_ERROR: Cannot read properties of undefined (reading 'ref-and-definitions.json') |
| draft6:refRemote.json#/groups/9/tests/0 | number is invalid | COMPILE | FAST_COMPILE_ERROR: Cannot read properties of undefined (reading 'foo-ref-string.json') |
| draft6:refRemote.json#/groups/9/tests/1 | string is valid | COMPILE | FAST_COMPILE_ERROR: Cannot read properties of undefined (reading 'foo-ref-string.json') |
