import { Soundex } from "./soundex";

describe("Soundex", () => {
  let soundex = new Soundex();

  beforeEach(() => (soundex = new Soundex()));

  it("RetainsFirstLetterOfWord", () => {
    const encoded = soundex.encode("A");
    expect(encoded).toBe("A000");
  });

  it("PadsWithZerosToEnsureThreeDigits", () => {
    const encoded = soundex.encode("I");
    expect(encoded).toBe("I000");
  });

  it("ReplacesConsonantsWithAppropriateDigits", () => {
    expect(soundex.encode("Ax")).toBe("A200");
  });

  it("IgnoreNonAlphabetic", () => {
    expect(soundex.encode("A#")).toBe("A000");
  });

  it("ReplaceMultipleConsonantsToDigits", () => {
    expect(soundex.encode("Abcd")).toBe("A123");
  });

  it("LimitLengthToFourCharacters", () => {
    expect(soundex.encode("Dcdlb").length).toEqual(4);
  });

  it("IgnoresVowelLikeLetters", () => {
    expect(soundex.encode("BaAeEiIoOuUhHyYcdl")).toBe("B234");
  });

  it("CombinesDuplicateEncodings", () => {
    expect(soundex.encodedDigit("b")).toBe(soundex.encodedDigit("f"));
    expect(soundex.encodedDigit("c")).toBe(soundex.encodedDigit("g"));
    expect(soundex.encodedDigit("d")).toBe(soundex.encodedDigit("t"));

    expect(soundex.encode("Abfcgdt")).toBe("A123");
  });

  it("UpperCasesFirstLetter", () => {
    expect(soundex.encode("abcd")[0]).toBe("A");
  });

  it("IgnoresCaseWhenEncodingConsonants", () => {
    expect(soundex.encode("BCDL")).toBe(soundex.encode("bcdl"));
  });

  it("CombinesDuplicateCodesWhen2ndLetterDuplicates1st", () => {
    expect(soundex.encode("Bbcd")).toBe("B230");
  });

  it("DoesNotCombineDuplicateEncodingsSeparatedByVowels", () => {
    expect(soundex.encode("Jbob")).toBe("J110");
  });
});
