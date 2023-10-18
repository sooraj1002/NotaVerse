import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { updateDto } from './dto';
import { createDto } from './dto/create.dto';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @UseGuards(JwtGuard)
  @Get()
  allNotes(@GetUser() user: User) {
    return this.notesService.allNotes(user.id);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  singleNote(@Param('id') id: string) {
    return this.notesService.singleNote(id);
  }

  @UseGuards(JwtGuard)
  @Post()
  createNote(@Body() data: createDto) {
    return this.notesService.createNote(data);
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  editNote(@Param('id') id: string, @Body() updatedData: updateDto) {
    return this.notesService.editNote(id, updatedData);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  deleteNote(@Param('id') id: string) {
    return this.notesService.deleteNote(id);
  }
}
