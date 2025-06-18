import { Request, Response } from 'express';
import { BookService } from "../businessLogic/bookService";

export class BookController {
  constructor(private bookService: BookService) {}

  async add(req: Request, res: Response): Promise<void> {
    try {
      const { title } = req.body;
      if (!title) {
        res.status(400).json({ error: 'Title is required' });
        return;
      }
      const book = await this.bookService.add(title);
      res.status(201).json(book);
    } catch (error) {
      console.error('Error adding book:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async findById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      if (!id) {
        res.status(400).json({ error: 'ID is required' });
        return;
      }
      const book = await this.bookService.findById(id);
      if (book) {
        res.status(200).json(book);
      } else {
        res.status(404).json({ error: 'Book not found' });
      }
    } catch (error) {
      console.error('Error findById:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}