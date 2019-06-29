### Serviço de análise e controlo de qualidade do serviço de helpdesk
| Atributo           | Valor  |
|--------------------|---------------------------------------------------------------------------------------------------------------------------|
| UC | Programação Web (PW)  |
| Curso              | Mestrado em Engenharia Informática (MEI) |
| Instituição        | Instituto Politécnico do Cávado e do Ave (IPCA) |
| Autoria            | Fernando Correia (a11199@alunos.ipca.pt), Paula Brás (a14474@alunos.ipca.pt), Rui Carvalho (a17786@alunos.ipca.pt), Silvana Chagas (a15977@alunos.ipca.pt)  |
| Data               | 2019-06-29|
### Introdução e objetivos
Este trabalho foi realizado no âmbito da UC de Programação Web, do mestrado de Engenharia Informática, do Instituto Politécnico do Cávado e do Ave, com o objetivo de ter-se uma aplicação front-end, desenvolvida em React que permita aos utilizadores gerir um Helpdesk, no que diz respeito aos indicadores de análise e controle da qualidade do serviços executado. Os dados são provenientes de backend com base em uma API REST em NodeJS, também desenvolvida para o trabalho, com a informação proveniente de um repositório fornecdido pelo professor. Estes são armazenados numa base de dados em MongoDB. Para suportar esta API e de forma a documentar todas as funcionalidades assim como testar as mesmas foi utilizada a framework Swagger.O front-end apresenta indicadores prefefinidios no trabalho, de forma organizada e amigável ao utilizador. O utilizador por conseguinte só consegue aceder ao ambiente se efeturar um login (ou criar um) Para concluir a solução estará disponível na forma de container, com uso de Docker.
### Lista de requisitos funcionais e não funcionais 
###### Servidor
* Incluir uma base de dados para guardar toda a informação oriunda das API
REST disponibilizada pela plataforma de helpdesk e posteriormente
disponibilizar a informação para os mesmos;
* Desenvolver serviços de acordo com as permissões dos pedidos de informação
realizadas pelas aplicações clientes;
* Documentação da API de serviços disponibilizados.
* Publicação em ambiente Cloud dos diferentes serviços.
###### Backend
Nas Issues
* Consultar e listar issues
* Identificador e nome do projeto 
* Número, nome e email do cliente
* Número e nome da incidência
* Identificador e nome da prioridade
* Número, nome e email do colaborador
* Data da criação, data do fecho, subject, descrição do pedido
* Tempo de resposta da resolução do pedido

Criar utilizadores
* Registar utilizadores
* Efetuar login

Enviar um email ao cliente que criou a respetiva incidência
Solicitar a sua opinião sobre a qualidade do serviço prestado.

