FROM node:8-slim


# Definir uid y gid custom. Por defecto se asigna 1000:1000
ARG UID=1000
ARG GID=1000
ARG APPPATH=/srv/hcue

RUN userdel -r -f node
RUN groupadd --gid ${GID} node \
    && useradd --uid ${UID} --gid node --shell /bin/bash --create-home node


COPY build/apt_sources /etc/apt/sources.list.d/sid.list
RUN apt-get update \
    && apt-get install --no-install-recommends -y \
        firefox \
    && apt-get autoclean \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*


# Create folder to host the app
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install bower globally
RUN npm install -g bower \
                   gulp-cli \
                   karma-cli \
                   tleaf


# Prepare image
VOLUME /usr/src/app


# Cambio al usuario node
USER node

CMD ["tail", "-f", "/dev/null"]
