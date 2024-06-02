import { insertDB, saveDB, getDB } from './db.js'

//create new note and save to db
export const newNote = async (note, tags) => {
    const newNote = {
        tags,
        id: Date.now(),
        content: note,

    }
    await insertDB(newNote)
    return newNote
}

//get all notes from db
export const getAllNotes = async () => {
    const {notes} = await getDB()
    return notes
}

// Find a note by its contents with a minimum of three letters
export const findNotes = async (filter) => {
    if (filter.length < 3) {
        return "The filter length should be greater than 3.";
    }

    const { notes } = await getDB();
    const filteredNotes = notes.filter(note => {
        const content = note.content.toLowerCase();
        const filterLowerCase = filter.toLowerCase();
        return content.includes(filterLowerCase);
    });
    return filteredNotes;
}

//remove a note
export const removeNote = async (id) => {
    const notes = await getAllNotes()
    const match = notes.find(note => note.id === id)

    if (match) {
        const newNotes = notes.filter(note => note.id !== id)
        await saveDB({ notes: newNotes })
        return id
    }
}

//remove all notes
export const removeAllNotes = () => saveDB({ notes: [] })