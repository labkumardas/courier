"use strict";
import bcrypt from 'bcryptjs';
import roleConstants from '../../../util/roleConstants.js';
import userRepository from '../../repository/userRepository.js';
import roleRepository from '../../repository/roleRepository.js';
import authRepository from '../../repository/authRepository.js';
import globalHelper from '../../../helper/globalHelper.js';
import mailServiceHelper from '../../../helper/mailServiceHelper.js';
const mailServiceHelperInstance = new mailServiceHelper();

class userService {
    constructor() {
        this.helper = new globalHelper();
    }
    async getRole(slug) {
        const roleData = await roleRepository.getRolebySlug(slug);
        return roleData;
    }
    async createUser(data) {
        if (await userRepository.findPhone(data.phone)) {
             return { status: 'PHONE_EXIST' };
        }
        if (await userRepository.findByEmail(data.email)) {
             return { status: 'EMAIL_EXIST' };
        }
        const roleSlugToCheck = roleConstants.USER;
        const existingRole = await this.getRole(roleSlugToCheck.slug);
        const userData = {
            full_name: data.full_name,
            phone: data.phone,
            email: data.email,
            role_id: existingRole._id,
            password: bcrypt.hashSync(data.password, 8),
            isActive: true,
            isBlocked: false,
            isVerify: false,
            photo: null,
            isDeleted:false
        }
        const userMetaData = {
            company_number: data.company_number,
            address1: data.address1,
            address2: data.address2,
            city: data.city,
            state: data.state,
            zipcode: data.zipcode
        }

        try {
            const insertUserData = await userRepository.insertUser(userData, userMetaData);
            console.log(insertUserData);
            if (insertUserData) {
                const otp = await this.helper.generateOTP();
                await mailServiceHelperInstance.sendMailWithOTP(userData.email, 'OTP FOR LOGIN.', otp);
                await authRepository.saveOtp(otp, userData.email, insertUserData.userId);
                const data = {
                    status: 'OTP_SENT',
                    email: insertUserData.email,
                    userId: insertUserData.userId,
                    otp: otp,
                }
                return {
                    status: 'OTP_SENT',
                    email: insertUserData.email,
                    user_id: insertUserData.userId,
                    otp: otp,
                    isUser: true
                };

            } else {
                return {
                    status: 'LOGIN_FAILED',
                };
            }
        }
        catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }

    async Profile(req) {
        try {
            return await userRepository.findUserById(req.user.userId);
        } catch (error) {
            console.error(error)
            throw new Error(error)
        }
    }


}

export default new userService();