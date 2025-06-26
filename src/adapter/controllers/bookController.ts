import { Request, Response } from 'express';
import { AddBookUseCaseInterface } from '../../application/usecases/book/addBookUseCaseInterface';
import { AddBookRequestDto } from '../../application/dtos/book/addBookRequestDto';

export class BookController {
  constructor(private readonly addBookUseCase: AddBookUseCaseInterface) {}

  async add(req: Request, res: Response): Promise<void> {
    try {
      const requestDto: AddBookRequestDto = {
        title: req.body.title,
      };
      const title = requestDto.title as string;
      const book = await this.addBookUseCase.execute(requestDto);
      res.status(201).json(book);
    } catch (error) {
      console.error('Error adding book:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // async findById(req: Request, res: Response): Promise<void> {
  //   try {
  //     const id = req.params.id as string;
  //     if (!id) {
  //       res.status(400).json({ error: 'ID is required' });
  //       return;
  //     }
  //     const book = await this.bookService.findById(id);
  //     if (book) {
  //       res.status(200).json(book);
  //     } else {
  //       res.status(404).json({ error: 'Book not found' });
  //     }
  //   } catch (error) {
  //     console.error('Error findById:', error);
  //     res.status(500).json({ error: 'Internal Server Error' });
  //   }
  // }
}