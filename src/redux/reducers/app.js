import {
	OPEN_FORM,
	OPEN_DEPOSIT_FORM,
	UPDATE_DEPOSIT,
	CHANGE_FILTER_ORDERS,
	RESET_FILTER_ORDERS,
	CHANGE_SORT_ORDERS
} from '../actionsTypes';

import {depositValue} from '../../handleData';

let initialState = {
	isOpenForm: false,
	isFormDepositOpen: false,
	depositValue: depositValue.get() ? depositValue.get() : null,
	filter: {
		all: true,
		running: false,
		finished: false,
		wins: false,
		loses: false,
	},
	sort: 'TITLE'
};

const app = (state = initialState, { type, payload }) => {
	switch (type) {
		case OPEN_FORM:
			return ({
				...state,
				isOpenForm: !state.isOpenForm,
			});
		case OPEN_DEPOSIT_FORM:
			return ({
				...state,
				isFormDepositOpen: !state.isFormDepositOpen,
			});
		case UPDATE_DEPOSIT:
			depositValue.set(payload);
			return ({
				...state,
				depositValue: payload
			});
		case CHANGE_FILTER_ORDERS:
			const filter = Object.assign({}, state.filter, { [payload]: !state.filter[payload], all: false });
			let isAnyFilter = false;
			for (const key in filter) {
				if (!filter.hasOwnProperty(key)) { return; }
				if (filter[key]) {
					isAnyFilter = true;
					break;
				}
			}
			if (!isAnyFilter) { filter.all = true; }
			return ({
				...state,
				filter
			});
		case RESET_FILTER_ORDERS:
			return ({
				...state,
				filter: initialState.filter
			});
		case CHANGE_SORT_ORDERS: 
			return ({
				...state,
				sort: payload
			})
		default:
			return state;
	}
}

export default app;