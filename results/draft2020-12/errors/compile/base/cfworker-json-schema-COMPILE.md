# draft2020-12 base [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1) COMPILE errors

Phase: compile

Exact matching records: 9

| Case ID | Description | Status | Error |
| --- | --- | --- | --- |
| draft2020-12:anchor.json#/groups/3/tests/0 | $ref resolves to /$defs/A/allOf/1 | COMPILE | FAST_COMPILE_ERROR: Duplicate schema URI "http://localhost:1234/draft2020-12/child2". |
| draft2020-12:anchor.json#/groups/3/tests/1 | $ref does not resolve to /$defs/A/allOf/0 | COMPILE | FAST_COMPILE_ERROR: Duplicate schema URI "http://localhost:1234/draft2020-12/child2". |
| draft2020-12:dynamicRef.json#/groups/19/tests/0 | integer property passes | COMPILE | FAST_COMPILE_ERROR: Duplicate schema URI "https://test.json-schema.org/dynamic-ref-skips-intermediate-resource/item". |
| draft2020-12:dynamicRef.json#/groups/19/tests/1 | string property fails | COMPILE | FAST_COMPILE_ERROR: Duplicate schema URI "https://test.json-schema.org/dynamic-ref-skips-intermediate-resource/item". |
| draft2020-12:optional/dynamicRef.json#/groups/0/tests/0 | integer property passes | COMPILE | FAST_COMPILE_ERROR: Duplicate schema URI "https://test.json-schema.org/dynamic-ref-skips-intermediate-resource/optional/item". |
| draft2020-12:optional/dynamicRef.json#/groups/0/tests/1 | string property fails | COMPILE | FAST_COMPILE_ERROR: Duplicate schema URI "https://test.json-schema.org/dynamic-ref-skips-intermediate-resource/optional/item". |
| draft2020-12:optional/unknownKeyword.json#/groups/0/tests/0 | type matches second anyOf, which has a real schema in it | COMPILE | FAST_COMPILE_ERROR: Duplicate schema URI "https://localhost:1234/draft2020-12/unknownKeyword/my_identifier.json". |
| draft2020-12:optional/unknownKeyword.json#/groups/0/tests/1 | type matches non-schema in first anyOf | COMPILE | FAST_COMPILE_ERROR: Duplicate schema URI "https://localhost:1234/draft2020-12/unknownKeyword/my_identifier.json". |
| draft2020-12:optional/unknownKeyword.json#/groups/0/tests/2 | type matches non-schema in third anyOf | COMPILE | FAST_COMPILE_ERROR: Duplicate schema URI "https://localhost:1234/draft2020-12/unknownKeyword/my_identifier.json". |
