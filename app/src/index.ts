import fastify, { type FastifyRequest, type FastifyReply } from 'fastify'
import fastifyStatic from '@fastify/static'
import path from 'node:path'

async function main (): Promise<void> {
  const app = fastify({
    logger: true
  })

  console.log('Happy developing ✨')

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  app.register(fastifyStatic, {
    root: path.join(__dirname, '../public')
  })

  app.get('/', function (req: FastifyRequest, reply: FastifyReply) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    reply.sendFile('index.html')
  })

  app.get('/prequels', function (req: FastifyRequest, reply: FastifyReply) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    reply.sendFile('prequels_script.html')
  })

  app.get('/wishlist', function (req: FastifyRequest, reply: FastifyReply) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    reply.redirect('https://docs.google.com/spreadsheets/d/e/2PACX-1vQExuHz0hIgVbkTxSV_jEMjn3NNcRMWMR9m6ialFSNObfyaM3VEtkjgO30w7ttIe5TtNaMeUF6sjk3J/pubhtml#')
  })

  const port = process.env.PORT == null ? 3000 : Number.parseInt(process.env.PORT)
  app.listen({ port, host: '0.0.0.0' }, (err, address) => {
    if (err != null) throw err
    console.log(`Server is now listening on ${address}`)
  })
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
