\# Challenge 2026 — Segurança Industrial e Visão Computacional



\## Sobre o projeto



Este projeto foi desenvolvido para o Challenge 2026 do curso de Engenharia de Computação e tem como tema a segurança industrial. O objetivo é auxiliar no registro e acompanhamento de ocorrências de risco em ambientes industriais.



\## Funcionalidades implementadas



\- Cadastro de ocorrências de risco.

\- Seleção do tipo de risco.

\- Registro do local e da descrição da ocorrência.

\- Consulta das ocorrências cadastradas.

\- Armazenamento dos dados por meio de uma API desenvolvida em Java com Spring Boot e banco de dados H2.



\## Tecnologias utilizadas



\### Frontend

\- React Native

\- Expo

\- JavaScript



\### Backend

\- Java

\- Spring Boot

\- API REST

\- Banco de dados H2



\## Estrutura do projeto



\- `sprint4-app`: aplicação frontend.

\- `sprint4-backend`: API backend e persistência dos dados.



\## Como executar



\### Backend



1\. Abra a pasta `sprint4-backend` em uma IDE compatível com projetos Java.

2\. Execute a aplicação Spring Boot.

3\. A API estará disponível em `http://localhost:8080/api/ocorrencias`.



\### Frontend



1\. Abra um terminal na pasta `sprint4-app`.

2\. Instale as dependências com `npm install`.

3\. Execute `npx expo start --web`.

4\. Acesse o endereço local indicado pelo Expo.



\## Limitações e próximos passos



A versão atual permite o registro e a consulta manual de ocorrências. A identificação automática de riscos por visão computacional, assim como alertas preventivos automatizados, depende de desenvolvimento e validação adicionais.



\## Considerações finais



A aplicação estabelece uma base para o gerenciamento de ocorrências de segurança industrial. Como evolução, poderão ser integrados recursos de visão computacional para identificar situações de risco e apoiar ações preventivas.



