import { NormalizeTableData } from './utils/NormalizeTableData.js';
import { Clope } from './utils/Clope.js';
//import * as fs from 'node:fs';

const normalizeTableData = new NormalizeTableData();

const dataAttributes = normalizeTableData.splitDataToStringsArray('./utils/tableDataAttributes.data');
const attributes = normalizeTableData.createKeysByAttributes(dataAttributes);

const tableData = normalizeTableData.splitDataToStringsArray('./utils/table.data');

const normalizedTableData = normalizeTableData.normalize(tableData, attributes);

const clusters = [];

const clope = new Clope();

clope.initialize(clusters, normalizedTableData, 2.6);
clope.clarifyingIterations(clusters, normalizedTableData, 2.6);

/*
fs.writeFile('output.data', JSON.stringify(clope.clusters), (error) => {
  if (error) throw error;

  console.log('Writed');
});
*/
