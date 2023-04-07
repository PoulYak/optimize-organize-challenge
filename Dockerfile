FROM ubuntu:latest
LABEL authors="lokot0k"

ENTRYPOINT ["top", "-b"]