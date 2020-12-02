import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	root: {
		width: '100%',
		padding: 0
	},
	content: {
		width: '100%',
		display: 'flex',
		justifyContent: 'space-between',
	},
	contentInfo: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-between'
	}
});

const Log = (logData) => {
	const { date, time, posAmount, posLevel, stopLoss, takeProfit, description, status, result } = logData;
	const classes = useStyles();
	return (
		<Accordion className={classes.root}>
			<AccordionSummary
				expandIcon={<Icon aria-label="keyboard_arrow_down">keyboard_arrow_down</Icon>}
			>
				<span>{status}</span>
			</AccordionSummary>
			<AccordionDetails className={classes.contentInfo}>
				<div className={classes.content}>
					<span>{date}</span>
					<span>{time}</span>
				</div>
			<div className={classes.content}>
				{ posAmount ? <span><span>size: </span>{posAmount}</span> : null }
				{posLevel ? <span><span>PL: </span>{posLevel}</span> : null }
				{stopLoss ? <span><span>SL: </span>{stopLoss}</span> : null }
				{takeProfit ? <span><span>TP: </span>{takeProfit}</span> : null }
			</div>
				
			{description ?
				<div className={classes.content}>
						<p>{description}</p>
				</div> :
				null
			}
			</AccordionDetails>
		</Accordion>
	)
}

export default Log;