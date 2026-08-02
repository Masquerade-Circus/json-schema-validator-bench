# draft7 Setup [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) COMPILE errors

Phase: setup

Exact matching records: 5

| Case ID | Description | Status | Error |
| --- | --- | --- | --- |
| draft7:optional/cross-draft.json#/groups/0/tests/0 | missing bar is invalid | COMPILE | FAST_COMPILE_ERROR: no schema with key or ref "https://json-schema.org/draft/2019-09/schema" |
| draft7:optional/cross-draft.json#/groups/0/tests/1 | present bar is valid | COMPILE | FAST_COMPILE_ERROR: no schema with key or ref "https://json-schema.org/draft/2019-09/schema" |
| draft7:optional/unknownKeyword.json#/groups/0/tests/0 | type matches second anyOf, which has a real schema in it | COMPILE | FAST_COMPILE_ERROR: reference "https://localhost:1234/unknownKeyword/my_identifier.json" resolves to more than one schema |
| draft7:optional/unknownKeyword.json#/groups/0/tests/1 | type matches non-schema in first anyOf | COMPILE | FAST_COMPILE_ERROR: reference "https://localhost:1234/unknownKeyword/my_identifier.json" resolves to more than one schema |
| draft7:optional/unknownKeyword.json#/groups/0/tests/2 | type matches non-schema in third anyOf | COMPILE | FAST_COMPILE_ERROR: reference "https://localhost:1234/unknownKeyword/my_identifier.json" resolves to more than one schema |
