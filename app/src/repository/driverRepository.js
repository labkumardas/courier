// service/global/globalService.js
"use strict";
import mongoose from "mongoose";
import userModel from '../../model/userModel.js';
import userMetaModel from '../../model/userMetaModel.js';
import userDocumentModel from '../../model/userDocumentModel.js';

class driverRepository {
  constructor() {

  }
  async findPhone(phone) {
    const existingUser = await userModel.findOne({ phone });
    return !!existingUser;
  }

  async findEmail(email) {
    const existingUser = await userModel.findOne({ email });
    return !!existingUser;
  }

  async findUserName(username) {
    const existingUser = await userModel.findOne({ username });
    return !!existingUser;
  }

  async insertDriver(userData) {
    try {
      return userModel.create(userData);
    }
    catch (error) {
      throw new Error(error);
    }
  }
  async insertMetaModel(data) {
    try {
      return await userMetaModel.create(data);
    } catch (error) {
      throw new Error(error);
    }
  }
  async insertUserdocuments(data) {
    try {
      return await userDocumentModel.create(data);
    } catch (error) {
      throw new Error(error);
    }
  }
  
  async findUserById(id) {
    try {
      try {
        const user = await userModel.findById(id);
        const userMetaData = await userMetaModel.findOne({ user_id: id });
        const userDocument = await userDocumentModel.findOne({ user_id: id });
        const result = {
          userId: user._id,
          email: user.email,
          full_name: user.full_name,
          phone : user.phone,
          dob: user.dob,
          gender: user.gender,
          photo: user.photo,
          isActive: user.isActive,
          isBlocked: user.isBlocked,
          isVerify: user.isVerify,
          // Add other fields from userModel as needed
          userMeta: userMetaData || null,
          userDocument:userDocument || null
        };
        return result;
      } catch (error) {
        throw new Error(error);
      }
    } catch (error) {
      throw new Error(error);
    }
  }


}


export default new driverRepository();