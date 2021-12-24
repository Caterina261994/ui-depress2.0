export default function(state = [], action) {
    switch (action.type) {
        case 'RESULT': {
            return action.payload.data;
        }
        default:
            return state;
    }
}