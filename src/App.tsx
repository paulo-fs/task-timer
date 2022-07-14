import { ThemeProvider } from 'styled-components'
import { defaultTheme } from "./styles/theme/defaultTheme"

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <h1>hello world</h1>
    </ThemeProvider>
  )
}

export default App
