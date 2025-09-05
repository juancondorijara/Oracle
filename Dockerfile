# Stage 1: Build
FROM maven:3.9.0-eclipse-temurin-17-alpine AS build
WORKDIR /app
COPY pom.xml ./
COPY src ./src
RUN mvn clean package -DskipTests


# Stage 2: Run
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]


# docker build -t juan321/backend-oracle:17-openjdk-jdk .

#FROM amazoncorretto:17-alpine-jdk
#FROM bellsoft/liberica-openjdk-alpine:17
#FROM openjdk:17-alpine
#FROM eclipse-temurin:17-jre-alpine