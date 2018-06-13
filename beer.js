class Bottles {
  constructor() {
    this.verse = this.verse.bind(this);
  }

  song() {
    return this.verses(99, 0);
  }

  verses(upper, lower) {
    return Array.from({length: (upper - lower + 1)}, (_, index) => index + lower)
      .reverse()
      .map(this.verse)
      .join('\n');
  }

  verse(number) {
    const bottleNumber = BottleNumber.for(number);
    return capitalize(`${bottleNumber} of beer on the wall, `) +
          `${bottleNumber} of beer.\n` +
          `${bottleNumber.action()}, ` +
          `${bottleNumber.successor()} of beer on the wall.\n`;
  }
}

class BottleNumber {
  static for(number) {
    switch(number) {
      case 0:
        return new BottleNumber0(number);
      case 1:
        return new BottleNumber1(number);
      default:
        return new BottleNumber(number);
    }
  }

  constructor(number) {
    this.number = number;
  }

  toString() {
    return `${this.quantity()} ${this.container()}`;
  }

  container() {
    return 'bottles';
  }

  quantity() {
    return `${this.number}`;
  }

  action() {
    return `Take ${this.pronoun()} down and pass it around`;
  }

  pronoun() {
    return 'one';
  }

  successor() {
    return BottleNumber.for(this.number - 1);
  }
}

class BottleNumber0 extends BottleNumber {
  quantity() {
    return 'no more';
  }

  action() {
    return 'Go to the store and buy some more';
  }

  successor() {
    return BottleNumber.for(99);
  }
}

class BottleNumber1 extends BottleNumber {
  container() {
    return 'bottle';
  }

  pronoun() {
    return 'it';
  }
}

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}

module.exports = Bottles;
