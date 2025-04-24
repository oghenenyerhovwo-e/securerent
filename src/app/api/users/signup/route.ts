// modules
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

// functions and objects
import { databaseConnection } from "@/config";
import { User } from "@/models";
import { sendEmail, generateToken, isPasswordSafe } from "@/helpers";

databaseConnection()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {
            fullName, 
            email, 
            password,
        } = reqBody

        //check if user already exists
        const foundUser = await User.findOne({email})

        if(foundUser){
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }

        // check if password is safe
        if(!isPasswordSafe(password)){
            return NextResponse.json({error: "password must be at least 8 characters long and contain at least one capital letter, a special symbol and a number"}, {status: 400})
        }

        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()

        //send verification email


        const verifyToken: any = await generateToken(savedUser._id, "VERIFY_EMAIL", "1d")
        const btnLink = `${process.env.BASE_URL}/users/verify/${verifyToken}`
        const emailBody = `<div style="font-family: Arial, sans-serif; background-color: #fef6fd; color: #20041b; margin: 0; padding: 0;">
            <div style="width: 100%; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; padding: 20px 0;">
                <h1 style="margin: 0; font-size: 24px; line-height: 30px;">Hi ${savedUser.fullName}, Welcome to Secure Rent</h1>
            </div>
            <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <h2 style="color: #20041b; font-size: 20px; line-height: 24px; margin-top: 0;">Verify Your Email Address</h2>
                <p>Hello,</p>
                <br />
                <p>Thank you for signing up for Secure Rent. To complete your registration, please verify your email address by clicking the button below.</p>
                <br />
                <a href="${btnLink}" style="display: inline-block; padding: 10px 20px; margin-top: 20px; background-color: #e41bb2; color: #fef6fd; text-decoration: none; border-radius: 4px; font-weight: bold;">Verify Email</a>
                <br />
                <p>If you did not sign up for this account, please ignore this email.</p>
                <br />
                <p>Thank you,<br>The Secure Rent Team</p>
            </div>
            <div style="text-align: center; padding: 20px 0; font-size: 12px; color: #777;">
                <p>&copy; 2024 Secure Rent. All rights reserved.</p>
            </div>
            </div>
        </div>`
        
        const isMessageSent = await sendEmail(
            savedUser.email,
            "Secure rent: Verify email",
            emailBody,
        )

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            fullName: savedUser.fullName,
            isMessageSent,
        })
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}