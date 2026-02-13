
# 🚀 Click & Earn - Guia de Lançamento (clickelucre.com)

Este projeto foi construído com foco total em conversão (CRO) e está pronto para receber tráfego de alta escala.

## 🛠 Checklist Pré-Lançamento

1.  **API Key**: Certifique-se de que a variável de ambiente `API_KEY` está configurada na sua plataforma de hospedagem. Sem ela, o Assistente de IA não responderá aos leads.
2.  **Pixel & Analytics**: No arquivo `index.html`, substitua `G-XXXXXXXXXX` pelo seu ID do Google Analytics e `PIXEL_ID` pelo seu ID do Facebook Pixel.
3.  **Links de Checkout**: No arquivo `pages/SalesPage.tsx`, substitua o link `https://pay.exemplo.com/...` pelo link real da sua oferta na Hotmart/Kiwify.
4.  **WhatsApp**: Pesquise por `wa.me/5500000000000` em todos os arquivos e substitua pelo seu número comercial.

## 🌍 Publicando no seu Domínio

### Opção A: Deploy Rápido (Vercel)
1. Conecte seu repositório GitHub à [Vercel](https://vercel.com).
2. O arquivo `vercel.json` já está configurado para gerenciar as rotas do React.
3. Adicione seu domínio `clickelucre.com` nas configurações do projeto.

### Opção B: Deploy Manual
1. Execute o comando de build (se estiver em ambiente local): `npm run build`.
2. Suba a pasta `dist` (ou os arquivos gerados) para o seu servidor.

## 📈 Estratégia de Tráfego Sugerida
- **Fonte**: Facebook/Instagram Ads.
- **Destino**: `clickelucre.com/captura?utm_source=facebook&utm_medium=paid`
- **Objetivo**: Conversão (Lead).
- **Funil**: Captura -> Página de Agradecimento (com oferta de upsell) -> Página de Vendas Completa.

---
*Desenvolvido com foco em alta performance e lucro digital.*
