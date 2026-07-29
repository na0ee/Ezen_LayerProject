const PERFUME_RECORDS_STORAGE_KEY = "layer-perfume-records";

export function toDateKey({ year, month, day }) {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function loadPerfumeRecords() {
  try {
    const records = JSON.parse(
      localStorage.getItem(PERFUME_RECORDS_STORAGE_KEY) ?? "[]",
    );
    return Array.isArray(records) ? records : [];
  } catch {
    return [];
  }
}

export function addPerfumeRecord(record) {
  const records = loadPerfumeRecords();
  const nextRecords = [
    {
      ...record,
      id: `record-${Date.now()}`,
      createdAt: Date.now(),
    },
    ...records,
  ];
  localStorage.setItem(
    PERFUME_RECORDS_STORAGE_KEY,
    JSON.stringify(nextRecords),
  );
  return nextRecords;
}
