import { createSlice } from "@reduxjs/toolkit";

function isEmpty(obj) {
    for (var key in obj) {
        return false;
    }
    return true;
}

let obj = JSON.parse(localStorage.getItem("myState"));
if (isEmpty(obj)) {
    obj = {};
}

const sliceNotes = createSlice({
    name: 'notes',

    initialState: {
        notesData: obj,
        currentKey: '',
        statusEditNote: false

    },

    reducers: {
        addNewNote(state, action) {
            if (!state.notesData[action.payload.key]) {
                state.notesData[action.payload.key] = [];
            }
            state.notesData[action.payload.key]
                .push({ id: new Date().toISOString(), text: action.payload.text, completed: false });
            localStorage.setItem("myState", JSON.stringify(state.notesData));
        },

        addCurentKey(state, action) {
            state.currentKey = action.payload;
        },

        deleteNote(state, action) {
            state.notesData[action.payload.key] = state.notesData[action.payload.key].filter(
                elem => elem.id !== action.payload.id);
            if (!state.notesData[action.payload.key].length) {
                delete state.notesData[action.payload.key];
            }
            localStorage.setItem("myState", JSON.stringify(state.notesData));
        },

        togleCompleted(state, action) {
            state.notesData[action.payload.key] = state.notesData[action.payload.key].map(
                elem => {
                    if (elem.id === action.payload.id) {
                        elem.completed = !elem.completed;
                    }
                    return elem;
                }
            );
            localStorage.setItem("myState", JSON.stringify(state.notesData));
        },

        togleStatusEditNote(state, action) {
            state.statusEditNote = !state.statusEditNote;
        },

        onSetEditNote(state, action) {
            state.notesData[action.payload.key].map(elem => {
                if (elem.id === action.payload.id) {
                    elem.text = action.payload.text;
                }
            });
            localStorage.setItem("myState", JSON.stringify(state.notesData));
        }
    }
});

export const { addNewNote, addCurentKey, deleteNote, togleCompleted, togleStatusEditNote, onSetEditNote } = sliceNotes.actions;
export default sliceNotes.reducer;
