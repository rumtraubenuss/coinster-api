const app = require('./app');

app.set('port', process.env.PORT || 8000);

const server = app.listen(app.get('port'), () => {
  console.log(`Express server listening on ${server.address().port}`);
});
