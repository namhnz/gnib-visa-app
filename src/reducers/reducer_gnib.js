import _ from 'lodash';
import { GNIB_APPOINTMENT_DATES, GNIB_API_ERROR } from '../actions/gnib';
const url = require('url');
const querystring = require('querystring');

function payloadTransformer(payload) {
    let response = {};
    _.map(payload, (payload) => {        
        const { config, data } = payload;
        const { cat, typ } = querystring.parse(url.parse(config.url).query);
        response = _.merge(response, { [cat]: { [typ]: data} });
    });
    return response;
}

export default function(state={}, action) {
    switch(action.type) {
        case GNIB_APPOINTMENT_DATES:
            return payloadTransformer(action.payload);
        case GNIB_API_ERROR:
            return action;
        default:
            return state;
    }
}