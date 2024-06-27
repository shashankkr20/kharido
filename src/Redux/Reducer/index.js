import { combineReducers } from 'redux'
import {currreducer, otpreducer, prodreducer} from './reducer'
const rootreducer=combineReducers({
    curuser:currreducer,
    curprod:prodreducer,
    otpshower:otpreducer
});
export default rootreducer;