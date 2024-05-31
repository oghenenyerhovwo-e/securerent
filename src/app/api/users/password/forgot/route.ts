// modules
import { NextRequest, NextResponse } from "next/server";

// functions and objects
import { databaseConnection } from "@/config";
import { User } from "@/models";
import { sendEmail, generateToken } from "@/helpers";

databaseConnection()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const { email } = reqBody

        //check if user already exists
        const foundUser = await User.findOne({email})

        if(!foundUser){
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }

        const passwordResetToken:any = await generateToken(foundUser._id, "VERIFY_EMAIL", "1d")
        const btnLink = `${process.env.BASE_URL}/users/password/${passwordResetToken}`
        const emailBody = `<body style="font-family: Arial, sans-serif; background-color: #fef6fd; color: #20041b; margin: 0; padding: 0;">
            <div style="width: 100%; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; padding: 20px 0;">
                <h1 style="margin: 0; font-size: 24px; line-height: 30px;">Hi ${foundUser.fullName}</h1>
            </div>
            <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <h2 style="color: #20041b; font-size: 20px; line-height: 24px; margin-top: 0;">Reset Your Password</h2>
                <p>Hello,</p>
                <br />
                <p>We received a request to reset your password for your Secure Rent account. Click the button below to reset your password:</p>
                <br />
                <a href="${btnLink}" style="display: inline-block; padding: 10px 20px; margin-top: 20px; background-color: #e41bb2; color: #fef6fd; text-decoration: none; border-radius: 4px; font-weight: bold;">Reset Password</a>
                <br />
                <p>If you did not request a password reset, please ignore this email or contact support if you have questions.</p>
                <br />
                <p>Thank you,<br>The Secure Rent Team</p>
            </div>
            <div style="text-align: center; padding: 20px 0; font-size: 12px; color: #777;">
                <p>&copy; 2024 Secure Rent. All rights reserved.</p>
            </div>
            </div>
        </body>`

        const isMessageSent = await sendEmail(
            foundUser.email,
            "Secure rent: Password Reset",
            emailBody,
        )

        return NextResponse.json({
            message: "Password reset email sent successfully",
            success: true,
            userId: foundUser._id,
            isMessageSent,
        })
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}