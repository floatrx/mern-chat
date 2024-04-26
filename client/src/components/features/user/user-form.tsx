import { useForm } from 'react-hook-form';

import { createUserSchema, updateUserSchema } from '@/validators/user';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import type { IUser, IUserCreateRequest } from '@/types/user';

const formFields = {
  name: {
    label: 'Username',
    placeholder: 'John Doe',
  },
  email: {
    label: 'Email',
    placeholder: 'example@mail.com',
  },
  password: {
    label: 'Password',
    placeholder: '*****',
  },
};

interface IProps {
  onSubmit?: (values: IUserCreateRequest) => Promise<void>;
  initialValues?: IUser;
  isLoading: boolean;
}

export const UserForm = ({ onSubmit, initialValues, isLoading }: IProps) => {
  // Create form
  const form = useForm<IUserCreateRequest>({
    resolver: zodResolver(initialValues ? updateUserSchema : createUserSchema),
    defaultValues: { name: '', email: '', password: '', ...initialValues },
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    console.log('form values', values);
    await onSubmit?.(values).then(() => !initialValues && form.reset());
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="w-full space-y-3">
        {Object.entries(formFields).map(([name, { label, placeholder }]) => (
          <FormField
            key={name}
            name={name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                  <Input data-testid={name} placeholder={placeholder} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button data-testid="submit" type="submit" loading={isLoading} variant="outline" size="lg">
          Submit
        </Button>
      </form>
    </Form>
  );
};
