import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export function useProfileBio(initialBio: string = "") {
  const [editedBio, setEditedBio] = useState(initialBio);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const handleBioChange = (value: string) => {
    setEditedBio(value);
  };

  const handleSaveBio = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;

      const { error } = await supabase
        .from("profiles")
        .update({ bio: editedBio })
        .eq("id", session.user.id);

      if (error) throw error;

      setIsEditing(false);
      toast({
        title: "Success",
        description: "Bio updated successfully",
      });
    } catch (error) {
      console.error("Error updating bio:", error);
      toast({
        title: "Error",
        description: "Failed to update bio",
        variant: "destructive",
      });
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return {
    editedBio,
    isEditing,
    handleBioChange,
    handleSaveBio,
    toggleEdit,
  };
}