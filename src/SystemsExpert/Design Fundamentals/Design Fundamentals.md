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

When client speaks with server using HTTP protocol, it uses port 80. When it speakings using HTTPS, it uses port 443.

### Network Protocols

Rules with which two machines interact with one another. Some of the protocols which are mostly discussed are IP, TCP and HTTP.
When a machine sends data to another machines, it sends in IP Packets. The packet has two sections: IP Header and Data. All information is stored in bytes.Header contains IP addresses of source and destination machines, size of IP packet and which IP protocol (IPV4 ot IPV6) is used. One IP Packet may not be enough since the data section can only hold 2^16 bytes. This is where TCP Protocol come into picture.

TCP is built on top of IP Protocol and it's information is send in Header section of each IP packet. TCP protocol will make sure all IP packets are sent in uncorruptable way (error free way). TCP protocol acts like a connector for all IP addresses.

When a browser connects with a destination machine, TCP creates a handshake between host and destination machines.

HTTP is built on top of TCP (abstraction of TCP protocol). HTTP helps to add business logic, whereas IP and TCP are just meant for data transportation.

### Storage

A system requires data to be stored in database. The database helps to get/post or read/add/update data. A database is like a server and any machine can act as a database. Data will persist if it is stored in disk(in database) but not in memory (would be similar how you store information in a JS file `index.js` and then run the server to execute it and then stop and then start the server). Memory reading/writing is faster tha the operations on disk. Thus, that way temporary memory storage is advantageous.

## Latency and Throughput

Latency:
It is time to traverse a system. It can be time to read/write data from/over network or from SSD or from HDD or reading from sending data to a distance and it can be different for all of them. Some systems require high latency (online video games) vs some require low latency.

Throughput:
How much work a machine can perform in a given period of time. How much data can be transferred from one machine to another in a given amount of time.

Throughput can be examined as bunch of clients talking with a server and how many bits can the server handle in a given amount of time.

How to increase throughput?
Simply pay to increase throughput on a server. Although, simply increasing throughput on a system may not solve the problem. A better way would be to increase servers to increase overall throughput. Latency and throughput one of them cannot be calculated if other other is given.

## Availability

Availability is how resistant the system is against the failure. It is % of time in a given period of time where it is operational enough such that its primary functions are satisfied.

