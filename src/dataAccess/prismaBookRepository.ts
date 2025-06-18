import { Book, PrismaClient } from '../generated/prisma';

export class PrismaBookRepository {

  constructor(private prisma: PrismaClient) {}

  async findById(id: string): Promise<Book | null> {
    return await this.prisma.book.findUnique({
      where: { id },
    });
  }

  async create(title: string): Promise<Book> {
    return await this.prisma.book.create({
      data: {
        title,
        isAvailable: true,
       },
    });
  }
}