# draft2020-12 format-assertion [ajv](https://www.npmjs.com/package/ajv) (8.20.0) COMPILE errors

Phase: compile

Exact matching records: 4

| Case ID | Description | Status | Error |
| --- | --- | --- | --- |
| draft2020-12:optional/format-assertion.json#/groups/0/tests/0 | format-assertion: false: valid string | COMPILE | FAST_COMPILE_ERROR: can't resolve reference https://json-schema.org/draft/2020-12/meta/format-assertion from id http://localhost:1234/draft2020-12/format-assertion-false.json |
| draft2020-12:optional/format-assertion.json#/groups/0/tests/1 | format-assertion: false: invalid string | COMPILE | FAST_COMPILE_ERROR: can't resolve reference https://json-schema.org/draft/2020-12/meta/format-assertion from id http://localhost:1234/draft2020-12/format-assertion-false.json |
| draft2020-12:optional/format-assertion.json#/groups/1/tests/0 | format-assertion: true: valid string | COMPILE | FAST_COMPILE_ERROR: can't resolve reference https://json-schema.org/draft/2020-12/meta/format-assertion from id http://localhost:1234/draft2020-12/format-assertion-true.json |
| draft2020-12:optional/format-assertion.json#/groups/1/tests/1 | format-assertion: true: invalid string | COMPILE | FAST_COMPILE_ERROR: can't resolve reference https://json-schema.org/draft/2020-12/meta/format-assertion from id http://localhost:1234/draft2020-12/format-assertion-true.json |
