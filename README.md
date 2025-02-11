# Code Collaboration App

This project is a real-time code collaboration application designed to facilitate seamless teamwork among developers. It enables multiple users to edit code simultaneously, enhancing productivity and communication.

## Features

- **Real-Time Collaboration**: Multiple users can edit code concurrently with instant updates.
- **User-Friendly Interface**: Intuitive design for easy navigation and usage.
- **Scalability**: Supports numerous users and large codebases efficiently.

## Project Structure

- `client/`: Contains the frontend code responsible for the user interface.
- `server/`: Houses the backend code managing real-time communication and data processing.
- `database/`: Includes database schemas and related files.
- `Makefile`: Script for building and managing the project.
- `docker-compose.yaml`: Configuration for Docker containers to set up the development environment.

## Getting Started

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/Inas1234/Code_Collaboration_App.git
   ```

2. **Navigate to the Project Directory**:

   ```bash
   cd Code_Collaboration_App
   ```

3. **Set Up the Environment**:

   Ensure you have [Docker](https://www.docker.com/get-started) installed. Then, run:

   ```bash
   docker-compose up
   ```

This command will build and start the necessary containers for the application.

4. **Access the Application**:

   Once the containers are running, open your web browser and navigate to `http://localhost:3000` to start using the Code Collaboration App.

## Usage

- **Creating a Session**:

   Click on "Create Session" to start a new collaboration session.

- **Joining a Session**:

   Enter the session ID provided by the session creator to join an existing collaboration.

- **Collaborating**:

   Begin coding in the editor. Changes will be reflected in real-time for all participants.
