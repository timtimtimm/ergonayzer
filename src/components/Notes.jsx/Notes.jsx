import React from 'react';
import s from './Notes.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { addNewNote, deleteNote, togleCompleted, togleStatusEditNote, onSetEditNote } from '../store/sliceNotes';
import { useState } from 'react';

const Notes = () => {

    let { notesData, currentKey, statusEditNote } = useSelector(state => state.notes);
    // let currentKey = useSelector(state => state.notes.currentKey);

    let [textNote, setTextNote] = useState('');
    let [editId, seteditId] = useState('');

    const dispatch = useDispatch();

    const onAddNewNote = () => {
        if (textNote.trim().length) {
            dispatch(addNewNote({ key: currentKey, text: textNote }));
        }
        setTextNote('');
    };

    const onDeleteNote = (id) => {
        dispatch(deleteNote({ id, key: currentKey }));
    }

    const togleNoteComleted = (id) => {
        dispatch(togleCompleted({ id, key: currentKey }))
    }

    const editNote = (id) => {
        dispatch(togleStatusEditNote());
        notesData[currentKey].map(elem => {
            if (elem.id === id) {
                setTextNote(elem.text);
                seteditId(id)
            }
        });

    }

    const cancelEdit = () => {
        dispatch(togleStatusEditNote());
        setTextNote('');
    }

    const setEditNote = () => {
        dispatch(onSetEditNote({ key: currentKey, id: editId, text: textNote }));
        setTextNote('');
        dispatch(togleStatusEditNote());
    }


    let k = 0, notesList;

    if (notesData[currentKey]) {
        notesList = notesData[currentKey].map(elem => {
            k++;

            return <li key={k} id={elem.id} className={s.item}>
                <input type='checkbox' checked={elem.completed} onChange={() => togleNoteComleted(elem.id)}></input>
                <span onClick={() => editNote(elem.id)}> {elem.text}</span>
                <span className={s.delete} onClick={() => onDeleteNote(elem.id)} >&times;</span>
            </li>

        })
    };

    return (
        <div className={s.notes}>
            <h1>Записи</h1>
            <div className={s.redactor} >
                <input value={textNote} onChange={(e) => setTextNote(e.target.value)} />
                {statusEditNote ? <button onClick={() => setEditNote()}>Изменить</button>
                    : <button onClick={() => onAddNewNote()}>Добавить</button>}
                {statusEditNote ? <button onClick={() => cancelEdit()}>Отмена</button> : ''}

            </div>
            <ol>
                {notesList}
            </ol>
        </div>
    )
}

export default Notes;

