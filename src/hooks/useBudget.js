import { useState, useEffect } from 'react'

const STORAGE_KEY = 'budget-entries'
const LIMIT_KEY = 'budget-limit'
const CURRENCY_KEY = 'budget-currency'

const RATES = { EUR: 1, USD: 1.08, GBP: 0.86 }
const SYMBOLS = { EUR: '€', USD: '$', GBP: '£' }

export function useBudget() {
    const [entries, setEntries] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) return JSON.parse(saved)
        const demo = [
            { id: 1, desc: 'Sueldo', amount: 2500, category: 'Otros', type: 'income', date: '2026-06' },
            { id: 2, desc: 'Alquiler', amount: 800, category: 'Vivienda', type: 'expense', date: '2026-06' },
            { id: 3, desc: 'Mercado', amount: 320, category: 'Alimentación', type: 'expense', date: '2026-06' },
            { id: 4, desc: 'Transporte', amount: 90, category: 'Transporte', type: 'expense', date: '2026-06' },
            { id: 5, desc: 'Gimnasio', amount: 45, category: 'Salud', type: 'expense', date: '2026-06' },
            { id: 6, desc: 'Netflix', amount: 18, category: 'Ocio', type: 'expense', date: '2026-06' },
            { id: 7, desc: 'Sueldo', amount: 2500, category: 'Otros', type: 'income', date: '2026-05' },
            { id: 8, desc: 'Alquiler', amount: 800, category: 'Vivienda', type: 'expense', date: '2026-05' },
            { id: 9, desc: 'Mercado', amount: 290, category: 'Alimentación', type: 'expense', date: '2026-05' },
        ]
        return demo
    })

    const [limit, setLimit] = useState(() => {
        return parseFloat(localStorage.getItem(LIMIT_KEY) || '0')
    })

    const [currency, setCurrency] = useState(() => {
        return localStorage.getItem(CURRENCY_KEY) || 'EUR'
    })

    const now = new Date()
    const [selectedMonth, setSelectedMonth] = useState(
        `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
    )

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
    }, [entries])

    useEffect(() => {
        localStorage.setItem(LIMIT_KEY, limit)
    }, [limit])

    useEffect(() => {
        localStorage.setItem(CURRENCY_KEY, currency)
    }, [currency])

    const convert = amount => parseFloat((amount * RATES[currency]).toFixed(2))

    const filteredEntries = entries.filter(e => e.date.startsWith(selectedMonth))

    const addEntry = (entry) => {
        setEntries(prev => [...prev, {
            ...entry,
            id: Date.now(),
            date: new Date().toISOString().slice(0, 7)
        }])
    }

    const removeEntry = (id) => {
        setEntries(prev => prev.filter(e => e.id !== id))
    }

    const totals = {
        income:  filteredEntries.filter(e => e.type === 'income').reduce((s, e) => s + convert(e.amount), 0),
        expense: filteredEntries.filter(e => e.type === 'expense').reduce((s, e) => s + convert(e.amount), 0),
    }
    totals.balance = totals.income - totals.expense

    const limitConverted = convert(limit)
    const limitPercent = limitConverted > 0 ? (totals.expense / limitConverted) * 100 : 0

    return {
        entries: filteredEntries,
        addEntry, removeEntry,
        totals, limit, setLimit,
        currency, setCurrency,
        symbol: SYMBOLS[currency],
        selectedMonth, setSelectedMonth,
        limitPercent, limitConverted,
        convert,
    }
}