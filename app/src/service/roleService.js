"use strict";
import globalHelper from '../../helper/globalHelper.js';
import roleRepository from '../repository/roleRepository.js';

class roleService {
  constructor() {
    this.helper = new globalHelper();
  }

  async viewRoleList(data) {
    try {
      return await roleRepository.getRoleList(data)
    } catch (error) {
      throw new Error(error)
    }
  }
}
export default new roleService();