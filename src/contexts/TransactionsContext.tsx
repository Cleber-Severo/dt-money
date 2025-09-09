import { useCallback, useEffect, useState, type ReactNode } from "react";
import { api } from "../lib/axios";
import { createContext } from "use-context-selector";

interface Transaction {
  id: number;
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
  createdAt: string;
}

interface CreateTransactionInput {
  description: string;
  price: number;
  category: string;
  type: "income" | "outcome";
}

interface TransationContextType {
  transactions: Transaction[];
  fetchTransactions: (query?: string) => Promise<void>;
  createTransaction: (data: CreateTransactionInput) => Promise<void>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const TransactionsContext = createContext({} as TransationContextType);

interface TransactionsProviderProps {
  children: ReactNode;
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchTransactions = useCallback(async (query?: string) => {
    const response = await api.get("/transactions", {
      params: { _sort: "createdAt", _order: "desc", q: query },
    });

    setTransactions(response.data);
  }, []);

  const createTransaction = useCallback(async (data: CreateTransactionInput) => {
    const { category, description, price, type } = data;

    const response = await api.post("transactions", { category, description, price, type, createdAt: new Date() });

    setTransactions((prev) => [response.data, ...prev]);
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return (
    <TransactionsContext.Provider value={{ transactions, fetchTransactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}
