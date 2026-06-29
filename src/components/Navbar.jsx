import { NavLink } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

export function Navbar() {
    const { dark, setDark } = useTheme()

    return (
        <nav className="navbar">
            <span className="nav-brand">KODDITA FINANCE</span>
            <div className="nav-links">
                <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Inicio</NavLink>
                <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Dashboard</NavLink>
                <NavLink to="/objetivos" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Objetivos</NavLink>
                <NavLink to="/historial" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Historial</NavLink>
            </div>
            <button className="theme-toggle" onClick={() => setDark(d => !d)}>
                {dark ? '☀️' : '🌙'}
            </button>
        </nav>
    )
}