## .env file
DATABASE_URL=postgresql://{user}:{password}@localhost:5432/invoices
JWT_KEY={valid jwt secret/private key}

## Running the app

```bash
$ npm install
```
```bash
$ npx prisma migrate dev --name init
```
```bash
$ npm start
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
