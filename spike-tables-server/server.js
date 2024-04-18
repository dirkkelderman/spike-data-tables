const express = require("express");
const { createHandler } = require("graphql-http/lib/use/express");
const schema = require("./schema");
const cors = require("cors"); // Import the cors middleware

const app = express();

// Enable CORS for all origins
app.use(cors());

// GraphQL endpoint
app.all("/graphql", createHandler({ schema }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
