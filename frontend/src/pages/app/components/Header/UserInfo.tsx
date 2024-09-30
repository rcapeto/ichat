import { cn } from "@/lib/utils";

type UserInfoProps = {
  fullName: string;
  email: string;
  insideMenu?: boolean;
};

export function UserInfo({ email, fullName, insideMenu }: UserInfoProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-start max-sm:hidden",
        insideMenu ? "hidden" : "flex",
        insideMenu ? "max-sm:flex" : "max-sm:hidden",
        insideMenu ? "p-2" : ""
      )}
    >
      <p className="text-xs dark:text-zinc-100">{fullName}</p>
      <span className="text-xs dark:text-zinc-500">{email}</span>
    </div>
  );
}
