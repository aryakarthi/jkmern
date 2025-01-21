// import { z } from "zod";

// const validator = (schema) => (payload) => {
//   const { success, data, error } = schema.safeParse(payload);
//   return success
//     ? { success: true, data }
//     : {
//         success: false,
//         original: error.issues,
//         errors: error.issues.map(({ message, path, code }) => ({
//           message: message,
//           path: path,
//           code: code,
//           details: {
//             key: path[0],
//             value: payload[path[0]],
//           },
//         })),
//       };
// };

// // Email schema
// const emailSchema = z
//   .string()
//   .email({ message: "Invalid email format.!" })
//   .nonempty({ message: "Email is required.!" });

// // Password schema
// const passwordSchema = z
//   .string()
//   .regex(
//     /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
//     { message: "Invalid password format.!" }
//   )
//   .nonempty({ message: "Password is required.!" });

// // Register user schema
// const registerUserSchema = z.object({
//   fname: z
//     .string()
//     .min(3, { message: "First name must be at least 3 characters long.!" })
//     .nonempty({ message: "First name is required.!" }),
//   lname: z.string().nonempty({ message: "Last name is required.!" }),
//   email: emailSchema,
//   password: passwordSchema,
// });

// // Login user schema
// const loginUserSchema = z.object({
//   email: emailSchema,
//   password: passwordSchema,
// });

// export const validateRegister = validator(registerUserSchema);
// export const validateLogin = validator(loginUserSchema);
