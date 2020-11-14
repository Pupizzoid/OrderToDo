import {
	START_FORM,
	RESET_FORM
} from '../actionsTypes';

import { FORM_DATA, FORM_CONFIG } from '../../data';
const initialState = {
	formData: FORM_DATA,
	formConfig: FORM_CONFIG,
};

const form = (state = initialState, { type, payload }) => {
	switch (type) {
		case START_FORM:
			return {
				...state,
				formData: payload.data ? payload.data : FORM_DATA,
				formConfig: Object.assign({}, state.formConfig, payload.config)
			}
		case RESET_FORM:
			return state = initialState;
		default:
			return state;
	}
}

export default form;