import bcrypt from 'bcrypt'

export default class BcryptHelper{
    public salt:string =''

    private async initializeSalt() {
        this.salt = await bcrypt.genSalt(10)
    }

    public async hashPassword(password:string){
        if(!this.salt){
            await this.initializeSalt()
        }
        const dbPassword= await bcrypt.hash(password,this.salt)
        return dbPassword
    }
    public async comparePassword(password:string,dbPassword:string){
        return await bcrypt.compare(password,dbPassword)
    }

}
