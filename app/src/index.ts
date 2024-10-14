import fastify, {type FastifyRequest, type FastifyReply} from 'fastify'
import fastifyStatic from '@fastify/static'
import path from 'node:path'

async function main() {
    const app = fastify({
        logger: true
    })

    console.log('Happy developing ✨')

    app.register(fastifyStatic, {
        root: path.join(__dirname, '../public'),
    })

    app.get('/', function (req: FastifyRequest, reply: FastifyReply) {
        reply.sendFile('index.html')
    })

    app.get('/feat', function (req: FastifyRequest, reply: FastifyReply) {
        reply.send('this is a new featres!')
    })

    const port = process.env.PORT == null ? 3000 : Number.parseInt(process.env.PORT)
    app.listen({ port, host: '0.0.0.0' }, (err, address) => {
        if (err) throw err
        console.log(`Server is now listening on ${address}`)
    })
}

main()

