import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Router } from './components/Router';
import { CyclesContextProvider } from './contexts/CyclesContext';
import { GlobalStyle } from './styles/global';
import { defaultTheme } from './styles/theme/defaultTheme';

function App() {
	return (
		<ThemeProvider theme={defaultTheme}>
			<BrowserRouter>
				<CyclesContextProvider>
					<Router />
				</CyclesContextProvider>
				<GlobalStyle />
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