###### Frontend
* Login do utilizador
* Registar utilizador
* Indicadores globais, por colaborador, por produto e os temporais são definidos entre datas de início e fim.
* Indicadores globais sobre qualidade (número total de pedidos, percentagem de pedidos sem avaliação pelo cliente, tempo médio de resposta, por cada nível prioridade, avaliação média da qualidade, desvio padrão das votações, top 10 dos colaboradores que responderam, com mais celeridade e os obtiveram as melhores pontuações)
* Indicadores por colaborador sobre qualidade (número total de pedidos, percentagem de pedidos sem avaliação pelo cliente, tempo médio de resposta, por cada nível prioridade, avaliação média da qualidade, desvio padrão das votações)
* Indicadores por produto sobre qualidade (número total de pedidos, percentagem de pedidos sem avaliação pelo cliente, tempo médio de resposta, por cada nível prioridade, avaliação média da qualidade, desvio padrão das votações, top 10 dos colaboradores que responderam, com mais celeridade e os obtiveram as melhores pontuações)
* Indicadores temporais (Gráﬁco com a evolução do número de pedidos, Gráﬁco com a evolução da avaliação média da qualidade)
* A aplicação Dashboard deve apresentar em tempo real indicadores de forma simples e imediata.
### Descrição da solução
Como solução, as tecnologias utilizadas são nomeadamente o NodeJS e seus complementos para suporte ao backend, o MongoDB como aplicação da base de dados, o HTML5 (por ReactJS, CSS3) para o desenvolvimento do frontend e ainda o uso da tecnologia Docker para entrega da solução na forma de container.
O cliente informa sua incidências ao  helpdesk através de uma classificação prévia do tipo _Bug_, _Support_, _Question_ e _Report_, que está associada a um determinado produto. Após o registro da incidência na Base de Dados, o cliente recebe um email em que pode indicar o nível de satisfação do serviço recebido. Para cada incidência tem-se as informações descritas nos requistos funcionais das Issues, que são aplicados na visualização dos indicadores do frontend.
Para aceder a aplicação, é preciso login do utilizador (ou fazer o cadastro prévio), para ter as informações de acordo com os indicadores listados nos requisitos funcionais do frontend. 
#### Arquitetura
A arquitetura da solução desenvolvida segue as boas práticas de desenvolvimento web com react, assim como a integração do backend por NodeJs, com o código disponível no [GitHub](https://github.com/Knox316/Helpdesk). Assim temos o M«mongdDB a servir a base de dados para a API Node.Js, que serve os pedidos do React, este útlimo com a terfa de desenhar a aplicação frontend.

* Descrição dos vários containers e sua "composição"
* Instruções sobre como descarregar e executar o container do trabalho

1. docker-compose up
2. Esperar
3. localhost:3000
4. Ver a app.

### 1. Back-end
#### API
Na programação para ambiente web a API tem um conjunto de mensagens do tipo request e response com o uso do protocolo HTTP em formatos xml ou json (este aplicada nesta solução). Para esta solução pretende descrever todas as funcionalidades, de forma a garantir que aplicações externas não tenham a preocupação de se envolver em detalhes de implementação e possam usar todos os serviços disponíveis.
##### Endpoints implementadosOs endpoints segue o padrão
http://localhost:3000/issues/[indicador]?from=[Dt_inicial]&to=[dt_final]
E ainda tem-se os que remetem a requisições específicas para colaborador e produto, que são:
http://localhost:3000/issues/collaborators
http://localhost:3000/issues/projects
Para os indicadores Globais
* http://localhost:3000/issues/count?from=[Dt_inicial]&to=[dt_final]
Número total de pedidos e percentagem de pedidos sem avaliação
* http://localhost:3000/issues/priority/responseTimeAvg?from=[Dt_inicial]&to=[dt_final]
tempo médio de resposta por nível de prioridade
* http://localhost:3000/issues/scoreAvg?from=[Dt_inicial]&to=[dt_final]
avaliação média da qualidade
* http://localhost:3000/issues/scoreStd?from=[Dt_inicial]&to=[dt_final]
desvio padrão
* http://localhost:3000/issues/collaborators/responseTimeAvg?from=[Dt_inicial]&to=[dt_final]&limit=10
Top 10 dos colaboradores que responderam mais celeridade
* http://localhost:3000/issues/collaborators/scoreAvg?from=[Dt_inicial]&to=[dt_final]&limit=10
Top 10 dos colaboradores que obtiveram as melhores pontuações

Para os indicadores Por colaborador
* http://localhost:3000/issues/count?from=[Dt_inicial]&to=[dt_final]&collaborator_name=[colaborador]
Número total de pedidos e percentagem de pedidos sem avaliação
* http://localhost:3000/issues/priority/responseTimeAvg?from=[Dt_inicial]&to=[dt_final]&collaborator_name=[colaborador]
tempo médio de resposta por nível de prioridade
* http://localhost:3000/issues/scoreAvg?from=from=[Dt_inicial]&to=[dt_final]&collaborator_name=[colaborador]
avaliação média da qualidade
* http://localhost:3000/issues/scoreStd?from=[Dt_inicial]&to=[dt_final]&collaborator_name=[colaborador]
desvio padrão

Para os indicadores Por Produto
* http://localhost:3000/issues/count?from=[Dt_inicial]&to=[dt_final]
Número total de pedidos e percentagem de pedidos sem avaliação
* http://localhost:3000/issues/priority/responseTimeAvg?from=[Dt_inicial]&to=[dt_final]
tempo médio de resposta por nível de prioridade
* http://localhost:3000/issues/count?from=[Dt_inicial]&to=[dt_final]&product_name=[produto]
avaliação média da qualidade
* http://localhost:3000/issues/scoreStd?from=[Dt_inicial]&to=[dt_final]&product_name=[produto]
desvio padrão
* http://localhost:3000/issues/collaborators/responseTimeAvg?from=[Dt_inicial]&to=[dt_final]&limit=10&product_name=[produto]
Top 10 dos colaboradores que responderam mais celeridade
* http://localhost:3000/issues/collaborators/scoreAvg?from=[Dt_inicial]&to=[dt_final]&limit=10&product_name=[produto]
Top 10 dos colaboradores que obtiveram as melhores pontuações

Indicadores temporais
* http://localhost:3000/issues/periodic/count?from=[Dt_inicial]&to=[dt_final]&limit=1000
 número de pedidos ao longo do tempo
* http://localhost:3000/issues/periodic/scoreAvg?from=[Dt_inicial]&to=[dt_final]&limit=1000
avaliação média da qualidade ao longo do tempo
##### Códigos de erro
* Incidências fora das prévias determinadas como _Bug_, _Support_, _Question_ e _Report_, geram código de erro ==> ```Invalid ID: ${id}```,```User com id: ${id} não encontrada```, seja para uma busca, para uma atualização ou exclusão da mesma.
* No frontend, ao tentar aceder manualmente a uma rota que não existe, a aplicação retorna para a página dos indicadores (se login ainda for válido) ou para a tela de login (se o login não tiver mais validade)
* Ao tentar aceder a aplicação com utilizador não cadastrado, após o submit, a aplicação mantém-se na tel de login.
##### Link para a documentação da API (e.g. swagger)
A documentação da solução nestá baseada no swagger, que está disponível [aqui](https://github.com/Knox316/Helpdesk)
##### Modelo de dados
Para melhor ilustrar o modelo de dados, a figura está disponível na área de appendix
##### Modelo de entidade relação
Para melhor ilustrar o modelo de entidade relação, a figura está disponível na área de appendix
##### Coleções criadas
As coleções criadas para apoio à solução são: **TIRO ESTA INFORMAÇÃO DOS MODELS?**
##### Índices e justificação da sua necessidade
O índice aplicado à base de dados fornecida é o **"id"**, pois é o identificador associado às issues, nome de claborador e nome de produto, que já estava na BD.
### 2. Front-end
O frontend da solucação foi desenvolvido através da biblioteca em React.
##### Maquetes

* Diagramas e rascunhos da interface gráfica da aplicação
1. tela do login com sucesso
2. tela do login sem sucesso
3. tela com cadastro de utilizador
4. tela com indicador global
5. tela com indicador por colaborador
6. tela com indicador de produto
7. tela com indicador temporal
8. tela de logout
##### Modelo de interação
No appendix pode-se consultar as telas de interação do frontend.
### 3. Bonificações - Login
A solução tem o uso de login de um utilizador, via token, além de permitir que seja adicionado um novo utilizador na base de dados para aceder à gestão dos indicadores.
* Trabalhos adicionais realizados:
Diante do que não foi implementado, fica como trabalho futuro:
-Mudar o tipo de mensagem para o formato JSONP
-Associar outros índices
-Implentar no frontend as ações de CRUD para as issues
### 4. Conclusões e trabalho futuro
Este trabalho foi implementado com base no conhecimento da equipa, com a divisão de tarefas por partes distintas do que cada um fosse capaz de desenvolver. Ao longo do mesmo foi necessário muita pesquisa sobre o como executar as soluções requisitadas através de uma tecnologia que estivesse dentro do escopo da disciplina. 
Em muitos casos, a equipa não tinha a base necessária para descorrer o desenvolvimento do mesmo, o que tomou muito tempo de pesquisa sobre qual solução adotar.
O término do trabalho é considerado por todos um desafio superado, pois com a pouca experiência de todos da equipa em conseguir perceber o que estava a ser pedido nas instruções do trabalho em tão pouco tempo, já é considerado uma grande superação.
Como trabalho futuro, tem-se a questão de indicadores na forma de gráfica, uma análise mais apurada dos endpoints disponíveis, o uso de uma solução mais acertada para as coleções.
### 5. Referências

* npm | build amazing things. Disponível em: [npmjs.com](https://www.npmjs.com/).
* Express - Node.js web application framework. Disponível em: [expressjs.com ](https://expressjs.com/)
* Mongoose. Disponível em: [mongoosejs.com](https://mongoosejs.com/) 
* React Charts & Graphs for Web & Mobile. Disponível em: [fusioncharts.com](https://www.fusioncharts.com/react-charts) 
* React - A javaScript library for building user interfaces. Disponível em: [reacts.org](https://reactjs.org/)
* The most popular database for modern apps | MongoDB. Disponível em: [mongodb.com](https://www.mongodb.com/)
* Redux. Disponível em: [redux.js.org](https://www.mongodb.com/)
* Material - UI. Disponível em: [material-ui.com](https://material-ui.com/)
* Docker. Disponível em: [docker.com](https://www.docker.com/)
### 6. Appendix
#### Source code
Pode aceder ao link [GitHub](https://github.com/Knox316/Helpdesk) onde está o código fonte completo e atualizado conforme enviado.

#### Imagens das telas do frontend
Login
[![Login](/documentation/Login.png "Login")](https://github.com/Knox316/Helpdesk/edit/master/documentation/login.png)
Cadastro de novo utilizador
[![Cadastro](/documentation/CreateLogin.png "Cadastro")](https://github.com/Knox316/Helpdesk/edit/master/documentation/CreateLogin.png)
Dashboard com Indicadores Globais
[![Global](/documentation/Global.png "Global")](https://github.com/Knox316/Helpdesk/edit/master/documentation/Global.png)
Dashboard com Indicadores por Colaborador
[![Colaborador](/documentation/Colaborador.png "Colaborador")](https://github.com/Knox316/Helpdesk/edit/master/documentation/Colaborador.png)
Dashboard com Indicadores por Produto
[![Produto](/documentation/Produto.png "Produto")](https://github.com/Knox316/Helpdesk/edit/master/documentation/Produto.png)
Dashboard com Indicadores Temporais
[![Temporal](/documentation/Temporal.png "Temporal")](https://github.com/Knox316/Helpdesk/edit/master/documentation/Temporal.png)


