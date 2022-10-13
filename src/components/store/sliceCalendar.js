import { createSlice } from "@reduxjs/toolkit";


export const getCurrentDate = (requiredYear = null, requiredMonth = null, requiredData = 1) => (dispath) => {

    let date;

    if (requiredYear == null) {
        date = new Date();
    } else {
        date = new Date(requiredYear, requiredMonth, requiredData);
    }

    let data = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let countDeys = new Date(year, month + 1, 0).getDate();
    let dayNumber = new Date(year, month, 1).getDay();

    dispath(addCountDeys(countDeys));
    dispath(addDate({ year, month, data }));
    dispath(addDayNumber(dayNumber));
};

const sliceCalendar = createSlice({
    name: 'calendar',

    initialState: {
        countDays: '',
        date: {
            year: '',
            month: '',
            data: ''
        },
        dayNumber: '',
        highlightedCell: '',
        successfulInitialization: false,
    },

    reducers: {
        addCountDeys(state, action) {
            state.countDays = action.payload;
        },

        addDate(state, action) {
            state.date.year = action.payload.year;
            state.date.month = action.payload.month;
            state.date.data = action.payload.data;
            state.highlightedCell = action.payload.data;
        },

        addDayNumber(state, action) {
            state.dayNumber = (action.payload + 6) % 7;
        },

        highlightCell(state, action) {
            state.highlightedCell = action.payload;
        }
    }
});

export const { addCountDeys, addDate, addDayNumber, highlightCell } = sliceCalendar.actions;
export default sliceCalendar.reducer;
