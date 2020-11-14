export const uid = () => {
	return 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export const DATA = [
	{
		id: uid(),
		date: '22.05.2020',
		title: 'Order 1',
		posAmount: 0.25,
		posLevel: 1.75467,
		stopLoss: 2,
		takeProfit: 5,
		description: 'hello my sweaty',
		status: 'pending',
		logs: []
	},
	{
		id: uid(),
		date: '21.05.2020',
		title: 'Order 1',
		posAmount: 0.20,
		posLevel: 1.75555,
		stopLoss: 1,
		takeProfit: 2,
		description: 'hello my world',
		status: 'active',
		logs: []
		}
]

export const FORM_DATA = {
	title: '',
	time: '',
	date: '',
	posAmount: '',
	posLevel: '',
	stopLoss: '',
	takeProfit: '',
	description: '',
	status: 'pending'
}

export const FORM_CONFIG = {
	title: true,
	date: true,
	time: true,
	posAmount: true,
	posLevel: true,
	stopLoss: true,
	takeProfit: true,
	description: true,
	formTitle: '',
	status: true,
	formSubmitAction: null,
}