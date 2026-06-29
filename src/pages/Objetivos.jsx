import { useState } from 'react'
import { useBudget } from '../hooks/useBudget'
import { Toast } from '../components/Toast'

export function Objetivos() {
    const { totals, symbol } = useBudget()
    const [objetivos, setObjetivos] = useState(() => {
        return JSON.parse(localStorage.getItem('objetivos') || '[]')
    })
    const [form, setForm] = useState({ nombre: '', meta: '', fecha: '' })
    const [toast, setToast] = useState(null)

    const guardar = (lista) => {
        setObjetivos(lista)
        localStorage.setItem('objetivos', JSON.stringify(lista))
    }

    const añadir = () => {
        if (!form.nombre || !form.meta) return
        const nuevo = { ...form, id: Date.now(), aportado: 0 }
        guardar([...objetivos, nuevo])
        setForm({ nombre: '', meta: '', fecha: '' })
    }

    const aportar = (id, cantidad) => {
        const lista = objetivos.map(o => {
            if (o.id !== id) return o
            const nuevo = { ...o, aportado: Math.min(o.aportado + cantidad, parseFloat(o.meta)) }
            if (nuevo.aportado >= parseFloat(o.meta)) {
                setToast({ message: `🎉 ¡Objetivo "${o.nombre}" completado!`, type: 'success' })
            }
            return nuevo
        })
        guardar(lista)
    }

    const eliminar = (id) => guardar(objetivos.filter(o => o.id !== id))

    const fmt = n => n.toLocaleString('es-ES', { minimumFractionDigits: 2 })

    return (
        <div className="page">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            <h2 className="page-title">Objetivos de ahorro</h2>

            <div className="obj-form">
                <input placeholder="Nombre del objetivo" value={form.nombre}
                       onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))} />
                <input type="number" placeholder={`Meta (${symbol})`} value={form.meta}
                       onChange={e => setForm(f => ({ ...f, meta: e.target.value }))} />
                <input type="date" value={form.fecha}
                       onChange={e => setForm(f => ({ ...f, fecha: e.target.value }))} />
                <button className="btn-add" onClick={añadir}>Añadir objetivo</button>
            </div>

            <div className="obj-list">
                {objetivos.length === 0 && (
                    <p className="list-empty">No tienes objetivos todavía. ¡Crea uno!</p>
                )}
                {objetivos.map(o => {
                    const percent = Math.min((o.aportado / parseFloat(o.meta)) * 100, 100)
                    const color = percent >= 100 ? '#00e5ff' : percent >= 50 ? '#2979ff' : '#ff3d71'
                    return (
                        <div key={o.id} className="obj-card">
                            <div className="obj-header">
                                <span className="obj-nombre">{o.nombre}</span>
                                {o.fecha && <span className="obj-fecha">Hasta {o.fecha}</span>}
                                <button className="btn-del" onClick={() => eliminar(o.id)}>✕</button>
                            </div>
                            <div className="obj-amounts">
                                <span style={{ color }}>{symbol}{fmt(o.aportado)}</span>
                                <span className="obj-meta">de {symbol}{fmt(parseFloat(o.meta))}</span>
                            </div>
                            <div className="limit-bar-track">
                                <div className="limit-bar-fill" style={{ width: `${percent}%`, background: color }} />
                            </div>
                            <div className="obj-actions">
                                {[10, 50, 100].map(n => (
                                    <button key={n} className="btn-aporte" onClick={() => aportar(o.id, n)}>
                                        +{symbol}{n}
                                    </button>
                                ))}
                                <span className="obj-percent">{Math.round(percent)}%</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}