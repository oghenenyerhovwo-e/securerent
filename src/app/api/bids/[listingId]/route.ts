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
  pageLimit,
} from "@/helpers"

import {
  databaseConnection,
} from '@/config'

databaseConnection()

export const GET = async (request: NextRequest, { params }: { params: {listingId: string }}) => {   
  try {
    const token = request.cookies.get(process.env.COOKIES_NAME!)?.value || '';

    const userId = await getDataFromToken(token, "LOG_IN");
    const foundUser = await User.findOne({_id: userId}).select("-password");
    const foundListing = await Listing.findOne({_id: params.listingId})
  
    if(!foundUser){
      return NextResponse.json({error: "No user found, Please login"}, {status: 400})
    }

    if(!foundListing){
      return NextResponse.json({error: "No listing found"}, {status: 400})
    }
    
    if(!foundUser.isVerified){
      return NextResponse.json({error: "Only verified users can see appointments"}, {status: 400})
    }

    const url  = new URL(request.url);
    const pageIndex:any = url.searchParams.get("pageIndex") || 1;
    const role:any = url.searchParams.get("role") || "";
    const status:any = url.searchParams.get("status") || "";

    const bidFindQuery = role === "admin" && foundUser.role ==="admin" ? {} :
                        role === "agent" && (foundUser.role ==="agent" || foundUser.role ==="admin" )? {agent: foundUser._id }:
                        {bidder: foundUser._id}
    const statusQuery = status ? { status }: {}
    const searchQuery = {...bidFindQuery, ...statusQuery}

    const foundBids = await Bid
      .find(searchQuery)
      .sort({
          _id: -1,
      })
      .skip((pageIndex - 1) * pageLimit)
      .limit(pageLimit)
      .populate({
        path: "listing",
        select: "-address",
      })
      .populate({
        path: "bidder",
        select: "-password",
      })
      .populate({
        path: "agent",
        select: "-password",
      })

      const totalBids = await Bid.countDocuments(searchQuery)
      const pageCount = Math.ceil(totalBids / pageLimit);

      const response = NextResponse.json({
          message: "Bids found successfully",
          bids: foundBids,
          pageCount: pageCount,
      })

      return response;
  } catch (error:any) {
      return NextResponse.json({error: error.message}, {status: 400});
  }
}


export const POST = async (request: NextRequest, { params }: { params: {listingId: string }}) => {     
    try {
        const data = await request.json();

        const token = request.cookies.get(process.env.COOKIES_NAME!)?.value || '';

        const userId = await getDataFromToken(token, "LOG_IN");
        const foundUser = await User.findOne({_id: userId}).select("-password");
        const foundListing = await Listing.findOne({_id: params.listingId})
      
        if(!foundUser){
          return NextResponse.json({error: "No user found, Please login"}, {status: 400})
        }

        if(!foundListing){
          return NextResponse.json({error: "No Listing found"}, {status: 400})
        }
        
        if(!foundUser.isVerified){
          return NextResponse.json({error: "Only verified users can edit listings"}, {status: 400})
        }

        const newBid = new Bid({
          bidder: foundUser._id,
          agent: foundListing.author,
          listing: foundListing._id,
          bidAmount: data.bidAmount,
          status: "pending"
        })
        
        const savedBid = await newBid.save()

        const response = NextResponse.json({
            message: "Bid has been submitted",
            bidId: savedBid._id,
        })

      return response
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }
}
