// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RentalContract {
    // Struct to store rental information
    struct Rental {
        address renter; // Address of the renter
        uint256 startDate; // Start date of the rental
        uint256 endDate; // End date of the rental
        uint256 vehicleId; // ID of the rented vehicle
        uint256 amountPaid; // Amount paid for the rental
        bool paid; // Flag indicating if the payment has been received
        bool active; // Flag indicating if the rental is active
    }

    Rental[] public rentals; // Array to store rental transactions
    uint256 public nextVehicleId; // Variable to track the next vehicle ID
    address public owner; // Address of the contract owner

    // Events to log rental actions
    event RentalCreated(address indexed renter, uint256 indexed vehicleId, uint256 startDate, uint256 endDate, uint256 amountPaid);
    event RentalUpdated(uint256 indexed rentalId, uint256 startDate, uint256 endDate, uint256 amountPaid);
    event RentalCancelled(uint256 indexed rentalId, uint256 refundAmount);
    event PaymentReceived(uint256 indexed rentalId, uint256 amount);

    // Constructor to set the contract owner
    constructor() {
        owner = msg.sender;
    }

    // Modifier to restrict certain functions to the contract owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    // Function to rent a vehicle
    function rentVehicle(uint256 _vehicleId, uint256 _startDate, uint256 _endDate) external payable {
        require(_endDate > _startDate, "Invalid rental period");
        require(msg.value > 0, "Invalid payment amount");

        // Create a new rental transaction
        Rental memory newRental = Rental(msg.sender, _startDate, _endDate, _vehicleId, msg.value, true, true);
        rentals.push(newRental);
        emit RentalCreated(msg.sender, _vehicleId, _startDate, _endDate, msg.value);
    }

    // Function to update rental details
    function updateRental(uint256 _rentalId, uint256 _startDate, uint256 _endDate) external {
        require(_endDate > _startDate, "Invalid rental period");
        Rental storage rental = rentals[_rentalId];
        require(rental.active, "Rental does not exist");
        require(rental.renter == msg.sender, "You are not authorized to update this rental");

        rental.startDate = _startDate;
        rental.endDate = _endDate;
        emit RentalUpdated(_rentalId, _startDate, _endDate, rental.amountPaid);
    }

    // Function to cancel a rental
    function cancelRental(uint256 _rentalId) external {
        Rental storage rental = rentals[_rentalId];
        require(rental.active, "Rental does not exist");
        require(rental.renter == msg.sender, "You are not authorized to cancel this rental");

        // Cancel the rental and refund the payment
        rental.active = false;
        uint256 refundAmount = rental.amountPaid;
        rental.amountPaid = 0;
        rental.renter.transfer(refundAmount);
        emit RentalCancelled(_rentalId, refundAmount);
    }

    // Function to receive payment for a rental
    function receivePayment(uint256 _rentalId) external payable onlyOwner {
        Rental storage rental = rentals[_rentalId];
        require(rental.active, "Rental does not exist");
        require(!rental.paid, "Payment has already been received");

        // Transfer payment to the renter
        rental.renter.transfer(rental.amountPaid);
        rental.paid = true;
        emit PaymentReceived(_rentalId, rental.amountPaid);
    }

    // Function to get rental details by ID
    function getRental(uint256 _rentalId) external view returns (Rental memory) {
        require(_rentalId < rentals.length, "Rental does not exist");
        return rentals[_rentalId];
    }
}
