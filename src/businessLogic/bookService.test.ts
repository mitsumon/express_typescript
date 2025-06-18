import { describe, it, expect, afterEach, beforeEach, jest } from '@jest/globals';
import { BookRepositoryInterface } from "../dataAccess/bookRepositoryInterface"
import { BookService } from "./bookService";
import { Book } from '../generated/prisma';

const mockBookRepository: jest.Mocked<BookRepositoryInterface> = {
    findById: jest.fn(),
    create: jest.fn(),
}

describe('BookService', () => {
    let bookService: BookService;

    beforeEach(() => {
        bookService = new BookService(mockBookRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('書籍の登録が成功すること', async () => {
        const newBook: Book = {
            id: '1',
            title: 'Test Book',
            isAvailable: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        mockBookRepository.create.mockResolvedValue(newBook);

        const result = await bookService.add('Test Book');
        expect(result).toEqual(newBook);
        expect(mockBookRepository.create).toHaveBeenCalledWith('Test Book');
    });

});