Availability is % of system uptime in a given year. Availabilities are measured in "nines". For Ex: 99% availability of a system is referred to a system with two nines of availability (because 99% have 2 9's). Highly availability comes certainly with a tradeoff (for ex: high latency or high throughput)

Thus, when designing systems it is ok to have high availability for some sub-systems and some to have low availability.

Having high availability requires to not have single point of failure. This means that the systems have to be replicated so that if one of them fails, other keep running with higher load until the broken system is fixed.

For Ex:
Multiple clients when interacting with a server makes the server a single point of failure. In order to avoid that, one can have multiple servers and a load-balancer to balance load amongst all servers. When load balancer is introduced, that becomes Single Point of Failure. Thus, one can have multiple load-balancers.

## Caching

Caching helps to store data at a place from which retrieval is cheaper than retrieving from traditional place. For Ex: Retriving data from a network request is costlier when compared to storing the same data locally on the machine (caching). Caching also helps to store computational long operation to avoid performing it multiple times. In both cases it speeds up systems.

Caching not only is used to speed of the systems. For Ex: When there are multiple clients and are querying a database. Those clients making individual requests from the server might not be much, but the database might get overloaded since there are millions of requests being performed. Thus, a cache if is placed between database and all clients, it would reduce overload since server has to only update cache.

All above examples refer to the cache for reading data. What about caching writing/updating data. For that there are two popular caching mechanisms. In both mechanisms, server has a cache in it.

In write through mechanism, both server-cache and the database are updated when, let say, user has added/updated a post. This comes with a cost that for add/update operation you are updating database.

For write-back, it will only update the server-cache and will respond back for future read/write requests. This creates inconsistency between server-cache and the database. This is avoided by asynchronously updating database from the server-cache. One of the downside is what if you loose data in server-cache before it has updated database.

How about when there are multiple clients and each of them are interacting with multiple servers having server-caches. In that case let's say a client creates a post and that add operation is processed by all servers and the database. Now, let's say there is a client who has updated the post and that operation is recognized by the server-cache but not by the database. Thus, at the same time if another client tried to see that updated post by contacting another server (Server B) then he might see stale information from Server B. This can be avoided by removing cache and placing outside all servers as Single Source of Truth.

That being said, certain systems can have stale data vs certain that cannot.

How to get rid of stale cache data?What is/are the eviction policies to be implemented?
LRU - Least Recently Used can be considered as stale data and removed. Other policies are LFU (Least Frequently Used), First In First Out, Last In First Out...etc

## Proxies

There are two types of proxies: Forward Proxy and Reverse Proxy.
Forward proxy is a machine that is acting as a client for client (or clients) for server (or servers). In this case, client requests data from forward-proxy, the forward proxy sends request to the server. The server responds data to the forward proxy and than that proxy will send data to client. It hides identity of the client because the proxy itself is making a request to the server. This makes server think that proxy is the source-machine from which request was made and not the client. This is how VPN's work.

Reverse proxy is a machine that is acting as a server for server (or servers) for client (or clients). Thus, when client makes request to a server, it is the reverse-proxy who takes that request from client and then sends the request to the server. The sever in return sends the response to reverse-proxy and that proxy will respond to the client. They are used to filter out request which are from specific users, can be used for caching, can also be used as Load Balancers.

## Load balancers

Load Balancer is a server which sits between a set of clients and a set of servers. It balances traffic in a predefined way. This is helpful when you have multiple clients querying one or more requests to a server. This overloads the server. One way to overcome is to vertically scale the server by increasing its resources but there are hardware limitations on how much you can increase. On the other hand, you can vertically scale by adding more servers. Those servers needs to have load balanced such that no server is either under/over utilized. This balancing is done by load-balancer.

Software Balancers and Hardware balancers are types of load-balancers. Software load-balancers registers/deregisters when a server is added/removed. Load balancers balance by using one or more of the following techniques:

1. Randomly choosing which server to send the request to.
2. Round Robin: where each server are sequentially given a turn for each request. A modification is to have weighted round-robin where a server is given more requests than other because it has more resources
3. Balancing based on sever performance based on healthchecks conducted by the balancer to see which server is efficient in handling requests and gives more jobs to it than others.
4. IP based load balancing in which hash of client's IP address is used to determine which server should handle the request. This is helpful for the situation mentioned in Caching section for write-back cache example regarding staleness of the cache-data.
5. Task based balancing is when load-balancers send request to specific type of server based on the task. For Ex: load-balancer sending traffic for payments to payments server, sales-enqueries to sales server....etc

## Hashing

Hashing trasforms arbitrary data to a fixed value.

Assume multiple clients interacting with multiple servers via round-robin load-balancing technique. Assume highly-computational requests are made and are cached in servers. This kind of system fails to serve cache-hits since round-robin may not guarantee that it will hit the same server (Server B) that it has hit before (Server A) when the same client requested. Thus, causing requested server (Server B) to perform those computations again.

This is solved using hashing the request and re-routing those requests based on the hash value. This will make sure that if a client request something, its hash would be same and thus will hit the same server which will in turn help to have cache-hits after first server request.

Hashing functions/algorithms widely used are SHA-1, BCrypt...etc

What if a server dies? what if a new server is added?
This creates a situation that if hashing calculation is based on number of servers and if a server dies, certain clients will keep pinging dead server and no servers might ping newly added server.

This is solved using other hashing techniques:

### Consistent Hashing

Imagine a circle where each point represents a number. Those points are where servers (A,B,C and D) are placed when they are ran through hasing function. Similarly, clients (C1, C2, C3 and C4) are placed using hashing function

    A------------------C3----------------->B
    |                                      |
    C1                                     |
    |                                      C2
    C4                                     |
    |                                      |
    |                                      |
    D--------------------------------------C

We can program such that each client in the circle queries the first server in clockwise (or anticlockwise) direction. Thus, when a server is added/removed no hasing re-computation is required and most of the clients are still referring to existing server which will be helpful to have cache-hits.

## Rendevuos Hashing

Find which server has highest value based on a hashing function for a user/client and use that to serve that client. In an event when a server crashes, highest value is calculated again. This has same benefits as consistent caching.
