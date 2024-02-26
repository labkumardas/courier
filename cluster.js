"use strict";
import cluster from 'cluster';
import os from 'os';
const setupCluster = (setupFunction) => {
  if (cluster.isPrimary) {
    const numCPUs = os.cpus().length;
       console.log("numCPUs",numCPUs);
    for (let i = 0; i < numCPUs; i++) {
         cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
       console.log(`Worker ${worker.process.pid} , singnal ${signal} ,died. Restarting...`);
       cluster.fork();
    });
  } else {
    setupFunction();
  }
};
export default setupCluster;
