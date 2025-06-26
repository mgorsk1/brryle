# Brryle Search Application

This project is a web application that provides search functionality, powered by Elasticsearch. It includes a React frontend, a Node.js backend server, and uses Docker for containerization.

## Project Structure

- `src/`: Contains the React frontend application.
- `server.cjs`: The Node.js backend server.
- `docker-compose.yml`: Defines the multi-container Docker environment, including Elasticsearch, Kibana, and the Brryle application.
- `Dockerfile`: Used to build the Docker image for the Brryle application.
- `package.json`: Manages frontend and backend dependencies and scripts.

## Features

- **Search Functionality**: Leverages Elasticsearch for efficient and powerful search capabilities.
- **React Frontend**: A dynamic and responsive user interface built with React.
- **Node.js Backend**: Serves the frontend and handles API requests, likely proxying to Elasticsearch.
- **Dockerized Environment**: Easy setup and deployment using Docker Compose.
- **Kibana Integration**: Includes Kibana for visualizing and managing Elasticsearch data.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Node.js](https://nodejs.org/en/download/) (for local development without Docker)
- [npm](https://www.npmjs.com/get-npm) (comes with Node.js)

### Building and Running with Docker Compose

The easiest way to get the entire application stack running is by using Docker Compose.

1.  **Clone the repository**:
    ```bash
    git clone <repository_url>
    cd brryle
    ```
2.  **Build and run the Docker containers**:
    This command will build the `brryle` application image, and then start all services defined in `docker-compose.yml` (Elasticsearch, Kibana, and Brryle).
    ```bash
    docker-compose up --build
    ```
    This might take some time on the first run as it downloads Docker images and builds the application.

3.  **Access the application**:
    Once all services are up and running:
    -   The Brryle search application will be available at `http://localhost:8080`.
    -   Kibana will be available at `http://localhost:5601`.
    -   Elasticsearch will be available at `http://localhost:9200`.

4.  **Stop the services**:
    To stop the running Docker containers, press `Ctrl+C` in the terminal where `docker-compose up` is running. To stop and remove the containers, networks, and volumes (for a clean slate), use:
    ```bash
    docker-compose down -v
    ```

### Local Development (without Docker Compose for the application)

If you want to develop the frontend and backend locally without Docker Compose for the `brryle` application itself (but still use Docker for Elasticsearch and Kibana):

1.  **Start Elasticsearch and Kibana with Docker Compose**:
    ```bash
    docker-compose up elastic kibana
    ```
    This will only bring up the Elasticsearch and Kibana services.

2.  **Install Node.js dependencies**:
    ```bash
    npm install
    ```

3.  **Build the frontend and start the backend server**:
    ```bash
    npm run dev
    ```
    This script first builds the React frontend and then starts the Node.js server. The application will be available at `http://localhost:3000` (or the port configured in `server.cjs`).

    **Note**: Ensure that the `BACKEND_URL` environment variable (or equivalent configuration in `server.cjs`) points to your running Elasticsearch instance (e.g., `http://localhost:9200` if running locally).

## Scripts

The `package.json` includes several useful scripts:

-   `npm run build`: Builds the React frontend for production.
-   `npm start`: Starts the Node.js backend server.
-   `npm run dev`: Builds the frontend and then starts the backend server (useful for local development).
-   `npm test`: Currently a placeholder.

## Configuration

-   **`docker-compose.yml`**:
    -   `PAGE_SIZE`: Configures the number of search results per page for the `brryle` service.
    -   `BACKEND_URL`: Specifies the Elasticsearch URL for the `brryle` service.
-   **Elasticsearch**: Configured within `docker-compose.yml` for development purposes (e.g., `xpack.security.enabled=false`).

## Contributing

Please read `CONTRIBUTING.md` (if it exists) for details on our code of conduct, and the process for submitting pull requests to us.

## License

This project is licensed under the ISC License - see the `LICENSE` file for details.
