# Design Global and Fast Code Deployment System?

## Two main Systems to be designed

- Building code
- deploying code

## Pointers

- 5-10 regions
- 100ks machines
- 2-3 nines
- 30 mins entire process time for a deployment
- 1000s deployments a day
- 10 GB per binary

Q) Which things I will be designing? Building the code, testing, deploying? Or are we designing multiple systems.
A) Design the system which takes the code, builds it into binary and deploys results globally in an efficient and its scalable. No testing code has to be handled by the system.

Q) When the system should trigger?
A) When code is merged into a branch or repository, engineers will trigger the build using UI or CLI. The code is already reviewed and production-ready. No submitting/reviewing code system to be made.

Q) where the code needs to be deployed? a specific region or worldwide?
A) deployed world-wide (in 5-10 regions) and on 100k machines

Q) What about the uptime? What about system failures?In what time the code should be build and deployed worldwide?
A) Every build should reach terminal state (either succedded or failed). The code should be gathered, converted to binary and deployed within 30 minutes. 2-3 nines of availability is fine.

Q) How many builds a day and how much binary size ?
A) 1000's of builds. Each deployment will be atmost 10GB.

Q) Can I refer to each deployment by a SHA?
A) Yes

## Approach

Code has to be built into binary. It will be saved as a BLOB(Binary Large Object) and will be saved into some Cloud Storage since it has availability across regions. A queue will store information about binaries. There will be workers which will watch queue and will dequeue rows to take the built code to deploy to machines.

Queue itself will keep track of which builts are made until now. A queue can be built in memory but that would be wiped out if the system crashes/failure. Thus it is best store in a database(Disk storage). The database table will be used as a queue and also will have historical information.

The table will have following columns: id, name, SHA, created_at, status

Q) How does 100's workers dequeue from database without running into concurrency issues?
A? Because SQL are ACID compliant meaning they each of them will uniquely dequeue a row.

The SQL would like as follows:

```sql
begin transaction;

select * from jobs where status = 'QUEUED'
order by created_at asc
limit 1;

-- only run the following if you have an 'our_id' from previous expression
update jobs
set status = 'Running'
where id = our_id;

commit;
```

Q) What happens when the workers (responsible for dequeuing and building the code) fails? Is there a way to keep check on them?
A) Yes, we can have a health-check on them. Workers cannot check on themselves because what if they all die. Thus, an external service is needed. That external service. Thus, there is a need of an additional column called `last_h` in the queue table. This will keep of track when the worker was last sent a message (heartbeat) to the external service that it was alive. It will only update that column when it is running the job. If that column has not been updated in last few mins when the job is in `Running` status will assume that the worker has died.

Q) How many workers are actually needed? 1000's of builds/day (5,000 to be exact) and 15mins is required for a build?
A) 15 mins build time and there are 24 hours in a day. Thus, a worker will handle 100 jobs. If there are 100 workers, that they will be able to 10,000 jobs (5,000 less builds than in a day). Thus, instead of 100, 50 workers are enough. Plus, those workers are horizontally scalable (more added when needed)

Q) Do I need to worry about how binaries are generated?
A) No

Q) Do I need to worry about how much binary code space will each worker have to deal with?
A) Binary codes, like how version-control systems like git update branches will incremental changes, will also be implemented so that workers won't be overloaded.

Q) A single GCS blob-storage would be enough for deploying code to 5-10 regions?
A) Because 100k machines are downloading those blob stores from a single point of origin to deploy the code. This will be suboptimal to use only one Blob-store. Thus, can have regional clusters which would replicate blobs asynchronously across all clusters.

Q) Additional Requirement: Deploy the code when it is replicated across all regional clusters. How to achieve that? How would you keep track of which region has replicated code and which didn't?
A) An external service would keep track of regional-clusters that if they received the new binary which was generated.

Q) After replicating binary to multiple regional clusters, how would you make that binary to be downloaded to 100k machines?
A) It is not feasible for every machine (connected to a region) to download 10GB of binary file from the regional cluster one-by-one. The best solution would be to have all those machines connected to each other in a peer-to-peer network. That way, all of them can duplicate the code incrementally and will also make sure that building and deploying code will be under 30 mins (a requirement)
