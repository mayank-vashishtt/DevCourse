// In Solidity, a contract is similar to a class in Java or other OOP languages.
// It contains state variables, functions, and can define custom types like structs.

pragma solidity >=0.5.0 <0.6.0;

// Define a contract called ZombieFactory
contract ZombieFactory {

    // State variables are stored permanently on the blockchain.
    // 'uint' is an unsigned integer type. Here, dnaDigits is set to 16.
    uint dnaDigits = 16;

    // Example of a mathematical operation in Solidity:
    // Let's say we want to calculate the modulus for a DNA number.
    uint dnaModulus = 10 ** dnaDigits; // 10^16

    // STRUCT IN SOLIDITY
    // Structs allow you to define custom types.
    struct Zombie {
        string name;
        uint dna;
    }

    // ARRAYS
    // You can create arrays of structs.
    Zombie[] public zombies; // This is a dynamic array, publicly accessible.

    // STRINGS
    // Strings are used to store text data.
    string public greeting = "Welcome to ZombieFactory!";

    // DYNAMIC ARRAYS
    // The 'zombies' array above is dynamic, meaning you can add or remove elements.

    // PUBLIC ARRAYS
    // Declaring an array as 'public' creates a getter function automatically.

    // Example function to create a new Zombie and add it to the array
    function createZombie(string memory _name, uint _dna) public {
        zombies.push(Zombie(_name, _dna));
    }

    // Example function to get the number of zombies created
    function getZombieCount() public view returns (uint) {
        return zombies.length;
    }
}