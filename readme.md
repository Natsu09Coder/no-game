# no-game

## Develoment setup

You need a `.env` file in the root folder to specify the secrets. You can simply copy `.env.sample` to get started.

### Run locally in production mode

Here are the commands to start/stop everything (with the images built locally):

    docker-compose build                           # build images from local sources
    docker-compose -f docker-compose.yml up -d     # start containers
    docker-compose -f docker-compose.yml down      # stop containers and remove images

### Run locally in development mode

In dev mode, the local code will be mapped inside the containers, so you can edit and debug locally:

    docker-compose up -d --build
    docker-compose down

Once the containers are started, the site can be accessed through:

- <http://localhost:8070> to access the web site

## Site Update

Once the updated site has been pushed on the git repository, simply fetch the update and hard reset the local branch. Then use docker-compose to refresh the running containers:

    git fetch --all
    git reset --hard origin/master

In production, the container should be run as a service in swarm mode

    docker-compose -f docker-compose.yml -f docker-compose.traefik.yml config | docker stack deploy -c - no-game

This can be automated throug a `post-receive` file in the destination server git repository, inside `.git/hooks`. Put the following contents in it:

    #!/bin/sh
    cd ..
    GIT_DIR='.git'
    umask 002 && git reset --hard
    umask 002 && docker-compose -f docker-compose.yml -f docker-compose.traefik.yml config | docker stack deploy -c - no-game

Make it executable and it will be run by git everytime you push to this remote. Also, set git config to allow resetting the current branch on receive:

    chmod +x .git/hooks/post-receive
    git config receive.denyCurrentBranch ignore
