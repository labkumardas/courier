import inquiryModel from "../../model/inquiryModel.js";

 
class inqueryRepository { 
    constructor(){
    }
    async insertAdminInquery (title,description,userId){
        try {
            return await inquiryModel.create({ title: title , description:description , user_id : userId } );
        } catch (error) {
            throw new Error(error);
        }
    }
}
export default new inqueryRepository();