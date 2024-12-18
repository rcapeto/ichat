import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UserAvatar } from "@/components/user-avatar";
import { useAccount } from "@/hooks/use-account";
import { cn } from "@/lib/utils";
import { Messages } from "@/messages";
import { AppLayout } from "@/pages/app/components/Layout";
import { isImageFile } from "@/utils/is-image-file";
import { joinWords } from "@/utils/join-words";
import { zodResolver } from "@hookform/resolvers/zod";
import { Cross2Icon } from "@radix-ui/react-icons";
import { ChangeEvent, useRef } from "react";
import { useForm } from "react-hook-form";
import { ProfileValues, validation } from "./validation";

export function ProfilePage() {
  const { session } = useAccount();
  const {
    email = "",
    firstName = "",
    lastName = "",
    profileImage = "",
  } = session ?? {};

  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const fullName = joinWords(firstName, lastName);
  const avatarFallback = `${firstName[0]}${lastName[0]}`;

  const form = useForm<ProfileValues>({
    defaultValues: {
      email: email,
      firstName: firstName,
      lastName: lastName,
      imagePreview: profileImage,
    },
    resolver: zodResolver(validation),
  });

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState,
    setError,
    clearErrors,
  } = form;

  async function onSubmit(values: ProfileValues) {
    console.log("@@ values", values);
  }

  function openFilePicker() {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  }

  function handleCleanInputPicker() {
    if (inputFileRef.current) {
      inputFileRef.current.value = "";

      setValue("imagePreview", "");
      setValue("imageFile", null);
      clearErrors("imageFile");
    }
  }

  function handleChooseFile(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;

    if (files && files[0]) {
      const file = files[0];

      if (isImageFile(file.type)) {
        setValue("imagePreview", URL.createObjectURL(file));
        setValue("imageFile", file);
        clearErrors("imageFile");
      } else {
        setError("imageFile", {
          message: Messages.INVALID_FILE_TYPE,
          type: "validate",
        });
      }
    }
  }

  const imagePreview = watch("imagePreview") ?? "";
  const imageFile = watch("imageFile");
  const filePickerError = formState.errors?.imageFile?.message;

  return (
    <AppLayout>
      <h2 className="text-2xl font-semibold">Meu perfil</h2>

      <div className="py-4 flex-1">
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <FormItem>
              <FormLabel
                className={cn(filePickerError ? "text-destructive" : "")}
              >
                Sua imagem
              </FormLabel>

              <div className="flex flex-col gap-2">
                <div className="relative">
                  <UserAvatar
                    className="size-28 cursor-pointer"
                    avatarImage={imagePreview}
                    fullName={fullName}
                    avatarFallback={avatarFallback}
                    title={imageFile?.name}
                    onClick={openFilePicker}
                  />

                  <Button
                    type="button"
                    className={cn(
                      "absolute top-0 left-0 bg-background text-sm size-7 rounded-full flex items-center justify-center shadow-md",
                      imagePreview ? "" : "hidden"
                    )}
                    variant="ghost"
                    size="icon"
                    onClick={handleCleanInputPicker}
                  >
                    <Cross2Icon />
                  </Button>
                </div>

                <span className="text-[0.8rem] font-medium text-destructive">
                  {filePickerError ?? ""}
                </span>
              </div>
            </FormItem>

            <FormField
              name="email"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Seu e-mail</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="seu-email@email.com.br"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="firstName"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Seu nome</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Seu nome" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="lastName"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Seu sobrenome</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Seu sobrenome" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Input
              type="file"
              hidden
              ref={inputFileRef}
              className="hidden"
              onChange={handleChooseFile}
              accept="image/*"
            />

            <Button type="submit" className="mt-3 self-end min-w-32" size="sm">
              Atualizar
            </Button>
          </form>
        </Form>
      </div>
    </AppLayout>
  );
}
