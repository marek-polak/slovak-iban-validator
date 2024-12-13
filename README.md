# Slovak IBAN Validator

A TypeScript library for validating Slovak IBAN numbers and retrieving bank information. Includes integration with Yup and Zod validation libraries.

## Installation

```bash
npm install slovak-iban-validator

# If using with Yup
npm install yup

# If using with Zod
npm install zod
```

## Usage

### Basic Usage

```typescript
import { SlovakIBANValidator } from "slovak-iban-validator";

// Validate an IBAN with full details
const result = SlovakIBANValidator.validateIBAN("SK5911000000002610001237");
console.log(result);
// Output:
// {
//   valid: true,
//   errors: [],
//   formatted: 'SK59 1100 0000 0026 1000 1237',
//   bank_swift: 'TATRSKBX',
//   bank_name: 'Tatra banka, a.s.'
// }

// Example with invalid IBAN
const invalidResult = SlovakIBANValidator.validateIBAN("SK001234");
console.log(invalidResult);
// Output:
// {
//   valid: false,
//   errors: [
//     'Invalid length: expected 24 characters, got 7',
//     'Invalid format: IBAN should contain only digits after country code'
//   ],
//   formatted: null,
//   bank_swift: null,
//   bank_name: null
// }
```

### Using with Yup

```typescript
import { createYupValidator } from "slovak-iban-validator";
import * as yup from "yup";

// Create a schema with Slovak IBAN validation
const schema = yup.object({
  iban: createYupValidator().required(),
});

// Validate the IBAN
try {
  const result = await schema.validate({ iban: "SK3112000000198742637541" });
  console.log(result);
  // Output: { iban: 'SK31 1200 0000 1987 4263 7541' }
} catch (error) {
  console.error(error.errors);
}
```

### Using with Zod

```typescript
import { createZodValidator } from "slovak-iban-validator";
import { z } from "zod";

// Create a schema with Slovak IBAN validation
const schema = z.object({
  iban: createZodValidator(),
});

// Validate the IBAN
const result = schema.safeParse({ iban: "SK3112000000198742637541" });
if (result.success) {
  console.log(result.data);
  // Output: {
  //   iban: {
  //     raw: 'SK3112000000198742637541',
  //     formatted: 'SK31 1200 0000 1987 4263 7541',
  //     bank_name: 'Tatra banka, a.s.',
  //     bank_swift: 'TATRSKBX',
  //     valid: true
  //   }
  // }
} else {
  console.error(result.error);
}
```

## Features

- Comprehensive IBAN validation
- Detailed error messages
- Formatted IBAN output
- Bank information retrieval (name and SWIFT code)
- TypeScript support with full type definitions
- Integration with Yup and Zod validation libraries

## Validation Result

The `validateIBAN` method returns an object with the following properties:

- `valid`: boolean - indicates if the IBAN is valid
- `errors`: string[] - list of validation errors (empty if valid)
- `formatted`: string | null - IBAN formatted with spaces for readability
- `bank_swift`: string | null - SWIFT/BIC code of the bank
- `bank_name`: string | null - Name of the bank

## License

MIT
