import { configureStore } from "@reduxjs/toolkit";
import sliceCalendar from './sliceCalendar';
import sliceNotes from './sliceNotes';

export default configureStore({
    reducer: {
        calendar: sliceCalendar,
        notes: sliceNotes,
    }
});

