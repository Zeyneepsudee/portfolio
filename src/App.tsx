import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ProjectProvider } from './context/ProjectContext'
import { SiteProvider } from './context/SiteContext'
import { AuthProvider } from './context/AuthContext'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import Navbar from './components/layout/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import Oneko from './components/ui/Oneko'
import ScrollProgress from './components/ui/ScrollProgress'
import Home from './pages/Home'
import Admin from './pages/Admin'
import Login from './pages/Login'

function App() {
  useSmoothScroll()
  return (
    <AuthProvider>
      <SiteProvider>
        <ProjectProvider>
          <BrowserRouter>
            <ScrollProgress />
            <Navbar />
            <main className="mx-auto w-full max-w-5xl px-6 pt-24">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
                <Route path="*" element={<h1 className="py-28 font-display text-xl text-ink-900">404</h1>} />
              </Routes>
            </main>
            <Oneko />
          </BrowserRouter>
        </ProjectProvider>
      </SiteProvider>
    </AuthProvider>
  )
}

export default App


