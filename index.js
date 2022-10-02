import { NormalizeTableData } from './utils/NormalizeTableData.js';
import { Clope } from './utils/Clope.js';

const normalizeTableData = new NormalizeTableData();

const dataAttributes = normalizeTableData.splitDataToStringsArray('./utils/tableDataAttributes.data');
const attributes = normalizeTableData.createKeysByAttributes(dataAttributes);

const tableData = normalizeTableData.splitDataToStringsArray('./utils/table.data');

const normalizedTableData = normalizeTableData.normalize(tableData, attributes);

const clusters = [];

const clope = new Clope();

clope.initialize(clusters, normalizedTableData, 2.6);
//clope.clarifyingIterations(clusters, normalizedTableData, 2.6);

const filteredClusters = clusters.filter((cluster) => cluster.length !== 0);

for (let i = 0; i < filteredClusters.length; i += 1) {
  let edible = 0;
  let poisoned = 0;

  const transactions = filteredClusters[i].transactions;
  
  for (let j = 0; j < transactions.length; j += 1) {
    const edibility = normalizeTableData.tableDataByEdibility.filter((item) => item[transactions[j]] !== undefined);

    if (edibility[0][transactions[j]] === true) {
      edible += 1;
    } else {
      poisoned += 1;
    }
  }

  console.log(`cluster: ${i + 1}; e: ${edible}; p: ${poisoned}`);
}
