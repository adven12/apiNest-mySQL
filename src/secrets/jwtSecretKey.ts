// export const jwtConstants = {
//     secret: 'secret',
//   };
import config from "../environment/config";


export const jwtConstants = {
    secret: config.Production.JWT_ENCRYPTION
  };