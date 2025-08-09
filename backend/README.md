To Do:

1. Create a class that scrapes all data given a starting url + crawls to subsequent pages
2. Create a class that inputs previous information into llm to categorise 
    i.e. you scrape tons of listings from a specific url - this llm class categorises it accoding to specific instructions
        returns a json dictionary of that
3. Connect to a db to store this information
4. Create a class to fetch + read from db.


To Run Backend:
    Create .env file with specific structure which will have an example in helpful_info
    Grab values form .env from secrets manager - need to setup 
        Ill make a script to auto run this given specific credentials.