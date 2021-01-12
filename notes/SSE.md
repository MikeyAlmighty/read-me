### Server Side Events (SSE)

Establish a uni-directional communication channel
Over this channel the server can push messages (plain/text), which the Client
can receive and process in Real-Time.

Client must establish a long lived HTTP Connection with the server, in order to
receive events from the Server.

SSE is similar to WebSockets, except:
* WebSocks use bi-directional communication.
* WebSockets can send binary data or plain text (Where as SSE can ONLY send plain text).
* WebSockets more low-level and complex to setup.

## Headers

Content-type: text/event-stream
Connection: keep-alive

Client sends /GET text/event-stream to notify server we want to establish SSE.
Server responds with text/stream and "Transfer-Encoded:chunked".

## Event body

```
    event: <name of your event>\n
    data: <string, event data>\n
    retry: <in case connection is closed, after how many ms to retry this>\n
    id: <id of the message>\n\n
```
## Client Subscription

[EventSource API](https://developer.mozilla.org/en-US/docs/Web/API/EventSource)
