// modules
import { NextRequest, NextResponse } from "next/server";

// functions and objects
import { databaseConnection } from "@/config";
import { User } from "@/models";
import { getDataFromToken } from "@/helpers";

databaseConnection()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {token} = reqBody

        const userId = await getDataFromToken(token, "VERIFY_EMAIL");
        const foundUser = await User.findOne({_id: userId}).select("-password");

        if (!foundUser) {
            return NextResponse.json({error: "Invalid token"}, {status: 400})
        }

        foundUser.isVerified = true;
        
        const savedUser = await foundUser.save();
        
        return NextResponse.json({
            message: "Email verified successfully",
            success: true,
            userId: savedUser._id,
            fullName: savedUser.fullName,
        })


    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }

}