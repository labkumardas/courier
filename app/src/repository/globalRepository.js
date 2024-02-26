"use strict";
import mongoose from "mongoose";
import priceSettingModel from "../../model/priceSettingModel.js";
 
class globalRepository {
   constructor(){
     
   }
  
  async vehichleList(){
     try {
      return await priceSettingModel.find();
    } catch (error) {
      throw new Error(error);
    }
  }
}
export default new globalRepository();
