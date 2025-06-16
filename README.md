<p align="center">
  <a href="https://www.royalvoluntaryservice.org.uk/" target="blank"><img src="./assets/rvs-logo.svg" width="120" alt="Nest Logo" /></a>
</p> 

## Note to the team

Dear RVS Team,

Thank you for the opportunity to complete this assessment and demonstrate my skills. I genuinely appreciate
the chance to contribute, and I hope my submission reflects both my capabilities and approach to problem-solving.

The current implementation is a minimalistic app focused on meeting the core requirements. With more time, I would have
approached it differently by incorporating additional features such as unit and end-to-end testing, authentication and
authorization, pagination to efficiently handle large volumes of notes, SSL for enhanced security, and other performance
and usability improvements.

Once again, thank you for this opportunity. Please find the setup instructions for the application below.

## Description

A minimalistic Posts application that allows users to view and manage posts.

Tech stack:

- NestJS
- TypeScript
- Redis / PostgreSQL to save data in
- Docker

#### Features:

- Add Posts
- Edit Posts
- View Posts
- Delete Posts


## My Approach to Dependency Injection and Data Flow:

I follow a clean and modular approach to dependency injection. I handle business logic inside
services and inject those services into controllers using constructor injection. I organize everything using modules to
keep dependencies well-structured and maintainable. When I need to interact with the database, I inject repositories
directly into the service using the @InjectRepository() decorator.

For data flow, it’s straightforward: a client sends a request, the controller receives and validates it, then passes it
to the service. The service runs the logic, talks to the database, and returns the result back to the controller, which
sends the final response to the client.

This approach helps me keep the codebase clean, scalable, and easy to test.

## Project setup

### Prerequisites

- Docker
- Make: Run `brew install make` on MacOs to install the Make program. The make program will make the installation easy
  and less stressful.

## Setup with make

Run the following command from the root directory to setup the application.

```bash
$ make setup-local
```

## Manual Setup

Run the following commands from the root directory to setup the application.

### Setup environment

```bash
$ rm -rf .env
$ cp .env.dist .env
```

### Install and launch application

```bash
$ docker-compose up -d
$ yarn install
$ yarn setup:db
$ yarn seed
$ yarn dev
```

## Run the api in Postman

- The backend runs on port 8080 at `http://localhost:8080`

<br/>

### Thanks and best regards

<br/>
