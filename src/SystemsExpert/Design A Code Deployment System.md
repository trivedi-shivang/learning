# Design Global and Fast Code Deployment System?

## Pointers

- Building code
- deploying code
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
A) deplployed world-wide (in 5-10 regions) and on 100k machines

Q) What about the uptime? What about system failures?In what time the code should be build and deployed worldwide?
A) Every build should reach terminal state (either succedded or failed). The code should be gathered, converted to binary and deployed within 30 minutes. 2-3 nines of availability is fine.

Q) How many deployments a day and how much binary size ?
A) 1000's of deploys (build). Each deployment will be atmost 10GB.

Q) Can I refer to each deployment by a SHA?
A) Yes

## Approach

Code has to be built into binary. It will be saved as a BLOB(Binary Large Object) and will be saved into some Cloud Storage since it has availability across regions. A queue will store information about binaries. There will be workers which will watch queue and will dequeue rows to take the built code to deploy to machines.

Queue itself will keep track of which builts are made until now. A queue can be built in memory but that would be wiped out if the system crashes/failure. Thus it is best store in a database(Disk storage). T
