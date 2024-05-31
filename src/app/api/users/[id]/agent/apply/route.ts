// modules
import { NextRequest, NextResponse } from "next/server";

// functions and objects
import {
    User,
  } from "@/models";
  
  import {
    getDataFromToken,
    sendEmail,
  } from "@/helpers"
  
  import {
    databaseConnection,
  } from '@/config';

databaseConnection()


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
        
        if(!foundProfile){
            return NextResponse.json({error: "No profile found"}, {status: 400})
        } 

        if(!foundUser.isVerified){
            return NextResponse.json({error: "Only verified users allowed"}, {status: 400})
        }

        if(String(foundProfile._id) !== String(foundUser._id)){
            return NextResponse.json({error: "You must be the owner of this profile to be able to edit it"}, {status: 400})
        }

        foundProfile.agentApplicationIdCard = data.agentApplicationIdCard || foundProfile.agentApplicationIdCard
        foundProfile.agentApplicationVideo = data.agentApplicationVideo || foundProfile.agentApplicationVideo
        foundProfile.agentApplicationStatus = "pending"

        const updateUser = await foundProfile.save()

        const btnLink = `${process.env.BASE_URL}/users/agent/${foundProfile._id}`
        const emailBody = `<div style="font-family: Arial, sans-serif; background-color: #fef6fd; color: #20041b; margin: 0; padding: 0;">
          <div style="width: 100%; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; padding: 20px 0;">
              <h1 style="margin: 0; font-size: 24px;  line-height: 30px;">Secure Rent</h1>
            </div>
            <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
              <h2 style="color: #20041b; font-size: 20px;  line-height: 24px; margin-top: 0;">New Agent Request</h2>
              <p>Hello Admin,</p>
              <br />
              <p>A new user has requested to become an agent. Here are the details:</p>
              <br />
              <p><strong>Full Name:</strong> ${foundProfile.fullName}</p>
              <br />
              <p><strong>Email:</strong> ${foundProfile.email}</p>
              <br />
              <a href="${btnLink}" style="display: inline-block; padding: 10px 20px; margin-top: 20px; background-color: #e41bb2; color: #fef6fd; text-decoration: none; border-radius: 4px; font-weight: bold;">Review Request</a>
              <br />
              <p>Thank you,<br>The Secure Rent Team</p>
            </div>
            <div style="text-align: center; padding: 20px 0; font-size: 12px; color: #777;">
              <p>&copy; 2024 Secure Rent. All rights reserved.</p>
            </div>
          </div>
        </div>`

        const isMessageSent = await sendEmail(
            process.env.APP_EMAIL!,
            "Secure rent: Request to be an agent",
            emailBody,
        )

        const response = NextResponse.json({
            message: "Application sent successfully,, kindly wait for feedback",
            userId: updateUser._id,
            isMessageSent,
        })

      return response
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }
}

