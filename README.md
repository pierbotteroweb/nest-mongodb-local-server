NVS - Node node/22.19.0/x64
Nest - version 11.0.14

01) npm install -g @nestjs/cli
02) nest new nome-do-app
03) npm run start. Na verdade nest start --watch para o logger atualizar com mudancas.
04) npm install @nestjs/mongoose mongoose
05) nest g module database/mongo
06) mongodb connection
07) onModuleInit lifecycle hook

🔗 Lifecycle events — NestJS (Fundamentals)
https://docs.nestjs.com/fundamentals/lifecycle-events

08) Enable cors. Náo precisa instalar o express pois ele ja é nativo do Nest. 

  app.enableCors(); no main.ts

09) nest g controller test
10) Get e Post APIs basicas criadas no controler test
11) Schema para um document da collection programasDeTv
12) Get Programa do ProgramaDeTV usando propriedade value
13) Retorna propriedades especificas dos documents de uma collection
14) Get programaMontado usando mais de um criterio de busca
15) Get arquivo fazendo 2 chamadas pro mongoDb no mesmo metodo
16) Criar schema usado em diferentes collections e logica para escolher colection dinamicamente
17) Retornar arquivo considerando propriedade order
18) Ignorar arquivos com order null na busca por ordenacao do order
19) Service arquivos para obter arquivos de diferentres collections para ProgramaMontado
20) Reset de added em arquivos de um mesmo programaDeTV em uma collection
21) API criado para obter arquivos necessários para criacao de programa montado

para se conectar use mongodb://mongo1:27017/shufleTV?directConnection=true

Para criar um resource completo (com controller, module, e service )
nest g resource "nome_do_resource"