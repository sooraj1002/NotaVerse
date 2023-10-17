import { Injectable } from '@nestjs/common';
import notes from 'data/notes';

@Injectable()
export class NotesService {
  allNotes() {
    return notes;
  }

  singleNote(id: string) {
    return notes.find((note) => note.id === id);
  }
}
