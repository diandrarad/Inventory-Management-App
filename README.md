# Inventory Management App

This Inventory Management App is a web application designed to help store owners manage their inventory efficiently. The app allows users to create, read, update, and delete categories and items within those categories. It also provides functionality to upload images for items and secure admin actions with a password.

## Features

- **Category Management**: Users can create, view, update, and delete categories.
- **Item Management**: Users can create, view, update, and delete items within categories.
- **Image Upload**: Ability to upload images for items and store their URLs in the database using Cloudinary.
- **Admin Password Protection**: Destructive actions like deleting categories or items require the user to enter a secret admin password.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/inventory-management-app.git
   ```

2. Install dependencies:

   ```bash
   cd inventory-management-app
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory and add the following variables:

   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/inventory
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ADMIN_PASSWORD=your_admin_password
   ```

   Replace `your_cloud_name`, `your_api_key`, `your_api_secret`, and `your_admin_password` with your actual Cloudinary credentials and admin password.

4. Run the app:

   ```bash
   npm start
   ```

   The app will be available at `http://localhost:3000`.

## Usage

- Navigate to `http://localhost:3000` to access the home page.
- From the home page, users can navigate to view categories and items, create new categories and items, update existing ones, and delete them (password protected).
- To upload images for items, users can click on the "Upload Image" button when creating or updating an item.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- EJS (Embedded JavaScript)
- Multer (for file uploads)
- Cloudinary (for image storage)
- HTML
- CSS

## Credits

This project is part of the [Odin Project](https://www.theodinproject.com/) curriculum.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.