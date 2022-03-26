# System Design Fundamentals

Some of the System Design questions are:

1. Design Uber
2. Design AirBnB

One might need to ask interviewers questions like

1. What type of characteristics and services will it support?

System Design Question Solutions are subjective in nature. It is my job to make interviewer understand why the solution is sound and accurate?

There are four categories of Design Fundamentals

- Foundational Knowledge
- Key characteristics
- Actual Components
- Actual Technology

## What is Client-Server Model?

What happens when you type in a URL in the browser. For this, we need to understand Client-Server Model.

<!-- ----------------------------------------------------->

<!-- Client                                                Server -->

<!-- <<---------------------------------------------------->

Client either requests or sends data to speak with the server. Server, on the other hand is a different machine which listens to client's request and sends the data back.

Browser is the client on which we type in URL and AlgoExpert is the server. Browser does not what server is but can communicate.

When URL is typed, the browser makes a DNS query to find out the IP address of the server.

### DNS Query

It is a special request that goes to predetermined set of servers to find out IP address of a URL

### IP Address

It is a unique identifier of a machine. All computers connected to the internet have ip addresses. An IP address is like a unique mailbox given to each ip address.

Once the browser gets IP address from DNS Server, it sends HTTP request to the server. An HTTP request sends bytes (packed into packets) to the server. One of the things which which the request contains is Source IP address so that the server knows to which machine it needs to send the data to.
