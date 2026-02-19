import {
  type FastifyRequest,
  type FastifyReply,
  type HTTPMethods,
} from "fastify";
import { prisma } from "../lib/prisma";

interface Route<P = {}> {
  method: HTTPMethods | HTTPMethods[];
  url: string;
  handler: (
    req: FastifyRequest<{ Params: P }>,
    reply: FastifyReply,
  ) => Promise<void>;
}

interface WildcardParams {
  "*": string;
}

export const shortenUrlRoute: Route<WildcardParams> = {
  method: "GET",
  url: "/s/*",
  handler: async (
    req: FastifyRequest<{ Params: WildcardParams }>,
    reply: FastifyReply,
  ) => {
    const backHalf = req.params["*"];
    const url = await prisma.url.findUnique({
      where: {
        backHalf,
      },
    });
    if (url === null) {
      reply.status(404).send("URL not found");
      return;
    }
    await prisma.click.create({
      data: {
        urlId: url.id,
        ip: req.ip ?? null,
      },
    });
    reply.redirect(url.destination);
  },
};
