# Instruções

Comandos para correr e ter acesso à aplicação:

1. Executar o comando `docker-compose up`
2. Esperar
3. Abrir o browser em `http://localhost:3000`

Para o email, a conta é no servidor Gmail, com user webprogwork@gmail.com e palavra-pass $IPCA@2019#

## Pastas

Segue-se uma explicação sobre cada uma das pastas do projeto:

* `docker-compose.yml` - Ficheiro que irá permitir executar toda a solução
* `Dockerfile` - Ficheiro que permite construir o container da vossa aplicação
* `source` - Pasta que contém o código fonte das várias aplicações desenvolvidas
* `documentation` - Pasta que irá conter o relatório técnico
* `presentation` - Pasta que contém os materiais apresentados durante a defesa do TP (e.g. PPTX)
* `data` - Pasta que irá conter os volumes exportados pelos vossos containers. Esta pasta deve ser fornecida vazia, mas após o arranque dos containers ter o estado das aplicações persistido
