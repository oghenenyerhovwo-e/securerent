export const listingRequiredFields = [
    { name: 'title', label: 'Title', type: 'string' },
    { name: 'type', label: 'Type', type: 'string' },
    { name: 'description', label: 'Description', type: 'string' },
    { name: 'price', label: 'Price', type: 'number' },
    { name: 'country', label: 'Country', type: 'string' },
    { name: 'state', label: 'State', type: 'string' },
    { name: 'lga', label: 'LGA', type: 'string' },
    { name: 'street', label: 'Street', type: 'string' },
    { name: 'address', label: 'Address', type: 'string' },
    { name: 'numberOfRooms', label: 'Number of Rooms', type: 'number', minValue: 0, maxValue: 10, },
    { name: 'numberOfBathrooms', label: 'Number of Bathrooms', type: 'number', minValue: 0, maxValue: 10, },
    { name: 'featuredImg', label: 'Featured Image', type: 'string' },
  ];

export const signUpRequiredFields = [
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'password', label: 'Password', type: 'password' },
    { name: 'fullName', label: 'Full name', type: 'string' },
    { name: 'confirmPassword', label: 'Confirm Password', type: 'confirmPassword' },
  ];

export const loginRequiredFields = [
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'password', label: 'Password', type: 'password' },
];

export const forgotPasswordRequiredFields = [
    { name: 'email', label: 'Email', type: 'email' },
];

export const resetPasswordRequiredFields = [
    { name: 'password', label: 'Password', type: 'password' },
    { name: 'confirmPassword', label: 'Confirm Password', type: 'confirmPassword' },
  ];
  