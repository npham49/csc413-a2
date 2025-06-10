"use client";

import { useEffect, useState } from "react";

interface TagData {
  gene: string;
  shape: string;
  color: string;
  object: string;
}

export default function Home() {
  const [reader0, setReader0] = useState<TagData>({
    gene: "",
    shape: "",
    color: "",
    object: "",
  });
  const [reader1, setReader1] = useState<TagData>({
    gene: "",
    shape: "",
    color: "",
    object: "",
  });
  const [lastReader, setLastReader] = useState<0 | 1 | null>(null);

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:3001/events");

    eventSource.onmessage = (e) => {
      const message = e.data;

      // Track which reader the message belongs to
      if (message.includes("Reader 0")) setLastReader(0);
      else if (message.includes("Reader 1")) setLastReader(1);

      if (lastReader === null) return;

      // Match Gene
      const geneMatch = message.match(/Gene:\s*(\w+)/);
      if (geneMatch) {
        const gene = geneMatch[1];
        if (lastReader === 0) {
          setReader0((prev) => ({ ...prev, gene: prev.gene + gene }));
        } else {
          setReader1((prev) => ({ ...prev, gene: prev.gene + gene }));
        }
      }

      // Match Shape
      const shapeMatch = message.match(/Shape:\s*(\w+)/);
      if (shapeMatch) {
        const shape = shapeMatch[1];
        if (lastReader === 0) {
          setReader0((prev) => ({ ...prev, shape }));
        } else {
          setReader1((prev) => ({ ...prev, shape }));
        }
      }

      // Match Color
      const colorMatch = message.match(/Color:\s*(\w+)/);
      if (colorMatch) {
        const color = colorMatch[1];
        if (lastReader === 0) {
          setReader0((prev) => ({ ...prev, color }));
        } else {
          setReader1((prev) => ({ ...prev, color }));
        }
      }

      const objectMatch = message.match(/Object:\s*(\w+)/);
      if (objectMatch) {
        const object = objectMatch[1];
        if (lastReader === 0) {
          setReader0((prev) => ({ ...prev, object }));
        } else {
          setReader1((prev) => ({ ...prev, object }));
        }
      }
    };

    return () => eventSource.close();
  }, [lastReader]);

  return (
    <main className="p-6">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-2xl font-bold mb-4">Mendel Dashboard</h1>
        <h1 className="text-3xl font-mono text-white-800">
          Object: {reader0.object || reader1.object || "Waiting..."}
        </h1>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Reader 0 */}
        <div className="bg-white border rounded p-4">
          <h2 className="text-lg font-semibold mb-2 text-blue-600">Parent 1</h2>
          <p className="text-xl font-mono text-gray-800">
            Gene: {reader0.gene || "Waiting..."}
          </p>
          <p className="text-xl font-mono text-gray-800">
            Shape: {reader0.shape || "Waiting..."}
          </p>
          <p className="text-xl font-mono text-gray-800">
            Color: {reader0.color || "Waiting..."}
          </p>
        </div>

        {/* Reader 1 */}
        <div className="bg-white border rounded p-4">
          <h2 className="text-lg font-semibold mb-2 text-green-600">
            Parent 2
          </h2>
          <p className="text-xl font-mono text-gray-800">
            Gene: {reader1.gene || "Waiting..."}
          </p>
          <p className="text-xl font-mono text-gray-800">
            Shape: {reader1.shape || "Waiting..."}
          </p>
          <p className="text-xl font-mono text-gray-800">
            Color: {reader1.color || "Waiting..."}
          </p>
        </div>
      </div>
    </main>
  );
}
