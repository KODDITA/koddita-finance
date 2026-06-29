import { useBudget } from '../hooks/useBudget'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'

const MONTHS = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']

export function Dashboard() {
    const { symbol } = useBudget()
    const entries = JSON.parse(localStorage.getItem('budget-entries') || '[]')
    
    const byMonth = Array.from({ length: 12 }, (_, i) => {
        const month = String(i + 1).padStart(2, '0')
        const year = new Date().getFullYear()
        const key = `${year}-${month}`
        const inc = entries.filter(e => e.type === 'income' && e.date?.startsWith(key)).reduce((s, e) => s + e.amount, 0)
        const exp = entries.filter(e => e.type === 'expense' && e.date?.startsWith(key)).reduce((s, e) => s + e.amount, 0)
        return { mes: MONTHS[i], ingresos: inc, gastos: exp, balance: inc - exp }
    })

    const fmt = v => `${symbol}${v.toLocaleString('es-ES')}`

    return (
        <div className="page">
            <h2 className="page-title">Dashboard anual</h2>

            <div className="chart-card">
                <p className="chart-title">Ingresos vs Gastos por mes</p>
                <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={byMonth} barGap={4}>
                        <XAxis dataKey="mes" tick={{ fontSize: 12, fill: 'var(--muted)' }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 12, fill: 'var(--muted)' }} axisLine={false} tickLine={false} tickFormatter={fmt} />
                        <Tooltip
                            contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 13 }}
                            formatter={v => fmt(v)}
                        />
                        <Legend wrapperStyle={{ fontSize: 13 }} />
                        <Bar dataKey="ingresos" fill="#00e5ff" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="gastos" fill="#ff3d71" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="chart-card">
                <p className="chart-title">Tendencia del balance</p>
                <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={byMonth}>
                        <XAxis dataKey="mes" tick={{ fontSize: 12, fill: 'var(--muted)' }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 12, fill: 'var(--muted)' }} axisLine={false} tickLine={false} tickFormatter={fmt} />
                        <Tooltip
                            contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 13 }}
                            formatter={v => fmt(v)}
                        />
                        <Line type="monotone" dataKey="balance" stroke="#2979ff" strokeWidth={2} dot={{ fill: '#2979ff', r: 4 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}