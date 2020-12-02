import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Form from './components/Form/Form';
import TableData from './components/TableData/TableData'
import { Provider } from 'react-redux';
import store from './redux/store';
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { Route, Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from "history";

const theme = createMuiTheme({
	palette: {
		 primary: {
				main: "#ffc107" 
							 },
		 secondary: {
				main: "#ff3d00" 
								}
					 },
});

const history = createBrowserHistory();

ReactDOM.render(
	<ThemeProvider theme={theme}>
		<Provider store={store}>
			<Router history={history}>
					<Switch>
						<Route exact path="/" component={App} />
						<Route path="/table" component={TableData} />
						<Route path="/form" component={Form} />
						<Route path="/*" component={() => 'NOT FOUND'} />
					</Switch>
			</Router>
		</Provider>
	</ThemeProvider>,
  document.getElementById('root')
);
