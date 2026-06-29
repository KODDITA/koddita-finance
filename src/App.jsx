import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { Navbar } from './components/Navbar'
import { SplashScreen } from './components/SplashScreen'
import { Home } from './pages/Home'
import { Dashboard } from './pages/Dashboard'
import { Objetivos } from './pages/Objetivos'
import { Historial } from './pages/Historial'
import './App.css'

export default function App() {
    const [splash, setSplash] = useState(true)

    return (
        <ThemeProvider>
            {splash && <SplashScreen onFinish={() => setSplash(false)} />}
            {!splash && (
                <BrowserRouter>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/objetivos" element={<Objetivos />} />
                        <Route path="/historial" element={<Historial />} />
                    </Routes>
                </BrowserRouter>
            )}
        </ThemeProvider>
    )
}