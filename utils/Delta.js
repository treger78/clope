export class Delta {
  add = (cluster, transaction, r) => {
    if (cluster === null) {
      return transaction.length / (Array.from(new Set(transaction)).length ** r);
    }

    const newSquare = cluster.square + transaction.length;
    let newWidth = cluster.width;
  
    for (let i = 0; i < transaction.length; i += 1) {
      if (cluster.occurrence[transaction[i]] === undefined) newWidth += 1;
    }

    return (newSquare * (cluster.length + 1)) / (newWidth ** r) - (cluster.square * cluster.length) / (cluster.width ** r);
  }

  remove = (cluster, transaction, r) => {
    if (cluster.length === 1) {
      return -cluster.square / (cluster.width ** r);
    }

    const newSquare = cluster.square - transaction.length;
    let newWidth = cluster.width;
  
    for (let i = 0; i < transaction.length; i += 1) {
      if (cluster.occurrence[transaction[i]] === 1) newWidth -= 1;
    }
  
    return (newSquare * (cluster.length - 1)) / (newWidth ** r) - (cluster.square * cluster.length) / (cluster.width ** r);
  }
}
