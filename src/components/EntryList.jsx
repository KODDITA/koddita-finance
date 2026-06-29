import { Trash2 } from 'lucide-react'

const COLORS = {
    Vivienda: '#2979ff', Alimentación: '#00e5ff',
    Transporte: '#00b8d9', Ocio: '#ff3d71',
    Salud: '#00e676', Otros: '#3a5080',
}

export function EntryList({ entries, onRemove, symbol }) {
    const fmt = n => n.toLocaleString('es-ES', { minimumFractionDigits: 2 })

    if (entries.length === 0)
        return <p className="list-empty">No hay movimientos este mes.</p>

    return (
        <ul className="entry-list">
            {[...entries].reverse().map(e => (
                <li key={e.id} className={`entry-item ${e.type}`}>
                    <span className="dot" style={{ background: COLORS[e.category] }} />
                    <span className="entry-desc">{e.desc}</span>
                    <span className="entry-cat">{e.category}</span>
                    <span className="entry-amount">
            {e.type === 'income' ? '+' : '-'}{symbol}{fmt(e.amount)}
          </span>
                    <button className="btn-del" onClick={() => onRemove(e.id)}>
                        <Trash2 size={14} />
                    </button>
                </li>
            ))}
        </ul>
    )
}