# Pokémon App

## Overview

The Pokémon App is a web application built with React, TypeScript, Redux, and the Redux Toolkit. It allows users to browse a list of Pokémon and view detailed information about each one. The project demonstrates the use of modern front-end technologies and best practices in testing, state management, and API integration.

## Features

- **Home Page**: Displays a welcome message and a list of Pokémon.
- **Pokémon List**: Lists all Pokémon fetched from the Pokémon API.
- **Pokémon Detail Page**: Shows detailed information about a specific Pokémon, including:
  - General Information
  - Abilities
  - Stats
  - Types
  - Forms
  - Moves
  - Game Indices
  - Sprites

## Technologies Used

- **React**: For building the user interface.
- **TypeScript**: For type safety and better development experience.
- **Redux**: For state management.
- **Redux Toolkit**: Simplifies Redux setup and provides powerful tools for writing Redux logic.
- **React Router**: For routing.
- **Jest & React Testing Library**: For testing components and pages.
- **Yarn**: Package manager.

## Requirements

- **Node.js**: v21.2.0
- **Yarn**: 1.22.22

## Installation

To get started with the project, follow these steps:

1. **Install Node.js**:
    ```bash
    # Using nvm (Node Version Manager)
    nvm install 21.2.0
    nvm use 21.2.0

    # Or download from the official website and install
    # https://nodejs.org/
    ```

2. **Install Yarn**:
    ```bash
    npm install -g yarn@1.22.22
    ```

3. **Clone the repository**:
    ```bash
    git clone https://github.com/allahwasayadev/pokemon-app.git
    cd pokemon-app
    ```

4. **Install dependencies**:
    ```bash
    yarn install
    ```

5. **Run the development server**:
    ```bash
    yarn start
    ```

6. **Run tests**:
    ```bash
    yarn test
    ```


## Routes

The application has the following routes:

- `/`: Home page displaying a welcome message and the Pokémon list.
- `/pokemon/:id`: Pokémon detail page showing detailed information about the selected Pokémon.

## Usage

### Home Page

The Home Page displays a welcome message and a list of Pokémon. Each Pokémon in the list can be clicked to navigate to the Pokémon Detail Page.

### Pokémon Detail Page

The Pokémon Detail Page shows detailed information about the selected Pokémon. The displayed information includes:

- **General Information**: Basic details such as height, weight, base experience, order, ID, default status, and location area encounters.
- **Abilities**: List of abilities the Pokémon possesses.
- **Stats**: The Pokémon's stats such as speed and special defense.
- **Types**: Types of the Pokémon (e.g., grass, poison).
- **Forms**: Different forms of the Pokémon.
- **Moves**: Moves the Pokémon can learn.
- **Game Indices**: Game indices for different versions.
- **Sprites**: Images of the Pokémon's sprites.

The data is fetched from the Pokémon API, and the application uses Redux for state management.

## Testing

The project includes unit tests for the components and pages and integration test cases for application. The tests are written using Jest and React Testing Library. To run the tests, use the following command:

```bash
yarn test
