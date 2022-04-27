4 or 5 interviews in total. Typically there will be 4 interview.
First 5 mins introduction, next 50 mins will be technical and behavioral questions. With last 5 mins will be Q&A.
Generally, reach round 1 technical topic and 2 behavioral topics. For Ex: Technical question Data Structures and Algorithms only. No frontend questions will be asked. Logical and maintainable code. Frontend system design. Technical knowledge.
1 to 2pm on April 21 data structures and algorithms. 2 to 3pm write logical and maintainable code.
April 25 frontend system design. Next round Knowledge on frontend tech. May be there is lunch time between ¬¬
Questions will be intended to the role which I am applying for. Expect easy to medium in terms of difficulty for leetcode questions.
L4 or L5. Levels are not discussed because they determine during the interview. Strong coding skills would decide
Behavioral stuff will be sent to you in an email. It will be 50-50%. 50 behavioral and 50 technical. Behavioral questions will be based on 14 leadership principles. Don’t memorize but just understand gist. 8-9 strong examples of things I have done in my career. No legacy systems examples. Give current system examples. No straightforward answers. It is not complex answer. It does not have a variety.
Had no information about the decision that kind of response not good. Kind of responses should be spanning over couple of days or weeks. What was my contribution instead of my team? Of
Electronic outline on one side of the screen and interviewer on the other side. Do not use electronic outline as read from the document as is just use it as. use data in examples. Quantify response you give. Quantify cost, quantify time, quantify time-savings, why certain language was better than other language, quantify customer satisfaction, quantify the result. Quantify the revenue. Customer satisfaction from 30 to 60%. Customers were happy and signed 5-year contract.
Within 5 days of interview. No feedback will be given as it is against our policy. Some of the behavioral questions are like each other. Try to use story twice but not more than that. If there is a similar question which was asked before, let the interviewer.
18 months-2years.or can be applied for L4. If for L4 position

Tips:
Break down into components
Given context
Have conversational and friendly tone. No stiff conversation.

## Leadership Principles:

- **Customer Obsession**: put myself in customer shoes. Understand what a customer would like to see. Understand that they want to see faster loading of websites rather than having unnecessary features.
- **Ownership**: Think long term and don’t sacrifice long-term value for short term results. Never say “that’s not my job”. Act on behalf of entire company.
- **Invent and Simplify**: Try to come up with simple solutions for complex problems.
- **Are Right, A Lot**: Look at all the metrics and non-functional/non-business Jira tickets and talk to leader about those tickets to be considered in the sprint. Understanding it won’t affect much to the end user but will improve the code performance a lot.
- **Learn and Be Curious**: Look for ways to improve existing codebase with newer frameworks and technologies. Alot some time during sprint planning to learn these technologies.
- **Insist on the highest standards**: Have code quality the best in every project. Have automated test to be able to catch edge cases and bugs before they are caught in production.
- **Think Big**: Should think about developing projects by keeping track of scaling in mind. There is a possibility that customer base can increase.
- **Bias For Action**: Every decision doesn’t have to be made after long thinking. Some of them can be made on the fly. Many actions are reversible.
- **Frugality**: Spend money on technologies and products which are necessary.
- **Earn Trust**: Hear out opinions of all team members. Don’t need to shadow out members. Don’t need to take decision right away. Can summarize after hearing all opinions and then take a decision.
- **Dive Deep**: If there a production issue, resolve it immediately to prevent further bleeding. Then, discuss what could be done to not have that issue happening again in the future.
- **Have Backbone, disagree and commit**: There should be one decision at the end. If not agreed with someone’s opinion, then you should question. But, at the end there should just be a decision.
- **Deliver Results**: Align backlog to handle situations like peak customer sales during Diwali or new year

Questions:

1. **Tell me about a time when I failed?**
   A. Talk about what decisions I made that led me to the failure. Also, talk about the decisions I made that led me out of the failure.
   Situation

- I created dashboards for Orbit for the first time for all trackers for a pharmaceutical company.
- Gathered requirements from customer upfront about what they are expecting
  Task
  Goal: aggregate tracker, activity, milestone level information in form of dashboards.
  Consider tracker as a sort of like tracking information which amazon package handlers use to route package from begin to destination. Activities and milestones are subtasks which you need to complete on on-going basis.
- Was fetching information directly from SQL databases (which were written fetching least info on the front end to save bandwidth). The dashboard were tested with test information (which was lot less then company data) and was working fine.
- Got team-wide email from customer about that dashboard were executing slowly. I took ownership of the situation saying I will fix it in next 4-5 days (since it required fixing all dashboards). Meanwhile asked if they wanted me to precompile the data every data and send them before their morning begins. They replied that they are fine waiting.
- Talked with my manager about it and told him that I made a mistake of not thinking large customer solution beforehand (self critical) and asked if I figure out a solution by myself.
  Action:
