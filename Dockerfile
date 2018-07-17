# build environment
FROM node:9.7.1-alpine
RUN mkdir /app
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
ENV PATH /app/:$PATH
COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock
COPY run.sh /app/run.sh
RUN npm config set registry https://registry.npmjs.org/
RUN yarn -s --pure-lockfile install
RUN yarn global add react-scripts@1.1.1 --silent
COPY . /app
# RUN yarn run build
EXPOSE 3002
CMD yarn run build && node server.js