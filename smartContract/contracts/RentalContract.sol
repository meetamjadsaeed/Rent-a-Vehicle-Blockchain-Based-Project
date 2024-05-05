// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RentalContract {
    struct Rental {
        address renter;
        uint256 startDate;
        uint256 endDate;
        uint256 vehicleId;
    }

    Rental[] public rentals;
    uint256 public nextVehicleId;

    event RentalCreated(address indexed renter, uint256 indexed vehicleId, uint256 startDate, uint256 endDate);
    event RentalUpdated(uint256 indexed rentalId, uint256 startDate, uint256 endDate);
    event RentalCancelled(uint256 indexed rentalId);

    function rentVehicle(uint256 _vehicleId, uint256 _startDate, uint256 _endDate) external {
        require(_endDate > _startDate, "Invalid rental period");
        Rental memory newRental = Rental(msg.sender, _startDate, _endDate, _vehicleId);
        rentals.push(newRental);
        emit RentalCreated(msg.sender, _vehicleId, _startDate, _endDate);
    }

    function updateRental(uint256 _rentalId, uint256 _startDate, uint256 _endDate) external {
        Rental storage rental = rentals[_rentalId];
        require(rental.renter == msg.sender, "You are not authorized to update this rental");
        require(_endDate > _startDate, "Invalid rental period");
        rental.startDate = _startDate;
        rental.endDate = _endDate;
        emit RentalUpdated(_rentalId, _startDate, _endDate);
    }

    function cancelRental(uint256 _rentalId) external {
        Rental storage rental = rentals[_rentalId];
        require(rental.renter == msg.sender, "You are not authorized to cancel this rental");
        delete rentals[_rentalId];
        emit RentalCancelled(_rentalId);
    }

    function getRental(uint256 _rentalId) external view returns (
        address renter,
        uint256 startDate,
        uint256 endDate,
        uint256 vehicleId
    ) {
        Rental storage rental = rentals[_rentalId];
        return (rental.renter, rental.startDate, rental.endDate, rental.vehicleId);
    }
}