- Dived Deep by understanding what was causing the issue. Thought on all levels like how the dashboard can show the information as efficiently as possible with less load time and about how to fetch information from database. A single dashboard showing all information. Asked for help from dashboard creator (was built using Java and Vaadin). Had intuition but found out that if the dashboard can be broken down into smaller dashboards it would be faster. Also, tried out if we could simplify the solution for the problem they were describing. Thus, created a table with indexes and used that to fetch information on the frontend.
- Was having consistent follow-ups every day with the customer that I am working on the solution and was discussing what part of the solution I am currently developing at a high level. Discussed that the data which will be shown will be stale and won’t be uptodate (since SQL table was updated asynchronously).
  Result:
- Delivered solution to the customer after thorough testing.
- Result: agreed with dashboard solution and customer were happy. Dashboard loading came down from 1-1.5 minutes with 3,000 rows to 10-15 seconds.
- Kept in mind to test with large data as well as look for how data fetching can be improved upfront.
- Created two metrics: How long it takes to load a dashboard along with how many rows for the dashboard. Wrote backend procedures to capture that information and store that in a table so that it can be analyzed in a dashboard. Setup email notification system to notify when the dashboard is not performing as expected.
- Kept in touch with customer after they received the solution if they were satisfied with it.

2. Provide an example of when I demonstrated leadership
   Situation:
   A. 2019. was working as junior engineer on support tickets and bug fixes and doing maintenance tickets. Was understanding how core Orbit application worked.
   B. As per SOP, were submitting timeslips to a web-url. Found out that the frontend was slow and required patience to load.
   C. Was curious and eager to find out how can I help improve this situation. found out from colleagues that other connected applications like project management (adding, editing, inactivating) and budgeting tool (for company tax-purposes as well as to process usage receipts to the customers about how much they used) were related but handled via different front end url. Also, managers and higher ups desired to see information at high level (visually in form of dashboards) (information about how their teams and team-members are performing). Asked colleagues because they are real customers and
   Task:
   D. Everyone busy with customer project. I took the lead of consolidating all mini applications (URL’s) into one. The reason I did was because integrating all urls into a project would seamlessly allow all employees hit a single URL to perform any kind of operations. Also, this was a great opportunity for me to how create API’s, work with backend proprietary technologies (responsible for workflow management and email management).
   E. Figured out by gathering requirements from my manager, project-managers, from CEO, COO, and other teams like (sales, R&D, Engineering…).
   F. Then started putting requirements together and thought about what’s the big picture. What are the MVP features? Found out that user should be able to submit timeslips of different types. On the other hand, project-managers should be able to create, edit and delete projects. Those projects must be tied with timeslips. Also, made sure that I think of long-term benefits of the application by making it extensible from the beginning and didn’t spend time on which technologies or frameworks to use other than those used by company (At that time React and Angular were gaining popularity and newer CSS versions were in the market).
   Action:
   Divided the whole project in a span of 2months. This included gathering business requirements, developing, showing it to stakeholders, testing, releasing, and populating it with product data. First worked time-management module and then on project management. Worked with an intern (was responsible for wireframing and visual-designing projects) and a Junior Engineer (broken down the requirements into smaller parts for him to execute). I became the code-reviewer on top of coding out the solution. I also had meetings with stakeholders in agile fashion to gather requirements/improvements on the fly and showing current progress of the application. I created Jira tickets.

Result
Was able to show customers the application every 2 weeks and successfully delivered the project with MVP and two features on top of it (can see timeslips back to 2 years and dashboard for user and managers).

