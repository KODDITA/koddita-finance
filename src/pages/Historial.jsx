import { useState } from 'react'
import { useBudget } from '../hooks/useBudget'
import { Trash2 } from 'lucide-react'

const CATEGORIES = ['Todas', 'Vivienda', 'Alimentación', 'Transporte', 'Ocio', 'Salud', 'Otros']

export function Historial() {
    const { entries, removeEntry, symbol } = useBudget()
    const [search, setSearch] = useState('')
    const [cat, setCat] = useState('Todas')
    const [tipo, setTipo] = useState('todos')

    const fmt = n => n.toLocaleString('es-ES', { minimumFractionDigits: 2 })

    const filtered = [...entries]
        .reverse()
        .filter(e => e.desc.toLowerCase().includes(search.toLowerCase()))
        .filter(e => cat === 'Todas' || e.category === cat)
        .filter(e => tipo === 'todos' || e.type === tipo)

    return (
        <div className="page">
            <h2 className="page-title">Historial completo</h2>

            <div className="historial-filters">
                <input
                    placeholder="Buscar..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="historial-search"
                />
                <select value={cat} onChange={e => setCat(e.target.value)}>
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
                <div className="type-toggle">
                    <button className={tipo === 'todos' ? 'active' : ''} onClick={() => setTipo('todos')}>Todos</button>
                    <button className={tipo === 'expense' ? 'active' : ''} onClick={() => setTipo('expense')}>Gastos</button>
                    <button className={tipo === 'income' ? 'active' : ''} onClick={() => setTipo('income')}>Ingresos</button>
                </div>
            </div>

            <div className="historial-count">
                {filtered.length} movimiento{filtered.length !== 1 ? 's' : ''}
            </div>

            {filtered.length === 0 ? (
                <p className="list-empty">No hay movimientos que coincidan.</p>
            ) : (
                <ul className="entry-list">
                    {filtered.map(e => (
                        <li key={e.id} className={`entry-item ${e.type}`}>
                            <span className="entry-desc">{e.desc}</span>
                            <span className="entry-cat">{e.category}</span>
                            <span className="entry-cat">{e.date}</span>
                            <span className="entry-amount">
                {e.type === 'income' ? '+' : '-'}{symbol}{fmt(e.amount)}
              </span>
                            <button className="btn-del" onClick={() => removeEntry(e.id)}>
                                <Trash2 size={14} />
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}