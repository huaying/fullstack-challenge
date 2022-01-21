## Overview

We would like to design a simple decentralized blogging plaform where users are allowed to view and write articles on the platform. Users will utilize their Ethereum Wallet to login.

## Required features

1. UI for the user to sign-in with Ethereum, via standard wallet such as MetaMask. 
2. UI that can render list of stored articles, displaying author's address.
3. UI for user to submit an article with title and text.
4. After the user submit, store the article and display notification stating the reuqest is successful or failed.

### ref
- https://www.toptal.com/ethereum/one-click-login-flows-a-metamask-tutorial
- https://github.com/orbitdb/orbit-db

## Login Design

To Login with a wallet address(public key), we couldn't simply just send the address to backend. That way hackers can easily mock user by using the same address. 

To login a user and ensure the user owns the address:

1. Let the user sign a random message(nonce) sent from the backend with private key. 
2. The user then login with the signature and the address(public key)
3. Our backend checks the signature and reponds with a jwt `access_token` which includes the address. 
4. The `access_token` will be used to ensure if the following requests are sent by the right user.

Generate nonce:

A random number range from `0 - 9999`.

Since it's not a production app, we will create a js key-value obj to store the nonce in our backend. 

While receiving a nonce request from the client side, we add a new pair into the store like `key=address, value=nonce` and return the nonce to the client side. When receving a login request, we get the corresponding nonce from our store and verify if the signature is valid.

## Store Article

Database: [OrbitDB](https://github.com/orbitdb/orbit-db)

In our user case, we might need a db that allows us to insert data in chronological order, and `feed` should be a good candidate. It offers the functionality of `add` and `remove`. It should fulfill our requirements although there is no `update`.

Each address(user) will have its own feed.
