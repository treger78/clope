import { Delta } from './Delta.js';
import { Cluster } from './Cluster.js';

export class Clope {
  constructor() {
    this.delta = new Delta();
  }

  initialize = (clusters, transactions, r) => {
    for (let i = 0; i < transactions.length; i += 1) {
      let maxCost = this.delta.add(null, transactions[i], r);
      let best = new Cluster();

      for (let j = 0; j < clusters.length; j += 1) {
        const cost = this.delta.add(clusters[j], transactions[i], r);

        if (cost > maxCost) {
          maxCost = cost;
          best = clusters[j];
        }
      }
      
      if (best.length === 0) {
        best.addTransaction(transactions[i]);
        
        clusters.push(best);
      } else {
        clusters[clusters.indexOf(best)].addTransaction(transactions[i]);
      }
    }
  }

  clarifyingIterations = (clusters, transactions, r) => {
    let moved = null;

    do {
      moved = false;

      for (let i = 0; i < transactions.length; i += 1) {
        let maxCost = this.delta.add(null, transactions[i], r);
        let bestClusterID = -1;

        const cluster = clusters.find(item => item.transactions.includes(transactions[i]));
        const remCost = this.delta.remove(cluster, transactions[i], r);
        const clustersWithouTransaction = clusters.filter(item => !item.transactions.includes(transactions[i]));
        
        for (let j = 0; j < clustersWithouTransaction.length; j += 1) {
          const addCost = this.delta.add(clustersWithouTransaction[j], transactions[i], r);

          if (addCost > maxCost) {
            maxCost = addCost;
            bestClusterID = clusters.indexOf(clustersWithouTransaction[j]);
          }
        }

        if (maxCost + remCost > 0) {
          if (bestClusterID === -1) {
            const newCluster = new Cluster();

            clusters[clusters.indexOf(cluster)].removeTransaction(transactions[i]);

            bestClusterID = clusters.length + 1;

            newCluster.addTransaction(transactions[i]);

            clusters.push(newCluster);
          } else {
            clusters[clusters.indexOf(cluster)].removeTransaction(transactions[i]);
            clusters[bestClusterID].addTransaction(transactions[i]);
          }

          moved = true;
        }
      }
    } while (moved !== false)
  }
}
