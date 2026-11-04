"use client";

import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import { store } from "@/store/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchDynamicCatalog } from "@/store/catalogSlice";
import { hydratePrefs } from "@/store/uiSlice";

const STORAGE_KEY = "figuremint_prefs_v1";

function AntdThemeBridge({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const warmPaper = useAppSelector((s) => s.ui.warmPaper);
  const bookmarks = useAppSelector((s) => s.ui.bookmarks);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch(hydratePrefs(JSON.parse(raw)));
    } catch {
      /* Storage unavailable */
    }
    dispatch(fetchDynamicCatalog());
  }, [dispatch]);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-comfort",
      warmPaper ? "warm-paper" : "fresh-light"
    );
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ warmPaper, bookmarks }));
    } catch {
      /* Storage unavailable */
    }
  }, [warmPaper, bookmarks]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#10A37F",
          colorPrimaryHover: "#0D8A6A",
          colorInfo: "#10A37F",
          colorSuccess: "#10A37F",
          colorWarning: "#F5A524",
          colorError: "#C85A32",
          colorTextBase: "#222925",
          colorTextSecondary: "#525854",
          colorBgBase: warmPaper ? "#F4EFE6" : "#FAFAF7",
          colorBgContainer: warmPaper ? "#FAF6EE" : "#FFFFFF",
          colorBorder: warmPaper ? "#DDD4C3" : "#E4E4DC",
          borderRadius: 12,
          controlHeight: 48,
          fontSize: 16,
          boxShadow: "0 4px 16px rgba(34, 41, 37, 0.06)",
        },
        components: {
          Slider: {
            trackBg: "#10A37F",
            trackHoverBg: "#0D8A6A",
            handleColor: "#10A37F",
            handleActiveColor: "#0D8A6A",
            railBg: "#E4E4DC",
            railHoverBg: "#CECEC4",
            handleSize: 16,
            handleSizeHover: 18,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AntdRegistry>
        <AntdThemeBridge>{children}</AntdThemeBridge>
      </AntdRegistry>
    </Provider>
  );
}
