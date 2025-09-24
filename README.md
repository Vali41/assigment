User Management Application
This is a single-page React application for managing a list of users. The application provides a clean, responsive interface to perform common data manipulation tasks.
Features
CRUD Operations: Create, Read, Update, and Delete users.

Search & Filter: Easily find users by searching their name or email, or by filtering them by department.

Sorting: Sort the user table by any column (e.g., first name, last name, email) in ascending or descending order.

Pagination: Navigate through the user list with a simple pagination bar and a configurable "items per page" setting to control the number of users displayed.

Responsive Design: The application is built with Bootstrap to ensure it looks great and is fully functional on devices of all sizes.
API
This application uses the free JSONPlaceholder API for mock user data, which allows for simulating network requests for CRUD operations without needing a backend server.

Dependencies
React: A JavaScript library for building user interfaces.

Bootstrap 5: A powerful, front-end toolkit for building responsive, mobile-first websites.

React-Bootstrap (implied): For handling modals and other UI components.

Bootstrap Icons: For the various icons used throughout the application.
Challenges Faced
The most significant challenge was seamlessly integrating multiple data manipulation features. The application started with a simple list, but adding search, filter, and pagination introduced a layer of complexity.

I had to ensure that when a user searches for a name or filters by department, the pagination automatically resets to the first page and the total page count adjusts correctly. This required careful management of the application's state and ensuring that the filtering logic was applied before the pagination logic. Handling this in a way that felt smooth and responsive to the user was a key learning experience.

Improvements
If I had more time to continue working on this project, I would focus on the following improvements:

Data Persistence: The current application uses a mock API, so any changes are not saved permanently.
