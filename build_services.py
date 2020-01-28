##
## Copyright 2020 
##

import argparse, os

images = [
  ["services/accounts", "microservices/services/accounts"],
  ["services/iot", "microservices/services/iot"],
  ["client", "microservices/client"]
]


parser = argparse.ArgumentParser()
parser.add_argument('-t', '--tag', help='Docker Image Tag', required=True)
parser.add_argument('-r', '--repo', help='Docker Repository', required=False)
parser.add_argument('-i', '--index', help='Single Index Build', required=False)
parser.add_argument('-P', '--push', help='Push Docker Repository?', action='store_true')

args = vars(parser.parse_args())

tag = args["tag"]
repo = args["repo"]
push = args["push"]
index = int(args["index"]) if args["index"] is not None else -1

image_prefix = repo + "/" if repo else ""

if index >= 0:
  docker_tag = image_prefix + images[index][1] + ":" + tag
  print("Building: " + docker_tag)
  os.system("docker build -t " + docker_tag + " -f ./" + images[index][0] + "/Dockerfile .")
  if push:
    print("Pushing: " + docker_tag)
    os.system("docker push " + docker_tag)
else:
  for image in images:
    docker_tag = image_prefix + image[1] + ":" + tag
    print("Building: " + docker_tag)
    os.system("docker build -t " + docker_tag + " -f ./" + image[0] + "/Dockerfile .")
    if push:
      print("Pushing: " + docker_tag)
      os.system("docker push " + docker_tag)

