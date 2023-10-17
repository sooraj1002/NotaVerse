import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { updateDto } from './dto';
import { createDto } from './dto/create.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) {}

  async allNotes() {
    try {
      const notes = await this.prisma.note.findMany();
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

  async singleNote(id: string) {
    try {
      const note = await this.prisma.note.findUnique({
        where: {
          id: parseInt(id),
        },
      });
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

  async createNote(data: createDto) {
    try {
      const convertedData = {
        ...data,
        userId: parseInt(data.userId),
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

  async editNote(id: string, updatedData: updateDto) {
    try {
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

  async deleteNote(id: string) {
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
