# BACKEND ARCHITECTURE 

## Tech stack

### Database - Mongodb
### Backend - Nodejs with express framework

##  Functional Requirements
### Profiles

1. Admin can create multiple user profiles by entering a name.
2. No functionality is required for deleting profiles.

### Event Creation
1. Admin (or any user) can create events for one or multiple profiles at the same time.
2. Event fields:
    Profiles: Select one or more users.
    Timezone: Pick a timezone for the event.
    Start Date + Time: Calendar + time selector.
    End Date + Time: Calendar + time selector.
        Rules:
        End date/time cannot be in the past relative to the selected start date/time.
        Start and end times should respect the selected timezone of the user(s).


### Event Viewing & Updating
1. Users can view all events assigned to them.
2. Users can update all events assigned to them.
3. Each event stores:
4. createdAt (timestamp in user timezone)
5. updatedAt (timestamp in user timezone)


### Multi-timezone handling:
1. Each user can pick their own timezone.
2. All events must display according to the user’s selected timezone.
3. Updating events should reflect properly across all users’ selected timezones.

### Bonus / Extra Credit
Event Update Logs:
1. Whenever an event is updated, log the change.
2. Show previous vs. updated values and the timestamp of the update in the user’s selected timezone.
3. If a user changes their timezone, all timestamps and logs should automatically convert to the new timezone.


### Models 
1. Profile 
    1. role : admin | user
    2. name : string
    3. createdAt : Date
    4. updatedAt : Date
    5. defaultTimezone 

2. Events
    1. name : string
    2. description : string
    3. startDate : Date 
    4. endDate : Date
    5. profileId (forign relation to the profile)
    6. timeZone (don't know which type to give here)

3. Logs (advanced)
    1. eventId : string (foreign relation to the events table)
    2. eventType : string
    3. createdAt : Date
    4. updatedAt : Date 

## Things i have done
1. created mongodb database and stored the connection string in /backend/.env

### Routes
1. /api/profile/create  : POST , for creating a profiles (also i have a doubt , will there be any existing admin user , or that admin user will also be created)
2. /api/profile/uodate : POST , for updating profile
3. /api/profile : GET , for reading the details of the profile
4. /api/profile/delete : DELETE , for deleting the profile

5. /api/event/create : POST , for creating the events
6. /api/event/update : POST , for updating the events
7. /api/event : GET , for reading the details of the events
8. /api/event/delete : DELETE , for deleting the events

9. /api/logs/create : POST , for creating the logs
10. /api/logs : GET , for reading the details of the logs
11. /api/logs/delete : DELETE , for deleting the logs
