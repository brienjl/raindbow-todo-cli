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

//find a note by it's contents
export const findNotes = async (filter) => {
    const { notes } = await getDB()
    return notes.filter(note => note.content.toLowerCase().
    includes(filter.toLowerCase()))
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