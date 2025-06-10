// Next.js (app/page.tsx or pages/index.tsx depending on your structure)
"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:3001/events");

    eventSource.onmessage = (e) => {
      setLogs((prev) => [e.data, ...prev.slice(0, 49)]); // Keep last 50 entries
    };

    return () => eventSource.close();
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">RFID Reader Dashboard</h1>
      <div className="bg-gray-100 border p-4 rounded max-h-[80vh] overflow-y-scroll">
        {logs.map((log, idx) => (
          <div key={idx} className="text-sm font-mono text-gray-800">
            {log}
          </div>
        ))}
      </div>
    </main>
  );
}
