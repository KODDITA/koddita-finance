import { useState } from 'react'
import { useBudget } from '../hooks/useBudget'
import { MetricCard } from '../components/MetricCard'
import { EntryForm } from '../components/EntryForm'
import { EntryList } from '../components/EntryList'
import { DonutChart } from '../components/DonutChart'
import { Controls } from '../components/Controls'
import { Toast } from '../components/Toast'

export function Home() {
    const {
        entries, addEntry, removeEntry,
        totals, limit, setLimit,
        currency, setCurrency, symbol,
        selectedMonth, setSelectedMonth,
        limitPercent,
    } = useBudget()

    const [toast, setToast] = useState(null)

    const handleAdd = (entry) => {
        addEntry(entry)
        if (limitPercent >= 80) {
            setToast({ message: '⚠️ Te estás acercando al límite mensual', type: 'warning' })
        }
        if (limitPercent >= 100) {
            setToast({ message: '🚨 Has superado el límite mensual', type: 'danger' })
        }
    }

    return (
        <div className="page">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            <Controls
                selectedMonth={selectedMonth}
                setSelectedMonth={setSelectedMonth}
                limit={limit}
                setLimit={setLimit}
                symbol={symbol}
                currency={currency}
                setCurrency={setCurrency}
                limitPercent={limitPercent}
            />

            <div className="metrics">
                <MetricCard label="Ingresos" amount={totals.income} color="income" symbol={symbol} />
                <MetricCard label="Balance" amount={totals.balance} color={totals.balance >= 0 ? 'income' : 'expense'} symbol={symbol} />
                <MetricCard label="Gastos" amount={totals.expense} color="expense" symbol={symbol} />
            </div>

            <EntryForm onAdd={handleAdd} symbol={symbol} />

            <div className="bottom">
                <DonutChart entries={entries} />
                <EntryList entries={entries} onRemove={removeEntry} symbol={symbol} />
            </div>

            <button className="btn-export" onClick={() => window.print()}>
                Exportar PDF
            </button>
        </div>
    )
}