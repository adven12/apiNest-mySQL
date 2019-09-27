import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from "bcrypt"
import { users, roles } from '../users/users.entity';
import { JwtService } from '@nestjs/jwt';
import { HttpException } from "@nestjs/common"
import { ConfigService } from '../config/config.service';
import * as jwtr from "jwt-then"

@Injectable()
export class AuthService {

  private test: any;

  public jwtService: JwtService;

  @Inject('AUTH_REPOSITORY') private readonly AUTH_REPOSITORY: typeof users

  constructor(config: ConfigService) {

    this.test = config.get('APP');
  }

  async validateUser(username: string, password: string): Promise<any> {

    const user: any = await this.AUTH_REPOSITORY.findOne<users>({ where: { username: username } })
    if (!user) {
      throw new HttpException('User not found', 404);
    }

    const matchPasswords = await bcrypt.compare(password, user.dataValues.password);
    if (user && matchPasswords) {
      return user.dataValues;
    } else throw new HttpException('Email or password incorrect', 401);;

  }

  async login(req: any, res:any) {

  // const user = await  this.AUTH_REPOSITORY.findOne<users>({  where: { username: req.email } }); 
   
    let permissions: any[] = [];

    await this.AUTH_REPOSITORY.findAll<users>({
      where: { username: req.username },
      include: [{
        model: roles,
      }]
    }).then((rolen: any) => rolen.forEach(el => {
      el.roleId.forEach(element => {
        permissions.push(element.dataValues.roleName);
      });
    }))
   

    const payload = {
      username: req.username,
      firstName: req.firstName,
      permissions: permissions,
      id: req._id,
      password: req.password
    };
    
   const access_token = await jwtr.sign(payload, "secret")
   return  res.status(200).send({
      success: true,
      message: "User Successfully created",
      token: access_token
    });
  }

}