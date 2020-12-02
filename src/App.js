import React, { useState } from 'react';
import './App.scss';
import List from './components/List/List';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import GetAppIcon from '@material-ui/icons/GetApp';
import Form from './components/Form/Form';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {
	Box,
	Button,
	ButtonGroup,
	TextField,
	Fab,
	AppBar,
	Toolbar
} from '@material-ui/core/';
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
import { Link, useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
		right: theme.spacing(2),
		zIndex: 2
  }
}));

const App = (props) => {
	const {
		app,
		addOrder,
		startForm,
		form,
		openDepositForm,
		updateDeposit,
		orders,
		changeFilter,
		resetFilter,
		changeSortOrders
	} = props;
	const { isOpenForm, isFormDepositOpen, depositValue, sortName, filter } = app;
	const { formData } = form;
	const [initialDepositValue, setDepositValue] = useState(depositValue);
	const [searchValue, setSearchValue] = useState('');
	const classes = useStyles();
	const history = useHistory();

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
			}],
			logsForExcel: []
		})
	}

	

	const onOpenFormClick = (data) => {
		startForm(
			data,
			{
				formTitle: 'Create Pending Order',
				formSubmitAction: handleCreateOrder,
				typeAction: 'create'
			});
		history.push('/form');
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
			return filterResult
		});
		return filteredList
	}

	const createFullDate = (d, t) => {
		const time = t.split(':');
		const date = d.split('-');
		return new Date(date[0], date[1] - 1, date[2], time[0], time[1]).getTime();
	}

	const titleSortStrategy = (a, b) => {
		return a.title.toLocaleString() > b.title.toLocaleString() ? 1 : -1
	}

	const latestSortStrategy = (a, b) => {
		const result = createFullDate(a.date, a.time) - createFullDate(b.date, b.time);
		return result;
	}

	const newestSortStrategy = (a, b) => {
		const result = createFullDate(b.date, b.time) - createFullDate(a.date, a.time);
		return result;
	}

	const statusSortStrategy = (a, b) => {
		const priorityStatus = {
			pending: 1,
			active: 2,
			HitTP: 3,
			HitSL: 4,
			cancel: 5
		}
		const newA = a.status.replace(' ', '');
		const newB = b.status.replace(' ', '');
		return priorityStatus[newA] - priorityStatus[newB];
	}
 
	const applySort = (data) => {
		switch (sortName) {
			case 'LATEST':
				data.sort(latestSortStrategy);
				return data;
			case 'NEWEST':
				data.sort(newestSortStrategy);
				return data;
			case 'STATUS':
				data.sort(statusSortStrategy);
				return data;
			default:
				data.sort(titleSortStrategy);
				return data;
		}
	}

	const handleSearch = () => {
		return orders.dataOrder.filter(order => order.title.toLowerCase().includes(searchValue) ||
			order.description.toLowerCase().includes(searchValue));
	}

	return (
		<div className='container'>
			<Fab
				color="secondary"
				aria-label="add"
				className={classes.fab}
				onClick={() => onOpenFormClick(formData)}>
				<AddIcon />
			</Fab>
			<AppBar position="static" className='header'>
				<Toolbar className='nav'>
					<div className='balance-content'>
						<span>Balance:&nbsp;</span>
						<span className='balance-value'>{depositValue}&#8364;</span>
						{!isFormDepositOpen ?
					<EditIcon
						onClick={() => openDepositForm()} /> :
					<form onSubmit={handleSubmit} className='balance-form'>
						<TextField
							id="Deposit"
							required
							defaultValue={ depositValue }
							onChange={e => setDepositValue(e.target.value)}
						label="Amount" />
						<Button
							variant="contained"
							color="primary"
							type="submit"
						>Set</Button>
					</form>
				}
					</div>
					<h1 className='title'>Trading Journal</h1>
					<TextField
						id="search"
						label="Search"
						defaultValue={searchValue}
						className={classes.navItem}
						onChange={e => setSearchValue(e.target.value)}
					/>
					<Box>
						<Link
							to='/table' className='download-link'>
							<GetAppIcon />
						</Link>
					</Box>
				</Toolbar>
			</AppBar>
			<div className='filter-content'>
				<ButtonGroup
					color="primary"
					aria-label="outlined primary button group"
				>
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
				<ButtonGroup
					color="primary"
					aria-label="outlined primary button group"
				>
						<Button
							variant={sortName === 'TITLE' ? "contained" : null}
							onClick={() => changeSortOrders('TITLE')}
						>Title</Button>
						<Button
							variant={sortName === 'LATEST' ? "contained" : null}
							onClick={() => changeSortOrders('LATEST')}
						>Latest</Button>
						<Button
							variant={sortName === 'NEWEST'? "contained" : null}
							onClick={() => changeSortOrders('NEWEST')}
						>Newest</Button>
						<Button
							variant={sortName === 'STATUS'? "contained" : null}
							onClick={() => changeSortOrders('STATUS')}
						>Status</Button>
					</ButtonGroup>
			</div>
				{
					
				(!isOpenForm ?
						<List
							orders={
								Object.assign({},
									{
										dataOrder: applySort(filterData(handleSearch(orders.dataOrder))),
										activeOrder: orders.activeOrder
									})} />:
					<Form />
				)
				}
			</div>
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
