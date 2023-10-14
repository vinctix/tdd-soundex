export class Soundex {
  static readonly maxCodeLendth = 4;
  static readonly notADigit = "*";
  static readonly encodings = new Map([
    ["b", "1"],
    ["f", "1"],
    ["p", "1"],
    ["v", "1"],
    ["c", "2"],
    ["g", "2"],
    ["j", "2"],
    ["k", "2"],
    ["q", "2"],
    ["s", "2"],
    ["x", "2"],
    ["z", "2"],
    ["d", "3"],
    ["t", "3"],
    ["l", "4"],
    ["m", "5"],
    ["n", "5"],
    ["r", "6"],
  ]);

  encode(word: string) {
    return this.zeroPad(
      this.head(word).toLocaleUpperCase() + this.tail(this.encodedDigits(word))
    );
  }

  private head(word: string) {
    return word.substring(0, 1);
  }

  private tail(word: string) {
    return word.substring(1);
  }

  private encodedDigits(word: string) {
    let encoding = "";

    encoding = this.encodeHead(word);
    encoding = this.encodeTail(encoding, word);

    return encoding;
  }

  private encodeHead(word: string) {
    return this.encodedDigit(word[0]);
  }

  private encodeTail(encoding: string, word: string) {
    for (let i = 1; i < word.length; i++) {
      if (this.isComplete(encoding)) break;
      encoding += this.encodeLetter(encoding, word[i], word[i - 1]);
    }
    return encoding;
  }

  private isComplete(encoding: string) {
    return encoding.length === Soundex.maxCodeLendth;
  }

  private encodeLetter(encoding: string, letter: string, lastLetter: string) {
    const digit = this.encodedDigit(letter);
    if (
      digit != Soundex.notADigit &&
      (digit !== this.lastDigit(encoding) || this.isVowel(lastLetter))
    ) {
      return this.encodedDigit(letter);
    }
    return "";
  }

  private isVowel(letter: string) {
    return "aeiouy".includes(letter);
  }

  encodedDigit(letter: string) {
    const encoded = Soundex.encodings.get(letter.toLowerCase());
    return encoded || Soundex.notADigit;
  }

  private zeroPad(word: string) {
    return `${word}`.padEnd(Soundex.maxCodeLendth, "0");
  }

  private lastDigit(word: string) {
    if (word.length < 1) {
      return Soundex.notADigit;
    }
    return word.substring(word.length - 1);
  }
}
