export interface IUser {
    _id: string;
    fullName: string;
    email: string;
    profilePic: string;
    isVerified: boolean;
    role: 'regular' | 'agent' | 'admin';
    savedListings: string[];
    createdAt: string,
    updatedAt: string,
  }