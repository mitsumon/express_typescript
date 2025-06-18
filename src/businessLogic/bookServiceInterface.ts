import { Book } from '../generated/prisma';

export interface BookServiceInterface {
  findById(id: string): Promise<Book | null>;
  add(title: string): Promise<Book>;
}