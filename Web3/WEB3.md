```markdown
# Web3 Fundamentals and Components with Flows + Real-World Examples

---

## Why Web3 Can Be Distracting
In Web3, it’s easy to get distracted by building random use cases that nobody wants. The ecosystem is still evolving, so focus should be on solving real-world problems with blockchain and decentralized technology.

---

## What is Blockchain?
A **blockchain** is a distributed ledger that stores data in blocks linked together in a chain. It ensures:
- **Immutability**: Data cannot be easily altered.
- **Transparency**: All transactions are publicly verifiable.
- **Decentralization**: No single central authority controls the network.

**Flow:**
```

Transaction → Validated by Network (Consensus) → Added to Block → Linked to Chain → Permanent Record

```

**Example:**
- Sending 1 BTC from Alice to Bob on the Bitcoin network.

---

## Bitcoin and Its Limitation
- **Bitcoin (BTC)** was the first blockchain.
- Main Purpose: Peer-to-peer **financial transactions**.
- **Limitation**: Only supports one kind of transaction (transfer of BTC), no support for complex logic or apps.

**Example:**
- You can send BTC to another wallet, but you cannot deploy apps or tokens on Bitcoin.

---

## Ethereum and Why It Was Introduced
- Ethereum is a blockchain that came after Bitcoin.
- **Purpose**: Add programmability to blockchain.
- **Feature**: Deploy **Smart Contracts** (code on blockchain that runs automatically when conditions are met).

**Flow:**
```

User → Sends Transaction with Data → Ethereum Network → Executes Smart Contract → Updates State → Returns Result

````

**Example:**
- Deploying an ERC-20 token or creating a Decentralized Exchange like Uniswap.

---

## What is Solidity?
- Solidity is a programming language used to write **smart contracts** on Ethereum.
- Similar to JavaScript in syntax.

**Example:**
- Writing an ERC-20 token contract in Solidity.

```solidity
pragma solidity ^0.8.0;

contract MyToken {
    string public name = "MyToken";
    string public symbol = "MTK";
    uint8 public decimals = 18;
    uint256 public totalSupply = 1000000 * (10 ** uint256(decimals));
    mapping(address => uint256) public balanceOf;

    constructor() {
        balanceOf[msg.sender] = totalSupply;
    }
}
````

---

## What is a Smart Contract?

* A **smart contract** is self-executing code stored on the blockchain.
* Executes automatically when predefined conditions are met.
* Immutable once deployed.

### Use Cases of Smart Contracts

* **Create your own token** (like Shiba Inu or Dogecoin clones).
* **Decentralized Exchanges (DEX)** like Uniswap.
* **NFT Marketplaces**.

**Smart Contract Flow:**

```
Write Contract in Solidity → Compile to Bytecode → Deploy on Ethereum (EVM) → Interact via Wallet (e.g., MetaMask)
```

**Example:**

* Deploying an ERC-721 NFT contract for a marketplace.

---

## Does Dogecoin Exist on Ethereum?

* **Dogecoin** is **NOT** on Ethereum. It runs on its own blockchain (forked from Litecoin).
* **Tokens like Shiba Inu** do exist on Ethereum as **ERC-20 tokens**.

---

## How to Create Your Own Coin on Ethereum?

1. Write a smart contract using Solidity implementing **ERC-20 standard**.
2. Deploy it on Ethereum using tools like **Remix IDE** or **Hardhat**.
3. Verify and interact via a wallet or DApp.

**Token Creation Flow:**

```
Define Token Contract (ERC-20) → Compile → Deploy → Token Minting → Token Transfers
```

**Example:**

* Shiba Inu token follows the ERC-20 standard.

---

## What is a Decentralized Exchange (DEX)?

* A platform that allows **peer-to-peer token swaps without intermediaries**.
* Uses **liquidity pools** and smart contracts.

**DEX Flow:**

```
User A & B Provide Tokens → Smart Contract Creates Liquidity Pool → Users Swap Tokens via Pool → Smart Contract Updates Balances
```

**Example:**

* Uniswap V2 where users can swap ETH for USDC.

---

## Why Do Blockchains Have Their Own Smart Contract Stack?

Each blockchain has unique architecture → needs its own language & tools.

Examples:

* **Ethereum** → Solidity.
* **Solana** → Rust.
* **NEAR** → Rust, AssemblyScript.
* **Polkadot** → Rust (via Substrate framework).

**General Flow:**

```
Write Contract in Specific Language → Compile → Deploy on Chain VM → Interact via Transactions
```

**Example:**

* Writing a Solana smart contract in Rust for a token program.

---

## Role of Rust in Web3

* Rust is popular in **high-performance blockchain development**.
* Used in blockchains like **Solana, Polkadot** for building core protocols and smart contracts.
* Chosen for **speed, memory safety, and concurrency handling**.

**Flow Example (Solana):**

```
Write Program in Rust → Compile to BPF → Deploy to Solana → Users Interact via Transactions
```

**Example:**

```rust
use solana_program::{account_info::AccountInfo, entrypoint, entrypoint::ProgramResult, pubkey::Pubkey};

entrypoint!(process_instruction);
fn process_instruction(
    _program_id: &Pubkey,
    _accounts: &[AccountInfo],
    _instruction_data: &[u8],
) -> ProgramResult {
    msg!("Hello Solana!");
    Ok(())
}
```

---
