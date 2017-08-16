---
layout: default
title: API & SDK Documentation
published: true
---

This is short documentation of the Meenta Partner API. This is a REST
api that provides access to user data and information on the platform. To
access the API you need an active account. Use the account API options to
generate an API token. This API implements standard OAuth2 with variable
rate limiting per endpoint grouping.

This version requires Authentication on all endpoints. Nothing is public.

 - API Base URL [http://api.meenta.io](http://api.meenta.io)
 - Version: 0.0.1
 - Data Format: JSON Only
 - Access to Account API Keys is limited to select users. Please contact support for this level of access.
 - Terms of Use: Use of the API is covered by the Meenta Terms of Use.
 - Rate Limiting: All endpoints have rate limiting. Please contact support for changes to limits.

## Authentication
The '/auth' endpoint returns a token for all authenticate
endpoint on the Meenta platform and API.

- /authentication (POST) - Returns a session token.
- /authentication/remove (POST) - Remove an active session tokens.
- /authentication (GET) - Returns the current user account info for a given auth token.

## Search
The following are search endpoints. These provides access to the meenta search
engine.

- /search/__{query}__ (GET) - Basic search. Returns all search results for a given 'query'.
- /search/__{query}__ (POST) - Advanced search. Returns all search results for a given a given search object.

## Instruments
The following are instrument endpoints. These provides access to manage a given
users instruments.

- /instrument (GET) - Returns an array of instruments.
- /instrument/__{id}__ (GET) - Return a single instrument.
- /instrument/__{id}__/samples - Returns all samples for a given instrument.

## Scheduled Runs
The following are endpoints to manage a given instrument scheduled runs.

- /instrument/__{id}__/runs (GET) - Return a runs for a given instrument.
- /instrument/__{id}__/{run} (GET) - Returns all a given scheduled run.
- /instrument/__{id}__/{run}/samples (GET) - Returns all a samples orders for a given run.
- /instrument/__{id}__/{run} (DELETE) - Provides the ability to delete a given run.

## Samples
The following are sample endpoints. These provides access to manage a given
users samples.

- /sample (GET) - Returns all samples for a users account.
- /sample/__{id}__ (PUT) - Provides the ability to edit owner fields.
- /sample/cancel (POST) - Provides an action to cancel an sample order.
- /sample/reject (POST) - Provides an action to reject an sample order.

## Orders
The following are order endpoints. These provides access to manage a given
partner or users orders.

- /orders (GET) - Returns an array of partner orders.
- /order/__{id}__ (GET) - Return a single partner order.
- /order/__{id}__ (PUT) - Updates partner fields for an order.
- /order/__{id}__/payments (GET) - Provides a summary of all meenta/customer payments for a given order.

## Purchase Orders
The following are purchase order endpoints. These provide hosts and users the
ability to manage their account purchase order payment options.

- /po (GET) - Returns an array of partner purchase orders.
- /po/__{id}__ (GET) - Return a single purchase order.
- /po/__{id}__ (PUT) - Updates purchase order fields.
- /po/__{id}__/transactions (GET) - Returns a list of all transactions for a given PO.

*Please note that Credit Cards are not supported via the API.*

## Reports
The following provides access to partner reports.

- report/__{year}__/__{month}__/transactions (GET) - Returns a report of all transactions for a given year + month.
- report/__{year}__/__{month}__/payments (GET) - Returns a report of all payments for a given year + month.

## SDKs & Third Party Packages
Currently Meenta only supports a node.js SDK. Coming soon.
