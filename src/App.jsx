import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Provider } from 'react-redux'
import store from './redux/store'
import { BrowserRouter as Router } from 'react-router-dom'
import RouteHandler from './routes/router'
import './styles.scss'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <Provider store={store}>
      <ToastContainer />
      <RouteHandler />
    </Provider>
  )
}

export default App
