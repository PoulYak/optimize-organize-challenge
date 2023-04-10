# Документация

## Порядок запуска сервера

Достаточно просто собрать образ и запустить контейнер:

```docker build -t tag```

```docker run -p 8000:8000 tag:latest```

Однако для работы приложения также потребуется запустить фронтенд, подробнее в
директории frontend

---

## API

Для доменных сущностей предоставляется почти-стандартное REST, однако не полный.

Выгрузка объектов производится в соответствии с рабочей группой пользователя,
выгружается только то что он должен видеть.


---

## Архитекутра

Отдельно есть конфиг и запускаемый сервер, отдельно есть приложение которое на нем
запускается. Приложение сделано по MVC, имеется доменный слой (модельки), сервисный-контроллер слой(
доступ и операции с бд, бизнес-логика), имеется внешний view слой - ответственный за предоставление респонсов пользователю

Имеется максимально простая развертка с помощью докера и стартового баш скрипта