import React, { Fragment } from 'react';
import Order from '../Order/Order';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import CardOrder from '../Card/Card';
import './List.scss';
import { Box } from '@material-ui/core';

const useStyles = makeStyles({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		width: '100%'
	},
	rootWidthWithActiveBlock: {
		width: 'calc(100% - 500px)',
	},
  inline: {
		display: 'inline',
		marginRight: 20
	},
	list: {
		width: '100%',
		display: 'flex',
		flexWrap: 'wrap',
	},
	item: {
		width: 'fit-content'
	}
});

const ListOrders = ({orders}) => {
	const { dataOrder, activeOrder } = orders;
	console.log(dataOrder);
	const classes = useStyles();
	
	const orderList = dataOrder.map(item => {
	const {...itemProps } = item;
		return (
			<ListItem key={itemProps.id} className={classes.item}>
				<CardOrder {...itemProps}/>
			</ListItem>
		)
	})

	return (
		<Fragment>
			{!activeOrder ?
				<List className={classes.root}>
					{orderList}
				</List> :
				<Fragment>
					<Box className={classes.rootWidthWithActiveBlock}>
						<List className={classes.list}>
							{orderList}
						</List>
					</Box>
					<Order/>
				</Fragment>
			}
		</Fragment>
	)
}

export default ListOrders;