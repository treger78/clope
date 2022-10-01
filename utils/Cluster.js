export class Cluster {
  constructor() {
    this.length = 0;
    this.width = 0;
    this.height = 0;
    this.square = 0;
    this.occurrence = {};
    this.transactions = [];
  }

  addTransaction = (transaction) => {
    for (let i = 0; i < transaction.length; i += 1) {
      const item = transaction[i];

      if (!Object.keys(this.occurrence).includes(item.toString())) {
        this.occurrence[item] = 0;
      }

      this.occurrence[item] += 1;
    }

    this.square += transaction.length;
    this.width = Object.keys(this.occurrence).length;
    this.height = this.square / this.width;
    this.length += 1;
    this.transactions.push(transaction);
  }

  removeTransaction = (transaction) => {
    for (let i = 0; i < transaction.length; i += 1) {
      const item = transaction[i];

      if (Object.keys(this.occurrence).includes(item.toString())) {
        this.occurrence[item] -= 1;

        if (this.occurrence[item] === 0) delete this.occurrence[item];
      }
    }

    this.square -= transaction.length;
    this.width = Object.keys(this.occurrence).length;
    this.height = this.square / this.width;
    this.length -= 1;

    for (let i = 0; i < this.transactions.length; i += 1) {
      if (this.transactions[i] === transaction) {
        this.transactions.splice(i, 1);

        break;
      }
    }
  }
}
