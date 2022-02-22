# Instalação

Para instalar a aplicação:

```
npm install
```

ou

```
yarn
```

É necessário ter o Serverless instalado, de preferência globalmente:

```
npm install -g serverless
```

Também é necessário ter o [AWS-CLI](https://aws.amazon.com/cli/) instalado, com credenciais com acesso programátio.

##

Com a aplicação já instalada, o deploy é feito com:

```
npm run deploy
```

ou

```
yarn deploy
```

Para deletar os recursos dessa aplicação na conta AWS:

```
serverless remove
```

# Funcionamento

A API tem apenas um endpoint:

```
POST /registry
```

Que recebe a payload com o mesmo formato que será enviado ao sistema legado.

##

A URL da api é imprimida no console no final do deploy, mas também pode ser consultada no AWS Console em API Gateway > dev-work-time > Stages > dev > Invoke URL.

##

O envio dos dados para o sistema legado é feito pela função updateRegistries, que será executada periodicamene com um intervalo de 1 hora. Esta função envia todos os registros no banco de dados para o sistema legado, e os apaga.

##

Logo, o alto tempo de resposta do sistema legado não influenciará o registro de pontos.
