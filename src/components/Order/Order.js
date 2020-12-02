import React, { Fragment} from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Icon from '@material-ui/core/Icon';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { useHistory } from 'react-router-dom';
import '../Order/Order.scss';
import Log from '../Log/Log';
import { connect } from 'react-redux';
import {
	startFormAction,
	openFormAction,
	deleteOrderAction,
	updateOrderAction,
	deleteActiveOrderAction
} from '../../redux/actions';

const useStyles = makeStyles({
	root: {
		padding: 20,
		width: 400,
		position: 'relative',
		boxShadow: '0 2px 4px -2px rgba(0,0,0,0.24), 0 4px 24px -2px rgba(0, 0, 0, 0.2)',
	},
	logItem: {
		padding: 0,
		paddingBottom: '15px',
		width: '100%',
	}
});

const Order = ({deleteActiveOrder, startForm, updateOrder, order}) => {
	const history = useHistory();
	const classes = useStyles();

	const isNeedsLogging = (logs, key, value, index = logs.length - 1) => {
		if (!logs[index].hasOwnProperty(key)) {
			return isNeedsLogging(logs, key, value, index - 1);
		}
		return logs[index][key] !== value;
	}

	const handleCreateLogsForExcelData = (log) => {
		let result = [];
		let time = '';
		let date = '';
		for (let key in log) {
			if (!log.hasOwnProperty(key)) {
				continue;
			}
			if (key === 'time') {
				time = `at ${log[key]}`;
				continue;
			}
			if (key === 'date') {
				date = `on ${log[key]}`;
				continue;
			}
			console.log(log[key], key);
			result.push(`${key} was changed to ${log[key]} ${time} ${date}`);
			console.log(result);
		}
		return result;
	}

	const handleModifyExistingOrder = (formData, formConfig) => {
		const log = (Object.assign({}, formData));
		console.log(log, formData);
		for (let key in log) {
			if (!formData.hasOwnProperty(key)) {
				continue;
			}
			if (!formConfig[key] || !isNeedsLogging(formData.logs, key, formData[key])) {
				delete log[key];
			}
		}
		formData.logsForExcel.push(handleCreateLogsForExcelData(log));
		formData.logs.push(log);
		updateOrder(formData);
	}

	const handleModifyPendingOrder = (data) => {
		startForm(
			data,
			{
				title: false,
				formTitle: 'Modify Pending Order',
				formSubmitAction: handleModifyExistingOrder
			});
			history.push('/form');
	}

	const handleModifyActiveOrder = (data) => {
		startForm(
			data,
			{
				title: false,
				posAmount: false,
				posLevel: false,
				formTitle: 'Modify Active Order',
				formSubmitAction: handleModifyExistingOrder
			});
			history.push('/form');
	}

	const handleActivateOrder = (data) => {
		startForm(
			Object.assign({}, data, { status: 'active' }),
			{
				title: false,
				posAmount: false,
				posLevel: false,
				stopLoss: false,
				takeProfit: false,
				description: false,
				formTitle: 'Activate Order',
				formSubmitAction: handleModifyExistingOrder
			});
			history.push('/form');
	}

	const handleCancelOrder = (data) => {
		startForm(
			Object.assign({}, data, { status: 'cancel' }),
			{
				title: false,
				posAmount: false,
				posLevel: false,
				stopLoss: false,
				takeProfit: false,
				formTitle: 'Cancel Order',
				formSubmitAction: handleModifyExistingOrder
			});
			history.push('/form');
	}

	const handleCloseOrder = (data) => {
		startForm(
			Object.assign({}, data, {status: 'close'}),
			{
				title: false,
				posAmount: false,
				posLevel: false,
				stopLoss: false,
				takeProfit: false,
				description: false,
				formTitle: 'Close Order',
				formSubmitAction: handleModifyExistingOrder,
			});
			history.push('/form');
	}

	const getLogValueRecursively = (logs, key, index = logs.length - 1) => {
		const log = logs[index];
		if (log.hasOwnProperty(key)) {
			return log[key];
		}
		if (key === 'description') {
			return '';
		}
		return getLogValueRecursively(logs, key, index - 1);
	}

	const spreadAllLogs = (logs) => {
		return logs.map((log, index) => {
			if (index === 0) {
				return log;
			}
			const result = {};
			for (const key in logs[0]) {
				result[key] = getLogValueRecursively(logs.slice(0, index + 1), key);
			}
			return result;
		})
	}

	const logsList = spreadAllLogs(order.logs).map((log, index) => {
		const { ...itemProps } = log;
		return (
			<Fragment key={index}>
				<ListItem className={classes.logItem}>
							<Log {...itemProps} />
				</ListItem>
			</Fragment>
		)
	});

	return (
		<div className='order-container'>
			<Card className={classes.root}>
				<CardContent>
				<Icon aria-label="cancel" color="secondary" className='icon' onClick={() => deleteActiveOrder()}>cancel</Icon>
					<div className='order-content'>
						<span>{order.title}</span>
						<span>{order.date}</span>
						<span>{order.time}</span>
					</div>
					<div className='order-content'>
						<span><span>size: </span>{order.posAmount}</span>
						<span><span>PL: </span>{order.posLevel}</span>
						<span><span>SL: </span>{order.stopLoss}</span>
						<span><span>TP: </span>{order.takeProfit}</span>
				</div>
				<List>{logsList}</List>
				{(order.status === 'pending') ? 
						<ButtonGroup color="primary" aria-label="outlined secondary button group">
							<Button onClick={() => handleModifyPendingOrder(order)}>Modify</Button>
							<Button onClick={() => handleCancelOrder(order)}>Cancel</Button>
							<Button onClick={() => handleActivateOrder(order)}>Activate</Button>
						</ButtonGroup> :
					(order.status === 'active') ?
					<ButtonGroup color="primary" aria-label="contained primary button group">
						<Button onClick={() => handleModifyActiveOrder(order)}>Modify</Button>
						<Button onClick={() => handleCloseOrder(order)}>Close</Button>
					</ButtonGroup> :
						null
				}
				</CardContent>
			</Card>
		</div>
	)
}

const mapStateToProps = state => {
	return {
		order: state.orders.activeOrder
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		startForm: (data, config, title) => {
			dispatch(startFormAction(data, config, title))
		},
		openForm: () => {
			dispatch(openFormAction())
		},
		deleteOrder: (id) => {
			dispatch(deleteOrderAction(id));
		},
		updateOrder: (data) => {
			dispatch(updateOrderAction(data))
		},
		deleteActiveOrder: () => {
			dispatch(deleteActiveOrderAction())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Order);