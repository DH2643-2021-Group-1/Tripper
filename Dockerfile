FROM node:14 AS client-build
WORKDIR /usr/src
COPY client/ ./client/
RUN cd client && npm install && npm run build

FROM node:14 AS server-build
WORKDIR /root/
COPY server/ ./server/
COPY --from=client-build /usr/src/client/build ./server/src/client-build/
RUN cd server && npm install

EXPOSE 8000
WORKDIR /root/server
CMD ["npm", "run", "start"]