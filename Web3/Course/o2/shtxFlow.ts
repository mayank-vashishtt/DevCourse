// Import the required cryptography library (assumed as 'ed' for EdDSA operations)
import * as ed from '@noble/ed25519'; // Replace with the actual EdDSA library you are using
// npm install @noble/ed25519


async function main() {
    // 1. Generate a secure random private key using the library's utility function
    const privKey = ed.utils.randomPrivateKey(); // Private key is secret and used for signing
    console.log(privKey); // Display the generated private key

    // 2. Convert the message "hello world" to a Uint8Array (required for cryptographic functions)
    const message = new TextEncoder().encode("hello world"); // Converts string to bytes
    // console.log(message); // Uncomment to see the byte array

    // 3. Generate the public key from the private key (public key can be shared)
    const pubKey = await ed.getPublicKeyAsync(privKey); // Derives public key from private key
    console.log(pubKey); // Display the generated public key

    // 4. Sign the message using the private key (creates a digital signature)
    const signature = await ed.signAsync(message, privKey); // Signature proves ownership of private key

    // 5. Verify the signature using the public key, message, and signature
    const isValid = await ed.verifyAsync(signature, message, pubKey); // Checks if signature is valid

    // 6. Output the result (should print `true` if the signature is valid)
    console.log(isValid); // true means the signature matches the message and public key
}

main(); // Run the main function