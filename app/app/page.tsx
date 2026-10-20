import type { Metadata } from 'next';
import Link from 'next/link';
import { DownloadPanel } from './DownloadPanel';
import { Shield, Bell, Repeat } from '../components/icons';

export const metadata: Metadata = {
  title: 'Baixar o app',
  description:
    'Instale o aplicativo IASIS no seu celular Android direto por esta página, sem precisar da Play Store.',
};

const PASSOS = [
  {
    titulo: 'Baixe o arquivo',
    texto: 'Toque em “Baixar para Android”. O download começa na hora, sem sair desta página.',
  },
  {
    titulo: 'Permita a instalação',
    texto:
      'Ao abrir o arquivo, o Android pergunta se o navegador pode instalar apps. Toque em ' +
      '“Configurações”, ative “Permitir desta fonte” e volte. Isso só acontece na primeira vez.',
  },
  {
    titulo: 'Instale',
    texto:
      'Toque em “Instalar”. O IASIS aparece na tela inicial e na lista de apps, como qualquer ' +
      'outro aplicativo do celular.',
  },
  {
    titulo: 'Crie sua conta',
    texto:
      'Quem comprou o dispenser cria a conta com o código de ativação que veio na compra. O ' +
      'paciente entra depois, vinculado ao cuidador.',
  },
];

export default function AppPage() {
  return (
    <>
      <section className="section dl-hero">
        <div className="container container-narrow center">
          <span className="eyebrow">Aplicativo IASIS</span>
          <h1 className="dl-title">Instale o app no seu celular</h1>
          <p className="lead" style={{ marginTop: 16 }}>
            O aplicativo que conversa com o dispenser, avisa a hora de cada dose e mantém
            seus cuidadores informados. Instale direto por aqui.
          </p>
          <DownloadPanel />
        </div>
      </section>

      <section className="section paper-2">
        <div className="container container-narrow">
          <div className="section-head">
            <span className="eyebrow">Passo a passo</span>
            <h2>Instalando em menos de um minuto</h2>
          </div>
          <div className="flow">
            {PASSOS.map((p, i) => (
              <div key={p.titulo} className="flow-step">
                <span className="flow-idx">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h4>{p.titulo}</h4>
                  <p>{p.texto}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-3">
            <div className="card">
              <div className="card-ic"><Shield size={24} /></div>
              <h3>O Android mostrou um aviso?</h3>
              <p>
                O Play Protect avisa sobre qualquer app instalado fora da Play Store. Toque em
                “Mais detalhes” e depois em “Instalar mesmo assim”.
              </p>
            </div>
            <div className="card">
              <div className="card-ic"><Bell size={24} /></div>
              <h3>Por que não está na Play Store?</h3>
              <p>
                O IASIS está em fase de protótipo. Enquanto a publicação na loja não sai, o app é
                distribuído por esta página, de graça para quem tem o dispenser.
              </p>
            </div>
            <div className="card">
              <div className="card-ic"><Repeat size={24} /></div>
              <h3>Como atualizar</h3>
              <p>
                Quando sair uma versão nova, baixe de novo por aqui e instale por cima. Seus
                remédios e seu histórico continuam na sua conta.
              </p>
            </div>
          </div>

          <p className="center muted mt-40">
            Ainda não tem o dispenser?{' '}
            <Link href="/comprar" style={{ color: 'var(--signal-2)', fontWeight: 600 }}>
              Conheça e adquira o seu
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
