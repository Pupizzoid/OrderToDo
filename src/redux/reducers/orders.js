import {
	ADD_ORDER,
	CHANGE_STATUS,
	UPDATE_ORDER,
	SET_ACTIVE_ORDER,
	DELETE_ACTIVE_ORDER,
} from '../actionsTypes';

import {
	orderData,
	activeOrder
} from '../../handleData';

import {
	DATA
} from '../../data';

const localState = orderData.get('dataOrder');
	const initialState = {
		dataOrder: localState ? localState : [],
		activeOrder: activeOrder.get() ? activeOrder.get() : activeOrder.delete() 
}

const orders = (state = initialState, { type, payload }) => {
	switch (type) {
		case ADD_ORDER:
			orderData.set(payload);
			return ({
				...state,
				dataOrder: [
					...state.dataOrder, payload
				]
			});
		case UPDATE_ORDER:
				return ({
					...state,
					dataOrder: [
						...state.dataOrder.map(order => {
							if (order.id === payload.id) {
								orderData.update(payload);
								return payload;
							}
							return order;
						})
					]
				})
		case SET_ACTIVE_ORDER:
			const order = state.dataOrder.find(order => order.id === payload)
			activeOrder.set(order);
			return ({
				...state,
				activeOrder: order
			});
		case DELETE_ACTIVE_ORDER:
			return ({
				...state,
				activeOrder: activeOrder.delete()
			})
		case CHANGE_STATUS: 
			return ({
				...state,
				dataOrder: [
				...state.dataOrder.map(order => {
					if (order.id === payload.id ) {
						order.status = payload.status;
						orderData.update(order)
					}
					return order;
				})
				]
			});
		default:
			return state;
	}
}

export default orders;