import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { updateDto } from './dto';
import { createDto } from './dto/create.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) {}

  async allNotes(userId: number) {
    console.log(userId);
    try {
      const notes = await this.prisma.note.findMany({
        where: {
          userId: userId,
        },
      });
      return notes;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new ForbiddenException('Error fetching all notes');
      }
      throw error;
    }
  }

  async singleNote(id: string, userId: number) {
    try {
      const note = await this.prisma.note.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      if (note.id != userId) {
        throw new ForbiddenException('You Cannot Access this note');
      }
      return note;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new ForbiddenException('Note does not exist with given id');
      }
      throw error;
    }
  }

  async createNote(data: createDto, userId: number) {
    try {
      const convertedData = {
        ...data,
        userId: userId,
      };

      const note = await this.prisma.note.create({
        data: convertedData,
      });
      return note;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new ForbiddenException('Error creating a note:');
      }
      throw error;
    }
  }

  async editNote(id: string, updatedData: updateDto, userId: number) {
    try {
      const check_note = await this.prisma.note.findUnique({
        where: {
          id: parseInt(id),
        },
      });

      if (check_note.userId !== userId) {
        throw new ForbiddenException('You are not allowed to edit this note');
      }

      const note = await this.prisma.note.update({
        where: {
          id: parseInt(id),
        },
        data: updatedData,
      });
      return note;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new ForbiddenException('Note Does Not exist');
      }
      throw error;
    }
  }

  async deleteNote(id: string, userId: number) {
    const check_note = await this.prisma.note.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (check_note.userId !== userId) {
      throw new ForbiddenException('You are not allowed to delete this note');
    }

    try {
      const deletedNote = await this.prisma.note.delete({
        where: {
          id: parseInt(id),
        },
      });
      return deletedNote;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new ForbiddenException('Note Does Not Exist');
      }
      throw error;
    }
  }
}
