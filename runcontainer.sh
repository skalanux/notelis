#!/bin/bash
docker run -it -d --name=notelis --net=host -v /home/ska/Proyectos/notelis/src/:/home/user/application codenvy/angular-yeoman python -m SimpleHTTPServer 9005
