import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PrivateRoute from './utils/PrivateRoute'
import { AppProvider } from './Lib/AppContext'
import Selection from './Components/Selection'

const App = () => {
  return(
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route exact path='/' element={<Selection/>} />
          <Route exact path='/login' element={<PrivateRoute path='/login' />} />
          <Route exact path='/dashboard'  element={<PrivateRoute path='/dashboard' />}/>
        </Routes>
      </AppProvider>
    </BrowserRouter>
  )
}

export default App
