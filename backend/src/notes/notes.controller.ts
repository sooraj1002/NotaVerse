import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { updateDto } from './dto';
import { createDto } from './dto/create.dto';

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

  @Post()
  createNote(@Body() data: createDto) {
    return this.notesService.createNote(data);
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
