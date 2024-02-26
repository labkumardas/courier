"use strict";
import contactModel from "./../../model/contactModel.js";
import mongoose from "mongoose";
class contactRepository {
  constructor() {}
  async insertContract(insertData, userId) {
    try {
      return await contactModel.create(insertData);
    } catch (error) {
      throw new Error(error);
    }
  }
  async findAllContact(userId){
    try {
      return await contactModel.find({ user_id: userId }).sort({ created_at: -1 });
    } catch (error) {
      throw new Error(error);
    }
  }
  async findOneContact(id){
    try {
      return await contactModel.findOne({ _id: id });
    } catch (error) {
      throw new Error(error);
    }
  }
  async contractUpdate(id,insertData){
     console.log(insertData);
    try {
        return await contactModel.updateOne({ _id: id },{ $set: insertData });
    } catch (error) {
        console.log("-------------------",error);
        throw new Error(error);
    }
  }
  async deleteContact(id){
     try {
      
        return await contactModel.deleteOne({ _id: id });
     } catch (error) {
        throw new Error(error);
     }
  }
  
}

export default new contactRepository();
