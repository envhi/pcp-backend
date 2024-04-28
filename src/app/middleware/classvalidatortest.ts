// import { validate } from "class-validator";
// import { NextFunction, Request, Response } from "express";
// import { CreateUserDto } from "../dto/create-user.dto";
// // import HttpException from "../exception/HttpException";

// export const validateDto = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     // const isDtoValid = await validate(req.body)
//     // console.log(req.body)


//     const xereka = await validate(req.body, CreateUserDto).then(errors => {
//       if(errors.length > 0) {
//         console.log('validation failed. errors: ', errors)
//       } else {
//         console.log('validation succeed')
//       }
//     })

//     // console.log(xereka)
//     // if(isDtoValid) {
//     //   console.log('isvalid xd')
//     //   console.log(body)
//     //   return
//     // } else {
//     //   console.log('caiu no else xd')
//     //   return
//     // }

//   } catch (error) {
//     console.log(error)
//   }
// }
