import { combineReducers } from 'redux';
import SendImagesReducer from './send-images-reducer';
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
    form: formReducer,
    sendImages: SendImagesReducer
});

export default rootReducer;