# Stap 1: Basisafbeelding specificeren
FROM openjdk:17-jdk-alpine

# Stap 2: Werkdirectory instellen
WORKDIR /app

# Stap 3: Applicatie toevoegen
COPY target/snake-game-2.0.0.jar snake-game.jar

# Stap 4: Poort blootstellen
EXPOSE 8080

# Stap 5: Applicatie uitvoeren
CMD ["java", "-jar", "snake-game.jar"]