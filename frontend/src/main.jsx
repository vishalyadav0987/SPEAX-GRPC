import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { QuestionContextProvider } from './QuestionContext/QuestionContext.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <QuestionContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QuestionContextProvider>
  // </StrictMode>,
)
