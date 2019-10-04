import { Injectable, Inject } from '@nestjs/common';
import * as bcrypt from "bcrypt"
import { Users, Roles } from '../entities/users.entity';

@Injectable()
export class AuthRepository {
    @Inject('AUTH_REPOSITORY') private readonly AUTH_REPOSITORY: typeof Users

    async findOneUsername(username: string){
      const user = await this.AUTH_REPOSITORY.findOne<Users>({ where: { username: username } })
      return user
    }
    async comparePassword(password: string, userPassword: string) {
      const matchPasswords = await bcrypt.compare(password, userPassword);
      return matchPasswords;
    }

    async findAllRole(username){
         const users = await this.AUTH_REPOSITORY.findAll<Users>({
               where: { username: username },
               include: [ Roles ]
            }) as any
            
            const role = users[0].dataValues.roleId[0].dataValues.roleName        
        return role
    }
}    