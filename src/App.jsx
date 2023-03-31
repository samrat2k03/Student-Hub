import './App.css'
import Home from './pages/Home'
import Login from './Components/Login/Login'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../src/config/firebase'

function App() {

  const [user] = useAuthState(auth)
  
  return (
    <div className="App">

      {!user ? (
      <Login />
      ) :
       (<Home />)} 
       
    </div>
  )
}

export default App
