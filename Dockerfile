FROM python:3.10
WORKDIR /app
COPY requirements.txt ./
COPY start.sh ./
COPY back ./src
RUN pip install -r requirements.txt
RUN cd src
RUN mkdir -p static/app
ENV PORT=8000
EXPOSE 8000
CMD bash /app/start.sh