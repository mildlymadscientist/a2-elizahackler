Eliza Hackler

Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
===

## Your Web Application Title
Simple ToDo list website that stores, displays, and dynamically updates a list of tasks. It takes in a task name and a date. If the task name already exists, it will mark the task as complete, otherwise it will make a new one. Whenever a task is modified, the program will check all the tasks to see if they are overdue. 
Uses FlexBox for positioning. 

## Technical Achievements
- Using existing server and main in js, sent information back and forth
- Added base data to array
- Deletes task from array if it exists
- Adds task if it does not exist
- Checks all tasks for overdue status by comparing against current date
- Sends completed array to webpage, meaning that the webpage is always accurate
- Webpage side sends task and date to server, sliced together to JSON
- Waits for response and reads it into list, changed color of item to red or green based on overdue status

### Design/Evaluation Achievements
- Used CSS FlexBox
- Used HTML form
- Used ul list in HTML
- imported Google Font Oswald
- changed background color in CSS
- changed body color, font, size, alignment in CSS
- used span to changed specific word colors in HTML
- changed header color, size, font, and alignment in CSS
- changed list containers background color, font, margins and padding, set type to none in CSS
- changed list items color, font, background color, padding, and margins
- changed flex containers type, direction, justification, alighment, gap, margin, and background color in CSS
 - changed flex items backgroun color, margin, border, and shadow in CSS

Sources:
https://www.w3schools.com/CSS/css_list.asp
https://www.w3schools.com/csS/css3_flexbox.asp
https://codepen.io/GreenSock/pen/VwrBeVw
https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Basic_native_form_controls
https://stackoverflow.com/questions/4622808/html-changing-colors-of-specific-words-in-a-string-of-text

AI used:
Used Copilot to debug date comparison in overdueand make changes to be functional. 
Found splice in Copilot search assist, may have found other individual functions that way. 