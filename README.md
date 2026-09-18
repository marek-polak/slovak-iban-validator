# Slovak IBAN Validator

A TypeScript library for validating Slovak IBAN numbers and retrieving bank information. Includes integration with Yup and Zod validation libraries.

## Installation

```bash
npm install slovak-iban-validator

# If using with Yup (supported: ^1.0.0)
npm install yup

# If using with Zod (supported: ^4.0.0)
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
const invalidResult = SlovakIBANValidator.validateIBAN("SK001234", { multipleErrors: true });
console.log(invalidResult);
// Output:
// {
//   valid: false,
//   errors: [
//     'Neplatná dĺžka: očakávaných 24 znakov, zadaných 7',
//     'Neplatný formát: IBAN musí za kódom krajiny obsahovať iba číslice'
//   ],
//   formatted: null,
//   bank_swift: null,
//   bank_name: null
// }
```

### Using with Yup

```typescript
import { createYupValidator } from "slovak-iban-validator/yup";
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
import { createZodValidator } from "slovak-iban-validator/zod";
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

The root entry point (`slovak-iban-validator`) has no dependency on yup or zod. Each integration lives in its own subpath (`slovak-iban-validator/yup`, `slovak-iban-validator/zod`) and only requires its own validation library.

## Localization

Error messages are localized in Slovak (`'sk'`) and English (`'en'`). Slovak is the default locale.

```typescript
import { SlovakIBANValidator } from "slovak-iban-validator";

// Slovak messages (default)
SlovakIBANValidator.validateIBAN("SK001234");

// English messages
SlovakIBANValidator.validateIBAN("SK001234", { locale: "en" });

// Return all errors instead of just the first one
SlovakIBANValidator.validateIBAN("SK001234", {
  multipleErrors: true,
  locale: "en",
});
```

The same `locale` option is accepted by the validation-library factories:

```typescript
import { createZodValidator } from "slovak-iban-validator/zod";
import { createYupValidator } from "slovak-iban-validator/yup";

createZodValidator({ locale: "en" });
createYupValidator({ locale: "en" });
```

The `Locale` type (`'sk' | 'en'`) and the `MESSAGES` table are exported from the root entry point.

## Bank logos

Bundled SVG logos for supported banks are available via a separate subpath (zero
runtime dependencies):

```typescript
import { SlovakIBANValidator } from "slovak-iban-validator";
import { getBankLogo, hasBankLogo, BANK_LOGOS } from "slovak-iban-validator/logos";

const result = SlovakIBANValidator.validateIBAN("SK5911000000002610001237");
// extract the 4-digit bank code from the IBAN
const bankCode = "SK5911000000002610001237".substring(4, 8); // "1100"

if (hasBankLogo(bankCode)) {
  const svg = getBankLogo(bankCode); // raw SVG markup string
  // e.g. element.innerHTML = svg;
}
```

Each logo is normalized SVG markup with a fixed `viewBox="0 0 240 80"` and a
transparent background — render it at any size. Bank codes **without** a bundled
logo: `3100`, `7300`, `8410`, `8430`.

Note: bank logos are trademarks of their respective owners and are **not**
covered by this package's MIT license — see
[LOGOS-NOTICE.md](./LOGOS-NOTICE.md).

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
