import React from 'react';
import { Fab } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import { makeStyles } from '@material-ui/core/styles';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const useStyles = makeStyles((theme) => ({
	fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  }
}));

const ExportCSV = ({ csvData, fileName }) => {
	const classes = useStyles();
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const exportToCSV = (csvData, fileName) => {
        const ws = XLSX.utils.json_to_sheet(csvData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }
	return (
		<Fab
			color="secondary"
			aria-label="getApp"
			className={classes.fab}
			onClick={(e) => exportToCSV(csvData, fileName)}>
				<GetAppIcon />
			</Fab>
        // <Button variant="contained" color='primary' onClick={(e) => exportToCSV(csvData,fileName)}>Export</Button>
    )
}

export default ExportCSV;