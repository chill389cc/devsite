import {
  type FastifyRequest,
  type FastifyReply,
  type HTTPMethods,
} from "fastify";
import { prisma } from "../lib/prisma";
import { Prisma } from "../generated/prisma/client";

interface Route<P = {}, Q = {}> {
  method: HTTPMethods | HTTPMethods[];
  url: string;
  handler: (
    req: FastifyRequest<{ Body: P; Headers: Q }>,
    reply: FastifyReply,
  ) => Promise<void>;
}

interface RedirectBody {
  authorId: number;
  backHalf?: string;
  destination: string;
}

interface AuthHeaders {
  "auth-token": string;
}

export const createRedirectRoute: Route<RedirectBody, AuthHeaders> = {
  method: "POST",
  url: "/shorten",
  handler: async (
    req: FastifyRequest<{ Body: RedirectBody; Headers: AuthHeaders }>,
    reply: FastifyReply,
  ) => {
    const body = req.body;
    const proposedAuthToken = req.headers["auth-token"];
    const author = await prisma.user.findUnique({
      where: {
        id: body.authorId,
      },
    });
    if (author === null) {
      req.log.info("User not found");
      return reply.status(403).send("Unauthorized");
    } else if (author.authToken !== proposedAuthToken) {
      req.log.info("Access token is not a match");
      return reply.status(403).send("Unauthorized");
    }
    try {
      await prisma.url.create({
        data: {
          authorId: author.id,
          backHalf: body.backHalf,
          destination: body.destination,
        },
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === "P2002"
      ) {
        return reply.status(409).send("URL back-half already exists");
      } else {
        throw e;
      }
    }
    return reply.status(201).send();
  },
};
