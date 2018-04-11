---
layout: default
title: API & SDK Documentation
published: true
---

## API & SDK Documentation

Meenta offers a REST API for user, partner and equipment integrations. To
access the API you need an active account with API access enabled. Use
the account API options to generate an API token. This API implements
standard __OAuth2__ with variable rate limiting per endpoint grouping.

There are no public endpoints, all API endpoints require authentication.
This API is still in active development, so endpoints, validation and schemas
may change.

 - API URL [http://api.meenta.io/v0.1](http://api.meenta.io/v0.1)
 - Version: 0.0.1
 - Data Format: JSON Only
 - Access to Account API Keys is limited to select users. Please contact support for access.
 - Terms of Use: Use of the API is covered by the Meenta Terms of Use.
 - Rate Limiting: All endpoints have rate limiting. Please contact support for changes to limits.
 - HTTPS required.

### Authentication
This endpoint provides access to endpoints for managing access to the API.
All endpoints requests require a 'access-token' for access; via the header, URL or body.

- /authentication (POST) - Creates a new access token using an API key and secret.
- /authentication/remove (POST) - Remove an active session tokens.
- /authentication (GET) - Returns the current user account info for a given auth token.

Note: __nonce__ values are not currently required.

### Search
The following are search endpoints. These provides access to the meenta search
engine.

- /search/__{query}__ (GET) - Basic search. Returns all search results for a given 'query'.
- /search/__{query}__ (POST) - Advanced search. Returns all search results for a given a given search object.

### Instruments
The following are instrument endpoints. These provides access to manage a given
users instruments.

- /instrument (GET) - Returns an array of instruments.
- /instrument (POST) - Create an new instrument.
- /instrument/__{ id }__ (GET) - Return a single instrument.
- /instrument/__{ id }__/samples - Returns all samples for a given instrument.

### Scheduled Runs
The following are endpoints to manage a given instrument scheduled runs.

- /instrument/__{ id }__/runs (GET) - Return a runs for a given instrument.
- /instrument/__{ id }__/runs (POST) - Create an new instrument scheduled date.
- /instrument/__{ id }__/{run} (GET) - Returns all a given scheduled run.
- /instrument/__{ id }__/{run}/samples (GET) - Returns all a samples orders for a given run.
- /instrument/__{ id }__/{run} (DELETE) - Provides the ability to delete a given run.

### Samples
The following are sample endpoints. These provides access to manage a given
users samples.

- /sample (GET) - Returns all samples for a users account.
- /sample/__{ id }__ (PUT) - Provides the ability to edit owner fields.
- /sample/cancel (POST) - Provides an action to cancel an sample order.
- /sample/reject (POST) - Provides an action to reject an sample order.

### Orders
The following are order endpoints. These provides access to manage a given
partner or users orders.

- /order (GET) - Returns an array of account orders.
- /order (POST) - Create an new order.
- /order/__{ id }__ (GET) - Return a single partner order.
- /order/__{ id }__ (PUT) - Updates partner fields for an order.
- /order/__{ id }__/payments (GET) - Provides a summary of all meenta/customer payments for a given order.

### Purchase Orders
The following are purchase order endpoints. These provide hosts and users the
ability to manage their account purchase order payment options.

- /po (GET) - Returns an array of partner purchase orders.
- /po (POST) - Create an new purchase order.
- /po/__{ id }__ (GET) - Return a single purchase order.
- /po/__{ id }__ (PUT) - Updates purchase order.
- /po/__{ id }__/transactions (GET) - Returns a list of all transactions for a given PO.

*Please note that Credit Cards are not supported via the API.*

### Products
The following are third party products and services endpoints.
These provide hosts and users the ability to manage platform products.

- /product (GET) - Returns an array of third party products & services.
- /product (POST) - Create an new product.
- /product/__{ id }__ (GET) - Return a single product.
- /product/__{ id }__ (PUT) - Updates a product.

### Reports
The following provides access to partner reports.

- /report/__{ year }__/__{ month }__/transactions (GET) - Returns a report of all transactions for a given year + month.
- /report/__{ year }__/__{ month }__/payments (GET) - Returns a report of all payments for a given year + month.

### SDKs & Third Party Packages
Currently Meenta only supports a node.js SDK. The node.js SDK is coming soon.

### Notes
Some helpful things to note.

- API rate limiting values are not documented or available.
- Error codes and validation codes will not be available until v1.
- Reference the node.js SKD for working examples.
- Email __info@meenta.io__ for assistance or questions.
