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
		width: 250,
		boxShadow: '0 2px 4px -2px rgba(0,0,0,0.24), 0 4px 24px -2px rgba(0, 0, 0, 0.2)',
	},
	content: {
		display: 'flex',
		flexWrap: 'wrap',
	},
  title: {
		fontSize: 14,
		display: 'block',
		width: '100%'
	},
	wrapper: {
		width: '100%',
		display: 'flex',
		justifyContent: 'space-between',
		margin: 0,
		padding: 0,
	},
	status: {
		marginLeft: 'auto'
	},
	negativResult: {
		color: 'red'
	},
	positivResult: {
		color: 'green'
	}
});


const CardOrder = (cardData) => {
	const { title, date, posAmount, stopLoss, takeProfit, status,id, time, activateOrder, result } = cardData;

	const handleOpenOrder = (id) => {
		activateOrder(id);
	}

	const setResultClassName = (result) => {
		return result < 0 ? classes.negativResult : classes.positivResult;
	}

	const classes = useStyles();

	return (
		<Card className={classes.root} onClick={() => handleOpenOrder(id)}>
			<CardContent className={classes.content} >
				<Typography className={classes.title} color="textPrimary" component="h3">
					{title}
				</Typography>
				<Box className={classes.wrapper}>
					<Typography className={classes.element} color="textSecondary" variant="body1" component="span">
						{date}
					</Typography>
					<Typography color="textSecondary" variant="body1" component="span">
						{time}
					</Typography>
				</Box>
				<Box className={classes.wrapper}>
					<Typography color="textSecondary" variant="body1" component="span">
						size:{posAmount}
					</Typography>
					<Typography color="textSecondary" variant="body1"  component="span">
						SL:{stopLoss}
					</Typography>
					<Typography color="textSecondary"  variant="body1" component="span">
						TP:{takeProfit}
					</Typography>
				</Box>
				{result ?
					<Typography className={setResultClassName(result)} color="textSecondary"  variant="body1" component="span">
						{result}
					</Typography> :
					null
				}
				<Typography className={classes.status} component="h4">
					{status}
				</Typography>
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