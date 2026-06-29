export function MetricCard({ label, amount, color, symbol }) {
    const fmt = n => Math.abs(n).toLocaleString('es-ES', { minimumFractionDigits: 2 })
    return (
        <div className={`metric-card ${color}`}>
            <span className="metric-label">{label}</span>
            <span className="metric-amount">
        {amount < 0 ? '-' : ''}{symbol}{fmt(amount)}
      </span>
        </div>
    )
}