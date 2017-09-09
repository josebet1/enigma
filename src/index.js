import app from './enigma';

app.set('port', process.env.PORT || 8081);

const server = app.listen(app.get('port'), () => {
  console.log(`Server listening on port ${server.address().port}.`); // eslint-disable-line
});
