import { Book } from '../generated/prisma';
import { PrismaBookRepository } from '../dataAccess/prismaBookRepository';

export class BookService {
  constructor(private bookRepository: PrismaBookRepository) {}

  async add(title: string): Promise<Book> {
    return await this.bookRepository.create(title);
  }

  async findById(id: string): Promise<Book | null> {
    return await this.bookRepository.findById(id);
  }
}