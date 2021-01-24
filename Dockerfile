FROM node:12.15.0-alpine3.9
WORKDIR /server
COPY package.json .
RUN npm install
COPY . .
ENV NODE_ENV=production
ENV PORT=4000
CMD ["npm", "start" ]
EXPOSE 4000
