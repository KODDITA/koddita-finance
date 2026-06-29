import { useEffect, useState } from 'react'
import logoUrl from '../assets/Logo_completo.png'

export function SplashScreen({ onFinish }) {
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        const t = setTimeout(() => {
            setVisible(false)
            onFinish()
        }, 4000)
        return () => clearTimeout(t)
    }, [onFinish])

    if (!visible) return null

    return (
        <div style={{
            position: 'fixed', inset: 0, display: 'flex', alignItems: 'center',
            justifyContent: 'center', zIndex: 9999,
            background: 'radial-gradient(ellipse 80% 60% at 50% 42%, #0a1428 0%, #02040f 70%)',
            fontFamily: 'system-ui, sans-serif',
        }}>
            <style>{`
        @keyframes ko-screen {
          0% { opacity:0; } 4% { opacity:1; } 72% { opacity:1; } 88% { opacity:0; } 100% { opacity:0; }
        }
        @keyframes ko-logo-reveal {
          0% { transform:scale(.5); opacity:0; } 8% { opacity:0; }
          24% { transform:scale(1.05); opacity:1; } 32% { transform:scale(1); }
          100% { transform:scale(1); opacity:1; }
        }
        @keyframes ko-glow {
          0%,100% { filter: drop-shadow(0 0 6px rgba(0,245,212,.55)) drop-shadow(0 0 22px rgba(0,245,212,.30)) drop-shadow(0 0 40px rgba(67,97,238,.22)); }
          50% { filter: drop-shadow(0 0 14px rgba(0,245,212,.95)) drop-shadow(0 0 40px rgba(0,245,212,.55)) drop-shadow(0 0 72px rgba(67,97,238,.50)); }
        }
        @keyframes ko-type {
          0%,34% { clip-path:inset(-45% 100% -45% -45%); }
          52% { clip-path:inset(-45% -45% -45% -45%); }
          100% { clip-path:inset(-45% -45% -45% -45%); }
        }
        @keyframes ko-caret {
          0%,50% { opacity:0; } 51%,60%,76% { opacity:1; } 55%,70%,80% { opacity:0; } 100% { opacity:0; }
        }
        @keyframes ko-tagline {
          0%,56% { opacity:0; transform:translateY(6px); }
          66% { opacity:.85; transform:translateY(0); }
          100% { opacity:.85; }
        }
        @keyframes ko-ring {
          0% { transform:scale(.4); opacity:0; } 14% { opacity:.6; }
          40% { transform:scale(1.9); opacity:0; } 100% { transform:scale(1.9); opacity:0; }
        }
      `}</style>

            <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 42%, rgba(0,245,212,.10), transparent 45%)', pointerEvents:'none' }} />

            <div style={{ position:'relative', display:'flex', flexDirection:'column', alignItems:'center', gap:0, animation:'ko-screen 4s cubic-bezier(.4,0,.2,1) forwards' }}>

                <div style={{ position:'relative', display:'flex', alignItems:'center', justifyContent:'center', width:240, height:142 }}>
                    <span style={{ position:'absolute', width:200, height:200, borderRadius:'50%', border:'1px solid rgba(0,245,212,.5)', animation:'ko-ring 4s ease-out forwards' }} />
                    <img src={logoUrl} alt="Koddita" style={{ width:240, height:'auto', transformOrigin:'center', animation:'ko-logo-reveal 4s cubic-bezier(.22,1,.36,1) forwards, ko-glow 1.8s ease-in-out infinite', filter:'invert(1)' }} />
                </div>

                <div style={{ display:'inline-flex', alignItems:'baseline', justifyContent:'center', whiteSpace:'nowrap', marginTop:34 }}>
                    <span style={{ fontSize:30, fontWeight:600, letterSpacing:'.18em', color:'#eaf6ff', textShadow:'0 0 18px rgba(0,245,212,.45)', animation:'ko-type 4s steps(15, end) forwards' }}>Koddita&nbsp;Finance</span>
                    <span style={{ display:'inline-block', width:2, height:30, marginLeft:6, background:'#00f5d4', boxShadow:'0 0 10px #00f5d4', transform:'translateY(4px)', animation:'ko-caret 4s steps(1) forwards' }} />
                </div>

                <div style={{ marginTop:16, fontSize:12, fontWeight:400, letterSpacing:'.42em', textTransform:'uppercase', color:'#5e7596', animation:'ko-tagline 4s ease forwards' }}>
                    Banking · Reimagined
                </div>
            </div>
        </div>
    )
}