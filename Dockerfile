# syntax=docker/dockerfile:1
FROM python:3.8-slim-buster
WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip install pip --upgrade
RUN pip3 install -r requirements.txt
COPY . /app
# RUN export FLASK_APP=webserver.py
ENTRYPOINT [ "python3" ]
CMD ["webserver.py"]
