import React from 'react';
import '../Card/Card.scss';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { connect } from 'react-redux';
import { activateOrderAction } from '../../redux/actions';

const useStyles = makeStyles({
	root: {
		width: 350,
		boxShadow: '0 2px 4px -2px rgba(0,0,0,0.24), 0 4px 24px -2px rgba(0, 0, 0, 0.2)',
	},
	content: {
		display: 'flex',
		flexWrap: 'wrap',
	}
});


const CardOrder = (cardData) => {
	const { title, date, posAmount, stopLoss, takeProfit, status,id, time, activateOrder, result } = cardData;

	const handleOpenOrder = (id) => {
		activateOrder(id);
	}

	const setResultClassName = (result) => {
		return result < 0 ? 'negative-result' : 'positive-result';
	}

	const classes = useStyles();

	return (
		<Card className={classes.root} onClick={() => handleOpenOrder(id)}>
			<CardContent className={classes.content} >
				<p>{title}</p>
				<div className='order-content'>
					<span>{date}</span>
					<span>{time}</span>
				</div>
				<div className='order-content'>
					<span><span>size: </span>{posAmount}</span>
					<span><span>SL: </span>{stopLoss}</span>
					<span><span>TP: </span>{takeProfit}</span>
				</div>
				{result ?
					<span className={setResultClassName(result)}>{result.toFixed(3)}</span> :
					null
				}
				<span className='status-field'>{status}</span>
			</CardContent>
		</Card>
	)
}

const mapStateToProps = state => {
	return {
		app: state.app,
		orders: state.orders
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		activateOrder: (id) => {
			dispatch(activateOrderAction(id))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CardOrder);