#! /bin/bash
npm run build
path=`pwd`
scp -r $path/qsweb root@139.224.207.42:/data/www
