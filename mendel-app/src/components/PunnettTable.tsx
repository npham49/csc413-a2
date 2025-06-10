function getGametes(gene: string): string[] {
  if (gene.length !== 4) return [];
  const [g1a, g1b, g2a, g2b] = gene;
  const g1 = [g1a, g1b]; // A/a
  const g2 = [g2a, g2b]; // B/b
  const gametes = [];
  for (const a of g1) {
    for (const b of g2) {
      gametes.push(`${a}${b}`);
    }
  }
  return gametes;
}

function getPhenotype(genotype: string): string {
  const aGene = genotype.slice(0, 2);
  const bGene = genotype.slice(2, 4);

  const shape = aGene === "aa" ? "constricted" : "inflated";
  const color = bGene === "bb" ? "green" : "yellow";

  return `${shape} ${color}`;
}

function PunnettTable({
  parent1,
  parent2,
}: {
  parent1: string;
  parent2: string;
}) {
  const rowGametes = getGametes(parent1);
  const colGametes = getGametes(parent2);

  if (rowGametes.length !== 4 || colGametes.length !== 4) {
    return (
      <div className="text-red-600">
        Each parent must have 4-letter gene (e.g. AaBb)
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-2">Punnett Square</h2>
      <table className="table-auto border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-400 w-20 h-12"></th>
            {colGametes.map((g, idx) => (
              <th
                key={idx}
                className="border border-gray-400 w-20 h-12 text-center"
              >
                {g}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rowGametes.map((rGamete, rowIdx) => (
            <tr key={rowIdx}>
              <th className="border border-gray-400 w-20 h-12 text-center">
                {rGamete}
              </th>
              {colGametes.map((cGamete, colIdx) => {
                const aAlleles = [rGamete[0], cGamete[0]].sort((a, b) =>
                  a === "A" ? -1 : 1
                );
                const bAlleles = [rGamete[1], cGamete[1]].sort((a, b) =>
                  a === "B" ? -1 : 1
                );
                const genotype = `${aAlleles.join("")}${bAlleles.join("")}`;
                const phenotype = getPhenotype(genotype);
                return (
                  <td
                    key={colIdx}
                    className="border border-gray-400 w-20 h-12 text-center text-xs"
                  >
                    {genotype}
                    <br />
                    <span className="text-gray-500">{phenotype}</span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default PunnettTable;