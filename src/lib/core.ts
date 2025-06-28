import rawJson from "./core.json" with { type: "json" };
import { CountryInfo, ISO2Codes } from "../types";
const json = rawJson as CountryInfo[];

// Yeah, functions are starting with 'N' not 'n', unconventional

export function NONames(countryCode: ISO2Codes): string[] {
    let countryInfo = json.find((c) => c.code.toUpperCase() === countryCode.toUpperCase());
    if (!countryInfo) return [];

    let returnString = countryInfo["Naming Order"].English;
    for (const [key, value] of Object.entries(countryInfo["Naming Order"])) {
        if (key !== "English" && value) {
            returnString = value;
            break;
        }
    }

    return returnString.split("+").map((name) => name.trim());
}

export function NONamesWF(countryCode: ISO2Codes, fallbackCode: ISO2Codes): string[] {
    let countryInfo = json.find((c) => c.code.toUpperCase() === countryCode.toUpperCase());
    if (!countryInfo) countryInfo = json.find((c) => c.code === fallbackCode);
    if (!countryInfo) return []; // this line is written to stop typescript from complaining.

    let returnString = countryInfo["Naming Order"].English;
    for (const [key, value] of Object.entries(countryInfo["Naming Order"])) {
        if (key !== "English" && value) {
            returnString = value;
            break;
        }
    }

    return returnString.split("+").map((name) => name.trim());
}

export function NONamesFC(countryCode: ISO2Codes): CountryInfo {
    if (typeof countryCode !== "string")
        throw new Error("The parameter (countryCode) must be a 2 alpha-character string");
    let countryInfo = json.find((c) => c.code.toUpperCase() === countryCode.toUpperCase());
    if (!countryInfo)
        throw new Error("Country Code passed is not recognised", {
            cause:
                countryCode.length > 2
                    ? "Passed a non-ISO alpha 2 country code"
                    : "The passed countryCode is not recorded in package core.json, please rich out to the author for update",
        });

    return countryInfo;
}

type ReturnTuple = readonly [english: string, other: string | undefined];

export function NONamesEnum(countryCode: ISO2Codes, fallbackCode?: ISO2Codes): ReturnTuple {
    let countryInfo = json.find((c) => c.code.toUpperCase() === countryCode.toUpperCase());
    if (!countryInfo && fallbackCode) countryInfo = json.find((c) => c.code === fallbackCode);
    if (!countryInfo) return ["", undefined]; // this line is written to stop typescript from complaining.

    let english = countryInfo["Naming Order"].English,
        other: string | undefined;
    for (const [key, value] of Object.entries(countryInfo["Naming Order"])) {
        if (key !== "English" && value) {
            other = value;
            break;
        }
    }

    return [english, other];
}
