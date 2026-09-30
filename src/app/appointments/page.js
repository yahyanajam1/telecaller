"use client";

import { useState } from "react";
import { AppShell, SectionCard, StatGrid } from "@/components/app-shell";
import { RecordTable } from "@/components/record-table";

const initialAppointments = [
  { id: "maya-chen", project: "Harbor Loft", lead: "Maya Chen", time: "Today, 10:30", status: "Confirmed" },
  { id: "jordan-alvarez", project: "Cedar Residences", lead: "Jordan Alvarez", time: "Today, 13:00", status: "Pending" },
  { id: "elena-brooks", project: "Northline Tower", lead: "Elena Brooks", time: "Tomorrow, 16:15", status: "Reminded" },
];

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState(initialAppointments);

  return (
    <AppShell title="Appointments" subtitle="Visits and scheduling" breadcrumb={["Workspace", "Appointments"]}>
      <StatGrid items={[
        { value: appointments.length, label: "Upcoming visits", change: "Next 48 hours" },
        { value: appointments.filter((item) => item.status === "Confirmed").length, label: "Confirmed", change: "Ready for guests" },
        { value: appointments.filter((item) => item.status === "Pending").length, label: "Needs confirmation", change: "Follow up today" },
        { value: "96%", label: "Show rate", change: "+3% this month" },
      ]} />
      <SectionCard title="Upcoming visits" subtitle="Confirm, remind, or complete scheduled appointments">
        <RecordTable
          records={appointments}
          columns={[{ key: "project", label: "Project" }, { key: "lead", label: "Lead" }, { key: "time", label: "Time" }, { key: "status", label: "Status" }]}
          searchPlaceholder="Search appointments"
          actionLabel={(appointment) => appointment.status === "Pending" ? "Confirm" : appointment.status === "Confirmed" ? "Mark visited" : null}
          onAction={(selected) => setAppointments((current) => current.map((appointment) => appointment.id === selected.id ? { ...appointment, status: appointment.status === "Pending" ? "Confirmed" : "Completed" } : appointment))}
        />
      </SectionCard>
      <SectionCard title="Calendar" subtitle="Daily and weekly scheduling views">
        <p>Today: {appointments.filter((item) => item.time.startsWith("Today")).length} visits scheduled. Tomorrow: {appointments.filter((item) => item.time.startsWith("Tomorrow")).length} visit scheduled.</p>
      </SectionCard>
    </AppShell>
  );
}
