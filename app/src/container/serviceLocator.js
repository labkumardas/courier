// serviceLocator.js
"use strict";
class ServiceLocator {
  constructor() {
    this.services = {};
  }
  register(name, service) {
    this.services[name] = service;
  }
  resolve(name) {
    if (!this.services[name]) {
      throw new Error(`Service '${name}' not found in the container.`);
    }
    console.log(`Service '${this.services[name]}' found in the container.`);
    return this.services[name];
  }
}
const serviceLocator = new ServiceLocator();
export default serviceLocator;
