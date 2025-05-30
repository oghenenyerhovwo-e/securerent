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

        const passwordResetToken:any = await generateToken(foundUser._id, "RESET_PASSWORD", "1d")
        const btnLink = `${process.env.BASE_URL}/users/password/reset/${passwordResetToken}`
        const emailBody = `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: hsl(160, 60%, 98%); margin: 0; padding: 0;">
                <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: auto; padding: 20px;">
                    <tr>
                    <td align="center" style="padding: 40px 20px; background: linear-gradient(135deg, hsl(153, 57%, 51%) 0%, hsl(192, 56%, 74%) 50%, hsl(205, 57%, 61%) 100%); border-radius: 12px 12px 0 0;">
                        <h1 style="color: #ffffff; font-size: 28px; margin: 0;">Reset Your Password</h1>
                        <p style="color: #ffffff; font-size: 16px; margin-top: 10px;">Hi ${foundUser.fullName}, we’ve received a request to reset your password.</p>
                    </td>
                    </tr>
                    <tr>
                    <td style="background-color: #ffffff; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);">
                        <h2 style="color: hsl(215, 21%, 11%); font-size: 22px; margin-top: 0;">Password Reset Request</h2>
                        <p style="color: hsl(0, 0%, 40%); font-size: 16px; line-height: 1.6;">
                        To reset your password for <strong>Secure Rent</strong>, please click the button below. This link will expire in 1 hour for your security.
                        </p>
                        <div style="text-align: center; margin: 30px 0;">
                        <a href="${btnLink}" style="background-color: hsl(153, 57%, 51%); color: #fff; padding: 12px 30px; font-size: 16px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block;">Reset Password</a>
                        </div>
                        <p style="color: hsl(0, 0%, 40%); font-size: 14px; line-height: 1.6;">
                        If you did not request this password reset, you can ignore this email. Your password will remain unchanged.
                        </p>
                        <p style="color: hsl(0, 0%, 40%); font-size: 14px;">
                        Stay secure,<br /><strong>The Secure Rent Team</strong>
                        </p>
                    </td>
                    </tr>
                    <tr>
                    <td align="center" style="padding: 20px; font-size: 12px; color: hsl(0, 0%, 60%);">
                        &copy; 2024 Secure Rent. All rights reserved.
                    </td>
                    </tr>
                </table>
                </div>
                `

        const isMessageSent = await sendEmail(
            foundUser.email,
            "Secure rent: Password Reset",
            emailBody,
        )

        return NextResponse.json({
            message: "Password reset email sent successfully",
            success: true,
            email: foundUser.email,
            isMessageSent,
        })
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}