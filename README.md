# Gestão de Veículos App

Este é um aplicativo móvel desenvolvido com React Native e Expo para o gerenciamento de uma frota de veículos. Ele permite cadastrar, visualizar, editar, filtrar e excluir veículos, consumindo uma API local simulada com `json-server`.

## 📋 Funcionalidades

- **Listagem e Filtragem:** Visualize todos os veículos cadastrados e filtre a lista por placa ou modelo.
- **CRUD Completo:**
  - **Cadastro:** Adicione novos veículos ao sistema.
  - **Visualização:** Veja os detalhes completos de cada veículo.
  - **Edição:** Atualize as informações de um veículo existente.
  - **Exclusão:** Remova veículos do sistema com um diálogo de confirmação.
- **Interface Moderna:** Interface de usuário limpa e funcional, construída com a biblioteca `react-native-paper`.
- **Validação de Formulário:** Campos obrigatórios e validação de entrada para garantir a consistência dos dados.

## 🚀 Tecnologias Utilizadas

- **React Native:** Framework para desenvolvimento de aplicativos móveis multiplataforma.
- **Expo:** Plataforma e conjunto de ferramentas para facilitar o desenvolvimento e a build de apps React Native.
- **React Navigation:** Para gerenciamento da navegação e fluxo entre as telas.
- **React Native Paper:** Biblioteca de componentes de UI baseada no Material Design.
- **Axios:** Cliente HTTP para realizar a comunicação com a API.
- **JSON Server:** Para simular uma API RESTful localmente.

## ⚙️ Pré-requisitos

Antes de começar, você precisará ter o seguinte instalado em sua máquina:
- [Node.js](https://nodejs.org/en/) (versão LTS recomendada)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- **Opcional:** Um emulador Android/iOS ou um dispositivo físico com o app [Expo Go](https://expo.dev/go) instalado.

## 🏁 Como Executar o Projeto

Siga os passos abaixo para rodar a aplicação localmente.

### 1. Backend (API)

O backend é simulado usando `json-server` e o arquivo `db.json` localizado na pasta `gestao-veiculos-backend`.

1.  **Navegue até a pasta do backend:**
    ```bash
    cd ../gestao-veiculos-backend
    ```

2.  **Inicie o servidor:**
    ```bash
    npx json-server --watch db.json
    ```
    O servidor estará rodando em `http://localhost:3000`.

> **⚠️ Importante:** Para que o aplicativo no seu celular (usando Expo Go) consiga acessar a API, você precisa alterar o endereço no arquivo `src/services/api.js` de `localhost` para o **endereço de IP da sua máquina na rede local**. Ex: `http://192.168.1.10:3000`.

### 2. Frontend (Aplicativo)

1.  **Navegue até a pasta do frontend:**
    ```bash
    cd gestao-veiculos-app
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Inicie o projeto:**
    ```bash
    npx expo start
    ```

4.  **Acesse o app:**
    - Um painel de controle do Metro Bundler abrirá no seu navegador.
    - Escaneie o QR Code exibido com o aplicativo **Expo Go** no seu celular.
    - Alternativamente, você pode executar em um emulador pressionando `a` (Android) ou `i` (iOS) no terminal.

## 📜 Scripts Disponíveis

Na pasta `gestao-veiculos-app`, você pode executar os seguintes scripts:

- `npm start`: Inicia o Metro Bundler para desenvolvimento.
- `npm run android`: Inicia o app em um emulador ou dispositivo Android conectado.
- `npm run ios`: Inicia o app em um simulador ou dispositivo iOS conectado.
- `npm run web`: Inicia a versão web do aplicativo (pode requerer configurações adicionais).
- `npm run lint`: Executa o linter para verificar a qualidade do código.
