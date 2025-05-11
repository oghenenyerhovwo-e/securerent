import {
    useAppDispatch,
    useAppSelector,
} from "./hooks"

import {
    store,
} from "./store"

import {
    useIdentifyUserQuery,
    useLoginMutation,
    useSignupMutation,
    useResendVerificationEmailMutation,
    useVerifyEmailMutation,
    useGoogleLoginMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    userApi,


    useCreateListingMutation,
    useGetAllListingsQuery,
    useGetListingByIdQuery,
    useUpdateListingMutation,
    useDeleteListingMutation,
} from "./apis"

import {
    setCurrentUser, 
    clearCurrentUser,
} from "./slices"

export {
    store,
    useAppDispatch,
    useAppSelector,

    useIdentifyUserQuery,
    useLoginMutation,
    useSignupMutation,
    useResendVerificationEmailMutation,
    useVerifyEmailMutation,
    useGoogleLoginMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    userApi,


    useCreateListingMutation,
    useGetAllListingsQuery,
    useGetListingByIdQuery,
    useUpdateListingMutation,
    useDeleteListingMutation,

    setCurrentUser, 
    clearCurrentUser,
}