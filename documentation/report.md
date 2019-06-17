# Serviço de análise e controlo de qualidade do serviço de helpdesk



| Atributo           | Valor                                                                                                                     |
|--------------------|---------------------------------------------------------------------------------------------------------------------------|
| Unidade Curricular | Programação Web (PW)                                                                                                      |
| Curso              | Mestrado em Engenharia Informática (MEI)                                                                                  |
| Instituição        | Instituto Politécnico do Cávado e do Ave (IPCA)                                                                           |
| Autoria            | Lorem Ipsum (lorem@ipsum.com), Lorem Ipsum (lorem@ipsum.com) Lorem Ipsum (lorem@ipsum.com), Lorem Ipsum (lorem@ipsum.com) |
| Data               | 2019-01-01                                                                                                                |

# Introdução e objetivos

* Introdução e objetivos do trabalho
* Lista de requisitos funcionais e não funcionais identificados no enunciado usando o método de MoSCoW


#	Descrição da solução

* Apresentação da solução desenvolvida

## Arquitetura

* Arquitetura com os vários componentes da solução e seus containers
* Descrição dos vários containers e sua "composição"
* Instruções sobre como descarregar e executar o container do trabalho

## Back-end

### API

* Endpoints implementados
* Códigos de erro
* Formato das mensagens trocadas
* Link para a documentação da API (e.g. swagger)

###	Modelo de dados

* Modelo de entidade relação
* Coleções criadas
* Índices e justificação da sua necessidade
* etc.

## Front-end

### Maquetes

* Diagramas e rascunhos da interface gráfica da aplicação

### Modelo de interação

* Diagrama de como as diferentes páginas interagem entre si


# Bonificações

* Bonificações implementadas
* Trabalhos adicionais realizados


# Conclusões e trabalho futuro

* Principais conclusões retiradas do trabalho
* Principais dificuldades encontradas
* Desafios superados
* Trabalho futuro


# Referências

* Lorem ipsum dolor sit amet, consectetur adipiscing elit.
* Cras pharetra quis libero sit amet finibus. 
* Aliquam erat volutpat. Cras sit amet nibh tortor. 
* Morbi mauris magna, varius sit amet vulputate sed, accumsan ut nisi. 
* Quisque egestas nulla id pulvinar pellentesque. 
* Nulla facilisi. Nullam tempus lacus at metus mollis, id pulvinar ante dignissim. 
* Vestibulum viverra arcu est, at dignissim odio sagittis vel. Proin venenatis orci sed ipsum condimentum, sit amet tincidunt tortor pellentesque.

# Appendix

## Markdown cheat sheet

See https://www.markdownguide.org/cheat-sheet/


## Tables in markdown 

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| value    | value    | value    |
| value    | value    | value    |
| value    | value    | value    |
| value    | value    | value    |

https://www.tablesgenerator.com/markdown_tables

## Source code

```Javascript
async function getUser(id) {
  let user = await axios.get(`http://localhost:3000/api/v1/users/${id}`);
  return user.data;
}

```

