import express from 'express';
import { BookController } from '../../adapter/controllers/bookController';
import { bookRoutes } from '../../infrastructure/web/routers/bookRouter';
import { PrismaBookRepository } from '../../adapter/repositories/prismaBookRepository';
import { PrismaClient } from '../../generated/prisma';
import { UuidGenerator } from '../../adapter/utils/uuidGenerator';
import { AddBookUseCase } from '../../application/usecases/book/addBookUseCase';

const app = express();

// JSON形式のデータを受け取るための設定
app.use(express.json());

const prisma = new PrismaClient();
const uuidGenerator = new UuidGenerator();

const bookRepository = new PrismaBookRepository(prisma);
const addBookUseCase = new AddBookUseCase(bookRepository, uuidGenerator);

const bookController = new BookController(addBookUseCase);

app.use('/books', bookRoutes(bookController));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});