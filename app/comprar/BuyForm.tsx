'use client';

import { useState } from 'react';
import { formatBRL } from '@/lib/config';
import { Lock } from '../components/icons';

export function BuyForm({ price, demo }: { price: number; demo: boolean }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleBuy(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !email.trim()) {
      setError('Preencha nome e e-mail para continuar.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone }),
      });
      const data = await res.json();
      if (!res.ok || !data.init_point) {
        throw new Error(data.error || 'Não foi possível iniciar o pagamento.');
      }
      window.location.href = data.init_point;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro inesperado.');
      setLoading(false);
    }
  }

  return (
    <div className="price-card">
      <div className="price-tag">
        <span className="val">{formatBRL(price)}</span>
        <span className="cond">à vista</span>
      </div>
      <div className="price-sub">
        {demo ? 'demonstração — sem cobrança real' : 'ou parcelado no cartão via Mercado Pago'}
      </div>

      <form onSubmit={handleBuy} style={{ marginTop: 24 }}>
        {error && (
          <div className="error-box">
            <Lock size={17} /> {error}
          </div>
        )}

        <div className="field">
          <label htmlFor="name">Nome completo</label>
          <input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome" autoComplete="name" />
        </div>
        <div className="field">
          <label htmlFor="email">E-mail</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="voce@email.com" autoComplete="email" />
        </div>
        <div className="field">
          <label htmlFor="phone">Telefone (opcional)</label>
          <input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(00) 00000-0000" autoComplete="tel" />
        </div>

        <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={loading} style={{ marginTop: 6 }}>
          {loading
            ? 'Processando…'
            : demo
              ? 'Finalizar compra (demonstração)'
              : 'Pagar com Mercado Pago'}
        </button>

        <div className="pay-methods">
          <Lock size={13} />
          {demo ? (
            <span>Demonstração — nenhum valor é cobrado</span>
          ) : (
            <>
              <span className="tag">Pix</span>
              <span className="tag">Cartão</span>
              <span className="tag">Boleto</span>
              <span>· processado pelo Mercado Pago</span>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
