// modules
import { NextRequest, NextResponse } from "next/server";

// functions and objects
import {
    Listing,
    User,
    Bid,
} from "@/models";
  
import {
  getDataFromToken,
} from "@/helpers"

import {
  databaseConnection,
} from '@/config'

databaseConnection()


export const PUT = async (request: NextRequest, { params }: { params: {listingId: string, id: string }}) => {     
    try {
        const data = await request.json();

        const token = request.cookies.get(process.env.COOKIES_NAME!)?.value || '';

        const userId = await getDataFromToken(token, "LOG_IN");
        const foundUser = await User.findOne({_id: userId}).select("-password");
        const foundListing = await Listing.findOne({_id: params.listingId})
        const foundBid = await Bid.findOne({_id: params.id})
      
        if(!foundUser){
          return NextResponse.json({error: "No user found, Please login"}, {status: 400})
        }

        if(!foundListing){
          return NextResponse.json({error: "No Listing found"}, {status: 400})
        }
        
        if(!foundUser.isVerified){
          return NextResponse.json({error: "Only verified users can edit listings"}, {status: 400})
        }

        if(String(foundUser._id) !== String(foundBid.agent) ){
          return NextResponse.json({error: "Only the agents of this bid can approve or reject"}, {status: 400})
        }

        foundBid.status= data.status || "pending"
        foundBid.feedBackFromAgent= data.feedBackFromAgent || foundBid.feedBackFromAgent

        const savedBid = await foundBid.save()

        const response = NextResponse.json({
            message: "Bid has been submitted",
            bidId: savedBid._id,
        })

      return response
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }
}
