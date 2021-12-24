import axios from 'axios';
import FormData from 'form-data'

import {depressAnalyzeApi} from "../constants/api";

export function postImages(images) {
    let formData = new FormData();
    const data = Object.values(images);
    data.map(image => {
        formData.append('file', image);
    });

    return (dispatch) => {
        axios.post(`http://localhost:8080/uploadImage`, formData, {
            headers: {
                'content-type': 'image/jpeg'
            }
        }).then((result) => {
            dispatch({
                type: 'RESULT',
                payload: {
                    data: result.data
                }
            })
        })
    }
}