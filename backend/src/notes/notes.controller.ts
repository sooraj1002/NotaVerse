import { Controller, Get, Param } from '@nestjs/common';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  allNotes() {
    return this.notesService.allNotes();
  }

  @Get(':id')
  singleNote(@Param('id') id: string) {
    return this.notesService.singleNote(id);
  }
}
