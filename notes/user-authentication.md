# User Authentication

OAuth = Protocol
Auth0 = Company which provides said protocol.

* Session Based = Stored on the server or a database, servers scaled horizontally so costly (And CRSF).
* JWT = After user is logged in server responds with signed JWT (private key exists on the Server).

Request/Response Headers

`set-cookie`
`cookie`
`expires`
