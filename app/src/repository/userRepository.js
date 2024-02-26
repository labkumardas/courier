// service/global/globalService.js
"use strict";
import userModel from '../../model/userModel.js';
import userMetaModel from '../../model/userMetaModel.js';
import roleModel from '../../model/roleModel.js';
import userDocumentModel from '../../model/userDocumentModel.js';
 
class userRepository {
  constructor() {

  }
  async findPhone(phone) {
    const existingUser = await userModel.findOne({ phone : phone });
    return !!existingUser;
  }

  async findByEmail(email) {
    const existingUser = await userModel.findOne({ email: email , isActive:true });
    console.log(existingUser);
    return !!existingUser;
  }
  async findPhoneWithId(phone,excludeUserId) {
    const query = excludeUserId ? { phone, _id: { $ne: excludeUserId } } : { phone };
    const existingUser = await userModel.findOne(query);
    return !!existingUser;
  }

  async findByEmailWithId(email,excludeUserId) {
    const query = excludeUserId ? { email, _id: { $ne: excludeUserId } } : { email };
    const existingUser = await userModel.findOne(query);
    return !!existingUser;
  }
  async insertUser(userData,userMetaData) {
    try {
       const insert = await userModel.create(userData);
       userMetaData.user_id = insert._id;
       const roleId = userData.role_id;
       const roleData = await roleModel.findById({ _id: roleId });
       await userMetaModel.create(userMetaData);
      return {
        userId: insert._id,
        username: insert.full_name,
        email: insert.email,
        role: roleData.role_slug,
        isActive: insert.isActive,
        isBlocked: insert.isBlocked,
      };
    }
    catch (error) {
      throw new Error(error);
    }
  }

  async updateUserProfile(userId, userData, userMetaData,userImage) {
    try {
      const updatedUser = await userModel.findByIdAndUpdate(
        userId,
        userData,
        { new: true } 
      );
      if (!updatedUser) {
        throw new Error('User not found');
      }
     userMetaData.user_id = updatedUser._id;
        const resultUserMeta=  await userMetaModel.findOneAndUpdate(
          { user_id: userId },
          userMetaData,
          { upsert: true, new: true }
        );
        if(userImage){
          await userDocumentModel.findOneAndUpdate(
            { user_id: userId },
            userImage,
            { upsert: true, new: true }
          );
        }
     
      return {
        userId: updatedUser._id,
        full_name: updatedUser.full_name,
        email: updatedUser.email,
        phone:updatedUser.phone,
        dob:updatedUser.dob,
        gender:updatedUser.gender,
        photo: updatedUser.photo,
        isActive: updatedUser.isActive,
        isBlocked: updatedUser.isBlocked,
        isVerify: updatedUser.isVerify,
        userMeta: resultUserMeta || null,
        userDocument: userImage || null
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateProfile(userId, userData, userMetaData,userImage) {
    try {
      const updatedUser = await userModel.findByIdAndUpdate(
        userId,
        userData,
        { new: true } 
      );
      if (!updatedUser) {
        throw new Error('User not found');
      }
      userMetaData.user_id = updatedUser._id;
     const resultUserMeta=  await userMetaModel.findOneAndUpdate(
        { user_id: userId },
        userMetaData,
        { upsert: true, new: true }
      );
      if(userImage){
        await userDocumentModel.findOneAndUpdate(
          { user_id: userId },
          userImage,
          { upsert: true, new: true }
        );
      }
    
       console.log("-----" ,resultUserMeta);
      return {
        userId: updatedUser._id,
        full_name: updatedUser.full_name,
        email: updatedUser.email,
        phone:updatedUser.phone,
        dob:updatedUser.dob,
        gender:updatedUser.gender,
        photo: updatedUser.photo,
        isActive: updatedUser.isActive,
        isBlocked: updatedUser.isBlocked,
        isVerify: updatedUser.isVerify,
        userMeta: resultUserMeta || null,
        userDocument: userImage || null
      };
       
    } catch (error) {
      throw new Error(error);
    }
  }

  async findUserById(id) {
    try {
      return await userModel.findOne({ _id: id }).select('-password');
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateProfilePhoto(id,imagePath) {
    try {
      const updatedUser = await userModel.findByIdAndUpdate(
        id,
        imagePath,
        { new: true } 
      );
      if (!updatedUser) {
        throw new Error('User not found');
      }
       
      return { imagePath: updatedUser.photo };
    } catch (error) {
      throw new Error(error);
    }
  }
  async findUserEmail(email) {
    const existingUser = await userModel.findOne({ email });
    return  existingUser;
  }
}


export default new userRepository();