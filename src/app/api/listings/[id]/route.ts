// modules
import { NextRequest, NextResponse } from "next/server";

// functions and objects
import {
    Listing,
    User,
    Comment,
} from "@/models";
  
import {
  getDataFromToken,
} from "@/helpers"
  
import {
  databaseConnection,
} from '@/config'

databaseConnection()

export const GET = async (request: NextRequest, { params }: { params: { id: string }}) => {  
  try {
      request.json()
      const foundListing = await Listing
        .findOne({_id: params.id})
        .populate({
          path: "author",
          select: "-password",
        })
        .populate("comments")
        .select("-address")

        const response = NextResponse.json({
            message: "Listing found successfully",
            listing: foundListing,
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

        if(String(foundListing.author) !== String(foundUser._id)){
            return NextResponse.json({error: "You must be the author of this Listing to be able to edit it"}, {status: 400})
        }

        foundListing.title= data.title || foundListing.title;
        foundListing.type= data.type || foundListing.type;
        foundListing.description= data.description || foundListing.description;
        foundListing.price= data.price || foundListing.price;
        foundListing.isPriceNegotiable= data.isPriceNegotiable || foundListing.isPriceNegotiable;
        foundListing.country= data.country || foundListing.country;
        foundListing.state= data.state || foundListing.state;
        foundListing.lga= data.lga || foundListing.lga;
        foundListing.street= data.street || foundListing.street;
        foundListing.address= data.address || foundListing.address;
        foundListing.numberOfRooms= data.numberOfRooms || foundListing.numberOfRooms;
        foundListing.numberOfBathrooms= data.numberOfBathrooms || foundListing.numberOfBathrooms;
        foundListing.numberOfGarage= data.numberOfGarage || foundListing.numberOfGarage;
        foundListing.isBathroomInDoors= data.isBathroomInDoors;
        foundListing.isKitchenIndoors= data.isKitchenIndoors;
        foundListing.featuredImg= data.featuredImg || foundListing.featuredImg;
        foundListing.galleryImgs= data.galleryImgs || foundListing.galleryImgs;
        foundListing.video= data.video || foundListing.video;
        foundListing.virtualTour= data.virtualTour || foundListing.virtualTour;
        foundListing.amenities= data.amenities || foundListing.amenities;
        
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
        return NextResponse.json({error: "only verified users can delete listing"}, {status: 400})
      }

      if(foundUser.role !== "admin" && String(foundListing.author) !== String(foundUser._id)){
          return NextResponse.json({error: "You must be the admin or the author of this Listing to be able to delete it"}, {status: 400})
      }

        for (let i=0; i < foundListing.comments.length; i++){
          const comment = foundListing.comments[i]
          await Comment.findByIdAndDelete(comment)
        }

        await Listing.findByIdAndDelete(foundListing._id)
        
        const response = NextResponse.json({
            message: "Listing deleted successfully",
            listingId: params.id,
        })

      return response
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }
}
