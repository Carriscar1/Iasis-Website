'use client';

// Botão de download que se adapta ao aparelho de quem abriu a página:
// no Android baixa o APK, no computador mostra o QR code para abrir esta
// mesma página no celular, e no iPhone avisa que o app é só para Android.

import { useEffect, useState } from 'react';
import { APP } from '@/lib/config';
import { Download, Smartphone } from '../components/icons';

type Aparelho = 'android' | 'ios' | 'computador';

function detectar(): Aparelho {
  const ua = navigator.userAgent;
  if (/android/i.test(ua)) return 'android';
  // iPad recente se apresenta como Mac; o toque denuncia.
  const iPadOS = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
  if (/iphone|ipad|ipod/i.test(ua) || iPadOS) return 'ios';
  return 'computador';
}

export function DownloadPanel() {
  // Antes de detectar, renderiza o botão: funciona para todo mundo e evita
  // a página "pular" quando a detecção termina.
  const [aparelho, setAparelho] = useState<Aparelho | null>(null);
  const [baixou, setBaixou] = useState(false);

  useEffect(() => setAparelho(detectar()), []);

  if (aparelho === 'ios') {
    return (
      <div className="dl-notice">
        <Smartphone size={22} />
        <div>
          <strong>Por enquanto o app é só para Android.</strong>
          <p>
            Abra esta página num celular Android para instalar. A versão para
            iPhone depende da publicação na App Store.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={aparelho === 'computador' ? 'dl-panel dl-panel-qr' : 'dl-panel'}>
      <div className="dl-action">
        <a
          className="btn btn-primary btn-lg"
          href={APP.apkUrl}
          onClick={() => setBaixou(true)}
        >
          <Download size={20} /> Baixar para Android
        </a>
        <p className="dl-meta">
          Versão {APP.version} · {APP.minAndroid} · grátis para quem tem o dispenser
        </p>

        {baixou && aparelho === 'android' ? (
          <p className="dl-next" role="status">
            Download iniciado. Quando terminar, toque na notificação para instalar
            e siga os passos abaixo.
          </p>
        ) : null}
      </div>

      {aparelho === 'computador' ? (
        <div className="dl-qr">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/qr-app.svg" alt="QR code que abre esta página no celular" width={148} height={148} />
          <p>Aponte a câmera do celular para abrir esta página nele.</p>
        </div>
      ) : null}
    </div>
  );
}
