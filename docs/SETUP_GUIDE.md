Aqui está o passo a passo de todos os comandos e ações importantes que executamos, desde a pasta vazia até o boilerplate completo.

---

### **Guia Definitivo: Do Zero ao Boilerplate React Profissional**

#### **Fase 1: Criação do Projeto e Configuração do Git**

*   **Objetivo:** Criar a estrutura inicial do projeto com Vite e colocar sob o controle de versão do Git com a identidade correta.

1.  **Criar o projeto com Vite:** (Executar em uma pasta geral, como `Documentos/Projetos`)
    ```bash
    npm create vite@latest finanzero -- --template react-ts
    ```

2.  **Entrar na pasta do projeto:**
    ```bash
    cd finanzero
    ```

3.  **Inicializar o repositório Git:**
    ```bash
    git init
    ```

4.  **Configurar a identidade do Git (APENAS para este projeto):**
    ```bash
    git config user.name "Seu Nome Pessoal"
    git config user.email "seu-email-pessoal@exemplo.com"
    ```

5.  **Instalar as dependências iniciais:**
    ```bash
    npm install
    ```

6.  **(Ação Manual)** Criar um repositório vazio no GitHub chamado `finanzero`.

7.  **Fazer o primeiro commit e conectar ao GitHub:**
    ```bash
    git add .
    git commit -m "feat: Initial project setup with Vite"
    git branch -M main
    git remote add origin https://github.com/seu-usuario/finanzero.git
    git push -u origin main
    ```

---

#### **Fase 2: Instalação e Configuração do Tailwind CSS**

*   **Objetivo:** Adicionar o framework de estilização ao projeto.

1.  **Desinstalar versões experimentais (se existirem):**
    ```bash
    npm uninstall tailwindcss postcss autoprefixer
    ```

2.  **Instalar a versão estável do Tailwind (v3) e suas dependências:**
    ```bash
    npm install -D tailwindcss@^3 postcss autoprefixer
    ```

3.  **(Ação Manual)** Adicionar um script `tailwind:init` ao arquivo `package.json`:
    ```json
      "scripts": {
        ...
        "tailwind:init": "tailwindcss init -p"
      },
    ```

4.  **Executar o script para criar os arquivos de configuração:**
    ```bash
    npm run tailwind:init
    ```

5.  **(Ação Manual)** Configurar os arquivos:
    *   Editar `tailwind.config.js` para adicionar os caminhos no `content`.
    *   Limpar o `src/index.css` e adicionar as três diretivas `@tailwind`.

6.  **Fazer o commit da configuração do Tailwind:**
    ```bash
    git add .
    git commit -m "feat: Add and configure Tailwind CSS"
    git push
    ```

---

#### **Fase 3: Configuração do Shadcn/ui e "Import Alias"**

*   **Objetivo:** Preparar o projeto para a biblioteca de componentes Shadcn/ui, configurando os atalhos de importação.

1.  **(Ação Manual)** Configurar os "aliases" (atalhos de importação):
    *   Editar o `vite.config.ts` para adicionar a seção `resolve.alias`.
    *   Editar o `tsconfig.json` para adicionar as seções `compilerOptions.baseUrl` e `compilerOptions.paths`.

2.  **Inicializar o Shadcn/ui (usando o comando mais recente):**
    ```bash
    npx shadcn@latest init
    ```
    *(Seguir as perguntas do terminal).*

3.  **Adicionar o primeiro componente para teste e criação da pasta `components`:**
    ```bash
    npx shadcn@latest add button
    ```

---

#### **Fase 4: Adição das Bibliotecas Essenciais**

*   **Objetivo:** Instalar Zod (validação) e Axios (requisições HTTP) para completar a base do boilerplate.

1.  **Instalar Zod e Axios como dependências de produção:**
    ```bash
    npm install zod axios
    ```

2.  **Fazer o commit das novas dependências:**
    ```bash
    git add .
    git commit -m "feat: Add Zod and Axios for validation and data fetching"
    git push
    ```

---

#### **Fase 5: Criação do Boilerplate a partir do Projeto Atual**

*   **Objetivo:** Usar o estado atual do projeto para criar um template reutilizável em um novo repositório.

1.  **(Ação Manual)** Fazer a limpeza do projeto (editar `App.tsx`, `README.md`, etc.).

2.  **Salvar a limpeza em um commit local:**
    ```bash
    git add .
    git commit -m "chore: Prepare project for boilerplate creation"
    ```

3.  **(Ação Manual)** Criar um novo repositório vazio no GitHub (ex: `react-vite-tailwind-boilerplate`).

4.  **Mudar o "destino" do Git para o novo repositório:**
    ```bash
    git remote set-url origin https://github.com/seu-usuario/SEU_BOILERPLATE.git
    ```

5.  **Enviar o código para o repositório do boilerplate:**
    ```bash
    git push -u origin main
    ```

6.  **(Ação Manual)** Nas configurações do novo repositório no GitHub, marcar a opção **"Template repository"**.

7.  **Restaurar o projeto `finanzero` para seu estado original:**
    ```bash
    # Apontar de volta para o repositório do finanzero
    git remote set-url origin https://github.com/seu-usuario/finanzero.git

    # Desfazer o último commit de limpeza (CUIDADO: este comando apaga alterações)
    git reset --hard HEAD~1
    ```

---
