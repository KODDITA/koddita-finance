import { useEffect } from 'react'

export function Toast({ message, type, onClose }) {
    useEffect(() => {
        const t = setTimeout(onClose, 3000)
        return () => clearTimeout(t)
    }, [onClose])

    return (
        <div className={`toast toast-${type}`}>
            <span>{message}</span>
            <button onClick={onClose}>✕</button>
        </div>
    )
}