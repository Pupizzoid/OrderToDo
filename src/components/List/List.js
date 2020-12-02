import React, { Fragment } from 'react';
import Order from '../Order/Order';
import CardOrder from '../Card/Card';
import './List.scss';

const ListOrders = ({orders}) => {
	const { dataOrder, activeOrder } = orders;
	
	const orderList = dataOrder.map(item => {
	const {...itemProps } = item;
		return (
			<li key={itemProps.id}>
				<CardOrder {...itemProps}/>
			</li>
		)
	})

	return (
		<div className='list-container'>
			{!activeOrder ?
				<ul className='list'>
					{orderList}
				</ul> :
				<Fragment>
					<div className='list-container-active'>
						<ul className='list'>
							{orderList}
						</ul>
					</div>
					<Order/>
				</Fragment>
			}
		</div>
	)
}

export default ListOrders;