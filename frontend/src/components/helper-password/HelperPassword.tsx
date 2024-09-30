import { cn } from "@/lib/utils";
import { validatePassword } from "@/utils/validatePassword";
import {
  CheckCircledIcon,
  CrossCircledIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";
import { HelperPasswordProps } from "./types";

export function HelperPassword({ password }: HelperPasswordProps) {
  const { validations } = validatePassword(password);
  const isEmpty = !password;

  function getIcon(valid: boolean) {
    if (isEmpty) {
      return <InfoCircledIcon />;
    }

    return valid ? <CheckCircledIcon /> : <CrossCircledIcon />;
  }

  return (
    <div className="flex flex-col gap-3 my-3">
      <p className="text-xs text-zinc-400">
        Para a sua segurança, por favor siga os requisitos mínimos:
      </p>

      <ul className="flex flex-col gap-1">
        {validations.map((validation, index) => (
          <div
            key={String(index)}
            className={cn(
              validation.isValid ? "text-green-500" : "text-red-500",
              isEmpty ? "text-zinc-600" : "",
              "flex items-center gap-1 text-xs"
            )}
          >
            {getIcon(validation.isValid)}
            <p>{validation.message}</p>
          </div>
        ))}
      </ul>
    </div>
  );
}
