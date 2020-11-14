import {
	ADD_ORDER,
	OPEN_FORM,
	START_FORM,
	CHANGE_STATUS,
	DELETE_ORDER,
	RESET_FORM,
	UPDATE_ORDER,
	SET_ACTIVE_ORDER,
	DELETE_ACTIVE_ORDER,
	CHANGE_LOGS,
	OPEN_DEPOSIT_FORM,
	UPDATE_DEPOSIT,
	CHANGE_FILTER_ORDERS,
	RESET_FILTER_ORDERS,
	CHANGE_SORT_ORDERS
} from './actionsTypes';

export const addOrderAction = (order) => ({
	type: ADD_ORDER,
	payload: order
});

export const updateOrderAction = (order) => ({
	type: UPDATE_ORDER,
	payload: order
})

export const openFormAction = () => ({
	type: OPEN_FORM
});

export const activateOrderAction = (id) => ({
	type: SET_ACTIVE_ORDER,
	payload: id
});

export const deleteActiveOrderAction = () => ({
	type: DELETE_ACTIVE_ORDER
})
	
export const startFormAction = (data, config) => ({
	type: START_FORM,
	payload: {
		data,
		config
	}
});

export const changeStatusAction = (id, status) => ({
	type: CHANGE_STATUS,
	payload: {
		id, status
	}
});

export const deleteOrderAction = (id) => ({
	type: DELETE_ORDER,
	payload: id
});

export const resetFormAction = () => ({
	type: RESET_FORM
});

export const changeLogsAction = (log, id) => ({
	type: CHANGE_LOGS,
	payload: {
		log, id
	}
});

export const openDepositFormAction = () => ({
	type: OPEN_DEPOSIT_FORM,
});

export const updateDepositAction = (deposit) => ({
	type: UPDATE_DEPOSIT,
	payload: deposit
});

export const changeFilterAction = (filterName) => ({
	type: CHANGE_FILTER_ORDERS,
	payload: filterName
});

export const resetFilterAction = () => ({
	type: RESET_FILTER_ORDERS,
});

export const changeSortOrdersAction = (strategyName) => ({
	type: CHANGE_SORT_ORDERS,
	payload: strategyName
});