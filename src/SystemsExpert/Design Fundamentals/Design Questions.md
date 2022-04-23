## Design AlgoExpert (just design core user flow)

Core user flow is they see a question list, see its description, write code for it, execute it and mark that code as either done or not.
It is not super critical product but have to be available since it is a paid product. Thus 2-3 nines of availability would be excellent. The down time would be around 8 hours - 3 days since we are also using third party services like Stripe (for payment), Vimeo (for hosting videos), ... and so on. Is that ok assumption?
Should have less latency for code-execution engine. It should execute anywhere between 1-3 seconds.
10k + users at any point of time.
Where are we serving the website? Global website with focus on USA and India customers.
It is not static website purely. list of questions is static but user can mutate and save their solutions. Thus, need API and a database(to store questions and user-solutions)

1. Handle Static content first
2. Auxiliary service (auth payment) - will be skipped since we are not designing that
3. Seeing code, typing code, seeing their solution, our solution
4. running code

static content is stored in Blob store (like GCS or S3). CDN is used to serve static content because they have servers which are designed specifically to show static content fast. it will store JS, images....

Users from USA and India can hit DNS Load Balancers and those balancers would send request to hub of servers tied to specific region. After hitting DNS load-balancers, requests can be routed to the different servers (payment server, authentication, code-execution server and so on) via path-based load-balancers (path here means the URL path). Why different servers because each server is handling different functionality then others and has nothing to do with each other. We can assume that path-based load-balancers will perform some sort of round-robin approach to distribute load between various servers.

Questions shown to the paid users are different and act differently then non-paid users. Hence each regional server can be configured to make internal API calls to payments and authentication service to determine the type of user.

Let's move to the core-user-flow. we will be storing static questions list. we will be storing user solutions in different languages. we will storing information about user if they completed a question and save their questions order.

Client side cache would store questions list when they are making too many requests and server side cache would store question list so that the server does not query blob-store each time a request is received.

Questions updates happen every two days and questions list have to be updated every hour. This has to be handled by cache eviction policy. There are 100 questions, for question there are 10 prompt texts and user is storing solutions in 7 languages. Each solution has 5000 bytes of data. So 5000 times 10 (for storing 10 prompts texts) times 100 = 5Million bytes 5MB data to be cached in memory.

Updating questions like adding them, fixing bugs. Invalidate and evict cache-eviction policy which will happen every 30 mins. Each 30min, it will query blob-store to replace entire cache.

User created data is referred here as user-metadata. That information has to be stored in structured database. There will be two tables one for question-completion status and other to store user solutions. The completion status table will have id (unique id for each row), user-id, question-id and c_status (completed, incomplete, in-progress basically enum of statuses). We can add index on user-id since this database will only be hit when the user marks a question infrequently.

The user-solutions table will have all columns as questions-completion status table with the difference being c_status column will be replaced with "lang"(will store enum of languages) and "sol" (will store solution for each question and language combo). There won't be server side caching for this table since users don't share data.

