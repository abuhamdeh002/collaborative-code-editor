
# Collaborative Code Editor

## Overview

The Collaborative Code Editor Tool is a web-based application that allows multiple users to collaboratively edit and manage documents in real-time. Built with Spring Boot, WebSocket, and MySQL Database, this tool ensures a seamless and synchronized editing experience.

## Features

- **Real-time Collaboration**: Multiple users can edit documents simultaneously.
- **Document Management**: Create, read, update, and delete documents.
- **User Authentication**: Secure login and user management.
- **WebSocket Communication**: Real-time updates using WebSocket.
- **In-memory Database**: MySQL Database for easy setup and testing.
- **RESTful APIs**: Endpoints for managing documents and users.


## Getting Started

### Prerequisites

- Java 11 or higher
- Maven
- An IDE (e.g., Eclipse, IntelliJ IDEA)

### Installation

1. **How to start my app**

   ```sh
   git clone https://github.com/abuhamdeh002/collaborative-code-editor.git
   cd collaborative_code_editor
   ```

2. **Build the project:**

   ```sh
   mvn clean install
   ```

3. **Run the application:**

   ```sh
   mvn spring-boot:run
   ```

### Configuration

The application is configured using the `application.properties` file located in the `src/main/resources` directory. Here are some key configurations:

```properties
# Server Configuration
server.port=8081

# MySQL Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/collaborative_code_editor
spring.datasource.username=root
spring.datasource.password=Mustafa@2002
spring.datasource.driverClassName=com.mysql.cj.jdbc.Driver
spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# Logging Configuration (optional)
logging.level.org.springframework=INFO
logging.level.com.example=DEBUG

spring.devtools.livereload.enabled=true
spring.devtools.livereload.port=35730

## Testing the APIs

I used Postman tool to test the RESTful APIs.

## Running Tests

To run the tests, use the following command:

```sh
mvn test
```
