// * Adding a password variant
import * as React from 'react';
import { cn } from '@/lib/utils';
import { Eye, EyeClosed, CloseCircle } from '@solar-icons/react';
import { Button } from './button';

interface InputProps extends React.ComponentProps<'input'> {
  icon?: React.ComponentType<{ className?: string }>;
  iconPosition?: 'left' | 'right';
  currency?: boolean;
  onClear?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon: Icon, iconPosition = 'left', currency = false, onClear = null, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);


    const isPassword = type === 'password';
    const isNumber = type === 'number' && currency;
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
      <div className="relative flex w-full items-center">
        {isNumber && (
          <span className="text-muted-foreground absolute left-3 text-base font-medium">$</span>
        )}

        {Icon && iconPosition === 'left' && (
          <Icon className="text-muted-foreground absolute left-3 h-5 w-5" />
        )}

        <input
          type={inputType}
          className={cn(
            'border-input bg-zinc-100 file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring disabled:tex-base flex h-9 w-full rounded-md border px-4 py-3 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-[400] focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-none disabled:bg-transparent',
            Icon && iconPosition === 'left' ? 'pl-10' : '',
            isPassword ? 'pr-10' : '',
            isNumber ? 'pl-7' : '',
            className,
          )}
          ref={ref}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-muted-foreground absolute right-3 flex items-center justify-center focus:outline-none"
          >
            {showPassword ? (
              <Eye className="h-6 w-6" weight="Bold" />
            ) : (
              <EyeClosed className="h-6 w-6" weight="Bold" />
            )}
          </button>
        )}

        {Icon && !isPassword && iconPosition === 'right' && (
          <Icon className="text-muted-foreground absolute right-3 h-5 w-5" />
        )}

        {onClear && props.value && (
          <Button
            variant="mono"
            size="sm_icon"
            onClick={onClear}
            className="absolute right-1"
          >
            <CloseCircle />
          </Button>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export { Input };
