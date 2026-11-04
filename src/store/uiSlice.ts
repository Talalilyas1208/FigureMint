import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ScenarioPayload {
  slug: string;
  scenarioLabel: string;
  grossAmount: number;
  costAmount: number;
  feeAmount: number;
  netProfit: number;
  marginPct: number;
}

interface UiState {
  warmPaper: boolean;
  bookmarks: string[];
  savingScenario: boolean;
  lastSavedRef: string;
}

const initialState: UiState = {
  warmPaper: false,
  bookmarks: ["tiktok-shop-fee-calculator"],
  savingScenario: false,
  lastSavedRef: "",
};

export const postScenarioAsync = createAsyncThunk(
  "ui/postScenario",
  async (payload: ScenarioPayload): Promise<{ id: string; persisted: boolean }> => {
    const res = await fetch("/api/scenarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Unable to save scenario");
    return data;
  }
);

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    hydratePrefs(state, action: PayloadAction<{ warmPaper?: boolean; bookmarks?: string[] }>) {
      if (typeof action.payload.warmPaper === "boolean") state.warmPaper = action.payload.warmPaper;
      if (Array.isArray(action.payload.bookmarks)) state.bookmarks = action.payload.bookmarks.slice(0, 12);
    },
    toggleWarmPaper(state) {
      state.warmPaper = !state.warmPaper;
    },
    toggleBookmark(state, action: PayloadAction<string>) {
      const slug = action.payload;
      state.bookmarks = state.bookmarks.includes(slug)
        ? state.bookmarks.filter((item) => item !== slug)
        : [...state.bookmarks, slug];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postScenarioAsync.pending, (state) => {
        state.savingScenario = true;
      })
      .addCase(postScenarioAsync.fulfilled, (state, action) => {
        state.savingScenario = false;
        state.lastSavedRef = action.payload.id;
      })
      .addCase(postScenarioAsync.rejected, (state) => {
        state.savingScenario = false;
      });
  },
});

export const { hydratePrefs, toggleWarmPaper, toggleBookmark } = uiSlice.actions;
export const uiReducer = uiSlice.reducer;

