"use client";

import React, { useState, useMemo } from "react";
// import {
//   Search,
//   ChevronLeft,
//   ChevronRight,
//   CheckSquare,
//   Square,
//   ArrowUpDown,
// } from "lucide-react";

export interface TableColumn<T> {
  key: string;
  header: string;
  render?: (row: T, index: number) => React.ReactNode;
  sortable?: boolean;
  className?: string;
  align?: "left" | "center" | "right";
}

export type Column<T> = TableColumn<T>;

export interface TableTab {
  id: string;
  label: string;
  count?: number;
}

export interface AdminTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  keyExtractor?: (row: T) => string;
  keyField?: string;
  searchPlaceholder?: string;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  tabs?: TableTab[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  onRowClick?: (row: T) => void;
  batchActions?: {
    label: string;
    icon?: React.ElementType | React.ReactNode | any;
    variant?: "default" | "danger" | "destructive" | string;
    onClick: (selectedKeys: string[]) => void;
  }[];
  actions?: React.ReactNode;
  emptyState?: {
    title: string;
    description: string;
    action?: React.ReactNode;
  };
  pageSize?: number;
}

export function AdminTable<T extends Record<string, any>>({
  columns,
  data,
  keyExtractor,
  keyField,
  searchPlaceholder = "Search records...",
  searchQuery,
  onSearchChange,
  tabs,
  activeTab,
  onTabChange,
  onRowClick,
  batchActions = [],
  actions,
  emptyState = {
    title: "No records found",
    description: "Try adjusting your filters or search query to find what you're looking for.",
  },
  pageSize = 10,
}: AdminTableProps<T>) {
  const [internalSearch, setInternalSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const getRowKey = (row: T): string => {
    if (keyExtractor) return keyExtractor(row);
    if (keyField) return String(row[keyField] ?? "");
    return String(row.id ?? "");
  };

  // Handle Search
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInternalSearch(val);
    setCurrentPage(1);
    if (onSearchChange) onSearchChange(val);
  };

  // Filter and Sort Data
  const filteredData = useMemo(() => {
    let result = [...data];

    // Local filter if onSearchChange not provided
    if (!onSearchChange && internalSearch.trim()) {
      const q = internalSearch.toLowerCase();
      result = result.filter((row) =>
        Object.values(row).some((val) =>
          typeof val === "string" || typeof val === "number"
            ? String(val).toLowerCase().includes(q)
            : false
        )
      );
    }

    // Sort
    if (sortKey) {
      result.sort((a, b) => {
        const valA = a[sortKey];
        const valB = b[sortKey];
        if (valA === valB) return 0;
        if (valA === undefined || valA === null) return 1;
        if (valB === undefined || valB === null) return -1;

        const compare = String(valA).localeCompare(String(valB), undefined, {
          numeric: true,
        });
        return sortOrder === "asc" ? compare : -compare;
      });
    }

    return result;
  }, [data, internalSearch, onSearchChange, sortKey, sortOrder]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  // Selection
  const allCurrentSelected =
    paginatedData.length > 0 &&
    paginatedData.every((row) => selectedKeys.includes(getRowKey(row)));

  const handleToggleAll = () => {
    if (allCurrentSelected) {
      const currentKeys = paginatedData.map(getRowKey);
      setSelectedKeys(selectedKeys.filter((k) => !currentKeys.includes(k)));
    } else {
      const newKeys = new Set([...selectedKeys, ...paginatedData.map(getRowKey)]);
      setSelectedKeys(Array.from(newKeys));
    }
  };

  const handleToggleRow = (key: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedKeys.includes(key)) {
      setSelectedKeys(selectedKeys.filter((k) => k !== key));
    } else {
      setSelectedKeys([...selectedKeys, key]);
    }
  };

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      {/* Top Filter & Action Bar */}
      <div className="flex flex-col justify-between gap-4 border-b border-border p-4 sm:flex-row sm:items-center">
        {/* Search Input */}
        <div className="relative max-w-md flex-1">
          {/* <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /> */}
          <input
            type="text"
            value={searchQuery !== undefined ? searchQuery : internalSearch}
            onChange={handleSearchInput}
            placeholder={searchPlaceholder}
            className="w-full rounded-lg border border-border bg-muted/60 py-2 pl-9 pr-4 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Custom Header Actions */}
        <div className="flex items-center gap-2">{actions}</div>
      </div>

      {/* Tabs Row (If provided) */}
      {tabs && tabs.length > 0 && (
        <div className="scrollbar-none flex items-center gap-1 overflow-x-auto border-b border-border px-4">
          {tabs.map((tab) => {
            const isTabActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  if (onTabChange) onTabChange(tab.id);
                  setCurrentPage(1);
                }}
                className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-3 py-2.5 text-sm font-medium transition-colors ${
                  isTabActive
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`rounded-md px-1.5 py-0.5 text-[11px] font-semibold tabular-nums ${
                      isTabActive
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Batch Actions Toolbar */}
      {selectedKeys.length > 0 && (
        <div className="animate-in fade-in slide-in-from-top-1 flex items-center justify-between gap-4 border-b border-primary/20 bg-primary/5 px-4 py-2.5 duration-200">
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <span>{selectedKeys.length} selected</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {batchActions.map((action, idx) => {
              const ActionIcon = action.icon;
              return (
                <button
                  key={idx}
                  onClick={() => action.onClick(selectedKeys)}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                    action.variant === "danger" || action.variant === "destructive"
                      ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      : "bg-foreground text-background hover:bg-foreground/90"
                  }`}
                >
                  {ActionIcon && (typeof ActionIcon === "function" || typeof ActionIcon === "object" ? <ActionIcon className="w-3.5 h-3.5" /> : ActionIcon)}
                  <span>{action.label}</span>
                </button>
              );
            })}
            <button
              onClick={() => setSelectedKeys([])}
              className="rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Table Content */}
      <div className="flex-1 overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {batchActions.length > 0 && (
                <th className="w-10 px-4 py-3 text-center">
                  <button
                    onClick={handleToggleAll}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                    aria-label="Select all"
                  >
                    {allCurrentSelected ? (
                      <span className="text-primary">☑</span>
                    ) : (
                      <span>☐</span>
                    )}
                  </button>
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 py-3 font-medium ${col.className || ""}`}
                  onClick={() => (col.sortable ? handleSort(col.key) : undefined)}
                >
                  <div
                    className={`flex items-center gap-1.5 ${
                      col.align === "right"
                        ? "justify-end"
                        : col.align === "center"
                          ? "justify-center"
                          : ""
                    } ${col.sortable ? "cursor-pointer select-none transition-colors hover:text-foreground" : ""}`}
                  >
                    <span>{col.header}</span>
                    {col.sortable && (
                      <span className={`h-3 w-3 ${
                          sortKey === col.key
                            ? "text-primary"
                            : "text-slate-300 dark:text-slate-600"
                        }`}
                      >↕</span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginatedData.length > 0 ? (
              paginatedData.map((row, idx) => {
                const rowKey = getRowKey(row);
                const isSelected = selectedKeys.includes(rowKey);

                return (
                  <tr
                    key={rowKey}
                    onClick={() => (onRowClick ? onRowClick(row) : undefined)}
                    className={`transition-colors ${
                      onRowClick ? "cursor-pointer hover:bg-muted/50" : ""
                    } ${isSelected ? "bg-primary/5" : ""}`}
                  >
                    {batchActions.length > 0 && (
                      <td className="w-10 px-4 py-3 text-center" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={(e) => handleToggleRow(rowKey, e)}
                          className="text-muted-foreground transition-colors hover:text-foreground"
                          aria-label="Select row"
                        >
                          {isSelected ? (
                            <span className="text-primary">☑</span>
                          ) : (
                            <span>☐</span>
                          )}
                        </button>
                      </td>
                    )}
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className={`px-4 py-3 text-foreground ${
                          col.align === "right"
                            ? "text-right"
                            : col.align === "center"
                              ? "text-center"
                              : ""
                        } ${col.className || ""}`}
                      >
                        {col.render ? col.render(row, idx) : row[col.key]}
                      </td>
                    ))}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={columns.length + (batchActions.length > 0 ? 1 : 0)} className="px-4 py-14 text-center">
                  <div className="mx-auto max-w-xs space-y-1.5">
                    <p className="text-sm font-semibold text-foreground">
                      {emptyState.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {emptyState.description}
                    </p>
                    {emptyState.action && <div className="pt-2">{emptyState.action}</div>}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Bar */}
      {filteredData.length > 0 && (
        <div className="flex flex-col items-center justify-between gap-3 border-t border-border p-3.5 text-xs sm:flex-row">
          <span className="text-muted-foreground">
            Showing <strong className="font-semibold text-foreground">{(currentPage - 1) * pageSize + 1}</strong> to{" "}
            <strong className="font-semibold text-foreground">
              {Math.min(currentPage * pageSize, filteredData.length)}
            </strong>{" "}
            of <strong className="font-semibold text-foreground">{filteredData.length}</strong> entries
          </span>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="rounded-lg border border-border bg-background p-1.5 transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
              aria-label="Previous page"
            >
              {/* <ChevronLeft className="h-4 w-4" /> */}
              <span>←</span>
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum = i + 1;
              if (totalPages > 5 && currentPage > 3) {
                pageNum = currentPage - 2 + i;
                if (pageNum > totalPages) pageNum = totalPages - (4 - i);
              }
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`h-7 w-7 rounded-lg text-xs font-medium transition-colors ${
                    currentPage === pageNum
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-background text-foreground hover:bg-muted"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="rounded-lg border border-border bg-background p-1.5 transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
              aria-label="Next page"
            >
              {/* <ChevronRight className="h-4 w-4" /> */}
              <span>→</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
