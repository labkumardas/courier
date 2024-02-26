"use strict";
import userRepository from "../repository/userRepository.js";
import contactRepository from "../repository/contactRepository.js";
import inqueryRepository from "../repository/inqueryRepository.js";
import globalRepository from "../repository/globalRepository.js";

class settingService {
  constructor() { }
  //
  async updateprofileImageById(id, imagePath) {
    const data = {
      photo: imagePath
    }
    try {
      return await userRepository.updateProfilePhoto(id, data);
    }
    catch (error) {
      throw new Error(error);
    }
  }
  async profileEdit(data, userId, driverDocument) {
    try {
      if (await userRepository.findPhoneWithId(data.phone, userId)) {
        return { status: 'PHONE_EXIST' };
      }
      if (await userRepository.findByEmailWithId(data.email, userId)) {
        return { status: 'EMAIL_EXIST' };
      }

      const userData = {
        full_name: data.full_name,
        phone: data.phone,
        email: data.email,
        // password: bcrypt.hashSync(data.password, 8),
        dob: data.dob,
        gender: data.gender,
      };
      const userMetaData = {
        company_number: data.company_number,
        address1: data.address1,
        address2: data.address2,
        city: data.city,
        state: data.state,
        zipcode: data.zipcode,
      };
      const userDoc = {
        docurl: driverDocument
      }
      return await userRepository.updateProfile(userId, userData, userMetaData, userDoc);
    } catch (error) {
      throw new Error(error);
    }
  }

  async profileEditUser(data, userId, driverDocument) {
    const email = data.email.toLowerCase();
    if (await userRepository.findPhoneWithId(data.phone, userId)) {
      return { status: 'PHONE_EXIST' };
    }
    if (await userRepository.findByEmailWithId(email, userId)) {
      return { status: 'EMAIL_EXIST' };
    }
    const userData = {
      full_name: data.full_name.toLowerCase(),
      phone: data.phone,
      email: email,
    };
    const userMetaData = {
      company_number: data.company_number,
      address1: data.address1,
      address2: data.address2,
      city: data.city,
      state: data.state,
      zipcode: data.zipcode,
    };
    const userDoc = {
      docurl: driverDocument
    }
    try {
      return await userRepository.updateUserProfile(userId, userData, userMetaData, userDoc);
    } catch (error) {
      throw new Error(error);
    }
  }

  async contactInsert(data, userId) {
    const insertData = {
      user_id: userId,
      name: data.name.toLowerCase(),
      location: data.location,
      addressLine1: data.addressLine1,
      addressLine2: data.addressLine2,
      city: data.city,
      state: data.state,
      zip_code: data.zip_code,
      latitude: data.latitude,
      longitude: data.longitude,
      placeId:data.placeId
    };
    try {
      return await contactRepository.insertContract(insertData, userId);
    } catch (error) {
      throw new Error(error);
    }
  }
  async getAllContact(userId) {
    try {
      return await contactRepository.findAllContact(userId);
     // return 
    } catch (error) {
      throw new Error(error);
    }
  }
  async getContactById(id) {
    try {
      return await contactRepository.findOneContact(id);
    } catch (error) {
      throw new Error(error);
    }
  }
  async updateContactById(id, data) {
    const insertData = {
      name: data.name.toLowerCase(),
      location: data.location,
      addressLine1: data.addressLine1,
      addressLine2: data.addressLine2,
      city: data.city,
      state: data.state,
      zip_code: data.zip_code,
      latitude: data.latitude,
      longitude: data.longitude,
      placeId:data.placeId
    };
    try {
      return await contactRepository.contractUpdate(id, insertData);
    } catch (error) {
      console.log("serrrr", error);
      throw new Error(error);
    }
  }
  async deleteContactById(id) {
    try {
      if (await contactRepository.findOneContact(id)) {
        return await contactRepository.deleteContact(id);
      }
      else {
        return { status: "invalid_id" }
      }
    } catch (error) {
      throw new Error(error);
    }
  }
  async adminContact(title, description, userId) {
    try {
      return await inqueryRepository.insertAdminInquery(title, description, userId);
    } catch (error) {
      throw new Error(error);
    }
  }
  async vehichleData (){
    try {
      return await globalRepository.vehichleList();
    } catch (error) {
      throw new Error(error);
    }
  }
}
export default new settingService();
