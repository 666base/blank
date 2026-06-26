FROM node:22-alpine

WORKDIR /app

COPY package.json ./
COPY src ./src

ENV BLANK_SERVER_HOST=0.0.0.0
ENV BLANK_SERVER_PORT=3020

EXPOSE 3020

HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3020/health || exit 1

CMD ["node", "src/server.mjs"]
