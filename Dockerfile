FROM openjdk:17

ENV ENVIRONMENT=prod

LABEL maintainer="joachim.stolle@hotmail.de"

ADD backend/target/camping_app.jar camping_app.jar

CMD [ "sh", "-c", "java -Dserver.port=$PORT -jar /camping_app.jar" ]