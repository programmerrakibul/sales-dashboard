import supabase from "../lib/supabase-client";

export const fetchMetrics = async () => {
  const res = await supabase.from("sales_deals").select(
    `
        name,
        value
        `,
  );

  console.log(res);
};
