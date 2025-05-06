// modules
import { NextRequest, NextResponse } from "next/server";

// functions and objects
import {
    User,
  } from "@/models";
  
  import {
    getDataFromToken,
  } from "@/helpers"
  
  import {
    databaseConnection,
  } from '@/config';

databaseConnection()

export const GET = async (request: NextRequest, { params }: { params: {id: string }}) => {  
  try {
        request.json()
        const foundProfile = await User.findOne({_id: params.id}).select("-password");
        
        if(!foundProfile){
          return NextResponse.json({error: "No profile found"}, {status: 400})
        }

        const response = NextResponse.json({
            message: "Profile found successfully",
            user: foundProfile,
        })

      return response;
  } catch (error: any) {
      return NextResponse.json({error: error.message}, {status: 400});
  }
}

export const PUT = async (request: NextRequest, { params }: { params: {id: string }}) => {    
    try {
        const data = await request.json();
    
        const token = request.cookies.get(process.env.COOKIES_NAME!)?.value || '';

        const userId = await getDataFromToken(token, "LOG_IN");
        const foundUser = await User.findOne({_id: userId}).select("-password");
        const foundProfile = await User.findOne({_id: params.id});

        if(!foundUser){
          return NextResponse.json({error: "No user found, Please login"}, {status: 400})
        }     

        if(!foundUser.isActive){
            return NextResponse.json({error: "user has been blocked, contact admin"}, {status: 400})
          }

        if(String(foundProfile._id) !== String(foundUser._id)){
            return NextResponse.json({error: "You must be the owner of this profile to be able to edit it"}, {status: 400})
        }

        foundProfile.fullName = data.fullName || foundProfile.fullName
        foundProfile.profilePic = data.profilePic || foundProfile.profilePic

        const updateUser = await foundProfile.save()
        const response = NextResponse.json({
            message: "User updated successfully",
            userId: updateUser._id,
        })

      return response
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }
}

