import React, { Fragment} from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Box from '@material-ui/core/Box';
import Icon from '@material-ui/core/Icon';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
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
		boxShadow: '0 2px 4px -2px rgba(0,0,0,0.24), 0 4px 24px -2px rgba(0, 0, 0, 0.2)',
	},
	content: {
		display: 'flex',
		width: '100%',
		justifyContent: 'space-between'
	},
	icon: {
		color: '#3f51b5;',
		display: 'block',
		marginLeft: 'auto'
	}
});

const Order = (props) => {
	const {
		openForm,
		deleteActiveOrder,
		startForm,
		updateOrder,
		order
	} = props;

	const classes = useStyles();

	const isNeedsLogging = (logs, key, value, index = logs.length - 1) => {
		if (!logs[index].hasOwnProperty(key)) {
			return isNeedsLogging(logs, key, value, index - 1);
		}
		return logs[index][key] !== value;
	}

	const handleModifyExistingOrder = (formData, formConfig) => {
		const log = (Object.assign({}, formData));
		for (let key in log) {
			if (!formData.hasOwnProperty(key)) {
				continue;
			}
			if (!formConfig[key] || !isNeedsLogging(formData.logs, key, formData[key])) {
				delete log[key];
			}
		}
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
		openForm();
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
		openForm();
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
		openForm();
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
		openForm();
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
				formSubmitAction: handleModifyExistingOrder
			});
		openForm();
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
				<ListItem >
					<Log {...itemProps} />
				</ListItem>
				<Divider light />
			</Fragment>
		)
	});

	return (
		<Card className={classes.root}>
			<CardContent>
			<Icon aria-label="cancel" className={classes.icon} onClick={() => deleteActiveOrder()}>cancel</Icon>
			<Box className={classes.content}>
				<Typography color="textPrimary" component="h3">
					{order.title}
				</Typography>
				<Typography color="textSecondary" variant="body1" component="span">
					{order.date}
				</Typography>
				<Typography color="textSecondary" variant="body1" component="span">
					{order.time}
				</Typography>
			</Box>
			<Box className={classes.content}>
				<Typography color="textSecondary" variant="body1" component="span">
					size:{order.posAmount}
				</Typography>
				<Typography color="textSecondary" variant="body1" component="span">
					PL:{order.posLevel}
				</Typography>
				<Typography color="textSecondary" variant="body1" component="span">
					SL:{order.stopLoss}
				</Typography>
				<Typography color="textSecondary" variant="body1" component="span">
					TP:{order.takeProfit}
				</Typography>
			</Box>
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