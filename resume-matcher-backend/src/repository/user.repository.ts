import userModel from "../database/schemas/user.schema";
import { IAuthPayload } from "../interface/auth.interface";

export default class UserRepository{
    public async searchUser<T>(key:string,value:T){
        const searchUser= await userModel.findOne({
            [`${key}`]:value
            })
        return searchUser
    }

    public async saveResult(payload:IAuthPayload){
        const saveuser= await userModel.create(
            {...payload}
        )
        return saveuser
    }
}