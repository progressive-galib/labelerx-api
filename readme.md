


# Photo Annotation System

The Photo Annotation System is a web application designed to manage and annotate images efficiently. It provides a RESTful API for uploading, annotating, and retrieving images, as well as tracking annotations by class.

## Features

- **Image Management:** Upload and store images with metadata such as filename, path, width, and height.
- **Annotation:** Annotate images by marking them as annotated or unannotated.
- **Image Details:** Retrieve details of an image, including width and height.
- **Class Tracking:** Keep track of annotated images for different classes.
- **Class Management:** Add new classes to classify images.

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL or a compatible database

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/progressive-galib/labelerx-api.git
   ```

2. Install dependencies:

   ```sh
   cd photo-annotation-system
   npm install
   ```

3. Configure your database connection by updating the `DATABASE_URL` environment variable in your `.env` file.

4. Initialize the database schema:

   ```sh
   npx prisma migrate dev
   ```

5. Populate the database with classes using the initializer:

   ```sh
   npm initialize
   ```

6. Start the server:

   ```sh
   npm start
   ```

7. Access the API at [http://localhost:3000/api](http://localhost:3000/api).

### API Documentation

The API documentation is available at [http://localhost:3000/api-docs](http://localhost:3000/api-docs) using Swagger UI.

## Usage

- Use the provided API to manage and annotate your images.
- Interact with the Swagger documentation for API testing and exploration.

## License

This project is licensed under the ISC License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- [Prisma](https://www.prisma.io/) - Database toolkit for Node.js and TypeScript
- [Express.js](https://expressjs.com/) - Web application framework for Node.js
- [Swagger](https://swagger.io/) - API documentation and testing tools