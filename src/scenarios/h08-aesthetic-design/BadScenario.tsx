import { useState } from 'react';
import type { ScenarioProps } from '../../types/game';
import s from '../scenario.module.css';

// BAD: cluttered page — hard to find the CTA
export function BadScenario({ onTaskComplete }: ScenarioProps) {
  const [popupDismissed, setPopupDismissed] = useState(false);

  return (
    <div className={s.app} style={{ position:'relative' }}>
      <div className={s.toolbar}>
        <span>🛍️</span>
        <span className={s.toolbarTitle}>MegaShop — Laptop XZ Pro</span>
      </div>
      <div style={{ padding:16, display:'flex', flexDirection:'column', gap:10, overflow:'auto' }}>

        {/* Newsletter banner */}
        <div style={{ background:'#fef9c3', border:'1px solid #fde047', borderRadius:8, padding:'10px 14px', fontSize:12 }}>
          📣 Subscribe to our newsletter and get 5% off! Enter your email below — limited time only!
          <div style={{ display:'flex', gap:6, marginTop:6 }}>
            <input style={{ flex:1, padding:'4px 8px', border:'1px solid #d1d5db', borderRadius:4, fontSize:12 }} placeholder="email@example.com" />
            <button style={{ padding:'4px 10px', background:'#f59e0b', border:'none', borderRadius:4, fontSize:12, cursor:'pointer' }}>Subscribe</button>
          </div>
        </div>

        {/* Related products carousel */}
        <div style={{ background:'#eff6ff', border:'1px solid #bfdbfe', borderRadius:8, padding:'10px 14px', fontSize:12 }}>
          🔥 Hot deals you might like: Gaming Chair | Wireless Mouse | USB Hub | Monitor Stand | Webcam | Headset | Keyboard
        </div>

        {/* Main product (buried) */}
        <div style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:8, padding:14 }}>
          <p style={{ fontWeight:600, fontSize:14 }}>Laptop XZ Pro</p>
          <p style={{ fontSize:12, color:'#64748b', marginTop:4 }}>16GB RAM · 512GB SSD · 14" Display</p>
          <p style={{ fontWeight:700, fontSize:16, color:'#6c63ff', marginTop:6 }}>$1,299</p>
          {/* CTA is tiny and buried */}
          <button
            onClick={onTaskComplete}
            style={{ marginTop:8, padding:'6px 14px', background:'#6c63ff', color:'#fff', border:'none', borderRadius:6, fontSize:12, cursor:'pointer' }}
          >
            Buy Now
          </button>
        </div>

        {/* Promo banner */}
        <div style={{ background:'#fdf2f8', border:'1px solid #f0abfc', borderRadius:8, padding:'10px 14px', fontSize:12 }}>
          💜 Use code SAVE20 for 20% off on orders over $500! Also check our clearance section for mega deals!
        </div>

        {/* Social proof noise */}
        <div style={{ background:'#f0fdf4', border:'1px solid #86efac', borderRadius:8, padding:'10px 14px', fontSize:12 }}>
          ⭐ 4.7/5 from 2,341 reviews · 🏆 Best Seller · 📦 Free Shipping · 🔄 30-day returns · 🛡️ 2-year warranty · 💳 0% APR
        </div>
      </div>

      {/* Newsletter popup */}
      {!popupDismissed && (
        <div style={{
          position:'absolute', inset:0, background:'rgba(0,0,0,0.5)',
          display:'flex', alignItems:'center', justifyContent:'center', zIndex:100
        }}>
          <div style={{ background:'#fff', borderRadius:12, padding:24, maxWidth:260, textAlign:'center' }}>
            <p style={{ fontWeight:700, marginBottom:8 }}>Wait! Before you go...</p>
            <p style={{ fontSize:12, color:'#64748b', marginBottom:12 }}>Sign up for exclusive deals and never miss a sale!</p>
            <button
              onClick={() => setPopupDismissed(true)}
              style={{ fontSize:11, color:'#94a3b8', background:'none', border:'none', cursor:'pointer', textDecoration:'underline' }}
            >
              No thanks, I don't like saving money
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
