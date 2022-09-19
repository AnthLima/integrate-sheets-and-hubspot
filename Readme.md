# Integração entre o serviço do google sheets e do hubspot

## Descrição

Neste projeto é possível trazer dados de uma planília do google sheets e usá-los para cadastrar um contato no hubspot, apenas serão cadastrados contatos cujo email seja corporativo, além disto, passado um mesmo email de um contato já criado é possível atualizar suas informações.

### Instalação

```
- yarn
- yarn start ou yarn dev (Este se quiser rodar com o nodemon)

```

Após estes passos basta criar um arquivo ".env" e copiar e colar nele os itens do ".env.example".

### Configuração do Hubspot

Para que possa obter um item muito importante do projeto que é o "HUBSPOT_APPLICATION_TOKEN", é necessário criar uma conta caso não tenha no mesmo, seguindo [este link](https://developers.hubspot.com/docs/api/migrate-an-api-key-integration-to-a-private-app)

Após criada a conta, deve criar uma aplicação , após criar uma aplicação siga o tour e obterá o token ao fim do mesmo.

### Configuração da Api do Google Sheets

Para que seja possível a integração correta da api do Google Sheets, é necessário que esta sequência de passos seja efetuada com sucessso: 
- Acesse [console.developers](https://console.cloud.google.com/apis/dashboard) 
- Você verá um painel de configurações , o primeiro passo é criar um projeto e logo em seguida você deve ativar a API do Google Sheets, a mesma pode ser encontrada mais facilmente na aba "bibliotecas". 
- Em seguida vamos fazer o processo de autenticação para esse serviço. Selecione o botão de “Criar credenciais”, existem diferentes formas de seguir com essa etapa, sugiro escolher a opção de “conta de serviço”. 
- Siga para o formulário, somente é obrigatório o primeiro item. 
- Após a conta de serviço criada , um email é gerado junto a ela, ainda será necessário adicionar uma chave para este email, siga para "Contas de serviço" e clique em "Adicionar Chave", escolha a chave no formato JSON, logo após a seleção do mesmo, será feito o download de um arquivo json de credenciais, guarde-o , pois ele será útil para cadastrar as configuração do arquivo ".env". 
- Agora sobre o google cloud já esta tudo pronto, apenas copie o email gerado. - Crie uma planilha no google sheets. - Clique em "Compartilhar" e insira o email que copiou do google cloud.

### Planilha do google sheets

A planilha deve conter as seguintes propriedades:
firstname, lastname, email, phone, website, company

Lembre-se foi colocado um limitador de até 10 rows(linhas) , ou seja, somente é possível cadastrar até 10 contatos no Hubspot;

Lembre-se somente serão cadastrados contatos cujo provedor não seja nenhum desses: "gmail","outlook","yahoo","terra","icloud" e"hotmail" o que se concretiza um email corporativo, como por exemplo: anthony.lima@devapi.com.br !!

Lembre-se se um novo contato for cadastrado com um email que já existe, ele modificará as propriedades anteriores, de maneira a atualizar os outros itens como firstname, company, lastname, ou seja, todos que não são o email em si, pois o projeto usa tanto a api de cadastro como a de update, que no caso é uma só também!

### Configuração do .env

Aqui será a porta que o projeto ira rodar:
PORT=

Aqui ficará sua cadeia de caracteres de acesso do mongodb, no meu caso eu utilizei o mongo atlas, veja mais dele [neste link](https://www.mongodb.com/cloud/atlas/register):
URL_MONGO=

Aqui ficará seu "segredo" do jwt, que pode ser gerado no modelo sha256 [neste link](https://emn178.github.io/online-tools/sha256.html).
SECRET_JWT=

Aqui ficará seu token de aplicação do hubspot, é o token que obtemos ao criar uma nova aplicação, basta copiar ele e colar aqui:
HUBSPOT_APPLICATION_TOKEN=

Aqui são as configurações da chave do tipo json gerada no gerenciamento de sua api do google sheets que foi ativada:
- TYPE=
- PROJECT_ID=
- PRIVATE_KEY_ID=
- PRIVATE_KEY=
- CLIENT_EMAIL=
- CLIENT_ID=
- AUTH_URI=
- TOKEN_URI=
- AUTH_PROVIDER_CERT_URL=
- CLIENT_CERT_URL=

### Fluxo das apis do projeto

Nes aplicação existem 4 rotas, delas somente 2 podem ser acessadas sem o uso de um token, são elas:
{baseUrl}/user/store -> Esta daqui serve para cadastrar um usuário, é possível efetuar o cadastro com o envio do seguinte json:

```
{
    "name":"Tests",
    "email": "admin@admin.com",
    "password": "password"
}
```

{baseUrl}/login -> Após feito o cadastro agora será necessário efetuar o login , e isto é possível da seguinte maneira:

```
{
    "email": "admin@admin.com",
    "password": "password"
}
```

Caso tudo ocorra bem , será enviada uma resposta assim:

```
{
    "user": {
        "name": "Tests",
        "email": "admin@admin.com"
    },
    "token": ""
}
```

As outras rotas que estão com o AuthMidleware, devem receber esse token, neste projeto usou-se a autenticação com o jwt, e Bearer token, então uma vez no postman ou insomnia siga para "Authorization", em "Type" selecione o Bearer Token e insira o token gerado no login para proseguir paras as seguintes rotas:

{baseUrl}/user/show -> Aqui é possível ver os usuários cadastrados até o momento.

{baseUrl}/getSheetAndCreateContact/:spreadsheetID -> Aqui é onde a mágica ocorre, basta substituir ":spreadsheetID" pelo id da sua tabela criada no google sheet, este id fica entre o "d/" e o "/edit" como no exemplo abaixo:

https://docs.google.com/spreadsheets/d/"{1glkmzRMN94xwsEZRaQ7nDa8OvJ_6g0M7oVWZOJy6pgg}"/edit#gid=0

O id neste caso está entre chaves e aspas: "{1glkmzRMN94xwsEZRaQ7nDa8OvJ_6g0M7oVWZOJy6pgg}"

Uma vez efetuando o envio desde id, para esta rota, basta enviar e os dados serão cadastrados automaticamente no Hubspot como contatos.

## Licença do projeto

Esse projeto usa a licença do tipo MIT, veja o LICENSE.md para mais detalhes
