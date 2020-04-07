const express = require('express');

const app = express();


app.use('/api/posts', (req, res, next) => {
  const posts = [
    {
      id: "1234444",
      title: "First Server side porst",
      content: "this is coming from the server"
    },
    {
      id: "1233444",
      title: "Second Server side porst",
      content: "this is coming from the server!"
    }
  ];

  res.status(200).json({
    messages: 'Posts fetched Successfuly',
    posts: posts
  });
});

module.exports = app;