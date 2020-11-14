const getOrdersData = () => {
	return JSON.parse(localStorage.getItem('dataOrder'));
}

const setNewOrder = (order) => {
	let data = getOrdersData();
	if (data) {
		data.push(order)
	} else {
		data = [order];
	}

	localStorage.setItem('dataOrder', JSON.stringify(data))
}

const updateOrderData = (order) => {
	let data = getOrdersData();
	console.log(data);
	const index = data.findIndex(item => item.id === order.id);
	if (index === -1) {
		return;
	}
	data[index] = order;
	console.log(data);
	localStorage.setItem('dataOrder', JSON.stringify(data))
}

const getActiveOrder = () => {
	try {
		return JSON.parse(localStorage.getItem('activeOrder'));
	} catch {
		return null;
	}
}

const setActiveOrder = (order) => {
	localStorage.setItem('activeOrder', JSON.stringify(order));
}

const deleteActiveOrder = () => {
	localStorage.removeItem('activeOrder');
}

const setDepositValue = (deposit) => {
	localStorage.setItem('depositValue', JSON.stringify(deposit));
}

const getDepositValue = () => {
	return JSON.parse(localStorage.getItem('depositValue'));
}

export const depositValue = {
	get: getDepositValue,
	set: setDepositValue
}

export const orderData = {
	get: getOrdersData,
	set: setNewOrder,
	update: updateOrderData
}

export const activeOrder = {
	get: getActiveOrder,
	set: setActiveOrder,
	delete: deleteActiveOrder
}