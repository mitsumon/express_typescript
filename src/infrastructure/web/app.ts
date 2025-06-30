import { UserRepositoryInterface } from './../../domain/repositories/userRepositoryInterface';
import express from 'express';
import { BookController } from '../../adapter/controllers/bookController';
import { bookRoutes } from '../../infrastructure/web/routers/bookRouter';
import { PrismaBookRepository } from '../../adapter/repositories/prismaBookRepository';
import { PrismaClient } from '../../generated/prisma';
import { UuidGenerator } from '../../adapter/utils/uuidGenerator';
import { AddBookUseCase } from '../../application/usecases/book/addBookUseCase';
import { FindBookByIdUseCase } from '../../application/usecases/book/findBookByIdUseCase';
import { CreateUserUseCase } from '../../application/usecases/user/createUserUseCase';
import { UserController } from '../../adapter/controllers/userController';
import { userRoutes } from '../../infrastructure/web/routers/userRouter';
import { PrismaUserRepository } from '../../adapter/repositories/prismaUserRepository';

const app = express();

// JSON形式のデータを受け取るための設定
app.use(express.json());

const prisma = new PrismaClient();
const uuidGenerator = new UuidGenerator();

const bookRepository = new PrismaBookRepository(prisma);
const addBookUseCase = new AddBookUseCase(bookRepository, uuidGenerator);
const findBookByIdUsecase = new FindBookByIdUseCase(bookRepository);
const bookController = new BookController(addBookUseCase, findBookByIdUsecase);

const userRepository = new PrismaUserRepository(prisma);
const createUserUseCase = new CreateUserUseCase(userRepository, uuidGenerator);
const userController = new UserController(createUserUseCase);

app.use('/books', bookRoutes(bookController));
app.use('/users', userRoutes(userController));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
