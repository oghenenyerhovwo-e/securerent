// modules
import { NextRequest, NextResponse } from "next/server";

// functions and objects
import { databaseConnection } from "@/config";
import { User } from "@/models";
import { getDataFromToken } from "@/helpers";

databaseConnection()

export async function GET(request:NextRequest){
    try {
        const token = request.cookies.get(process.env.COOKIES_NAME!)?.value || '';

        const userId = await getDataFromToken(token, "LOG_IN");
        const foundUser = await User.findOne({_id: userId}).select("-password");
        
        return NextResponse.json({
            message: "User found",
            user: foundUser
        })
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }

}