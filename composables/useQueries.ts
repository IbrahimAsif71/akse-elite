import { useSupabase } from "~/lib/supabase";

export interface Query {
  id: string;
  source: "commercial" | "contact";
  name: string;
  email: string;
  company?: string | null;
  space_type?: string | null;
  message: string;
  submitted_at: string; // ISO string from DB
  read: boolean;
}

export type NewQuery = Omit<Query, "id" | "submitted_at" | "read">;

export function useQueries() {
  async function getAll(): Promise<Query[]> {
    if (import.meta.server) return [];
    const sb = useSupabase();
    const { data, error } = await sb
      .from("queries")
      .select("*")
      .order("submitted_at", { ascending: false });

    if (error) {
      console.error("[useQueries] getAll error:", error.message);
      return [];
    }
    return (data as Query[]) ?? [];
  }

  async function save(query: NewQuery): Promise<Query | null> {
    if (import.meta.server) return null;
    const sb = useSupabase();
    const { data, error } = await sb
      .from("queries")
      .insert([
        {
          source: query.source,
          name: query.name,
          email: query.email,
          company: query.company ?? null,
          space_type: query.space_type ?? null,
          message: query.message,
          read: false,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("[useQueries] save error:", error.message);
      return null;
    }
    return data as Query;
  }

  async function markRead(id: string): Promise<void> {
    if (import.meta.server) return;
    const sb = useSupabase();
    const { error } = await sb
      .from("queries")
      .update({ read: true })
      .eq("id", id);

    if (error) {
      console.error("[useQueries] markRead error:", error.message);
    }
  }

  async function markAllRead(): Promise<void> {
    if (import.meta.server) return;
    const sb = useSupabase();
    const { error } = await sb
      .from("queries")
      .update({ read: true })
      .eq("read", false);

    if (error) {
      console.error("[useQueries] markAllRead error:", error.message);
    }
  }

  async function deleteQuery(id: string): Promise<void> {
    if (import.meta.server) return;
    const sb = useSupabase();
    const { error } = await sb.from("queries").delete().eq("id", id);

    if (error) {
      console.error("[useQueries] deleteQuery error:", error.message);
    }
  }

  async function unreadCount(): Promise<number> {
    if (import.meta.server) return 0;
    const sb = useSupabase();
    const { count, error } = await sb
      .from("queries")
      .select("*", { count: "exact", head: true })
      .eq("read", false);

    if (error) {
      console.error("[useQueries] unreadCount error:", error.message);
      return 0;
    }
    return count ?? 0;
  }

  return { getAll, save, markRead, markAllRead, deleteQuery, unreadCount };
}
