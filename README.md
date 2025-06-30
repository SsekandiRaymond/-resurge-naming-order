# @reignite/no-core

> Core utility library for naming order functionality for Country-based names arrangement in TypeScript/JavaScript

> Built for inclusive, culturally aware form generation. Oblivious to the classic `"First Name - Last Name"` norm.

## Overview

> `@reignite/no-core` is a lightweight utility library that provides functions to retrieve nationally accurate, culturally appropriate **personal name structures/arrangement** (naming order) based on ISO 3166-1 alpha-2 country codes.

> The package loads a `core.json` dataset containing naming orders for different countries. For example, some cultures use "Given + Family," others "Family + Given," and so on. This library enables dynamic, regionally appropriate form generation and data validation.

## Installation

```bash
npm install @reignite/no-core

# or

yarn add @reignite/no-core
```

## API Reference

> All functions start with N (uppercase N) by convention.

### `NONames(countryCode: ISO2Codes): string[]`

> Description:
> Returns an array of name components (in English or the first available other language) for the specified country.

> Example:

```typescript
NONames("JP");
// ["Surname + Given Name(s)", "姓 + 名"]
```

### `NONamesWF(countryCode: ISO2Codes, fallbackCode: ISO2Codes): string[]`

> Description:
> Same as NONames, but if the primary country code is not found, it falls back to the secondary code.

> Example:

```typescript
NONamesWF("ZZ", "UG");
// Since "ZZ" is unknown, returns naming order for "UG" as a string Array.
```

### `NONamesFC(countryCode: ISO2Codes): CountryInfo`

> Description:
> Returns the full CountryInfo object from the JSON dataset for the given country code.

> Throws:

-   If the country code is invalid (not a string)

-   If the code is not in the dataset

Example:

```typescript
const info = NONamesFC("AL");

/*
    {
        "country": "Albania",
        "code": "AL",
        "Naming Order": {
            "English": "Given Name + Family Name",
            "Albanian": "Emri i dhënë + Mbiemri"
        }
    }
*/
```

### `NONamesEnum(countryCode: ISO2Codes, fallbackCode?: ISO2Codes): [english: string, other?: string]`

> Description:
> Returns a tuple with:

-   The English naming order string

-   The translation of that english sentence in the countries primary official language naming order (if available or undefined).

```typescript
const [english, local] = NONamesEnum("CN");
console.log(english); // "Surname + Given Name(s)"
console.log(local); // "姓 + 名"
```

## Complete Example Usage

```ts
import { NONames, NONamesWF, NONamesEnum, NONamesFC } from "@reignite/no-core";

const parts = NONames("KE");
console.log(parts);

// With Fallback country code
const fallback = NONamesWF("ZZ", "KE");
console.log(fallback);

// Full Country details
const countryInfo = NONamesFC("UG");
console.log(countryInfo);

// english version and local translation in enum
const [en, local] = NONamesEnum("JP");
console.log(`English: ${en}, Local: ${local}`);
```

## Types

-   `ISO2Codes`
    A string union of ISO alpha-2 codes,

    ```ts
    "AF" | "AL" | "DZ" | "AD" | "AO" | "AG" | "AR" | "AM" | "AU" | "AT" | "AZ" | "BS" | "BH" | "BD" | "BB" | "BY" | "BE" | "BZ" | "BJ" | "BT" | "BO" | "BA" | "BW" | "BR" | "BN" | "BG" | "BF" | ... 167 more ... | "PS"
    ```

-   `CountryInfo`

```typescript
interface CountryInfo {
    code: string;
    country: string;
    "Naming Order": {
        English: string;
        [otherLanguage: string]: string | undefined;
    };
}
```

## Dataset (core.json)

> The `core.json` file contains naming orders per country in form:

```json
[
    ...
    {
        "code": "US",
        "country": "United States",
        "Naming Order": {
            "English": "First Name + Middle Name (optional) + Last Name",
        }
    },
  ...
]
```

## Error Handling

-   `NONamesFC` throws if the code is invalid or not recognized.

-   Other functions return:

-   -   An empty array (`[]`) if not found

-   -   Or a ts tuple/js two-element array `["", undefined]` in `NONamesEnum`.

## License

MIT © `reignite`

### author — [ssekandi](https://www.npmjs.com/~ssekandi)

```

```

## Gotcha section 😏😏 { Ignore if you are a serious person by nature }

-   **@reignite/no-core** is read as `At Re-Ignite slash naming order core`
-   **NONamesFC** is read as `Naming Order Names Full Country set`
-   **NONamesWF** is read as `Naming Order Names With Fallback`
-   **NONamesEnum** is read as `Naming Order Names Enum`
-   **NONames** is read as `Naming Order Names`

Oops — I know you have been reading it as literal `no`🤣🤣
