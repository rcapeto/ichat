import { FlatList } from "@/components/flat-list";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { InputSearch } from "../ui/input";
import { AddNewUsersProps } from "./types";

export function AddNewUsers({ onClose }: AddNewUsersProps) {
  const [search, setSearch] = useState("");

  return (
    <FlatList
      keyExtractor={(data) => String(data)}
      data={Array.from({ length: 100 })}
      renderItem={({ index }) => <h1>index{index}</h1>}
      HeaderComponent={() => (
        <InputSearch
          value={search}
          placeholder="Procure sua conversa..."
          onChange={(event) => setSearch(event.target.value)}
        />
      )}
      FooterComponent={() => (
        <div className="flex items-center gap-1 justify-end mt-auto">
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
          <Button>Adicionar</Button>
        </div>
      )}
    />
  );
}
