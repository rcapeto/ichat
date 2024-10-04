import { FlatList } from "@/components/flat-list";
import { Button } from "@/components/ui/button";
import { InputSearch } from "@/components/ui/input";
import { useAlert } from "@/hooks/use-alert";
import { useChat } from "@/hooks/use-chat";
import { useAppDispatch } from "@/hooks/use-dispatch";
import { Messages } from "@/messages";
import { UserSession } from "@/services/http/entities/app/auth";
import { handleGetUsersChat } from "@/store/app/chat/requests";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { ChangeEvent, useEffect, useState } from "react";
import { UserRow } from "./UserRow";

export function AddNewUsers() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(0);

  const [users, setUsers] = useState<UserSession[]>([]);
  const { showSonnerError } = useAlert();
  const { requestUsers } = useChat();

  const dispatch = useAppDispatch();

  async function onEndReached() {
    await fetchData();
  }

  async function onClickSearchButton() {
    setUsers([]);
    await fetchData(true);
  }

  function changeInputValue(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  async function fetchData(buttonClicked?: boolean) {
    if (!buttonClicked && totalPages && page > totalPages) {
      return;
    }

    try {
      const response = await dispatch(
        handleGetUsersChat({ page: buttonClicked ? 1 : page, search })
      );
      const isSuccess = !handleGetUsersChat.rejected.match(response);

      if (!isSuccess) {
        throw new Error(response.error.message);
      }

      const {
        users: responseUsers,
        totalPages,
        page: responsePage,
      } = response.payload;

      const isFirstPage = page === 1;

      setTotalPages(totalPages);
      setPage(responsePage + 1);
      setUsers((prevState) => {
        const newValues = isFirstPage
          ? responseUsers
          : [...prevState, ...responseUsers];

        return newValues;
      });
    } catch (err) {
      const errorMessage =
        (err as Error)?.message || Messages.DEFAULT_ERROR_MESSAGE;

      showSonnerError(errorMessage);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <FlatList
      keyExtractor={(user) => user.id}
      data={users}
      renderItem={({ item: user }) => <UserRow user={user} />}
      onEndReached={onEndReached}
      scrollClassName="gap-3 px-6 pb-10"
      isLoading={requestUsers.loading}
      HeaderComponent={
        <div className="flex items-center gap-2 p-6">
          <InputSearch
            placeholder="Procure sua conversa..."
            value={search}
            onChange={changeInputValue}
          />
          <Button type="button" size="icon" onClick={onClickSearchButton}>
            <MagnifyingGlassIcon />
          </Button>
        </div>
      }
      EmptyComponent={
        <p className="text-xs mt-2">Nenhum resultado encontrado...</p>
      }
    />
  );
}
