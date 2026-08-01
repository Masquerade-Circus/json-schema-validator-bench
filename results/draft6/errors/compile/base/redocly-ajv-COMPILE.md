# draft6 base [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) COMPILE errors

Phase: compile

Exact matching records: 3

| Case ID | Description | Status | Error |
| --- | --- | --- | --- |
| draft6:optional/unknownKeyword.json#/groups/0/tests/0 | type matches second anyOf, which has a real schema in it | COMPILE | FAST_COMPILE_ERROR: reference "https://localhost:1234/unknownKeyword/my_identifier.json" resolves to more than one schema |
| draft6:optional/unknownKeyword.json#/groups/0/tests/1 | type matches non-schema in first anyOf | COMPILE | FAST_COMPILE_ERROR: reference "https://localhost:1234/unknownKeyword/my_identifier.json" resolves to more than one schema |
| draft6:optional/unknownKeyword.json#/groups/0/tests/2 | type matches non-schema in third anyOf | COMPILE | FAST_COMPILE_ERROR: reference "https://localhost:1234/unknownKeyword/my_identifier.json" resolves to more than one schema |
