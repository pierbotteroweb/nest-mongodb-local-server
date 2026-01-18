NVS - Node node/22.19.0/x64
Nest - version 11.0.14

01) npm install -g @nestjs/cli
02) nest new nome-do-app
03) npm run start. Na verdade nest start --watch para o logger atualizar ocm mudancas.
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

