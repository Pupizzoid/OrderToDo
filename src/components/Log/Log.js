import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	root: {
		width: '100%'
	},
	content: {
		display: 'flex',
		justifyContent: 'space-between'
	}
});

const Log = (logData) => {
	const { date, time, posAmount, posLevel, stopLoss, takeProfit, description, status, result } = logData;
	const classes = useStyles();
	return (
		<Box className={classes.root}>
			<Box className={classes.content}>
				<Typography color="textSecondary" variant="body1" component="span">
					{status}
				</Typography>
				<Typography color="textSecondary" variant="body1" component="span">
					{date}
				</Typography>
				<Typography color="textSecondary" variant="body1" component="span">
					{time}
				</Typography>
			</Box>
			<Box className={classes.content}>
				{posAmount ?
					<Typography color="textSecondary" variant="body1" component="span">
						size:{posAmount}
					</Typography> :
					null}
				{posLevel ?
					<Typography color="textSecondary" variant="body1" component="span">
						PL:{posLevel}
					</Typography> :
					null}
				{stopLoss ?
					<Typography color="textSecondary" variant="body1" component="span">
						SL:{stopLoss}
					</Typography> :
					null}
				{takeProfit ?
					<Typography color="textSecondary" variant="body1" component="span">
						TP:{takeProfit}
					</Typography> :
					null}
			</Box>
			{result ?
				<Box className={classes.content}>
					<Typography color="textSecondary" variant="body1" component="span">
					result:{result}
					</Typography>
				</Box> :
					null}
			{description ?
				<Box className={classes.content}>
					<Typography color="textSecondary" variant="body1" component="p">
						{description}
					</Typography> 
				</Box> :
				null
			}
		</Box>
	)
}

export default Log;