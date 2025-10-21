# CTD Kiwi Final Project: DreamWeather 2.0 #

This web application is a weather app that shows weather information at a location specified by its coordinates, and it is a successor of sorts to my original prework submission. Users may choose a location by entering its longitude and latitude, and they may optionally add a title to the location. Users may also save locations to a list that will be maintained across visits.

## Technologies Used: ##

This web application was created with React, scaffolded with Vite, and it makes use of two APIs: Airtable for persistent storage, and Open Meteo for precise weather data. Languages used include HTML, CSS, JavaScript, and JSX.

Airtable: https://airtable.com/developers/web/api
Open Meteo: https://open-meteo.com

## How to Install and Run: ##

To install, clone this repository to your local machine. From the root directory of the project, enter ```npm install``` into the terminal. To run the application, enter ```npm run dev``` into the terminal.

## API Connection Requirements: ##

This project requires an Airtable base for persistent storage. The minimum required fields include the following
* "title" - Single line text
* "latitude" - Number
* "longitude" - Number

To connect the Airtable base to the project as an API, log into Airtable, select your profile icon, and select "Builder Hub". Inside the builder hub, go to Developers > Personal access tokens, and create a new token. Give it a memorable name. Under Scopes, add ```data.records:read``` and ```data.records:write```. Under Access, add the base that you have prepared. Finally, click "Create Token", and copy it to your clipboard. Inside the project, the following information is required in a .env.local file created in the root directory (see .env.local.example for reference, and use the same formatting in your .env.local file).
* VITE_PAT: This is the token that you copied to your clipboard.
* VITE_BASE_ID: Go to your base in Airtable, and check the URL. This field is the string of text between the first and second forward slashes after the TDL (e.g. after the .com).
* VITE_TABLE_NAME: You can use the name of your table, but it is better to use the internal ID, as it is resistant to name changes. From the same URL as before, get the string of text between the second and third forward slashes after the TLD.

That should be all you need to start using Airtable for persistent storage.

## How To Use: ##

The Home Page is accessible by clicking ```DreamWeather``` or ```Home``` in the navbar. From the Home Page, users may use the navbar at the top of the page to enter a new location (name, longitude, and latitude). The user may set this location as the current location by pressing the ```Submit``` button or by pressing the enter key in any of the 3 fields in the form. Upon submission, the Home Page will display current weather information about the current location as well as a 7-day forecast for that location. To save the current location to the locations list (maintained between visits), the user may press the ```Save Current Location``` button next to the form. By default, the current location is set to "Null Island" at 0 latitude and 0 longitude.

The Locations Page is accessible by clicking ```Locations``` in the navbar or by appending "/locations" after the TLD in the URL. From the Locations Page, users may see the list of saved locations (locations list) along with some current weather information at each location. Clicking the name of any location in the list will navigate the user to the Home Page, setting the selected location as the current location.

Clicking the ```Add``` cell will open the "Add Location" menu, allowing the user to enter a location and add it to the list by clicking the ```submit``` button or by pressing enter in any of the 3 fields.

Clicking the ```Edit``` cell to the right of any saved location will open the "Edit Location" menu, allowing the user to change the fields associated with the location and update it in the locations list by clicking the ```submit``` button or by pressing enter in any of the 3 fields.

Clicking the ```Delete``` cell to the right of any saved location will removed that location from the list.

