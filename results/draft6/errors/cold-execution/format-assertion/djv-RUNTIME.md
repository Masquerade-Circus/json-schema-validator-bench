# draft6 format-assertion [djv](https://www.npmjs.com/package/djv) (2.1.4) RUNTIME errors

Phase: cold-execution

Exact matching records: 2

| Case ID | Description | Status | Error |
| --- | --- | --- | --- |
| draft6:optional/format/date-time.json#/groups/0/tests/0 | all string formats ignore integers | RUNTIME | FAST_RUNTIME_ERROR: data.indexOf is not a function |
| draft6:optional/format/hostname.json#/groups/0/tests/5 | all string formats ignore nulls | RUNTIME | FAST_RUNTIME_ERROR: Cannot read properties of null (reading 'length') |
