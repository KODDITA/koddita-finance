export function Controls({ selectedMonth, setSelectedMonth, limit, setLimit, symbol, currency, setCurrency, limitPercent }) {

    const months = []
    const now = new Date()
    for (let i = 0; i < 6; i++) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
        const value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
        const label = d.toLocaleString('es-ES', { month: 'long', year: 'numeric' })
        months.push({ value, label })
    }

    const alertColor =
        limitPercent >= 100 ? '#ff3d71' :
            limitPercent >= 80  ? '#ffaa00' :
                '#00e5ff'

    return (
        <div className="controls">
            <div className="controls-row">
                <div className="control-group">
                    <label className="control-label">Mes</label>
                    <select value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)}>
                        {months.map(m => (
                            <option key={m.value} value={m.value}>{m.label}</option>
                        ))}
                    </select>
                </div>

                <div className="control-group">
                    <label className="control-label">Moneda</label>
                    <select value={currency} onChange={e => setCurrency(e.target.value)}>
                        <option value="EUR">EUR €</option>
                        <option value="USD">USD $</option>
                        <option value="GBP">GBP £</option>
                    </select>
                </div>

                <div className="control-group">
                    <label className="control-label">Límite mensual ({symbol})</label>
                    <input
                        type="number"
                        placeholder="0"
                        value={limit || ''}
                        onChange={e => setLimit(parseFloat(e.target.value) || 0)}
                    />
                </div>
            </div>

            {limit > 0 && (
                <div className="limit-bar-wrap">
                    <div className="limit-bar-track">
                        <div
                            className="limit-bar-fill"
                            style={{
                                width: `${Math.min(limitPercent, 100)}%`,
                                background: alertColor,
                            }}
                        />
                    </div>
                    <span className="limit-label" style={{ color: alertColor }}>
            {limitPercent >= 100
                ? 'Límite superado'
                : limitPercent >= 80
                    ? `Atención: ${Math.round(limitPercent)}% del límite`
                    : `${Math.round(limitPercent)}% del límite`}
          </span>
                </div>
            )}
        </div>
    )
}