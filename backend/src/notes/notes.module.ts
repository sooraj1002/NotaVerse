import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { JwtStrategy } from 'src/auth/strategy';
import { NotesController } from './notes.controller';

@Module({
  providers: [NotesService, JwtStrategy],
  controllers: [NotesController],
})
export class NotesModule {}
