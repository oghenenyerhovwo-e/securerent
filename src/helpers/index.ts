import {
    generateToken,
    getDataFromToken,
    isPasswordSafe,
} from "./auth"

import {
    getTimeAgo,
    toFirstLetterUpperCase,
    trimContent,
} from "./javascriptFunctions"

import {
    pageLimit,
} from "./constants"

import {
    sendEmail,
} from "./email"

export type { IUser } from "./types";


export {
    getTimeAgo,
    toFirstLetterUpperCase,
    pageLimit,
    generateToken,
    getDataFromToken,
    isPasswordSafe,
    trimContent,
    sendEmail,
}