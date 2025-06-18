import express from 'express';
import { BookController } from './presentation/bookController';
import { BookService } from './businessLogic/bookService';
import { PrismaBookRepository } from './dataAccess/prismaBookRepository';
import { PrismaClient } from './generated/prisma';

const app = express();

// JSON形式のデータを受け取るための設定
app.use(express.json());

const bookController = new BookController(
  new BookService(
    new PrismaBookRepository(
      new PrismaClient()
    )
  )
);

const PORT = process.env.PORT || 3000;

app.post('/books', bookController.add.bind(bookController));
app.get('/books/:id', bookController.findById.bind(bookController));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});