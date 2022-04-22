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

Imagine a circle where each point represents a number. Those points are where servers (A,B,C and D) are placed when they are ran through hashing function. Similarly, clients (C1, C2, C3 and C4) are placed using hashing function

    A------------------C3----------------->B
    |                                      |
    C1                                     |
    |                                      C2
    C4                                     |
    |                                      |
    |                                      |
    D--------------------------------------C

We can program such that each client in the circle queries the first server in clockwise (or anticlockwise) direction. Thus, when a server is added/removed no hashing re-computation is required and most of the clients are still referring to existing server which will be helpful to have cache-hits.

An additional thing one can do is run each server through multiple hashing functions. This will make each server available at multiple spots in the circle above.

This type of hashing makes sure that duplicate requests are handled by a server (and not multiple servers).

## Message/Task Queue

This is a hardware which has three components: Heartbeat measurer, load-balancing, and a persistent list of tasks maintainer. Heartbeat measures liveliness of each server every few seconds to determine if each is alive and is processing a task in defined time-interval. If the sever fails to process the task in certain timeframe then the message queue takes that server's load and distributes proportionally to other servers (using consistent hashing).

## Monolith vs Microservice

Monolith Services comprises of multiple servers and they are connected with multiple databases. Monolith Services have: 1. less moving parts 2. code required for connection purposes lies in one spot. Disadvatage is that each new software engineer has to understand entire monolith architecture before making any changes. Multiple deployments will happen (since all code lies in one big bundle) and has to be monitored. In an event when a specific functionality crashes entire system is down.

Microservice architecture is easier to scale. new developer needs to know the context of a service instead of all services when they are working on an issue. There is less coupling (dependency) between services. In the event one of the service goes down, it won't affect other services. Each service can be extended horizontally/vertically rationally (by know which service is being used most as oppose to multiple services tied in a single box in a monolithic architecture)

## Rendevous Hashing

Find which server has highest value based on a hashing function for a user/client and use that to serve that client. In an event when a server crashes, highest value is calculated again. This has same benefits as consistent caching.

## Relational Databases

Majorly every database is either relational or non-relational. Relational database have information in tabular format for an entity. Each tabular-row is also called as a record and column will be entity attributes. Database schema will define what kind of data will be stored. Most relational databases support SQL

SQL database has ACID transaction.

- A for Atomicity means a transaction consist of multiple sub operations. For Ex: If a database is responsible for transferring funds between two bank accounts, it can be done into two steps: 1) Decreasing funds from an account and 2) Increasing funds in another account. SQL database guarantees that either both or none operations are successful.
- Consistency refers to non-staleness of the data. This means any future transaction will happen on the data which was updated after previous transaction was complete.
- Isolation: Multiple transactions can happen at the same time but the database will process those transactions sequentially. For Ex: If two separate transactions are initiated on a table. Until the first transaction is completed, the second transaction will be in "pause" state. This also means the user who is performing the second transaction won't see the changes of the first transaction until that has been commited.
- Durability: Ensures that data updates are permanent.

Database Indexes is an auxilary data-structure that optimize fast-searching for a column in a table. Basically, it creates a table to store column-values in a specified order with a reference to the records. For Ex:

| id  | customer_name | processed_at | amount |
| --- | ------------- | ------------ | ------ |
| 1   | John          | 2020-01-12   | 1,200  |
| 2   | Larry         | 2020-02-23   | 1,456  |

If index is created on `amount` column, it will create a new table to store that column's values along with where those column values are referenced in the above table.

| id  | amount |
| --- | ------ |
| 1   | 1,200  |
| 2   | 1,456  |

**When choosing between SQL vs No-SQL database, one thing to keep in mind is that SQL provides powerful querying capabilities and will be ACID compliant**

## Key-Value Stores

It is a type of database which will store key-value pairs. It is similar to JS object. This is used when you don't want to store information in tabular complicated structure. This kind of database is used for caching. It is also used to store dynamic system information (for Ex: if the system is on or off. if it is stored in the database, it can be referred by other services directly from the store). Ex of key-value stores are DynamoDB, Redis...etc

The difference between server-cache and Redis(In-memory cache database) is that if the server cache, we will miss the data, but the redis database will still persist the data (until the data in it expires or if that crashes)

## Specialized Storage Paradigms

There are different types of storage paradigms:

- Blob Store: Binary Large Object. Basically it is arbitrary piece of non-structured data. For Ex: Binary, Video, audio files....etc. They are being provided as services from cloud-platforms like GCS (Google Cloud Storage) or S3 (by Amazon). Those services help to read/write blob data. Blob stores are different from the key-value stores since the latter is not efficient for storing massive amounts of blob-data.

- Time Series DB: For storing time-series data.Manipulations around time-series make this type of database useful. For Ex: Monitoring data on a website, stock-prices data. Some popular services are InfluxDB, Prometheus...etc

- Graph DB: These kind of database helps to avoid querying structured data by joining on multiple related tables. These is applied for social networks like Facebook, Twitter, Instagram, LinkedIn.... Some popular service is Neo4j etc

- Spatial DB: Database optimized for storing spatial data (geometric data). For Ex: findings best cheaper hotels in a city...etc. Similar to SQL indexes, one can have `Quad-Tree` indexes for spatial-data.

## Replication and Sharding.

Consider a server with a database. What if the database goes down? At that point reading/writing to/from the database won't be possible. In order to prevent that, one can have a standby database(Database B) which will be replica of the main-database(Database A). This replica db will take over when Database-A fails until Database A is repaired.

Replication can happen asynchronously or synchronously. Synchronous replication involves updating all db's at once while async updates happen at certain time interval after which all replica databases have same infromation as the main database.

