import { acttype } from "../action-type"

const curruser={
    cart
: 
[],
email
: 
"",
name
: 
"",
password
: 
"",
phoneno
: 
"",
wishlist
: 
[],
__v
: 
0,
_id
: 
""
}
const otpdet={state:false,otp:''};
const curprod=[{
    actprice
: 
"",
brname
: 
"",
cart
: 
[],
category
: 
"",
disprice
: 
"",
image
: 
"",
quantity
: 
"",
rating_no
: 
"",
rating_star
: 
"",
title
: 
"",
__v
: 
0,
_id
: 
""
}]
export const currreducer=(state=curruser,action)=>
{
    switch(action.type)
    {
        case acttype.ADD_CURRUSER:
            return action.payload
        case acttype.RESET_DATA:
        return curruser
            default:
                return state
    }
}
export const prodreducer=(state=curprod,action)=>
{
    switch(action.type)
    {
        case acttype.ADD_PROD:
            return action.payload
        case acttype.RESET_DATA:
        return curprod
            default:
                return state
    }
}
export const otpreducer=(state=otpdet,action)=>
{
    switch(action.type)
    {
        case acttype.OTP_SHOW:
            return action.payload
        case acttype.RESET_DATA:
            return otpdet
        default:
            return state
    }
}