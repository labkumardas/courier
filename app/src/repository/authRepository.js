"use strict";
import userModel from '../../model/userModel.js';
import roleModel from '../../model/roleModel.js';
import loginHistory from '../../model/loginHistory.js';
import otpModel from '../../model/otpModel.js';
import bcrypt from 'bcryptjs';

class authRepository {
  constructor() {
    //
  }

  async userLogin(userEmail, password, type) {
    try {
      const user = await userModel.findOne({ email: userEmail });
      if (!user) {
        return !!user;
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return { status: 'WRONG_PASSWORD' };
      }
      if (user.isActive == false) {
        return { status: 'INACTIVE' };
      }
      if (user.isBlocked == true) {
        return { status: 'ACCOUNT_BLOCK' };
      }
      
      if (user.isDeleted == true  ) {
        return { status: 'ACCOUNT_DELETE' };
      }
      
      const roleId = user.role_id;
      const roleData = await roleModel.findById({ _id: roleId });

      if (roleData.role_slug.toLowerCase() !== type.toLowerCase()) {
        return false;
      }
      else {
        return {
          status: true,
          userId: user._id,
          username: user.full_name,
          email: user.email,
          role: roleData.role_slug,
          isActive: user.isActive,
          isBlocked: user.isBlocked,
        };
      }

    }
    catch (error) {
      throw new Error(error)
    }
  }

  async createLoginHistory(data) {
    try {
      return loginHistory.create(data);
    }
    catch (error) {
      throw new Error(error)
    }
  }

  async saveOtp(otp, email, userId) {
    try {
      const expirationTime = new Date(Date.now() + 2 * 60 * 1000); // Set expiration to 2 minutes
      return await otpModel.create({ otp: otp, email: email, user_id: userId, isVerify: false, expiresAt: expirationTime });
    } catch (error) {
      throw new Error(error);
    }
  }

  async verifyOtp(otp, email, userId) {
    try {
      const checkOtp = await otpModel.findOne({
        user_id: userId,
        isVerify: false, // Only consider unverified OTPs
      }).sort({ createdAt: -1 });

      if (checkOtp) {
              if (Number(checkOtp.otp) === Number(otp)) {
                    const checkExpiredOtp = await otpModel.findOne({
                      user_id: userId,
                      isVerify: false, // Only consider unverified OTPs
                      expiresAt: { $gte: new Date() } // Check if the OTP is not expired
                    }).sort({ createdAt: -1 });
                    if (checkExpiredOtp) {
                      await otpModel.findOneAndUpdate(
                        { _id: checkOtp._id },
                        { $set: { isVerify: true } },
                        { new: true }
                      );
                      return { status: true };
                    }
                    else {
                      return { status: "OTP_is_expired" };
                    }
              }
      else {
          return { status: "INVALID_OTP" };
      }
        // await otpModel.findOneAndUpdate(
        //   { otp: otp },
        //   { $set: { isVerify: true } },
        //   { new: true }
        // );

      }
      else {
        return { status: "INVALID_OTP" };
      }
    } catch (error) {
      throw new Error(error);
    }
  }


  async updateLoginHistory(userId, token, newData) {
    try {
      return await loginHistory.findOneAndUpdate({ user_id: userId, userToken: token }, { $set: newData }, { new: true });
    }
    catch (error) {
      throw new Error(error)
    }
  }

  async checkToken(token) {
    try {
      const result = await loginHistory.findOne({ userToken: token, isBlacklist: true });
      return !!result;
    }
    catch (error) {
      throw new Error(error)
    }
  }
  async updatePassword(email, password) {
    try {
      const updatedUser = await userModel.findOneAndUpdate(
        { email: email },
        { $set: { password: password } },
        { new: true }
      );

      if (!updatedUser) {
        return { status: "no_user_found" };
      }


      return updatedUser;
    } catch (error) {
      throw new Error(error);
    }
  }
  async userDelete(id) {
    try {
      const updatedUser = await userModel.findOneAndUpdate(
        { _id: id },
        { $set: { isDeleted: true } },
        { new: true }
      );
      console.log(updatedUser);
      if (!updatedUser) {
        return { status: "no_user_found" };
      }
      return updatedUser;
    } catch (error) {
      throw new Error(error);
    }
  }
  async blackListToken(userId, token, newData) {
    try {
      return await loginHistory.findOneAndUpdate({ user_id: userId, userToken: token }, { $set: newData }, { new: true });

    } catch (error) {
      throw new Error(error);
    }
  }


}

export default new authRepository();