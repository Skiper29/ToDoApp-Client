import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {Provider} from 'react-redux'
import {todoStore} from './app/todo-store'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={todoStore}>
            <App/>
        </Provider>
    </StrictMode>,
)