3. What would you do to gain trust of your team?
   Situation + Task:
   Had been working on Orbit application. It was initially developed in 2016. AngularJS was popular back then. The application was maintained with framework’s new version releases.
   Angular decided to stop supporting the framework in late 2021. Decided should look for other alternatives because of two reasons. Would be difficult to figure out problem solution if there is no active community. Plus, had customer-compliance issues which were related to using older technology. Also found out newer frameworks like React and Angular were faster and allowed to integrate robust technologies like TypeScript as well was easily aligning with newer features of ES6 (not a necessary thing since it can be transpiled via Babel).
   Actions:
   Since we were tier-1 customers (our clients are tier-2 customers 😉), I asked my colleagues about what some of the characteristics are we looking for when choosing the next framework. This decision was critical since it would not only affect for good 6-8 years in future but will also be a decisive factor for a new hire who is joining the company. Decided a timeline of 2 months to test out those frameworks would be a good option. This research was done parallelly with our customer projects and we were giving 85/15% ratio of working on the research. I took chance to ask the team to have a conversation about what are our requirements. Found out that the framework should have low learning curve and we will be developing using the new framework feature-by-feature basis.
   Had discussions two weeks later. I presented to use React. With low learning curve and the ability to develop a feature at a time along with being easier for someone who just have JS experience would easily start developing using it. Other colleague had different opinion and that was to use Angular because it is like Angularjs and is a full framework. Also, it will help developers to bind by the not implementing different types of solutions for a task-type. Had different opinions but I made sure I steered the conversation to understand why a choice and not other.
   Had more discussion about how Angular is slight complicated to test then React since the later implements one-way databinding as opposed Feitto two-way. Thus, it would be easy that data if mutated in parent component will flow down the child component and child component won’t be reflected in parent-component. Such boundaries can be set when using Angular directive. Also react gave us the flexibility to switch libraries depending on what we liked and what don’t about something. Recently changed from Redux-to-redux toolkit. Changed from material to bootstrap. Also Angular is trickier to learn for new hires (who never had Angular experience).
   Result:
   Decided to persuade React instead of Angular.
4. Most complicated problem
   A. It was during developing a feature called “document exchange tracker” for Orbit. The customer asked for the first time about such feature, and we never implemented similar before. They were asking about that the risk-management team should be able to create a master document tracker that would be having information about drug-effects along with supporting documents. That information will be created by the customer company and would be distributed to partners/affiliates¬¬¬ to collect region-specific information to it. Affiliates should not be able to each other’s work but the customer company should be able to see all affiliates work. Was not sure about how that would happen since we allowed employees of the same company and known external users (whose information was stored in customer-authentication database) used to access the application.
   B. As oppose to that here the customer could literally send email to any affiliate and only that affiliate should be able to see the information about it. It would be impossible to store information about all possible affiliates as that list could increase or decrease and employees in those companies could change.
   C. Analyzed their issue at 30,000 ft. Figured out how long they want their affliates to have access to they system and when they are no longer allowed to visit the system.
   D. This was handled using security rules. The way it worked was it allowed users who had view access to view trackers specific to a country they were assigned or a tracker of specific tracker-type. It was based on a view and was useful for affiliates who the customer company maintained regular ties.
   E. On the other hand, emails were stored in a separate table (for those affiliates which were one off). A link to the application was sent to the affiliate and they were allowed to enter information. In addition they were allowed to move status of tracker from one to another. After the tracker reached a status, they were revoked access.

5. How have I tackled multiple priorities? How have I delivered during crunch times? When worked against tight deadlines?
   A. It was recently when I delivered a version of Orbit along with a new tracker-type “SSS”
   B. I asked if the dates can be moved since this would require atleast 5 weeks to deliver. But I got response that it cannot since the sales dept had already signed an agreement with customers and the project had to be delivered both in 3 weeks.
   C. I asked my manager for extra resource to make sure we hit the deadline, but we didn’t have anyone else to pick it up (one was doing customer integration with a third party software and other was busy migrating customer from legacy to most up-to-date orbit version).
   D. First: Figured out which part of the deliverables could be cut down. Realized Tracker-type had to be migrated since they were expecting that new tracker-type but were ok with just bugfixes and improvements (and not tasks or features).
   E. The timeline was 3 weeks.
   F. Validated the subset of work and then started working on it. Also, worked on optimizing the other aspects of launching the version.
   G. Realized that new tracker-type was new feature to existing system. Testing of that feature was necessary issues instead of manually E2E testing for 2 weeks. This reduced timeline of 5 months to 3 weeks.
   H. Further made sure that stakeholders including my manager was aware about what we committed.
   I. Every week had meeting with stakeholders about the progress I was making. I also helped QA team writing documentation.
   J. After launching, I ensured that our stakeholders that we are working on rest of the tickets for the patch version in next weeks.
6. Why Amazon?
   A. I am interested in working at Amazon because I want to explore and contribute to the Quicksight team. This is a topic that excites me on a professional level. I had chance to work on various dashboards for different customers which was fetching information from relational database. I am eager to know how does Quicksight dashboard allows searching questions in plain language to derive results. That’s why I was drawn to this role specifically.
   B. More broadly, I am attracted to Amazon’s culture of diving deep and taking ownership. I see a lot of value in taking projects seriously and trying to find clever ways to improve results as a team. These are some of the values I implement in my work, and I’d like to join QuickSight team that is already reaching for those standards.
   C. I find Amazon to be the most customer centric company of this planet. I mean it. I have been a customer for ages and have always wondered how efficient and scalable your hardware and software systems are. I am sure it will be a huge learning opportunity for me to be part of Amazon. I will actually be proud to contribute to its growth.

