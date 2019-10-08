import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HttpException } from "@nestjs/common"
import * as jwtr from "jwt-then"
import { AuthRepository } from '../repositories'
import { jwtConstants } from '../secrets/jwtSecretKey'

@Injectable()
export class AuthService {

  public jwtService: JwtService;

  constructor(public AuthRepository: AuthRepository) { }

  async validateUser(username: string, password: string): Promise<any> {

    const errorObj = {
      logErrorUsername: '',
      logErrorPassword: ''
    }
    
    let stateValid = 0;
    const passWordExpr = new RegExp(/^[0-9]{3,}$/);
    const emailRegExpr = new RegExp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);

    if (!emailRegExpr.test(username)) {
      errorObj.logErrorUsername = 'Error: uncorrectUsername value!';
    } else { ++stateValid }
    if (!passWordExpr.test(password)) {
      errorObj.logErrorPassword = 'Error: invalid symbol format';
    } else { ++stateValid }

    if (stateValid !== 2) {
      throw new HttpException(errorObj, 404);
    }

    const user: any = await this.AuthRepository.findOneUsername(username)
    if (!user) {
      return null
    }

    const matchPasswords = await this.AuthRepository.comparePassword(password, user.dataValues.password)
    if (user && matchPasswords) {
      return user.dataValues;
    } else return null
  }

  public async login(user) {  
    let permissions: any = []; 
    permissions = await this.AuthRepository.findAllRole(user.username)
    let isAdmin: boolean = false;

    if(permissions === 'admin') {
      isAdmin = true
    }

    const payload = {
      username: user.username,
      firstName: user.firstName,
      id: user._id,
      password: user.password,
      isAdmin: isAdmin
    };    
    console.log(payload);
    
    const accessToken = await jwtr.sign(payload, jwtConstants.secret)
    return {
      success: true,
      token: accessToken
    }
  }

}