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
import { Input, InputPassword } from "@/components/ui/input";
import {
  RegisterFormValues,
  registerValidation,
} from "@/pages/auth/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function Register() {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerValidation),
  });

  const { handleSubmit, control, watch } = form;

  async function onSubmit(values: RegisterFormValues) {
    console.log("@@ values", values);
  }

  const password = watch("password") ?? "";

  return (
    <div className="mt-3 flex flex-col gap-4">
      <h3 className="text-2xl">Criar nova conta</h3>

      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 overflow-auto flex-1 mh-90%"
        >
          <div className="flex items-center gap-3 w-full">
            <FormField
              name="firstName"
              control={control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Nome" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="lastName"
              control={control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Sobrenome</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Sobrenome" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            name="email"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="exemplo@email.com.br"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="password"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sua senha</FormLabel>
                <FormControl>
                  <InputPassword
                    {...field}
                    type="password"
                    placeholder="sua senha secreta"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <HelperPassword password={password} />

          <FormField
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirme sua senha</FormLabel>
                <FormControl>
                  <InputPassword
                    {...field}
                    type="password"
                    placeholder="confirme senha secreta"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="mt-3">
            Entrar
          </Button>
        </form>
      </Form>
    </div>
  );
}
