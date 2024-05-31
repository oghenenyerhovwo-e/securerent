// modules
import { NextRequest, NextResponse } from "next/server";

// functions and objects
import {
    Listing,
    User,
} from "@/models";
  
import {
  getDataFromToken,
} from "@/helpers"
  
import {
  databaseConnection,
} from '@/config'

databaseConnection()

export const PUT = async (request: NextRequest, { params }: { params: {id: string }}) => {     
    try {
        const token = request.cookies.get(process.env.COOKIES_NAME!)?.value || '';

        const userId = await getDataFromToken(token, "LOG_IN");
        const foundUser = await User.findOne({_id: userId}).select("-password");
        const foundListing = await Listing.findOne({id: params.id})
      
        if(!foundUser){
          return NextResponse.json({error: "No user found, Please login"}, {status: 400})
        }

        if(!foundListing){
          return NextResponse.json({error: "No Listing found"}, {status: 400})
        }
        
        if(!foundUser.isVerified){
          return NextResponse.json({error: "Only verified users can edit listings"}, {status: 400})
        }

        if(foundListing.interestedUsers.includes(foundUser.Id)){
            return NextResponse.json({error: "user already indicated interest"}, {status: 400})
        }
        foundListing.interestedUsers= [...foundListing.interestedUsers, foundUser.Id]
        
        const updatedListing = await foundListing.save()

        const response = NextResponse.json({
            message: "Listing updated successfully",
            listingId: updatedListing._id,
        })

      return response
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }
}

export const DELETE = async (request: NextRequest, { params }: { params: {id: string }}) => {     
    try {
        const token = request.cookies.get(process.env.COOKIES_NAME!)?.value || '';

        const userId = await getDataFromToken(token, "LOG_IN");
        const foundUser = await User.findOne({_id: userId}).select("-password");
        const foundListing = await Listing.findOne({id: params.id})
      
        if(!foundUser){
          return NextResponse.json({error: "No user found, Please login"}, {status: 400})
        }

        if(!foundListing){
          return NextResponse.json({error: "No Listing found"}, {status: 400})
        }
        
        if(!foundUser.isVerified){
          return NextResponse.json({error: "Only verified users can edit listings"}, {status: 400})
        }

        if(!foundListing.interestedUsers.includes(foundUser.Id)){
            return NextResponse.json({error: "user has not indicated interest"}, {status: 400})
        }
        foundListing.interestedUsers= foundListing.interestedUsers.filter(({_id}: {_id: string}) => _id !== foundUser._id)
        
        const updatedListing = await foundListing.save()

        const response = NextResponse.json({
            message: "Listing updated successfully",
            listingId: updatedListing._id,
        })

      return response
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }
}
