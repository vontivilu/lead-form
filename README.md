# Author: Adarshyam Vontivilu
# Project: Lead Form (Alma Take Home Assignment)

This application is built using React, Typescript. It has the below 3 page routes:

1. App.tsx (/): Home page with the lead form and the validations on the fields with submit button.
2. Thankyou.tsx (/thankyou): Thank you page displaying a message upon successul submission.
3. Leads.tsx (/leads): Leads page that displays a list of leads that are added using the form along with a text field to filter the table by first name.

Each page route has its own CSS file in a separate folder except the homepage which is under /src.

## Details about the code

Across the pages, various comments are added under sections where the code can be refactored due to the interst of time. The pages are responsive, follows HTML semantics, optimized for SEO and accessibility. 

React router dom has been used for routing instead of Next.js due to compatibility issues with my Mac version. 

Localstorge has been used for quicker setup for demo purposes and ideally Redux/useContext would be used for state management. 

## Steps to run the application

1. After downloading/cloning the application, go to the directory in terminal.
2. Install node packages using `npm install` to generate node_modules/
3. Run the application using `npm run start`
4. Open the URL in browser http://localhost:3000