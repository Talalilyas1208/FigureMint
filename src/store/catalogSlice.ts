import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CALCULATORS, type CalculatorItem } from "@/data/calculators";

interface CatalogState {
  items: CalculatorItem[];
  source: string;
  status: "idle" | "loading" | "synced";
}

const initialState: CatalogState = {
  items: CALCULATORS,
  source: "seed-catalog",
  status: "idle",
};

export const fetchDynamicCatalog = createAsyncThunk(
  "catalog/fetchDynamic",
  async (): Promise<{ items: CalculatorItem[]; source: string }> => {
    const res = await fetch("/api/calculators", { method: "GET" });
    if (!res.ok) throw new Error("Catalog sync unavailable");
    return res.json();
  }
);

const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDynamicCatalog.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDynamicCatalog.fulfilled, (state, action) => {
        if (Array.isArray(action.payload.items) && action.payload.items.length > 0) {
          state.items = action.payload.items;
          state.source = action.payload.source || "supabase";
        }
        state.status = "synced";
      })
      .addCase(fetchDynamicCatalog.rejected, (state) => {
        state.status = "synced";
      });
  },
});

export const catalogReducer = catalogSlice.reducer;

