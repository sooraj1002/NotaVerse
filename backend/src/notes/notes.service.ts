import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { updateDto } from './dto';

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) {}

  async allNotes() {
    const notes = this.prisma.note.findMany();
    return notes;
  }

  async singleNote(id: string) {
    const note = this.prisma.note.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    return note;
  }

  async editNote(id: string, updatedData: updateDto) {
    const note = this.prisma.note.update({
      where: {
        id: parseInt(id),
      },
      data: updatedData,
    });
    return note;
  }

  async deleteNote(id: string) {
    const deletedNote = await this.prisma.note.delete({
      where: {
        id: parseInt(id),
      },
    });
    return deletedNote;
  }
}
