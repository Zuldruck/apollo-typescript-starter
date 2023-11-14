# 🚀 apollo-typescript-starter

A feature-rich GraphQL starter template built with TypeScript, Yarn, Sequelize (TypeScript version), MySQL, Redis, and Docker.
Designed for ease of use, debugging, and compatibility with Apollo Subscriptions.

## ⭐️ Features

- **TypeScript:** Strongly-typed language for enhanced development.
- **Yarn:** Fast, reliable package manager for dependency management.
- **Sequelize (TypeScript):** Powerful and flexible ORM for interacting with MySQL databases.
- **MySQL Database:** Robust relational database for data storage.
- **Redis:** Utilized for pubsub and caching functionalities.
- **Docker:** Containerization for easy deployment and scaling.
- **Debugger Friendly:** Ready for debugging with the `yarn dev` command.
- **Apollo Subscriptions:** Seamless integration for real-time updates.
- **Project Structure:**
  - `clients`: Definition and instanciation of clients (Sequelize, Redis and RedisPubSub).
  - `constants`: Centralized storage for project constants.
  - `gql`: Definitions for GraphQL queries, mutations, types, and TypeScript resolvers.
  - `models`: Sequelize models for database interaction.

## 🚀 Getting Started

1. Clone the repository: `git clone https://github.com/Zuldruck/apollo-typescript-starter.git`
2. Install dependencies: `yarn install`
3. Copy the `.env.example` to `.env` and configure the database settings.
4. Start the development server: `yarn dev`

## 🐳 Docker Setup

1. Ensure Docker is installed on your machine.
2. Run `docker-compose up` to start the server, database, and Redis.

## 🛠️ Database Configuration

- Database configuration is defined in the `.env` file. Copy `.env.example` and update the values accordingly.

## 📜 Scripts

- The `scripts` folder contains project-specific scripts, including the `sync-database` script for managing the database according to Sequelize models.
- To run the `sync-database` script, use the following command:
  ```bash
  yarn script sync-database
  ```
  This script will create or update the database based on the Sequelize models defined in the `models` folder.
  Feel free to adjust the wording or details based on the specific functionality of your "sync-database" script or any other scripts you may have in the "scripts" folder.

## 🐞 Debugging

- Use `yarn dev` for debugging with the debugger.

## 🔗 Context Creation

- Context creation file is located at `src/context.ts` for queries/mutations and another for subscriptions.

## 🌐 Apollo Subscriptions

- Ready-to-use Apollo Subscriptions for real-time updates.

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.
