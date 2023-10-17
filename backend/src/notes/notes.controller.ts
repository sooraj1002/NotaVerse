import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { NotesService } from './notes.service';
import { updateDto } from './dto';

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

  @Put(':id')
  editNote(@Param('id') id: string, @Body() updatedData: updateDto) {
    return this.notesService.editNote(id, updatedData);
  }

  @Delete(':id')
  deleteNote(@Param('id') id: string) {
    return this.notesService.deleteNote(id);
  }
}
