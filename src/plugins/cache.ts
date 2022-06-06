import { FastifyInstance, FastifyPluginOptions } from "fastify";
import fp from "fastify-plugin";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: parseInt(process.env.CACHE_TTL) });

const cachePlugin = async (
  fastify: FastifyInstance,
  _options: FastifyPluginOptions
) => {
  fastify.addHook("onRequest", async (request, reply) => {
    if (request.method === "GET") {
      const response = cache.get(request.url);

      if (response) {
        reply.send(response);
      }
    }
  });

  fastify.addHook("onSend", async (request, _reply, payload) => {
    if (request.method === "GET") {
      cache.set(request.url, payload);
    }
  });
};

export default fp(cachePlugin);
