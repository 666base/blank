import { supabase } from '../lib/supabase';
import type { Note } from '../types/note';
import * as notesService from './notes';

// Push a single note to Supabase
export async function pushNote(note: Note) {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData?.user) return; // Only sync if authenticated

  const { error } = await supabase
    .from('notes')
    .upsert({
      id: note.id,
      user_id: userData.user.id,
      title: note.title,
      content: note.content,
      updated_at: new Date(note.modified).toISOString(),
    }, { onConflict: 'id,user_id' }); // Assuming composite key or just id depending on schema

  if (error) {
    console.error('Failed to push note to Supabase:', error);
    throw error;
  }
}

// Pull all notes from Supabase and save them locally
export async function pullNotes() {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData?.user) return;

  const { data: cloudNotes, error } = await supabase
    .from('notes')
    .select('*')
    .eq('user_id', userData.user.id);

  if (error) {
    console.error('Failed to pull notes from Supabase:', error);
    throw error;
  }

  if (cloudNotes) {
    for (const cloudNote of cloudNotes) {
      // Save locally using existing service. This will create or update it.
      await notesService.saveNote(cloudNote.id, cloudNote.content);
    }
  }
}

// Delete a note from Supabase
export async function deleteNote(id: string) {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData?.user) return;

  const { error } = await supabase
    .from('notes')
    .delete()
    .eq('id', id)
    .eq('user_id', userData.user.id);

  if (error) {
    console.error('Failed to delete note from Supabase:', error);
    throw error;
  }
}
