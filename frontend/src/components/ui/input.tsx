import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  EyeClosedIcon,
  EyeOpenIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

const InputPassword = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    function toggleVisiblePassword() {
      setShowPassword((prev) => !prev);
    }

    return (
      <div className="w-full relative">
        <Input
          {...props}
          type={showPassword ? "text" : "password"}
          className={cn(className, "pr-10")}
          ref={ref}
        />

        <Button
          size="icon"
          variant="ghost"
          className="absolute top-0 right-0 z-10"
          onClick={toggleVisiblePassword}
          type="button"
        >
          {showPassword ? (
            <EyeClosedIcon className="size-3" />
          ) : (
            <EyeOpenIcon className="size-3" />
          )}
        </Button>
      </div>
    );
  }
);

const InputSearch = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="w-full relative">
        <Input {...props} className={cn(className, "pl-10")} ref={ref} />

        <Button
          size="icon"
          variant="ghost"
          className="absolute top-0 left-0 z-10"
          type="button"
          disabled
        >
          <MagnifyingGlassIcon />
        </Button>
      </div>
    );
  }
);

Input.displayName = "Input";
InputPassword.displayName = "InputPassword";
InputSearch.displayName = "InputSearch";

export { Input, InputPassword, InputSearch };
