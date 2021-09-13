# Running services as containers

## Run plex

From the `plex` subfolder, run:

    docker-compose up -d

Plex can be accessed on the following url: <http://192.168.1.38:32400/web>

To correctly handle Anime in Plex: <https://www.geekzone.fr/2019/08/01/comment-bien-gerer-ses-animes-avec-plex/>

## Run a Minecraft Server

From the `minecraft` subfolder, run:

    docker-compose up -d

It didn't run at first on Raspberry Pi, due to an outdated `libseccomp2` library. The following steps fixed it: <https://blog.samcater.com/fix-workaround-rpi4-docker-libseccomp2-docker-20/>.

## Check Docker status and container logs

To check a container's logs in command line:

    docker ps
    docker logs <container_id>

Useful arguments can be passed to `docker logs`, like `--tail 5` or `--follow`: <https://docs.docker.com/engine/reference/commandline/logs/>
