# SoundsGame-React-VR

This is one of the games that are part of a project called Liberi, a web app for Virtual Reality games.

The idea of this project was to built a platform with VR reality games with an approach on early childhood development. 

This project was built in Rails 5, and the games that are inside of it where built in React VR 1.4. 
The integration process as it wasn’t a available in web-pack, we integrate the  VR projects as a library in the Rails web app. 

This two apps communicate within each other with an api call that sends the score of the game to the database. 

To create this api, the app pass the date of the current user in the url and the VR games send back the information of the session of the current user to the database.  
