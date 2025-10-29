
FROM node:lts-bullseye

USER root

RUN apt-get update && \
    apt-get install -y ffmpeg webp git && \
    apt-get upgrade -y && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY . .

RUN npm install --legacy-peer-deps


EXPOSE 7860

ENV NODE_ENV=production

CMD ["npm", "start"]









