import { describe, expect, test } from "@jest/globals";

import {
    checkDateFormatEU,
    checkDateFormatUS,
    checkPhoneNumber,
    checkLessEquals255
} from '../src/validations/validate.js';

describe('Validation tests', () => {

    // 1. EUROPEAN DATE: DD.MM.YYYY
    describe('checkDateFormatEU', () => {
        test.each([
            ["valid date", "25.01.2018", true],
            ["first day", "01.01.2024", true],
            ["last day", "31.12.2024", true],
            ["day 09", "09.05.2024", true],
            ["day 10", "10.05.2024", true],
            ["day 29", "29.05.2024", true],
            ["day 30", "30.05.2024", true],
            ["day 31", "31.05.2024", true],
            ["month 09", "15.09.2024", true],
            ["month 10", "15.10.2024", true],
            ["month 12", "15.12.2024", true],
            ["invalid calendar date", "31.02.2024", true],

            ["wrong separator", "12/12/2018", false],
            ["wrong separator dash", "12-12-2018", false],
            ["day 00", "00.01.2024", false],
            ["day 32", "32.01.2018", false],
            ["month 00", "12.00.2024", false],
            ["month 13", "12.13.2024", false],
            ["month 15", "12.15.2018", false],
            ["two digit year", "25.01.18", false],
            ["five digit year", "25.01.20244", false],
            ["wrong order", "2018.12.08", false],
            ["single digit day", "1.01.2024", false],
            ["single digit month", "01.1.2024", false],
            ["letters", "aa.bb.cccc", false],
            ["extra text", "25.01.2018abc", false],
            ["leading space", " 25.01.2018", false],
            ["trailing space", "25.01.2018 ", false],
            ["empty string", "", false]

        ])("%s", (_caseName, value, expected) => {
            expect(checkDateFormatEU(value)).toBe(expected);
        });
    });


    // 2. AMERICAN DATE: YYYY-MM-DD
    describe('checkDateFormatUS', () => {
        test.each([
            ["valid date", "2024-12-31", true],
            ["first date", "2024-01-01", true],
            ["day 09", "2024-05-09", true],
            ["day 10", "2024-05-10", true],
            ["day 29", "2024-05-29", true],
            ["day 30", "2024-05-30", true],
            ["day 31", "2024-05-31", true],
            ["month 09", "2024-09-15", true],
            ["month 10", "2024-10-15", true],
            ["month 12", "2024-12-15", true],
            ["invalid calendar date", "2024-02-31", true],

            ["wrong order", "12-31-2024", false],
            ["slash separator", "2024/12/08", false],
            ["dot separator", "2024.12.08", false],
            ["month 00", "2024-00-08", false],
            ["month 13", "2024-13-08", false],
            ["month 15", "2024-15-08", false],
            ["day 00", "2024-12-00", false],
            ["day 32", "2024-12-32", false],
            ["two digit year", "24-12-31", false],
            ["five digit year", "20244-12-31", false],
            ["single digit month", "2024-1-31", false],
            ["single digit day", "2024-12-1", false],
            ["letters", "abcd-ef-gh", false],
            ["extra text", "2024-12-31abc", false],
            ["leading space", " 2024-12-31", false],
            ["trailing space", "2024-12-31 ", false],
            ["empty string", "", false]

        ])("%s", (_caseName, value, expected) => {
            expect(checkDateFormatUS(value)).toBe(expected);
        });
    });


    // 3. PHONE NUMBER: +DD(DD)DDDD-DDDD
    describe('checkPhoneNumber', () => {
        test.each([
            ["valid phone", "+12(34)1234-5678", true],
            ["all zeros", "+00(00)0000-0000", true],
            ["all nines", "+99(99)9999-9999", true],
            ["another valid phone", "+38(50)1234-5678", true],

            ["missing plus", "12(34)1234-5678", false],
            ["one country digit", "+1(34)1234-5678", false],
            ["three country digits", "+123(34)1234-5678", false],
            ["one area digit", "+12(3)1234-5678", false],
            ["three area digits", "+12(345)1234-5678", false],
            ["missing parentheses", "+12341234-5678", false],
            ["missing opening bracket", "+1234)1234-5678", false],
            ["missing closing bracket", "+12(341234-5678", false],
            ["extra dash after bracket", "+12(34)-1234-5678", false],
            ["missing dash", "+12(34)12345678", false],
            ["three digits after dash", "+12(34)1234-567", false],
            ["five digits after dash", "+12(34)1234-56789", false],
            ["three digits before dash", "+12(34)123-5678", false],
            ["five digits before dash", "+12(34)12345-5678", false],
            ["letter instead of digit", "+12(34)12a4-5678", false],
            ["letter in country code", "+1a(34)1234-5678", false],
            ["spaces inside", "+12 (34)1234-5678", false],
            ["leading space", " +12(34)1234-5678", false],
            ["trailing space", "+12(34)1234-5678 ", false],
            ["extra text", "+12(34)1234-5678abc", false],
            ["empty string", "", false]

        ])("%s", (_caseName, value, expected) => {
            expect(checkPhoneNumber(value)).toBe(expected);
        });
    });


    // 4. NUMBER FROM 0 TO 255
    describe('checkLessEquals255', () => {
        test.each([
            ["zero", "0", true],
            ["one", "1", true],
            ["nine", "9", true],
            ["leading zero", "09", true],
            ["two zeros", "00", true],
            ["ten", "10", true],
            ["ninety nine", "99", true],
            ["one hundred", "100", true],
            ["one hundred ninety nine", "199", true],
            ["two hundred", "200", true],
            ["two hundred forty nine", "249", true],
            ["two hundred fifty", "250", true],
            ["maximum value", "255", true],

            ["above maximum", "256", false],
            ["three hundred", "300", false],
            ["negative number", "-1", false],
            ["negative maximum", "-255", false],
            ["number with letter", "2a5", false],
            ["only letters", "abc", false],
            ["three digit leading zero", "009", false],
            ["four digits", "1000", false],
            ["decimal number", "2.5", false],
            ["plus sign", "+25", false],
            ["leading space", " 25", false],
            ["trailing space", "25 ", false],
            ["empty string", "", false]

        ])("%s", (_caseName, value, expected) => {
            expect(checkLessEquals255(value)).toBe(expected);
        });
    });

});
