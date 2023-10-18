import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { updateDto } from './dto';
import { createDto } from './dto/create.dto';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';

@Controller('notes')
@UseGuards(JwtGuard)
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  allNotes(@GetUser() user: User) {
    console.log(user);
    return this.notesService.allNotes(user.id);
  }

  @Get(':id')
  singleNote(@Param('id') id: string, @GetUser() user: User) {
    return this.notesService.singleNote(id);
  }

  @Post()
  createNote(@Body() data: createDto, @GetUser() user: User) {
    return this.notesService.createNote(data);
  }

  @Put(':id')
  editNote(
    @Param('id') id: string,
    @Body() updatedData: updateDto,
    @GetUser() user: User,
  ) {
    return this.notesService.editNote(id, updatedData);
  }

  @Delete(':id')
  deleteNote(@Param('id') id: string, @GetUser() user: User) {
    return this.notesService.deleteNote(id);
  }
}