### Sharding

Sometimes massive data is expensive to store and read/write to/from it. To avoid this we can split the data across multiple databases. This spliting is called as sharding. Each split is referred to as a shard or data-partition. Various sharding strategies allow us to split the data effectively without under/over utilizing a database server. The best sharding-strategy is to use a hashing function which provides uniformity.

One of the sharding-strategy is to shard data by using hashing function to determine which part of data will be stored to which database. With consistent hashing technique, it would be easy to implement database systems such that each of them won't be under/over utilized. But, if one of the db fails, the users associated with that region would loose all their data.

Thus, it would be better to not implement sharding using consistent hashing. A better way is to replicas of each shard in case a shard goes down.

Logic to dictate what shard to read from/write to can be in server but what if the server fails. A better solution is to have a reverse proxy where server is the client which would make request to reverse-proxy machine and than that machine will determine which shard to request from/to from shards.

## Leader Election:

Imagine a third-party payment system (Like Paypal, Stripe...etc) is responsible for charging/debiting customers. There is a also a database which will store user information for a subscription service like Netflix. How to let third-party system know what and when to charge? It might be possible to connect the database with the third-party service but that would expose critical information to the system.

A better way would be to have a server that sits between the system and the db and that server will periodically check which user to be charged and how much from the database and that server would send that information to third-party system about it. What if that server fails? One can horizontally scale by adding more servers. Now with so many servers, how can you make sure that each server won't charge a customer multiple times. This is where the Leader election will come into picture.

Leader election select one server as a leader to perform business operations while others remian in standby. Should anything happens to the leader server, than other servers would select a new leader and that new leader would continue performing business operations. What if one of those servers fail ? In that scenario all servers won't consent for a server to be leader. Thus, to avoid leader election amongst servers, one can implement using technologies like Zookeeper or Etcd. Etcd, use consensus algorithm, is highly available (around 99.999%) and highly consistent (meaning anytime anything is queried will give the same result)

## Peer-To-Peer Networks

Let's say you have a server which needs to transfer 5GB of file from it to 1000 machines. For Ex: security video footage to be transferred every 15 mins to multiple machines. How would you do that? A simple strategy is to transfer a file at a time to a machine. This would be take so much time (imagining 1 file is 5GB and it takes 1 second to transfer data to a machine. Thus, it would take 17 mins approx to transfer the file to all machines).

Another approach is to copy the file across multiple servers and the all of them can distribute machines to send the file. This would significantly reduce time to transfer file by 10 but still it would not be sufficient. Another strategy is to shard the data on multiple servers. But in that strategy a server has to still serve to all machines until it is transferred to all of them.

This is best achieved using Peer-to-Peer networks. all machines are referred to as peers. Each peer would receive a part of the file (by splitting the file in parts and sending each part to all peers at once). After all machines receiving a part of the file, each of them can either communicate via a central database which would orchastrate peer-to-peer transfer or peers can talk to themselves like gossiping with each other to communicate and transfer rest of the file.

This is an example of what Torrenting uses.

## Polling And Streaming

Client issues data request from the server at every set interval time and the server responds normally as before. This is helpful design pattern to be able to get frequent updates from the server (because the information is constantly changing - For Ex: reading temperature data or chatting with someone). In this pattern one has to set interval for clients to send requests to the server (say every 30 second or every 10 second or every 1 second client will send a request). This will create server overloads since there are tens of thousands of users active at a time (multiplied by each user send a request every 10/1 second). Ex of this include temperature data when you don't want frequent updates (like every few mins or so)
To overcome this issue, Streaming pattern comes into picture. The server communicates to the client via an open connection (by creating a socket between client and a server) as long as one of them closes the connection or the network goes down. Here the server is active communicator, pushing data to the client (instead of waiting for client's request like in Polling pattern). It is used when you want instant experience like live stock trading app or for chatting app.

## Configuration

Set of parameters (constants) that the application will use. It will stored in JSON or yaml format to easily read/write them and stored separately (not with application code). There are two types of configuration static and dynamic. Static configuration will be packaged with application code and will be deployed when the entire application is deployed. It is slow but errors are caught if any. Dynamic configuration is tied with a database so that systems can identify current configuration by querying from the database. Dynamic configuration can be controlled by creating tools on top of it to review those configurations before being deployed.

## Rate Limiting

Given a set of clients to limit number of request each of them make to the server (say 2 requests a second). Server, if receive a third or more requests then it will send error to the client that it cannot handle the request right now. This is useful to avoid DOS attacks (Denial of Service) where the client is sending more requests than set threshold. One can set rate-limiting based on IP addresses, on regions, or on the entire system. DOS can be prevented by if there are DDOS attacks (Distributed DOS) where multiple computers are sending multiple requests it might not be easily identified.

Servers can store rate-limiting per user information in memory. But what if there are multiple servers and handled by load-balancers? We either need to make sure each user hits the same server every time. Otherwise rate-limiting information can be stored in redis (in memory database). This is used by servers. When the client issues request to the server, the server ask redis to determine if the request can be processed based on rate-limiting rules.

Rate Limiting can be complex in which multiple rates can be set (operations per second, per min, per hour and so on...)

## Logging and Monitoring

Logging is set of language-based print statments to collect and store events information in a database which then later can be used to debug if something didn't work as expected. Syslog and JSON are two formats in which log can be stored. Google Stack Driver is an application used for logging purposes. Monitoring is used to monitor information based on logs collected and is being shown via graphs and charts. You can either monitor information based on log data points or use time based databases like influx db. These time based dbs received data periodically from the server.