## Leadership Principles Explained In Detail

1. **Customer Obsession**: Customer centric company. What is valuable to the customer first? If something went wrong, it is ok as long we learn from it.
2. **Think Big**: looking down the road and thinking big and not just solving immediate problem. Don't stop thinking with the first solution of a problem. There might be bigger and bolder solutions for a problem.
3. **Learn and be curious**: seek to improve ourselves, no matter how expert. ask why? never done learning. by being curious we learn.
4. **Hire and Develop the Best**: Hire those who want to grow. help each other grow because helping others to grow will themselves help someone else to grow.
5. **Frugality**: Provide as much value as possible with as little cost as possible. Overcoming limitations. managing resources optimally. see constraints as opportunity to invent. We're inventing to solve problems in cheaper way. Solutions would be faster, easier to extend, easier to maintain...etc...It is ok to not have enough time and resources.
6. **Bias for Action**:make quick decisions and move forward. Rather spending time projecting results, surveying or testing them. if you cannot agree on which frontend framework to use and neither of us has an idea about other altenatives then suggesting that we should follow the option I am suggesting and start implementing. Down the line if we have more information, we can always switch back.
7. **Success and Scale Bring Broad Responsibility**: choices have impact on communities. have the ability to look at and understand non-financial/non-technical perspectives so that success is gained in right manner (instead of just having goal to increase kids tablets, should look deep into how can be make kids use tables more educational then for entertainment purposes)
8. **Strive to be the earth's best employer**: Leaders should pay attention to employees' empathy as well as focusing attention on customer success and delivering results.
9. **Deliver Results**: Focus on key inputs. Understanding that people are not just creating registration forms, they are creating piplines for new customers. return output in right quality in timely fashion. sometimes due to constraints, it is not possible to meet project timelines/deadlines. in that case I would look at the features and cut out the ones which are not needed. product-manager agreed. convinced qa engineer to cut a week off for testing. was risky but important to meet deadlines with MVP than meeting no-deadline with perfect product.
10. **Have backbone; disagree and commit**: data based disagreements are great. if you don't agree with seniors or project managers, prove it with data. if they still don't agree explain to your team why the solution which they are suggesting is better and face consequences, if any, together of using boss' recommended solution as a team.
11. **Dive deep**: If something doesn't make sense, dive in and figure out what is going on. don't give details to the incidents you don't know basic about them. Should be able to give basic details about the anecdotes.
12. **Earn Trust**: Don't point blame, fix processes. don't blame others before blaming yourself. Be honest. Trust each other. Someone made error than I failed to influence them to use the solution I devised.
13. **Insist on higher standards**: If we are owner of something, we won't ship it with low quality. We should have higher standards to meet. We should accomplish project goals first and then look for next problem we could tackle or improve existing solution.
14. **Are right a lot**: Every perspective needs to be reviewed. leaders are those who have good judgement/instincts, as well as question their own decisions and be open to counter opinions.
15. **Invent and Simplify**: always look out for alternative solutions. keep any solution for a problem simple so that it is easier to maintain. when in doubt remove process(es) instead of fixing them (of course after finding an alternative to solve the issue which the process was solving)
16. **Ownership**: You should go above and beyond to fix issues pertaining the product. You should never say that is not that's not my problem.

## Questions

Q. How to turn Over project to a New project manager?
A. Key points: communication, teamwork, earn trust, deliver results, customer obsession

The reason why I handed project to another junior engineer because I was assigned maintenance for legacy project as well to implement features for Orbit.
Due to increased workload, decided to hand over to an engineer.

Performed following 4 steps:

- Gathered team to get all task status and project updates. Acquainted myself with all that information. This was critical for project manager to have all information to hit the ground running.
- During the transition period, revised the project schedule (2 months project which included adding two new major features), made sure that the project is current (accounted for 3 more weeks for the engineer to transition)
- Discussed this transition with key stakeholders: my manager, CEO, CFO, project managers team... Made sure they knew they were going to handled by great minded engineer. Had two week transition period. Sat with him in all project meetings so that the customers get used to working with him.

Understand that changing leadership disrupts momentum but I made sure that I will communicate with client on weekly basis about the any major issues they were facing.

Q. How did you handle an issue related to a project you helped transitioned over to someone else?
A. Key points: Earned trust by listening others. Dived deep by looking into technical and non-technical issues. Promised to deliver next version in x months.
Situation: Coworkers were out on sick and manager had non-technical responsibilities. Next version of the project was due in 2 months. Manager was looking for someone to handle the project fulltime but needed temporary manager. Took ownership.

