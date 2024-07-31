import { configureStore } from "@reduxjs/toolkit";
import statisticSlice from "./slices/statisticSlice.js";
import messagesSlice from "./slices/messagesSlice.js";
import iconsSlice from "./slices/iconsSlice.js";
import regFormSlice from "./slices/regFormSlice.js";
import signFormSlice from "./slices/signFormSlice.js";

export const store = configureStore({
  reducer: {
    statistic: statisticSlice,
    messages: messagesSlice,
    icons: iconsSlice,
    regForm: regFormSlice,
    signForm: signFormSlice,
  },
});

export default store;
