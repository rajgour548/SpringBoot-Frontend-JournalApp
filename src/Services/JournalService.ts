
import api from "../Services/api";



export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  date: string | null;
  sentiment: "POSITIVE" | "NEUTRAL" | "NEGATIVE" | null;
  emotions: string[] | null;
}



export const getJournals = async (): Promise<JournalEntry[]> => {
  try{
  const res = await api.get("/journal");
  return res.data;
  }catch (err: any) {
    // Optional: show error to user
    console.error("an Error occured:", err.message);
    throw err; // important: still throw so interceptor can handle logout
  }
};

export const createJournal = async (
  entry: Pick<JournalEntry, "title" | "content">
) => {
  try{
  const res = await api.post("/journal", entry);
  return res.data;
  }catch (err: any) {
    // Optional: show error to user
    console.error("an Error occured:", err.message);
    throw err; // important: still throw so interceptor can handle logout
  }
};

export const updateJournal = async (
  id: string,
  entry: Partial<JournalEntry>
) => {try{
  const res = await api.put(`/journal/id/${id}`, entry);
  return res.data;
}catch (err: any) {
    // Optional: show error to user
    console.error("an Error occured:", err.message);
    throw err; // important: still throw so interceptor can handle logout
  }
};

export const deleteJournal = async (id: string) => {
  try{
  await api.delete(`/journal/id/${id}`);
  }catch (err: any) {
    // Optional: show error to user
    console.error("an Error occured:", err.message);
    throw err; // important: still throw so interceptor can handle logout
  }
};
