import jwt from 'jsonwebtoken';

export const generateToken= async (
    _id: string, 
    type: string, 
    duration: string,
  ) => {
  try {
    const token=  jwt.sign(
      {
        _id,
        type,
      },
      process.env?.JWT_SECRET!, 
      {
        expiresIn: duration || "1d"
      }
    )
    return token
  } catch (error: any) {
    console.log(error)
  }
}

export const getDataFromToken = (token: any, type: string) => {
  try {
      const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET!);
      if(type === decodedToken.type){
        return decodedToken._id
      }
      throw new Error("Invalid Token");
  } catch (error: any) {
      throw new Error(error.message);
  }
}

export const isPasswordSafe = (password: string) => {
  // Check if the password is 8 characters long
  if (password.length < 8) {
      return false;
  }

  // Check if the password contains at least one uppercase letter, one lowercase letter, one symbol, and one number
  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  const symbolRegex = /[^A-Za-z0-9]/; // Match any character that is not alphanumeric
  const numberRegex = /\d/; // Match any digit

  if (!uppercaseRegex.test(password) || !lowercaseRegex.test(password) || !symbolRegex.test(password) || !numberRegex.test(password)) {
      return false;
  }

  // If all criteria are met, return true
  return true;
}
