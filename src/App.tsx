import './App.scss'
import { AppRouter } from './routes/routes'
import { AuthProvider } from './features/auth/context/authProvider';

function App() {

  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  )
}

export default App
