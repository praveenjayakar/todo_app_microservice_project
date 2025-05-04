FROM maven:3.8.4-openjdk-17-slim AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM gcr.io/distroless/java17-debian12
COPY --from=build /app/target/*.jar main.jar
EXPOSE 8083
CMD ["main.jar"] 