We can add debounce on the front end so few requests are made by clients (let's say 80% of active users type code at a time and each sending write request every 2-3 seconds).

There will be two instances of the dbs. Each instance will be served in one region (USA or India). Each instance will have a backup (redudant) but async replication between two instances can happen every 12 hours.

For code-execution engine, we could implement rate-limiting which would limit code-execution requests. We are only concerned about how requests would be handled and do not care about whether the code is malicious or not. Rate limiting can be tier based (1 request every second, 5 every minutes and so on....) and can be stored in external database like Redis (in memory key-value store).

Those code-exeuction servers won't run the code. Instead they will communicate with workers who will run the code. Those workers can be 10 to 100 (because there are approx 8,000 users. each user is running a code about 10 times in an hour. At any point given time there will 10-100 requests/second. Thus 10-100 workers are required). Each worker will compile the code, run it and perform cleaning operations to remove supportive files creates when executing code. Workers are horizontally scalable. we can log events and monitor events so that we can

## Design Netflix API Core Netflix product

Authentication, payment services can be ignored. But, need to gather user-activity data so that it can be processed by recommendation engine.
The entire system can be divided into subsystems. There will be core user flow which including storing video, streaming videos, static video content descriptions and storing user-metadata content. The other subsystem will be recommendation engine. The core user system will be for global audience, will have low latency and high availability.
It has 200 million users. spread out globe equally.
do you want to design netflix for specific users?
Data will be of following types:

1. video
2. user metadata (what movie was seen recently, which types of movies are being seen)
3. static content (names of movies, shows, description of them, movie casts)
4. for recommendation engine (user logs)

Estimation of storage:
Videos on Netflix are limited. Around 10,000 movies.Each movie has a different resolution (Standard Definition SD, High Definition HD). Videos are an avg of an hour in length. SD will have 10GB data per movie and 20GB data for HD. Total 30GB for each video. So 10k movies and 30GB for each movie is 300,000GB (3TB). No need to optimize (reasonable to store in Blob store or S3)

For static content, it can be stored in key-value store or Postgres and it won't be greater than 300TB.

200 Million users. Each user metadata will be per movie (like if they watched a movie/show, how many times they watched...). Each user is expected to watch 100 shows in a year. A user to use netflix in lifetime is 10 years (100 \* 10 = 1,000 shows total). 100bytes per video \* 1,000 videos \* 200 Millions users \* = 20TB.

Since netflix does care about users metadata by users, we can shard user-data by usr-ids. We will create 2-4 shards where each shard will store around 4GB of data.

Bandwidth can be calculated to determine how much data needs to be streamed at a time. Around 10Million users are watching videos. Each of them are streaming HD videos(20GB each). 20GB video / (4000 seconds in an hour) = 5MB/second/user. So 5MB \* 10Million users = 50TB/second (for all Users)

CDN can help with so much bandwidth!!!. CDN has thousands of POPs (Points of Presence) with each of them having hundreds of thousands of machines. Thus each machine can serve around MB's of data instead of having to deal with TB's of data. CDN has to cache video so that not all of them are pinging video-storage.
Those POP's can interact with video-storage via cache-populator (separate service) which will save newly released and most frequent movies and tv shows.
Netflix actually has partnership with Internet Service Providers which provides optimized caching. Those caches are cheaper in bandwidth and have low latencies compared to CDNs.

Similar to video content streaming, user can fetch their user data (what movies they recently watched, their movie recommendation and so on....) using Load-Balancers (between users and Postgres database). The load balancer or API servers will point to correct shard based on usr_id.

User-metadata (20TB) and static content can be cached at server level and cache can be refreshed once a day.

Recommendation Engine: Need to gather more granular user activity. we need to add map-reduce jobs which would asynchronously gather user-data and will spit out meaningful information from them. We need DFS (Distributed File System) typically Hadoop Distributed File System. That system will store information like `{userId: "UID1", event: TYPE (enum), videoId: "VID1"}`. That data will be passed to Map to segregate data based on user like `uiD1: [(vidID1, PAUSE), (vidID2, PLAY)]` that then would be passed to REDUCE to computes scores per user per video (or however data-science teams wants the parameters to be)

## Design the Uber API

got many services: uber eats, uber pool, ride-hailing service..... Just worry about ride-hailing service. Ride Service has two parts user side and driver side APIs. design both of them. A user takes out phone, set destination, picks car-type, tracks time to destination and travel distance while traveling and then ride is complete. Do you want to create user account, tipping drivers, rating drivers, handling payments? no don't worry about those.

For Passenger, it will create a Ride. A `createRide` endpoint would be called(passing parameter userId, pickup, destination). For each ride object there will ride-id (unique identifier for ride), passenger-id (uniquie ID for passenger), driver-info object(containing driver details like name, his/her ratings - will be empty), estimated price, starting location, time-values, ride-status (enum in-progress, created, matched (when found driver), started, finished, cancelled). Each `createRide` endpoint will internally call another API endpoint `findDriver` to find driver details after calling `findDriver` it will call `editRide` which will fill driver-details for ride created using `createdRide`. After calling `findDriver` endpoint, client will call `getRide` endpoint(rideId, userId (because we don't want any other user to see another user details)) to poll every 5/10 seconds to see if a driver has accepted a ride (if ride-status has been changed from created to updated).

Either `editRide` can call `cancelRide` or there can be separate endpoint `cancelRide` (passing usrId). `cancelRide` doesn't need to pass ride-id since a user can only cancel a ride which was initialized (one at a time). Also, `getRide` doesn't need to pass in rideId (because there could be one ride for a user at a time and can query the database to find the topmost row for that user having ride-status column = 'created')

For Driver side of things. Each driver has status (unavailable, in-ride, standby ). `setDriverStatus` endpoint (usr_id, driver-status). If the driver-status is standby, `findRide` endpoint will be called similar to `findDriver` which will put drivers in a queue. `findRide` has to be polled every few seconds. `findRide` will return `null` until ride is available and return `ride` information. Once received, the backend will start timer for the driver to accept the ride (or reject automatically if the time has passed). `AcceptRide` will be called if the driver accepts the ride. That endpoint will then call `editRide` to update driver-info and set ride-status from 'created' to 'matched'. `getride` will send different information to driver and passenger.

User tracks driver's location with an open web-socket where the user will `stream driver location` and the driver will `push their location` endpoints. both endpoints will pass in `user-id`.

How about Uber pool?
Since each passenger have different start and destinations, a Ride object won't be enough (since it stores a ride-status). Thus a wrapper object would be great which would have `rides` as a property which will be an array of ride objects.

On driver side for uber pool the driver can call endpoint to add ride until it reaches the max-car-passenger-size (at that point driver-status will be in-ride-done)

## Design AirBnB

Renter facing + host facing. Host can create or delete bookings. Renter can browse or book a listing.
Renters can view the same property within the same date range. The property if booked via "Book Now" button is locked for 15 mins.
How listings are shown? Based on geographical location(longitude, latitude) and date range.
USA operations only. 50 million users. 1Million listings. Browsing listing should not be available most of the time.
Hosts and Renters will share a SQL database (since that will be queried more often) containing "Listings" table. Since we are not dealing with auxiliary services, we can skip user table. Quad-tree database can be used to store two-dimensional information (it will be an overkill since 1Million listings can be stored in structured db directly but it helps down the lane when our listing increases let's say to 100M).
For 1M listings, with each listing about 10kB size = 10GB for all listings, can be easily stored in in-memory server-cache.

Since we are storing information in quad-tree-db-cache, constantly polling the SQL database by all quad-tree-dbs could crash the database. Instead we can have one of them as a leader and other as followers. Those followers will asynchronously perform sync operations every 10 minutes.

There are load balancers which come into picture when hosts communicate with API servers. Those load-balancers will be used to route the request when host either creates/deletes a property/listing. The request is routed to API servers. The API server will first update SQL table then will update the Quad-Tree DB leader. The leader will update followers async. Let's say if the leader dies after a host has created a listing, one of the followers, who is recently elected as a leader, won't crash because that follewer does not have information about the new listing.

Renters:
`get` (will get details of a listing), `reserve` (will help to reserve a listing) and `list`(will list all listings) are the endpoints which renters use. The `list` will go to load-balancers and then will hit SQL database. On the other hand, `list` will hit quad-tree database (of course via load-balancers). Load balancers for both `list` and `get` endpoints and will divert appropriate database based on URL path.

Quad tree database can be filtered using date-range. The results can be paginated when fetched from quad-tree. The way pagination would work is that it would fetch few results, keep offset in mind and then use that offset when user visits next page.

`reserve` endpoint will go through load-balancer and will check SQL database to see if in the reservation table any row exists for the property. if not it will create one. If a property is reserved or is locked for reservation it should not be shown in the listing.

## Design Google Drive

Are we designing storage objects or we are designing google sheets, google docs, google photos....etc? Just storage objects. Just design personal files and folder, don't worry about company specific files and folders. User should be able to create, edit, renaming, deleting and downloading files and folder. No desktop design. only web application. What happens when a file is opened in two different tabs. 10 second update when accessing the same folder and not need to handle conflicts between files.
1Billion global users and 15GB per person. No data loss. Should be highly available.

1. Create Folder
2. Upload/Download file
3. Move, delete, rename, get file/folder.

Where do we store files and folders? Metadata about files and folders(like its name, who owns it....). Files content(BLOB data) is different than folder (structured content) content. K-V stores can be used to store folder content. Those stores will be highly available. There will be many of them.
Each will have key (which is folder-id) and corresponding value about folder information. Load balancer can shard information based on region but what if two users in different regions are accessing the file. In that case, sharding can be based on owner-id (basically user-id but unique even if the user is trying to create file/folder from theirs or different account)

Between load balancers and k/v stores, we could have proxies which would setup additional permissioning to determine if the user has permission to create folder or not. Each value in k/v store will have following properties: 'id', 'name', 'ownerid', 'children' (array pointing to folders and files), 'isFolder' (true/false boolean value) and 'blobs' (array containing references to blobs in blob-store)

upload file will be the operation to upload a file. (15GB \* 1Billion users = 15,000PetaB). Two availability zones and one backup zone (3 zones \* 15PB ~= 50,000PB). This is much data. Special strategies can be implemented to avoid two different users uploading same data. This would be handled by global blob-store. Each entity(file/folder) will be split up by API servers. So users upload a file, that request will be handled first by load-balancer and then will be split by API servers. Those servers will synchronously update all blob-stores (to avoid data-loss). Each blob will be hash. That hash value will be an address pointing to a location in blob-store. That hash value used to refer to a location and see if that blob already exist is called Content Addresable Storage. Here, we don't need owner-id based hashing when user is uploading an entity. Those related load-balancers is ok to perform Round Robin (since each user doesn't have to store user specific information on a server). Those API servers (splitting blobs) would have extra set of load-balancers (which will be used for caching, compressing blobs) between servers and global blob-stores. Each blob would be immutable. A slight change in blob would store that blob as a different blob.

Global blob-stores can be three. There could be other stores which would be replicated asynchronously. Any entity with data-loss is acceptable to have high
latency.

After storing blobs in blob-stores, there reference will be stored in k/v stores as well ('blobs' property in k/v stores).

Downloading file would be similar operation where the file-id will ping the k/v store to fetch file's metadata ('blobs' property) from k/v stores and then it will fetch actual blobs from blob-store.
