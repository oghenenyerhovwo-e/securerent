// importing modules
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import axios from "axios"
import  { OAuth2Client } from 'google-auth-library';

// importing functions and objects
import {
  User,
} from "@/models";
import {
  databaseConnection,
} from '@/config';
import {
    generateToken,
} from '@/helpers';


databaseConnection()

const client = new OAuth2Client(process.env.GOOGLE_ID!)

export async function POST(request: NextRequest){
    try {

        const reqBody = await request.json()
        const { credential } = reqBody;
        let googleUserData : any;

        let decodedDetails: any = {}
        if(credential.type === "credential"){
            const ticket = await client.verifyIdToken({
                idToken: credential.token,
                audience: process.env.GOOGLE_ID!
            })
            decodedDetails = ticket.getPayload()
        } else if (credential.type === "access_token"){
            const googleResponse = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${credential.token}`)
            if(!googleResponse.data){
                return NextResponse.json({error: "Unable to sign in google"}, {status: 500})
            } 
            decodedDetails = googleResponse.data                    
        }

        let googleSignInToken:any = null;
        const foundUser = await User.findOne({email: decodedDetails.email})
        if(foundUser){
            googleUserData=foundUser
            googleSignInToken = await generateToken(foundUser._id, "SIGN_IN", "1d")
        } else {
            const salt = await bcryptjs.genSalt(10)
            const hashedPassword = await bcryptjs.hash(`${credential.token} ${process.env.GOOGLE_PASSWORD!}`, salt)
            const newUser = new User({
                fullName: `${decodedDetails.given_name} ${decodedDetails.family_name}`,
                email: decodedDetails.email,
                password: hashedPassword,
                isVerified: true,
            })
    
            const savedUser = await newUser.save()
            googleUserData=savedUser
            googleSignInToken = await generateToken(savedUser._id, "LOG_IN", "1d")
        }
        
        const response = NextResponse.json({
            message: "Google Login successful",
            success: true,
            user: googleUserData,
        })
        response.cookies.set(process.env.COOKIES_NAME!, googleSignInToken, {
            httpOnly: true, 
        })

        return response;

    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}