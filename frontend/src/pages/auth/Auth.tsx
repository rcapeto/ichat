import { baseScrollClass } from "@/components/scroll";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { AuthLayout } from "./components/Layout";
import { Login } from "./components/Login";
import { Register } from "./components/Register";

enum TabsValue {
  login = "login",
  register = "register",
}

export function AuthPage() {
  return (
    <AuthLayout>
      <Tabs defaultValue={TabsValue.login}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value={TabsValue.login}>Entrar</TabsTrigger>
          <TabsTrigger value={TabsValue.register}>Cadastre-se</TabsTrigger>
        </TabsList>

        <TabsContent value={TabsValue.login} className="px-5">
          <Login />
        </TabsContent>

        <TabsContent
          value={TabsValue.register}
          className={cn("px-5 max-h-[425px]", baseScrollClass)}
        >
          <Register />
        </TabsContent>
      </Tabs>
    </AuthLayout>
  );
}
