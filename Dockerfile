FROM node:16-alpine
# Installing libvips-dev for sharp Compatability
ENV NODE_ENV=production
WORKDIR /app
COPY ./package.json ./package-lock.json ./
RUN npm ci
COPY ./ .
RUN npm run build
EXPOSE 1337
CMD ["npm", "run", "start"]