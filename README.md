# Training Calendar App - [app.omega-next.online](https://app.omega-next.online)

This is a React application for managing posts and categories. It allows users to create, edit, and delete posts, as well as manage categories. It uses [Training Calendar API](https://github.com/ziggrin/training-calendar-api) as a backend.

### What's cool:
- checkout the ```.github/workflows/preprod.yml``` to find out how CI/CD works,
- you can very easily run this app as a full stack (API, Postgres, React) on your local machine using instructions posted here,
- **NOT FINISHED** look at ```dev.react.Dockerfile``` dockerized version of this app that lets you develop quickly without having to install dependencies on your local system,
- static files are hosted by nginx server with **H5BP boilerplate** configuration.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [Docker](#docker)
- [Docker Compose](#docker-compose)
- [Infrastructure](#infrastructure)
- [License](#license)

## Installation

1. Clone the repository:

    ```sh
    git clone git@github.com:YOURUSERNAME/training-calendar-api.git
    cd training-calendar-front
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

Optional: 

You could create a `.env` file in the root directory and add your API URL:

```env
REACT_APP_API_URL=https://api.omega-next.online
```
Default localhost URL is: `http://localhost:8080/api/v1` just so it's compatible with ```docker-compose.yml``` from [Training Calendar API](https://github.com/ziggrin/training-calendar-api). If you are running this app not through compose free to set this value as you like.

## Usage

1. Start the development server:

    ```sh
    npm start
    ```

2. Open your browser and navigate to `http://localhost:3000`.

## API

The application interacts with a backend API to manage posts and categories. The API endpoints are defined in the `src/api.js` file.

### Category API

- `CategoryAPI.getAll()`: Fetch all categories.
- `CategoryAPI.create(data)`: Create a new category.
- `CategoryAPI.update(id, data)`: Update an existing category.
- `CategoryAPI.delete(id)`: Delete a category.

### Post API

- `PostAPI.getAll()`: Fetch all posts.
- `PostAPI.get(id)`: Fetch a single post by ID.
- `PostAPI.create(formData)`: Create a new post.
- `PostAPI.update(id, formData)`: Update an existing post.
- `PostAPI.delete(id)`: Delete a post.

## Docker

To run the application using Docker, follow these steps:

1. Build the Docker image:

    ```sh
    cd ./dockerdev
    docker build -t training-calendar-front -f dev.react.Dockerfile .
    ```

2. Run the Docker container:

    ```sh
    docker run -p 3000:3000 training-calendar-front
    ```

## Docker-Compose

It's possible to run this application locally as a **full stack app with: API, Postgres and React** using ```.dockerdev/docker-compose.yml``` from [Training Calendar API](https://github.com/ziggrin/training-calendar-api).

Simply follow the instructions provided here: API install instructions

## Infrastructure

Right now there is only preproduction version of this application live on the AWS infrastructure built as IaC with Terraform:

- [Terraform VPC, Security Groups, EC2 setup](https://github.com/ziggrin/tf-main-01-vpc)
- [ECS Clusters, Services, RDS and permissions](https://github.com/ziggrin/tf-preprod-training-calendar)


## License

This project is licensed under the MIT License. See the LICENSE file for details.