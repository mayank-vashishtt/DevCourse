// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// ---------------------------------------------
// CONTRACTS
// ---------------------------------------------
// A contract is the main building block in Solidity.
// It is similar to a class in other languages.

contract ZombieFactory {

    // ---------------------------------------------
    // STATE VARIABLES
    // ---------------------------------------------
    // Stored permanently on the blockchain.
    uint public dnaDigits = 16; // 'public' creates a getter automatically

    // Mathematical operations
    uint public dnaModulus = 10 ** dnaDigits; // 10^16

    // ---------------------------------------------
    // STRUCTS
    // ---------------------------------------------
    // Custom data types grouping multiple variables.
    struct Zombie {
        string name;
        uint dna;
        uint level;
        address creator;
    }

    // ---------------------------------------------
    // ARRAYS
    // ---------------------------------------------
    // Dynamic array of Zombie structs.
    Zombie[] public zombies;

    // ---------------------------------------------
    // STRINGS
    // ---------------------------------------------
    string public greeting = "Welcome to ZombieFactory!";

    // ---------------------------------------------
    // MAPPINGS
    // ---------------------------------------------
    // Key-value store for fast lookup.
    mapping(address => uint) public ownerZombieCount;

    // ---------------------------------------------
    // EVENTS
    // ---------------------------------------------
    // Used for logging activity on the blockchain.
    event NewZombie(address indexed creator, string name, uint dna);

    // ---------------------------------------------
    // MODIFIERS
    // ---------------------------------------------
    // Used to change the behavior of functions.
    modifier onlyCreator(uint _zombieId) {
        require(zombies[_zombieId].creator == msg.sender, "Not the creator");
        _;
    }

    // ---------------------------------------------
    // FUNCTIONS
    // ---------------------------------------------
    // Create a new Zombie and add it to the array.
    function createZombie(string memory _name, uint _dna) public {
        zombies.push(Zombie(_name, _dna, 1, msg.sender));
        ownerZombieCount[msg.sender]++;
        emit NewZombie(msg.sender, _name, _dna);
    }

    // Get the number of zombies created.
    function getZombieCount() public view returns (uint) {
        return zombies.length;
    }

    // Level up a zombie (only creator can do this).
    function levelUp(uint _zombieId) public onlyCreator(_zombieId) {
        zombies[_zombieId].level++;
    }

    // Get details of a zombie.
    function getZombie(uint _zombieId) public view returns (string memory, uint, uint, address) {
        Zombie memory z = zombies[_zombieId];
        return (z.name, z.dna, z.level, z.creator);
    }

    // ---------------------------------------------
    // ERROR HANDLING
    // ---------------------------------------------
    // Example: Prevent creating a zombie with empty name.
    function safeCreateZombie(string memory _name, uint _dna) public {
        require(bytes(_name).length > 0, "Name required");
        createZombie(_name, _dna);
    }

    // ---------------------------------------------
    // PAYABLE FUNCTIONS
    // ---------------------------------------------
    // Allow contract to receive Ether.
    receive() external payable {}

    // Withdraw Ether from contract (only owner).
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not contract owner");
        _;
    }

    function withdraw() public onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
}


// ---------------------------------------------
// LIBRARIES
// ---------------------------------------------
// Libraries are reusable pieces of code. They can't hold state or Ether.
library MathLib {
    function add(uint a, uint b) internal pure returns (uint) {
        return a + b;
    }
    function mul(uint a, uint b) internal pure returns (uint) {
        return a * b;
    }
}

// ---------------------------------------------
// INTERFACES
// ---------------------------------------------
// Interfaces define function signatures for other contracts to implement.
interface IZombieFactory {
    function createZombie(string memory _name, uint _dna) external;
    function getZombieCount() external view returns (uint);
}

// ---------------------------------------------
// ABSTRACT CONTRACTS
// ---------------------------------------------
// Abstract contracts have at least one function without implementation.
abstract contract AbstractZombie {
    function getZombie(uint _zombieId) public view virtual returns (string memory, uint, uint, address);
}

// ---------------------------------------------
// INHERITANCE
// ---------------------------------------------
// Contracts can inherit from other contracts and override functions.

contract ZombieFactory is AbstractZombie {
    using MathLib for uint; // Use library functions for uint type

    struct Zombie {
        string name;
        uint dna;
        uint level;
        address creator;
    }

    Zombie[] public zombies;
    mapping(address => uint) public ownerZombieCount;
    event NewZombie(address indexed creator, string name, uint dna);

    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not contract owner");
        _;
    }

    modifier onlyCreator(uint _zombieId) {
        require(zombies[_zombieId].creator == msg.sender, "Not the creator");
        _;
    }

    function createZombie(string memory _name, uint _dna) public {
        zombies.push(Zombie(_name, _dna, 1, msg.sender));
        ownerZombieCount[msg.sender] = ownerZombieCount[msg.sender].add(1); // Using library
        emit NewZombie(msg.sender, _name, _dna);
    }

    function getZombieCount() public view returns (uint) {
        return zombies.length;
    }

    function levelUp(uint _zombieId) public onlyCreator(_zombieId) {
        zombies[_zombieId].level = zombies[_zombieId].level.add(1); // Using library
    }

    // Implementation of abstract function
    function getZombie(uint _zombieId) public view override returns (string memory, uint, uint, address) {
        Zombie memory z = zombies[_zombieId];
        return (z.name, z.dna, z.level, z.creator);
    }

    // Example: Use library for multiplication
    function multiplyZombieLevel(uint _zombieId, uint factor) public onlyCreator(_zombieId) {
        zombies[_zombieId].level = zombies[_zombieId].level.mul(factor);
    }

    // Payable and withdraw
    receive() external payable {}
    function withdraw() public onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
}

// ---------------------------------------------
// CONTRACT USING INTERFACE
// ---------------------------------------------
contract ZombieGame {
    IZombieFactory public factory;

    constructor(address _factoryAddress) {
        factory = IZombieFactory(_factoryAddress);
    }

    function createGameZombie(string memory _name, uint _dna) public {
        factory.createZombie(_name, _dna);
    }

    function getFactoryZombieCount() public view returns (uint) {
        return factory.getZombieCount();
    }
}