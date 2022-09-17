const app = require('./app');

const PORT = process.env.PORT || 4050;
app.listen(PORT, () => {
  console.log(`App listen on port: ${PORT}`);
});
