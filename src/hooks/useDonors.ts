import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Donor } from "@/lib/constants";

export const useDonors = () => {
  return useQuery({
    queryKey: ["donors"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("donors")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Donor[];
    },
  });
};

export const useDeleteDonor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("donors").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["donors"] }),
  });
};

export const useUpdateDonor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...data }: Partial<Donor> & { id: string }) => {
      const { error } = await supabase.from("donors").update(data).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["donors"] }),
  });
};
