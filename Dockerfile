FROM node:4

# Create folder to host the app
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install bower globally
RUN npm install -g bower \
                   grunt-cli \
                   gulp-cli \
                   karma-cli \
                   phantomjs-prebuilt \
                   protractor \
                   tleaf


# Prepare image
VOLUME /usr/src/app

CMD ["/sbin/init"]
