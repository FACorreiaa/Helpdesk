### Serviço de análise e controlo de qualidade do serviço de helpdesk
| Atributo           | Valor  |
|--------------------|---------------------------------------------------------------------------------------------------------------------------|
| UC | Programação Web (PW)  |
| Curso              | Mestrado em Engenharia Informática (MEI) |
| Instituição        | Instituto Politécnico do Cávado e do Ave (IPCA) |
| Autoria            | Fernando Correia (a11199@alunos.ipca.pt), Paula Brás (a14474@alunos.ipca.pt), Rui Carvalho (a17786@alunos.ipca.pt), Silvana Chagas (a15977@alunos.ipca.pt)  |
| Data               | 2019-06-29|
### Introdução e objetivos
O serviço de helpdesk é muito utilizado nas empresas nos dias atuais, com o objetivo de ter-se uma melhor monitorização das ações e assim ter a gestão dos processos de forma mais ágil, com vistas à qualidade.A solução aqui proposta tem como objetivo mostrar indicadores sobre a qualidade do serviço de um sistema de helpdesk.
Para tanto, após o cliente ter submetido sua requisição ao serviço de suporte, este processo é tratado por um colaborador. Com o término do serviço requisitado, o cliente pode avaliar o serviço prestado. Por fim, todo o processo pode ser monitorizado através de indicadores (por gráficos e números) disponíveis ao gestor, com acesso devidamente autorizado.
De uma forma geral, a solução é composta de 2 partes distintas, uma para estruturar o servidor (backend) e outra com a interface a ser executada pelo utilizador, o frontend, as quais são detalhadas a seguir..

* Lista de requisitos funcionais e não funcionais identificados no enunciado usando o método de MoSCoW
# ++**FALTA FALTA FALTA FALTA**++
### Descrição da solução
Como solução, as tecnologias utilizadas são nomeadamente o NodeJS e seus complementos (**INFORMAR AK**) para suporte ao backend, o MongoDB como aplicação da base de dados, o HTML5 e seus complementos (ReactJS, CSS3) para o desenvolvimento do frontend e ainda o uso da tecnologia Docker para entrega da solução na forma de container.
O cliente informa sua incidências ao  helpdesk através de uma classificação prévia do tipo _Bug_, _Support_, _Question_ e _Report_, que está associada a um determinado produto. Após o registro da incidência na Base de Dados, o cliente recebe um email em que pode indicar o nível de satisfação do serviço recebido.
Em termos de solução ao frontend, tem-se indicadores de como está a correr a solução das incidências para o gestor ou outro utilizador cadastrado possa monitorizar, dentro de um intervalo de datas. 
#### Arquitetura
* Arquitetura com os vários componentes da solução e seus containers
* Descrição dos vários containers e sua "composição"
* Instruções sobre como descarregar e executar o container do trabalho

#### 1. Back-end
#### API
##### Endpoints implementados
Os endpoints disponíveis na solução pela equipa são:
* 
*
*
##### Códigos de erro
* Incidências fora das prévias determinadas como _Bug_, _Support_, _Question_ e _Report_, geram código de erro ==> ```Invalid ID: ${id}```,```User com id: ${id} não encontrada```, seja para uma busca, para uma atualização ou exclusão da mesma.
* 
##### Formato das mensagens trocadas
As mensagens trocadas entre as partes são:
##### Link para a documentação da API (e.g. swagger)
A documentação da solução está disponível [aqui](www.google.com) **AJEITAR O LINK CORRETO:**
##### Modelo de dados
Para melhor ilustrar o modelo de dados, a figura a seguir tem a estrutura aplicada à solução.

[![Modelo de dados](/documentation/images/modelo_de_dados.jpg "Modelo de dados")](https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwi1_eXDg_biAhWMohQKHTTzCUwQjRx6BAgBEAU&url=https%3A%2F%2Fwww.researchgate.net%2Ffigure%2FFigura-48-Modelo-de-dados-simplificado-da-plataforma-Fast-Science-visao-Workflow_fig20_308022717&psig=AOvVaw3Pb9x6mXVoFM9y8Jj3JkZu&ust=1561050255758699)

##### Modelo de entidade relação
Para melhor ilustrar o modelo de entidade relação, a figura a seguir tem a estrutura aplicada à solução.

[![Modelo de enteidade relação](/documentation/images/modelo_de_entidade_relacao.jpg "Modelo de entidade relação")](https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwi1_eXDg_biAhWMohQKHTTzCUwQjRx6BAgBEAU&url=https%3A%2F%2Fwww.researchgate.net%2Ffigure%2FFigura-48-Modelo-de-dados-simplificado-da-plataforma-Fast-Science-visao-Workflow_fig20_308022717&psig=AOvVaw3Pb9x6mXVoFM9y8Jj3JkZu&ust=1561050255758699)

##### Coleções criadas
As coleções criadas para apoio à solução são: **TIRO ESTA INFORMAÇÃO DOS MODELS?**
##### Índices e justificação da sua necessidade
**NÃO SEI O QUE ESCREVER AQUI**


#### 2. Front-end

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
* Diagrama de como as diferentes páginas interagem entre si
**FAZER COM FLUXOGRAMA**
### 3. Bonificações - Login
A solução tem o uso de login de um utilizador, via token, com adicional de adicionar novo utilizador para aceder à gestão dos indicadores.
* Trabalhos adicionais realizados: **VERIFICAR SE TEM ALGO A MAIS DO QUE FOI PEDIDO**
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
* Home | nivo.Disponível em: [nivo.rocks](https://nivo.rocks/) 
* React - A javaScript library for building user interfaces. Disponível em: [reacts.org](https://reactjs.org/)
* The most popular database for modern apps | MongoDB. Disponível em: [mongodb.com](https://www.mongodb.com/)
* Redux. Disponível em: [redux.js.org](https://www.mongodb.com/)
* Material - UI. Disponível em: [material-ui.com](https://material-ui.com/)
* Docker. Disponível em: [docker.com](https://www.docker.com/)
### 6. Appendix
#### Source code
```Javascript
async function getUser(id) {
  let user = await axios.get(`http://localhost:3000/api/v1/users/${id}`);
  return user.data;
}

```