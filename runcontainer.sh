#!/bin/bash
docker run -it -d --name=notelis -p 3000:3000 -p 9005:9005 -v /home/ska/Proyectos/notelis/src/:/opt/frontend codenvy/angular-yeoman python -m SimpleHTTPServer 9005
