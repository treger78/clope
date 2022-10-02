import * as fs from 'node:fs';

export class NormalizeTableData {
  constructor() {
    this.fs = fs;
  }

  splitDataToStringsArray = (pathToData) => {
    return this.fs.readFileSync(pathToData).toString().split('\n');
  }

  createKeysByAttributes = (attributes) => {
    const keys = {};

    let counter = 0;

    for (let i = 0; i < attributes.length; i += 1) {
      const attributesLine = attributes[i].split(',');

      for (let j = 0; j < attributesLine.length; j += 1) {
        if (keys[i] === undefined) {
          keys[i] = { [counter]: attributesLine[j] };
        }

        keys[i][counter] = attributesLine[j];

        counter += 1;
      }
    }

    return keys;
  }

  normalize = (tableData, attributes) => {
    const normalizedData = [];

    for (let i = 0; i < tableData.length; i += 1) {
      normalizedData.push([]);

      const tempTableData = tableData[i].replace(/,/g, '');

      for (let j = 0; j < tempTableData.length - 1; j += 1) {
        const attributesLine = Object.values(attributes[j]);
        const attributesKeys = Object.keys(attributes[j]);
        
        if (attributesLine.includes(tempTableData[j + 1])) {
          normalizedData[i].push(
            attributesKeys[attributesLine.indexOf(tempTableData[j + 1])]
          );
        }
      }
    }

    return normalizedData;
  }
}
