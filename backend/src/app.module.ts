import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { NotesService } from './notes/notes.service';
import { NotesController } from './notes/notes.controller';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { NotesModule } from './notes/notes.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env',
      isGlobal: true,
    }),
    UserModule,
    NotesModule,
    AuthModule,
    PrismaModule,
  ],
  controllers: [AppController, NotesController],
  providers: [AppService, NotesService],
})
export class AppModule {}