- Talked with team-members to get project status updates. That helped me to understand in which direction the project was going. That also helped me to get content into future needs (like what ticket were expected to be done in next few sprints, recent QA testing issues...). Talked with customers that I will be working on the project from start to finish.
- Got access to project-related documentation. made sure emails were forwarded to me. and was part of communication channels. Developed broad understanding. Thought about bigger picture.
- Compared list of jira tickets which were done and are suppose to be done to get an idea about how long the project was.
- Pulled project reports. Reviewed which areas/features were not delivered on time in past and kept an eye on them if tickets were assigned to those features.
- Talked about project status with stakeholders and promised that I will deliver the project in x months.

Q. Describe a time when I helped a coworker?
A. Key points: attention to details, helping other out without compromising my responsibilites, took ownership.
Situation: Coworker was working on reports for the first time. developing for the application. He had not dealt with it before. Showed confidence during sprint meetings but was struggling to get report tickets done. realized when looking at sprint chart.
Task: Decided to help him. first understood the problem. figured out how a report would look like for his task (based on similar reports I made before).
Action: Sat with him. Discussed with him about how struggling it is to work with the Software to generate reports. Asked if I could jump in to the situation.
Arranged meetings throughout 1.5 weeks. Arranged such that he and I were not derailing from other responsibilites. Started explaining basic concepts, then created the report along with him watching over my shoulders. Communicated tips and techniques along the way. once the report was done, encouraged him to do another in my presence to help him.
Action: Delivered the report successfully to the customer and they were happy about it.

Q. Describe a time when team was having productivity/moral issues.
A. Keypoint: team player, effective communication between the members, setting definitive, active listening, collaboration.
Situation: Was working on an internal project along with a customer project. realized at the end of month meeting that the project was falling of the rails. This was because there were new hires recently who started working on the project and some employees. didn't restructure the project when that happened.
Task: Complete the project in said amount of time.
Action: Had two meetings the following week to gather what everyone's priorities have been and if any has been changed.

https://everydayinterviewtips.com/7-types-of-behavioral-interview-categories/
https://www.thebalancecareers.com/how-to-respond-to-interview-questions-about-teamwork-2061100

## How to answer teamwork questions

Applicable Amazon leadership principles: Customer Obsession, Earn Trust (Listen attentively, speak freely, treat others respectfully. vocally self-critical. be transparent to the team if they are wrong)

teamwork, good communication with team-members
Q. Describe a time when your team was having productivity/moral issues?
A. Key points:

q) tell me about a time when your team had productivity/morale issues. what did you do to improve it.
key points: trust, teamwork, dive deep, deliver results

situation: working on tempo alongside Orbit. tempo inhouse application working tickets when we got time. 2 months span realized after 1 month won't be possible to complete the task
everyone used to work when they got chance.
task: complete 70 tickets in 1 month. included multiple features

action:

- gathered the team around and found out where everyone's at
- I said I will work extra hours and asked if anyone could
- reviewed current tickets and reassigned them to those who worked on similar tickets/features before
- talked with stakeholders to cut down \# of tickets. agreed to bugfixes and improvements.
- started having weekly sprints where everyone reviewed tickets and would review our statuses
- found opportunities where I could help them. setup up official Slack channel to discuss issues which might come
- made sure all stakeholders are aware of things which we are working on
- made qa team agreed on reduced testing on new tickets only.
- asked my manager if we could work extra hours

result
delivered result
decided to focus more after the project was pushed in production.
two things I would do the same for next project.
I would keep checking our progress long before it gets derailed.
and I would assign tickets to those who worked before during crunch time.
I would also make sure if anyone was facing personal issues they would let me know beforehand

q) tell me about a time about a time when I jumped to a project which was already receiving accolades to improve something?
A) key points: learn and be curious, think big, customer obsession,
situation: tempo was working fine. but when i looked at codebase it was not optimistic. it was having separate code-logic for related code. it was not DRY.
task: decided to make sure the code-logic was DRY related to time-slip submission and viewing them
approach:

- decided to combine code-logic into one controller. made sure factory functions are defined in service file
- asked if anyone was already working on it. if so then I would start contributing.
- customer was not directly affected but would be easier for new developer to maintain. applied KISS principle
- conveyed to my manager that this is what I will be working and the reason behind how it would help improve the product-code-base.
- devised 2 sprints. worked on it. made sure i added enough comments to let anyone know what I did.
  result:
- updated the code in production and the efficiency increased.
- created a documentation about how to maintain current project and approach new tickets with similar strategy.
