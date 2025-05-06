// modules
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

// functions and objects
import {
    User,
} from "@/models";
  
import {
    getDataFromToken,
    isPasswordSafe,
} from "@/helpers"
  
import {
    databaseConnection,
} from '@/config';

databaseConnection()

export const PUT = async (request: NextRequest) => {    
    try {
        const data = await request.json();
    
        const { token, password } = data

        const userId = await getDataFromToken(token, "RESET_PASSWORD");
        const foundProfile = await User.findOne({_id: userId})

        if(!foundProfile){
          return NextResponse.json({error: "No user found, Please login"}, {status: 400})
        }

        // check if password is safe
        if(!isPasswordSafe(password)){
            return NextResponse.json({error: "password must be at least 8 characters long and contain at least one capital letter, a special symbol and a number"}, {status: 400})
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        foundProfile.password = hashedPassword

        const updatedProfile = await foundProfile.save()
        const response = NextResponse.json({
            message: "Password reset successfully",
            userId: updatedProfile._id,
            email: updatedProfile.email,
        })

      return response
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }
}

