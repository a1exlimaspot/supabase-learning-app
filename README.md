# Supabase Learning App

Projeto básico de aprendizado: Next.js 16 (App Router) + Supabase (Auth + Postgres com Row Level Security).

## O que já está pronto

- **Auth por e-mail/senha**: cadastro e login em [`/login`](src/app/login/page.tsx), usando Server Actions ([`src/app/login/actions.ts`](src/app/login/actions.ts)).
- **Confirmação de e-mail**: rota [`/auth/confirm`](src/app/auth/confirm/route.ts) que valida o link enviado pelo Supabase.
- **Sessão via cookies (SSR)**: três clients Supabase em [`src/lib/supabase/`](src/lib/supabase/):
  - `client.ts` — para uso em Client Components.
  - `server.ts` — para Server Components e Server Actions.
  - `proxy.ts` — usado pelo [`src/proxy.ts`](src/proxy.ts) (equivalente ao antigo `middleware.ts` no Next.js 16) para renovar a sessão a cada request e proteger `/todos`.
- **CRUD de exemplo**: página [`/todos`](src/app/todos/page.tsx) — cada usuário só vê e edita suas próprias tarefas, garantido pelas policies de **Row Level Security** da tabela `todos` (ver [`supabase/migrations/0001_create_todos.sql`](supabase/migrations/0001_create_todos.sql)).

Projeto Supabase conectado: **IA_SUPABASE** (`sa-east-1`).

## Rodando localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000. As credenciais do Supabase já estão em `.env.local` (não commitado — veja `.gitignore`).

## Importante: confirmação de e-mail

Por padrão, o Supabase exige confirmar o e-mail antes do primeiro login. Ao criar uma conta pela tela de login, você vai receber um e-mail de confirmação de verdade. Se quiser testar mais rápido sem esperar e-mails durante o aprendizado, você pode desativar isso em:

**Supabase Dashboard → Authentication → Sign In / Providers → Email → "Confirm email"** (desligar apenas em ambiente de estudo/dev).

## Estrutura pensada para escalar

- **RLS em toda tabela nova**: sempre habilite `enable row level security` e escreva as policies junto da migration — é o padrão usado aqui e o que permite abrir a API do Supabase direto pro client com segurança.
- **Migrations versionadas**: as mudanças de schema ficam em `supabase/migrations/`. Para gerenciar isso com o [Supabase CLI](https://supabase.com/docs/guides/local-development) no futuro:
  ```bash
  npx supabase init
  npx supabase link --project-ref nwmqmirbvbfoghjkugve
  npx supabase db pull   # sincroniza o schema atual
  ```
  Isso te dá ambiente local (Docker) + diffs de schema + deploy controlado, essencial quando o time crescer.
- **Tipos gerados automaticamente**: quando o schema crescer, gere tipos TypeScript a partir do banco (evita dessincronia entre banco e código):
  ```bash
  npx supabase gen types typescript --project-id nwmqmirbvbfoghjkugve > src/lib/supabase/database.types.ts
  ```
- **Próximos recursos do Supabase pra explorar, na ordem que costuma fazer sentido**:
  1. Mais tabelas + relacionamentos (sempre com RLS).
  2. **Storage** (upload de arquivos/imagens) com policies de bucket.
  3. **Edge Functions** para lógica de servidor que não cabe em RLS (webhooks, integrações externas).
  4. **Realtime** (subscriptions) se precisar de UI colaborativa/ao vivo.
- **Deploy**: este app Next.js sobe direto na [Vercel](https://vercel.com) (mesmas variáveis de ambiente do `.env.local`). O banco Supabase já está hospedado — não precisa mudar nada nele para ir a produção, só revisar as policies de RLS.

## Aviso de segurança pré-existente

O advisor do Supabase apontou um aviso (`WARN`) sobre uma função `public.rls_auto_enable()` que já existia no projeto antes desta configuração — não foi criada por este setup. Não mexi nela; se quiser revisar, veja: https://supabase.com/docs/guides/database/database-linter?lint=0028_anon_security_definer_function_executable
