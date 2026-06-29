import { useState } from 'react'
import { PlusCircle } from 'lucide-react'

const CATEGORIES = ['Vivienda','Alimentación','Transporte','Ocio','Salud','Otros']

export function EntryForm({ onAdd, symbol }) {
    const [form, setForm] = useState({ desc: '', amount: '', category: 'Alimentación', type: 'expense' })

    const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

    const submit = e => {
        e.preventDefault()
        if (!form.desc || !form.amount || isNaN(form.amount)) return
        onAdd({ ...form, amount: parseFloat(form.amount) })
        setForm(f => ({ ...f, desc: '', amount: '' }))
    }

    return (
        <form className="entry-form" onSubmit={submit}>
            <input name="desc" placeholder="Descripción" value={form.desc} onChange={handle} />
            <input name="amount" type="number" placeholder={`Cantidad (${symbol})`} step="0.01"
                   value={form.amount} onChange={handle} />
            <select name="category" value={form.category} onChange={handle}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
            <div className="type-toggle">
                <button type="button" className={form.type === 'expense' ? 'active' : ''}
                        onClick={() => setForm(f => ({ ...f, type: 'expense' }))}>Gasto</button>
                <button type="button" className={form.type === 'income' ? 'active' : ''}
                        onClick={() => setForm(f => ({ ...f, type: 'income' }))}>Ingreso</button>
            </div>
            <button type="submit" className="btn-add">
                <PlusCircle size={16} /> Añadir
            </button>
        </form>
    )
}