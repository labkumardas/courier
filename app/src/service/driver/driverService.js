"use strict";
import bcrypt from 'bcryptjs';
import globalHelper from '../../../helper/globalHelper.js';
import driverRepository from '../../repository/driverRepository.js';
import roleRepository from '../../repository/roleRepository.js';
import roleConstants from '../../../util/roleConstants.js';
import authRepository from '../../repository/authRepository.js';
import mailServiceHelper from '../../../helper/mailServiceHelper.js';
const mailServiceHelperInstance = new mailServiceHelper();

class driverService {
    constructor() {
        this.helper = new globalHelper();
    }

    async isPhoneExists(phone) {
        const existingUser = await driverRepository.findPhone(phone);
        return !!existingUser;
    }

    async isEmailExists(email) {
        const emailName = email.toLowerCase();
        const existingUser = await driverRepository.findEmail(emailName);
        return !!existingUser;
    }

    async isUsernameExists(username) {
        const name = username.toLowerCase();
        const existingUser = await driverRepository.findUserName(name);
        return !!existingUser;
    }
    async getRole(slug) {
        const roleData = await roleRepository.getRolebySlug(slug);
        return roleData;
    }
    async createDriver(data, userImage) {
        console.log(userImage);
        const roleSlugToCheck = roleConstants.DRIVER;
        const existingRole = await this.getRole(roleSlugToCheck.slug);
        const driverData = {
            full_name: data.full_name.toLowerCase(),
            phone: data.phone,
            email: data.email.toLowerCase(),
            dob: data.dob,
            gender: data.gender,
            role_id: existingRole._id,
            password: bcrypt.hashSync(data.password, 8),
            isActive: true,
            isBlocked: false,
            isVerify: false,
            isDeleted:false
        }
        try {

            if (await driverRepository.findPhone(data.phone)) {
                return { status: 'PHONE_EXIST' };
            }
            if (await driverRepository.findEmail(data.email.toLowerCase())) {
                return { status: 'EMAIL_EXIST' };
            }
            const insertDriverData = await driverRepository.insertDriver(driverData);
            const driverMetaData = {
                user_id: insertDriverData._id,
                address1: data.address1,
                address2: data.address2,
                city: data.city,
                state: data.state,
                zipcode: data.zipcode,
            }
            const driveDoc = {
                user_id: insertDriverData._id,
                doc_type: data.doctype || null,
                docurl: userImage || null
            }

            await driverRepository.insertMetaModel(driverMetaData);
            

            if (insertDriverData) {
                const otp = await this.helper.generateOTP();
                await mailServiceHelperInstance.sendMailWithOTP(insertDriverData.email, 'OTP FOR LOGIN.', otp);
                console.log("start otp");
                await authRepository.saveOtp(otp, insertDriverData.email, insertDriverData._id);
                console.log("end otp");
                const data = {
                    status: 'OTP_SENT',
                    email: insertDriverData.email,
                    userId: insertDriverData._id,
                    otp: otp,
                }
                console.log(data);
                return {
                    status: 'OTP_SENT',
                    email: insertDriverData.email,
                    user_id: insertDriverData._id,
                    otp: otp,
                    isDriver: true
                };

            } else {
                return {
                    status: 'LOGIN_FAILED',
                };
            }
        }
        catch (error) {
            console.error(error)
            throw new Error(error)
        }
    }

    async Profile(req) {
        try {
            return await driverRepository.findUserById(req.user.userId);
        } catch (error) {
            console.error(error)
            throw new Error(error)
        }
    }
 
}

export default new driverService();