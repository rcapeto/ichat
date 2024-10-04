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
import { useAccount } from "@/hooks/use-account";
import { LoginFormValues, loginValidation } from "@/pages/auth/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function Login() {
  const { login } = useAccount();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginValidation),
  });

  const { handleSubmit, control } = form;

  async function onSubmit(values: LoginFormValues) {
    await login({
      email: values.email,
      password: values.password,
    });
  }

  return (
    <div className="mt-3 flex flex-col gap-4">
      <h3 className="text-2xl font-semibold">Entrar</h3>

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
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
            name="password"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sua senha</FormLabel>
                <FormControl>
                  <InputPassword
                    {...field}
                    type="password"
                    placeholder="senha secreta"
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
