// modules
import { NextRequest, NextResponse } from "next/server";

// functions and objects
import {
    Listing,
    User,
} from "@/models";
  
import {
    getDataFromToken,
    pageLimit,
} from "@/helpers"
  
import {
    databaseConnection,
} from '@/config';

databaseConnection()

export const GET = async (request: NextRequest) => {  
  try {
      const url  = new URL(request.url) 
      const pageIndex:any = url.searchParams.get("pageIndex") || 1

      const foundListings = await Listing
        .find({})
        .sort({
            _id: -1,
        })
        .skip((pageIndex - 1) * pageLimit)
        .limit(pageLimit)
        .populate({
          path: "author",
          select: "-password",
        })
        .select("-address")

        const totalListings = await Listing.countDocuments({})
        const pageCount = Math.ceil(totalListings / pageLimit);

        const response = NextResponse.json({
            message: "Listings found successfully",
            listings: foundListings,
            pageCount: pageCount,
        })

      return response;
  } catch (error:any) {
      return NextResponse.json({error: error.message}, {status: 400});
  }
}

export const POST = async (request: NextRequest) => {
    try {
        const data = await request.json();

        const token = request.cookies.get(process.env.COOKIES_NAME!)?.value || '';

        const userId = await getDataFromToken(token, "LOG_IN");
        const foundUser = await User.findOne({_id: userId}).select("-password");

        if(!foundUser){
          return NextResponse.json({error: "No user found, kindly login if your are not logged in"}, {status: 400})
        }

        if(foundUser.role !== "agent" && foundUser.role !== "admin"){
          return NextResponse.json({error: "Only verified agents or admins can create listings"}, {status: 400})
        }

        const newListing = new Listing({
            ...data,
            title: data.title || null,
            type: data.type || null,
            description: data.description || null,
            price: data.price || null,
            isPriceNegotiable: data.isPriceNegotiable || false,
            country: data.country || null,
            state: data.state || null,
            lga: data.lga || null,
            street: data.street || null,
            address: data.address || null,
            numberOfRooms: data.numberOfRooms || null,
            numberOfBathrooms: data.numberOfBathrooms || null,
            numberOfGarage: data.numberOfGarage || null,
            isBathroomInDoors: data.isBathroomInDoors,
            isKitchenIndoors: data.isKitchenIndoors,
            featuredImg: data.featuredImg || null,
            galleryImgs: data.galleryImgs || null,
            video: data.video || null,
            virtualTour: data.virtualTour || null,
            amenities: data.amenities || null,
            author: userId,
        })

        const savedListing = await newListing.save()
        const response = NextResponse.json({
            message: "Listing created successfully",
            listingId: savedListing._id,
        })

      return response
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }
}
