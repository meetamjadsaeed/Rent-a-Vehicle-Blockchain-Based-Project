# Rent-a-Vehicle-Blockchain-Based-Project

Rent-a-Vehicle is a decentralized application (DApp) that leverages blockchain technology to facilitate transparent and secure vehicle rental transactions.

## Features

- **Blockchain-based Rental Transactions**: Utilizes Ethereum blockchain for transparent and secure rental transactions.
- **Smart Contract**: Implements a Solidity smart contract to manage rental transactions on the blockchain.
- **Backend API**: Provides RESTful APIs built with NestJS to interact with the Ethereum smart contract and manage rental transactions.
- **Frontend Interface**: [Coming Soon]

## Smart Contract

The smart contract (`RentalContract.sol`) defines the logic for managing rental transactions on the Ethereum blockchain. It includes functions for renting vehicles, updating rental details, cancelling rentals, getting Rental and receive payment for a rental.

## Backend API

The backend API is developed using NestJS, a progressive Node.js framework. It provides endpoints to interact with the Ethereum smart contract, manage rental transactions, and handle user authentication.

### API Endpoints

- **Authentication APIs**:
  - `POST /auth/signup`: User registration.
  - `POST /auth/login`: User login.
  - `POST /auth/logout`: User logout (optional).
- **Vehicle Management APIs**:
  - `GET /vehicles`: Get list of available vehicles.
  - `POST /vehicles`: Add a new vehicle.
  - `GET /vehicles/:id`: Get details of a specific vehicle.
  - `PUT /vehicles/:id`: Update details of a specific vehicle.
  - `DELETE /vehicles/:id`: Delete a specific vehicle.
- **Rental Transaction APIs**:
  - `GET /rentals`: Get list of rental transactions.
  - `POST /rentals`: Rent a vehicle.
  - `GET /rentals/:id`: Get details of a specific rental transaction.
  - `PUT /rentals/:id`: Update details of a specific rental transaction.
  - `DELETE /rentals/:id`: Cancel a specific rental transaction.
- **Payment Transaction APIs:**:
  - `GET /payments`: Get list of payment transactions.
  - `POST /payments`: Process a payment for a rental.
  - `POST /payments/:id/refund`: Initiate a refund for a specific payment transaction.
  - `POST /payments/:id/process`: Process a payment for a specific rental transaction.
  - `GET /payments/:id`: Get details of a specific payment transaction.
  - `PATCH /payments/:id:`: Update details of a specific payment transaction.
  - `DELETE /payments/:id`: Cancel a specific payment transaction.

## Frontend Interface

## Getting Started

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License
