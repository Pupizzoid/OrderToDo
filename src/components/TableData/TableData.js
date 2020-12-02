import React, { Fragment } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ExportCSV from '../ExportCSV/ExportCSV';
import { Box } from '@material-ui/core';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
	}
}))(TableCell);

const dataOrder = JSON.parse(localStorage.getItem('dataOrder'));
const dataToExcel = dataOrder ? dataOrder.map(order => {
	return (
		{
			title: order.title,
			status: order.status,
			posAmount: order.posAmount,
			posLevel: order.posLevel,
			stopLoss: order.stopLoss,
			takeProfit: order.takeProfit,
			date: order.date,
			time: order.time,
			description: order.description,
			comments: order.logsForExcel ? order.logsForExcel.join("\r\n") : null
		}
	)
}) : null;

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const comments = (array) => {
	return array.map((item, index)=> {
		return <Box key={index}>{item}</Box>
	})
}

const tableRow = dataOrder ? dataOrder.map(order => {
	return (
		<StyledTableRow key={order.id}>
			<StyledTableCell component="th" scope="row">
				{order.title}
			</StyledTableCell>
			<StyledTableCell align="right">{order.status}</StyledTableCell>
			<StyledTableCell align="right">{order.posAmount}</StyledTableCell>
			<StyledTableCell align="right">{order.posLevel}</StyledTableCell>
			<StyledTableCell align="right">{order.stopLoss}</StyledTableCell>
			<StyledTableCell align="right">{order.takeProfit}</StyledTableCell>
			<StyledTableCell align="right">{order.date}</StyledTableCell>
			<StyledTableCell align="right">{order.time}</StyledTableCell>
			<StyledTableCell align="right">{order.description}</StyledTableCell>
			<StyledTableCell align="right">{order.logsForExcel ? comments(order.logsForExcel) : null}</StyledTableCell>
		</StyledTableRow>
	)
}) : null

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const TableData = () => {
	const classes = useStyles();

	return (
		<div class='container'>
		<TableContainer component={Paper} className={classes.root}>
			<ExportCSV csvData={dataToExcel} fileName='dataOrders' />
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
						<StyledTableCell>Title</StyledTableCell>
						<StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">PosAmount</StyledTableCell>
            <StyledTableCell align="right">PosLevel</StyledTableCell>
            <StyledTableCell align="right">Stop Loss</StyledTableCell>
						<StyledTableCell align="right">Take Profit</StyledTableCell>
						<StyledTableCell align="right">Date</StyledTableCell>
						<StyledTableCell align="right">Time</StyledTableCell>
						<StyledTableCell align="right">Description</StyledTableCell>
						<StyledTableCell align="right">Comments</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableRow}
        </TableBody>
			</Table>
			</TableContainer>
		</div>
  );
}
export default TableData;