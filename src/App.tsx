import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/global';
import { defaultTheme } from './styles/theme/defaultTheme';

function App() {
	return (
		<ThemeProvider theme={defaultTheme}>
			<GlobalStyle />
			<h1>hello world</h1>
		</ThemeProvider>
	);
}

export default App;
