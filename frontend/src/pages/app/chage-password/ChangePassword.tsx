import { HelperPassword } from "@/components/helper-password";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { InputPassword } from "@/components/ui/input";
import { AppLayout } from "@/pages/app/components/Layout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ChangePasswordValues, validation } from "./validation";

export function ChangePasswordPage() {
  const form = useForm<ChangePasswordValues>({
    defaultValues: {
      newPassword: "",
      password: "",
    },
    resolver: zodResolver(validation),
  });

  const { handleSubmit, control, watch } = form;

  async function onSubmit(values: ChangePasswordValues) {
    console.log("@@ values", values);
  }

  const newPassword = watch("newPassword");

  return (
    <AppLayout>
      <h2 className="text-2xl font-semibold">Alterar senha</h2>

      <div className="py-4 flex-1">
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <FormField
              name="password"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha atual</FormLabel>
                  <FormControl>
                    <InputPassword {...field} placeholder="Sua senha atual" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="newPassword"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nova senha</FormLabel>
                  <FormControl>
                    <InputPassword
                      {...field}
                      placeholder="Sua senha super secreta"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <HelperPassword password={newPassword} />

            <Button type="submit" className="mt-3 self-end min-w-32" size="sm">
              Alterar senha
            </Button>
          </form>
        </Form>
      </div>
    </AppLayout>
  );
}
