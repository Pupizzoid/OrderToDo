import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { uid } from '../../data';
import { connect } from 'react-redux';
import {
	openFormAction,
	resetFormAction,
	activateOrderAction,
	updateDepositAction
} from '../../redux/actions';

const useStyles = makeStyles({
  root: {
		display: 'flex',
		flexWrap: 'wrap',
		maxWidth: 500,
		justifyContent: 'space-between',
		padding: 20,
		margin: 'auto'
	},
	box: {
		margin: 'auto'
	},
	TextField: {
		width: '100%',
		marginBottom: '20px'
	},
	TextFieldHalfWidth: {
		width: '45%',
		marginBottom: '20px'
	},
	title: {
		textAlign: 'center',
		fontSize: 24
	}
});

const Form = ({ formState, setActiveOrder , updateDeposit, app}) => {
	const { formData, formConfig} = formState;
	const [initialData, setData] = useState(
		Object.assign({}, formData, {
			date: new Date().toJSON().slice(0, 10).replace(/-/g, '-'),
			time: new Date().toString().slice(16, 21),
		}));
	const classes = useStyles();
	const history = useHistory();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (formConfig.typeAction === 'create') {
			initialData.id = uid();
		}
		formConfig.formSubmitAction(initialData, formConfig);
		setActiveOrder(initialData.id);
		history.push('/');
	}

	const handleCloseForm = () => {
		history.push('/');
	}

	const handleCloseWithTakeProfit = () => {
		const resultPoint = Math.abs(parseFloat(initialData.takeProfit) - parseFloat(initialData.posLevel)) * 10000;
		setData({ ...initialData, status: 'Hit TP', result: resultPoint });
		const result = resultPoint * initialData.posAmount;
		updateDeposit(parseFloat(app.depositValue) + result);
	}

	const handleCloseStopLoss = () => {
		const resultPoint = -1 * Math.abs(parseFloat(initialData.stopLoss) - parseFloat(initialData.posLevel)) * 10000;
		setData({ ...initialData, status: 'Hit SL', result: resultPoint });
		const result = resultPoint * initialData.posAmount;
		updateDeposit(parseFloat(app.depositValue) + result);
	}

	return (
		<Box className={classes.box}>
			<Typography className={classes.title} color="primary" component="h1">
				{formConfig.formTitle}
			</Typography>
			<form onSubmit={handleSubmit} className={classes.root}>
				{formConfig.title ?
					<TextField
          required
          id="filled-title"
					label="Title"
					variant="outlined"
					className={classes.TextField}
          defaultValue={initialData.title}
					onChange={e => setData({...initialData, title: e.target.value})}
        /> :
					null
				}
				<TextField
					id="date"
					label="Date"
					type="date"
					name='date'
					variant="outlined"
					defaultValue={initialData.date}
					className={classes.TextFieldHalfWidth}
					InputLabelProps={{
						shrink: true,
					}}
					onChange={e => setData({...initialData, date: e.target.value})}
				/>
				<TextField
					id="time"
					label="Time"
					type="time"
					variant="outlined"
					defaultValue={initialData.time}
					className={classes.TextFieldHalfWidth}
					InputLabelProps={{
						shrink: true,
					}}
					onChange={e => setData({...initialData, time: e.target.value})}
				/>
				{formConfig.posAmount ?
					<TextField
          required
          id="filled-posAmount"
					label="posAmount"
					variant="outlined"
					className={classes.TextField}
          defaultValue={initialData.posAmount}
					onChange={e => setData({...initialData, posAmount: e.target.value})}
        /> :
					null
				}
				{formConfig.posLevel ?
					<TextField
					required
					id="filled-posLevel"
					label="posLevel"
					variant="outlined"
					className={classes.TextField}
					defaultValue={initialData.posLevel}
					onChange={e => setData({...initialData, posLevel: e.target.value})}
				/> :
					null
				}
				{formConfig.stopLoss ?
					<TextField
					required
					id="filled-stopLoss"
					label="stopLoss"
					variant="outlined"
					className={classes.TextFieldHalfWidth}
					defaultValue={initialData.stopLoss}
					onChange={e => setData({...initialData, stopLoss: e.target.value})}
					/> :
					null
				}
				{formConfig.takeProfit ?
					<TextField
					required
					id="filled-takeProfit"
					label="takeProfit"
					variant="outlined"
					className={classes.TextFieldHalfWidth}
					defaultValue={initialData.takeProfit}
					onChange={e => setData({...initialData, takeProfit: e.target.value})}
					/> :
					null
				}
				{formConfig.description ?
					<TextField
					required
					id="outlined-multiline-static"
					label="description"
					multiline
					rows={4}
					className={classes.TextField}
					defaultValue={initialData.description}
					variant="outlined"
					onChange={e => setData({...initialData, description: e.target.value})}
					/> :
					null
				}
				{formData.status === 'close' ?
					<ButtonGroup color="primary" aria-label="contained primary button group">
						<Button type='submit' onClick={() => handleCloseWithTakeProfit()}>Hit TP</Button>
						<Button type='submit' onClick={() => handleCloseStopLoss()}>Hit SL</Button>
						<Button type='button' onClick={() => handleCloseForm()}>Cancel</Button>
					</ButtonGroup> :
					<ButtonGroup color="primary" aria-label="contained primary button group">
						<Button type='submit'>{formConfig.formTitle}</Button>
						<Button type='button' onClick={() => handleCloseForm()}>Cancel</Button>
					</ButtonGroup> 
				}
			</form>
		</Box>
	)
}

const mapStateToProps = state => {
	return {
		app: state.app,
		formState: state.form
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		openForm: () => {
			dispatch(openFormAction())
		},
		resetForm: () => {
			dispatch(resetFormAction())
		},
		setActiveOrder: (id) => {
			dispatch(activateOrderAction(id));
		},
		updateDeposit: (deposit) => {
			dispatch(updateDepositAction(deposit));
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);