"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore, type ReactNode } from "react";
import { createBrowserStore } from "@/lib/browser-store";
import { STORAGE_KEYS } from "@/lib/storage";
import type { StoredAccount, StoredOrder } from "@/lib/types";

const accountStore = createBrowserStore<StoredAccount | null>(STORAGE_KEYS.account, null);
const orderStore = createBrowserStore<StoredOrder[]>(STORAGE_KEYS.orders, []);

type AccountContextValue = {
  account: StoredAccount | null;
  orders: StoredOrder[];
  ready: boolean;
  login: (account: StoredAccount) => void;
  logout: () => void;
  addOrder: (order: StoredOrder) => void;
};

const AccountContext = createContext<AccountContextValue | null>(null);

export function AccountProvider({ children }: { children: ReactNode }) {
  const accountRaw = useSyncExternalStore(
    accountStore.subscribe,
    accountStore.snapshot,
    accountStore.getServerSnapshot,
  );
  const ordersRaw = useSyncExternalStore(
    orderStore.subscribe,
    orderStore.snapshot,
    orderStore.getServerSnapshot,
  );
  const account = useMemo(() => accountStore.parse(accountRaw), [accountRaw]);
  const orders = useMemo(() => orderStore.parse(ordersRaw), [ordersRaw]);

  const login = useCallback((next: StoredAccount) => {
    accountStore.set(next);
  }, []);

  const logout = useCallback(() => {
    accountStore.set(null);
  }, []);

  const addOrder = useCallback((order: StoredOrder) => {
    const current = orderStore.parse(orderStore.snapshot());
    orderStore.set([order, ...current]);
  }, []);

  const value = useMemo(
    () => ({ account, orders, ready: true, login, logout, addOrder }),
    [account, orders, login, logout, addOrder],
  );

  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
}

export function useAccount(): AccountContextValue {
  const ctx = useContext(AccountContext);
  if (!ctx) {
    throw new Error("useAccount moet binnen AccountProvider.");
  }
  return ctx;
}
