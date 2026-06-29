import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'

const COLORS = {
    Vivienda: '#2979ff', Alimentación: '#00e5ff',
    Transporte: '#00b8d9', Ocio: '#ff3d71',
    Salud: '#00e676', Otros: '#3a5080',
}

export function DonutChart({ entries }) {
    const data = Object.entries(
        entries
            .filter(e => e.type === 'expense')
            .reduce((acc, e) => {
                acc[e.category] = (acc[e.category] || 0) + e.amount
                return acc
            }, {})
    ).map(([name, value]) => ({ name, value }))

    if (data.length === 0) return (
        <div className="chart-empty">Añade gastos para ver el gráfico</div>
    )

    return (
        <PieChart width={260} height={300}>
            <Pie data={data} cx={125} cy={110} innerRadius={70} outerRadius={105}
                 dataKey="value" paddingAngle={2}>
                {data.map(entry => (
                    <Cell key={entry.name} fill={COLORS[entry.name] || '#888'} />
                ))}
            </Pie>
            <Tooltip
                contentStyle={{ background: '#0f1523', border: '1px solid #1e2a40', borderRadius: 8, fontSize: 13 }}
                formatter={v => v.toLocaleString('es-ES', { minimumFractionDigits: 2 }) + ' €'}
            />
            <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: 12, paddingTop: 12 }}
            />
        </PieChart>
    )
}