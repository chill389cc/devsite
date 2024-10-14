import fastify, {type FastifyRequest, type FastifyReply} from 'fastify'
import fastifyStatic from '@fastify/static'
import path from 'node:path'

async function main() {
    const app = fastify({
        logger: true
    })

    console.log('Happy developing ✨')

    console.log(path.join(__dirname, 'public'))

    app.register(fastifyStatic, {
        root: path.join(__dirname, 'public'),
        // prefix: '/public/', // optional: default '/'
        // constraints: { host: 'example.com' } // optional: default {}
    })

    app.get('/', function (req: FastifyRequest, reply: FastifyReply) {
        reply.sendFile('index.html')
        // reply.download('index.html') // sending path.join(__dirname, 'public', 'myHtml.html') directly with custom filename
    })

    app.listen({ port: 3000 }, (err, address) => {
        if (err) throw err
        console.log(`Server is now listening on ${address}`)
    })
}

main()
