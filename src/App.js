import React, { Fragment, useState} from 'react';
import './App.scss';
import List from './components/List/List';
import Form from './components/Form/Form';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import {
	openFormAction,
	startFormAction,
	addOrderAction,
	openDepositFormAction,
	updateDepositAction,
	changeFilterAction,
	resetFilterAction,
	changeSortOrdersAction
} from './redux/actions';

const useStyles = makeStyles({
	root: {
		padding: 20,
		display: 'flex',
		flexWrap: 'wrap'
	},
	nav: {
		width: '80%',
		margin: 'auto',
		marginBottom: 30
	},
	navItem: {
		display: 'flex',
		padding: 10,
		alignContent: 'center',
		justifyContent: 'space-between'
	},
	btn: {
		marginRight: 30,
		minWidth: 100
	},
	filterCategoryTitle: {
		marginRight: 15
	},
	filterSection: {

	}
});


/*

	jump()

	walk()



	moveStrategy();

	moveStrategy = walk;

	moveStrategy()

	setStrategy('JUMP') {
		moveStrategy = jump;
	}

	a.sort(jump)

	a.sort(walk)

	comparator = (a, b) => 0
	a.sort((a, b) => 0)
 */

const App = ({ openForm, app, addOrder, startForm, form, openDepositForm, updateDeposit, orders, changeFilter, resetFilter, changeSortOrders }) => {
	const { isOpenForm, isFormDepositOpen, depositValue, sort, filter } = app;
	const { formData } = form;
	const [initialDepositValue, setDepositValue] = useState(depositValue);
	const classes = useStyles();

	const handleCreateOrder = (formData) => {
		const {
			stopLoss,
			date,
			time,
			posAmount,
			posLevel,
			takeProfit,
			description,
			status,
		} = formData;

		addOrder({
			...formData,
			logs: [{
				stopLoss,
				date,
				posAmount,
				posLevel,
				takeProfit,
				description,
				status,
				time
			}]
		})
	}

	

	const onOpenFormClick = (data) => {
		startForm(
			data,
			{
				formTitle: 'Create Pending Order',
				formSubmitAction: handleCreateOrder
			});
		openForm();
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		updateDeposit(initialDepositValue);
		openDepositForm();
	}

	const filterData = (list) => {
		if (filter.all) {
			return list;
		}
		const filteredList = list.filter(order => {
			const filterResult = (filter.running && (order.status === 'active' || order.status === 'pending')) ||
				(filter.finished && (order.status === 'Hit TP' || order.status === 'Hit SL' || order.status === 'cancel')) ||
				(filter.wins && order.result > 0) || (filter.loses && order.result < 0);
			console.log(order, filter, filterResult);
			return filterResult
		});
		return filteredList
	}

	const createFullDate = (d, t) => {
		const time = t.split(':');
		const date = d.split('-');
		console.log(d, t);
		return new Date(date[0], date[1] - 1, date[2], time[0], time[1]).getMilliseconds();
	}

	const titleSortStrategy = (a, b) => {
		console.log(a, b);
		return a.title.toLocaleString() > b.title.toLocaleString()
	}

	const someOtherSortStrategy = (a, b) => {
		console.log(a, b);
		const result = createFullDate(a.date, a.time) > createFullDate(b.date, b.time);
		console.log(result);
		return result;
	}

	const setSortStrategy = (strategyName) => {
		switch (strategyName) {
			case 'OTHER':
				sortStrategy = someOtherSortStrategy;
				return;
			default:
				sortStrategy = titleSortStrategy
		}
	}

	let sortStrategy = setSortStrategy;
 
	const applySort = (data) => {

		return data.sort(titleSortStrategy);
	}
	
  return (
		<Box className={classes.root}>
			<Box className={classes.nav}>
				<Box className={classes.navItem}>
					<Button className={classes.btn} variant="contained" color="primary" onClick={() => onOpenFormClick(formData)}>
						Create
					</Button>
					<Box className={classes.filterSection}>
						<Typography className={classes.filterCategoryTitle} color="textSecondary" variant="body1" component="span">
							Show:
						</Typography>
						<ButtonGroup color="primary" aria-label="outlined primary button group">
							<Button
								variant={filter.all ? "contained" : null}
								onClick={() => resetFilter()}
							>All</Button>
							<Button
								variant={filter.running ? "contained" : null}
								onClick= {() => changeFilter('running')}
							>Running</Button>
							<Button
								variant={filter.finished ? "contained" : null}
								onClick= {() => changeFilter('finished')}
							>Finished</Button>
							<Button
								variant={filter.wins ? "contained" : null}
								onClick= {() => changeFilter('wins')}
							>Wins</Button>
							<Button
								variant={filter.loses ? "contained" : null}
								onClick= {() => changeFilter('loses')}
							>Loses</Button>
						</ButtonGroup>
					</Box>
					<Box>
						<TextField
							id="search"
							label="Search"
						/>
						<Button variant="contained" color="primary" >Search</Button>
					</Box>
				</Box>
				<Box className={classes.navItem}>
					{!isFormDepositOpen ?
						<Button className={classes.btn} variant="contained" color="primary" onClick={() => openDepositForm()}>Deposit</Button> :
						<form onSubmit={handleSubmit}>
							<TextField
								id="Deposit"
								required
								// className={classes.TextField}
								defaultValue={initialDepositValue}
								onChange={e => setDepositValue(e.target.value)}
								label="Amount" />
							<Button
								variant="contained"
								color="primary"
								type="submit"
							>Deposit</Button>
						</form>
					}
					<Box className={classes.filterSection}>
						<Typography className={classes.filterCategoryTitle} color="textSecondary" variant="body1" component="span">
							Sort: 
						</Typography>
						<ButtonGroup color="primary" aria-label="outlined primary button group">
							<Button onClick={() => changeSortOrders('TITLE')}>Title</Button>
							<Button onClick={() => changeSortOrders('DATE')}>Latest</Button>
							<Button onClick={() => changeSortOrders('TITLE')}>Newest</Button>
							<Button onClick={() => changeSortOrders('TITLE')}>Status</Button>
						</ButtonGroup>
					</Box>
					<Typography color="textSecondary" variant="body1" component="span">
						Balance: {depositValue}&#8364;
					</Typography>
				</Box>
			</Box>
			{!isOpenForm ?
				<Fragment>
					<List orders={Object.assign({}, {dataOrder: applySort(filterData(orders.dataOrder)), activeOrder: orders.activeOrder})} />
				</Fragment> :
				<Form />
			}
    </Box>
  );
}

const mapStateToProps = state => {
	return {
		app: state.app,
		form: state.form,
		orders: state.orders,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		openForm: () => {
			dispatch(openFormAction())
		},
		addOrder: (data) => {
			dispatch(addOrderAction(data))
		},
		startForm: (data, config, title) => {
			dispatch(startFormAction(data, config, title))
		},
		openDepositForm: () => {
			dispatch(openDepositFormAction())
		},
		updateDeposit: (deposit) => {
			dispatch(updateDepositAction(deposit));
		},
		resetFilter: () => {
			dispatch(resetFilterAction())
		},
		changeFilter: (filterName) => {
			dispatch(changeFilterAction(filterName))
		},
		changeSortOrders: (strategyName) => {
			dispatch(changeSortOrdersAction(strategyName))
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
