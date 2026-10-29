import express from 'express'
import userRouter from './routes/users.js'
import accountRouter from './routes/account.js'

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


app.use('/api', userRouter)
app.use('/api', accountRouter)
