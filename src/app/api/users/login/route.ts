import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

// functions and objects
import { databaseConnection } from "@/config";
import { User } from "@/models";
import { generateToken } from "@/helpers";

databaseConnection()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {email, password} = reqBody;

        //check if user exists
        const foundUser = await User.findOne({email})
        if(!foundUser){
            return NextResponse.json({error: "This email has not been registered"}, {status: 400})
        }

        if(!foundUser.isVerified){
            return NextResponse.json({error: "Only verified users can login"}, {status: 400})
        }
        
        //check if password is correct
        const validPassword = await bcryptjs.compare(password, foundUser.password)
        if(!validPassword){
            return NextResponse.json({error: "Incorrect password"}, {status: 400})
        }
        
        //create token
        const verifyToken:any = await generateToken(foundUser._id, "LOG_IN", "1d")

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
            user: foundUser,
        })
        response.cookies.set(process.env.COOKIES_NAME!, verifyToken, {
            httpOnly: true,
        })
        return response;

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}