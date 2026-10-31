import supabase from "../lib/supabase-client";

export const fetchMetrics = async (signal?: AbortSignal) => {
  const query = supabase.from("sales_deals").select(`
    name,
    value.sum()
  `);
  
  const { data, error } = await (signal ? query.abortSignal(signal) : query);

  if (error) throw error;

  return data;
};
