# **ShireBnB - A Middle Earth Themed Airbnb Clone**

## **Overview**

ShireBnB is an Airbnb clone inspired by the enchanting world of Middle Earth. This web application allows users to explore, book, and manage stays at various fictional spots throughout Middle Earth. Whether you're looking for a cozy stay in The Shire or a grand adventure in Rhovanion, ShireBnB provides a seamless experience for both hosts and travelers.

## **Key Features**

### **1. Authentication and User Management**
&nbsp;&nbsp; **Sign Up:** 
&nbsp;New users can sign up by providing their first name, last name, email, username, and password. The app ensures secure user registration with input validation.

&nbsp;&nbsp; ***Log In:*** 
&nbsp;Registered users can log in using their username and password or log in as a demo user. The log-in process includes error handling for incorrect credentials.

&nbsp;&nbsp; ***User Menu:***
&nbsp;After logging in, users can access a drop-down menu that includes their first name, email, and options to log out or manage their spots.

&nbsp;&nbsp; ***Log Out:*** 
&nbsp;Users can log out, which clears their session and redirects them to the home page.

### **2. Spot Management**

&nbsp;&nbsp; ***Create a New Spot:*** 
&nbsp;Logged-in users can create new spots by providing the location, description, title, price, and at least one image. The form includes validation to ensure all required fields are filled correctly.

&nbsp;&nbsp;***View All Spots:*** 
&nbsp;The landing page displays a list of all spots, each with a thumbnail image, location details, star rating, and price per night. Users can click on any spot to view its detailed information.

&nbsp;&nbsp;***View Spot Details:*** 
&nbsp;Each spot's detail page includes the spot's name, location, images, host information, description, and a callout box with pricing and a "Reserve" button (future feature).

&nbsp;&nbsp;***Update a Spot:*** 
&nbsp;Hosts can update their spots from the "Manage Spots" page. The update form is pre-populated with existing data and allows changes to the spot's information.

&nbsp;&nbsp;***Delete a Spot:*** 
&nbsp;Hosts can delete their spots through a confirmation modal. Deleted spots are removed from both the "Manage Spots" page and the landing page without requiring a refresh.

### **3. Reviews and Ratings**

&nbsp;&nbsp; ***Post a Review:*** 
&nbsp;Logged-in users who are not the spot owner can post reviews on a spot's detail page. The review form includes a comment box and a star rating input, with validation to ensure meaningful feedback.

&nbsp;&nbsp; ***View Reviews:*** 
&nbsp;The spot's detail page displays all reviews, with the most recent reviews at the top. Each review shows the reviewer's first name, the date of the review, and the comment text.

&nbsp;&nbsp; ***Delete a Review:*** 
&nbsp;Users can delete their reviews through a confirmation modal. Deleted reviews are immediately removed from the spot's detail page.

### **4. Responsive Design**
&nbsp;&nbsp;Dynamic Layout: 
&nbsp;The application's header and layout adjust dynamically to different screen sizes, ensuring a consistent user experience on all devices.

## **Technologies Used**

### **Frontend:**

&nbsp;&nbsp; ***React:*** 
&nbsp;For building the user interface and managing component-based architecture.

&nbsp;&nbsp; ***Redux:*** 
&nbsp;For state management across the application, ensuring a consistent state throughout user interactions.

&nbsp;&nbsp; ***CSS:*** Custom styles are applied to create a Middle Earth-themed aesthetic.

### **Backend:**

&nbsp;&nbsp; ***Express:*** 
&nbsp;A Node.js framework used to build the RESTful API, handling requests and responses between the frontend and the database.

&nbsp;&nbsp; ***Sequelize:*** An ORM for Node.js, used to interact with the database, defining models, and managing relationships between data entities.