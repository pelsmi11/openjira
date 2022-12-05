interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
}

export const seedData: SeedData = {
  entries: [
    {
      description: "Pendiente: texto",
      createdAt: Date.now(),
      status: "pending",
    },
    {
      description: "in-Progress: mas texto",
      createdAt: Date.now() - 1000000,
      status: "in-progress",
    },
    {
      description: "Finished: esto es mucho texto",
      createdAt: Date.now() - 10000000,
      status: "finished",
    },
  ],
};
