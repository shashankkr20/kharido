import { acttype } from "../action-type"

export const adduser=(curruser)=>{
    return{
        type:acttype.ADD_CURRUSER,
        payload:curruser
    }
}
export const addprod=(prod)=>{
    return{
        type:acttype.ADD_PROD,
        payload:prod
    }
}
export const resetData = () => {
    return{
        type:acttype.RESET_DATA
        
    }
}
export const otpShow=(show)=>{
    return{
        type:acttype.OTP_SHOW,
        payload:show
    }
}