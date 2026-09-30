"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

export function RecordTable({ records, columns, statusKey = "status", detailHref, actionLabel, onAction, searchPlaceholder = "Search records" }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All statuses");

  const statuses = useMemo(() => [...new Set(records.map((record) => record[statusKey]).filter(Boolean))], [records, statusKey]);
  const filteredRecords = useMemo(() => records.filter((record) => {
    const matchesQuery = Object.values(record).some((value) => String(value).toLowerCase().includes(query.toLowerCase()));
    return matchesQuery && (status === "All statuses" || record[statusKey] === status);
  }), [records, query, status, statusKey]);

  return (
    <div className="recordTable">
      <div className="recordToolbar">
        <label className="recordSearch">
          <Search size={16} aria-hidden="true" />
          <input className="input" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={searchPlaceholder} aria-label={searchPlaceholder} />
        </label>
        <select className="select recordStatus" value={status} onChange={(event) => setStatus(event.target.value)} aria-label="Filter by status">
          <option>All statuses</option>
          {statuses.map((item) => <option key={item}>{item}</option>)}
        </select>
        <span className="recordCount">{filteredRecords.length} of {records.length} records</span>
      </div>
      <div className="table-shell">
        <table>
          <thead><tr>{columns.map((column) => <th key={column.key}>{column.label}</th>)}{(detailHref || onAction) ? <th><span className="srOnly">Actions</span></th> : null}</tr></thead>
          <tbody>
            {filteredRecords.map((record) => (
              <tr key={record.id}>
                {columns.map((column, index) => (
                  <td key={column.key}>
                    {index === 0 && detailHref ? <Link className="recordLink" href={detailHref(record)}>{record[column.key]}</Link> : record[column.key]}
                  </td>
                ))}
                {(detailHref || onAction) ? (
                  <td className="recordActions">
                    {detailHref ? <Link className="btn btn-ghost" href={detailHref(record)}>Details</Link> : null}
                    {onAction && actionLabel(record) ? <button className="btn btn-secondary" onClick={() => onAction(record)}>{actionLabel(record)}</button> : null}
                  </td>
                ) : null}
              </tr>
            ))}
            {filteredRecords.length === 0 ? <tr><td colSpan={columns.length + 1} className="recordEmpty">No records match this view.</td></tr> : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}