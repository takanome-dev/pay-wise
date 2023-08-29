'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import type { Session } from '@supabase/supabase-js';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/form';
import { Icons } from '~/components/icons';
import { type ButtonProps, Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { toast } from '~/components/ui/use-toast';
import { errorSchema } from '~/lib/schemas/common';
import { tags } from '~/lib/tags';

interface CreateCardButtonProps extends ButtonProps {
  token: Session['access_token'];
}
type CreateCardSchema = z.infer<typeof createCardSchema>;

const createCardSchema = z.object({
  brand: z.enum(['visa', 'mastercard'], {
    invalid_type_error: 'Brand type should be either visa or mastercard',
  }),
  currency: z.enum(['USD', 'EUR', 'GBP'], {
    invalid_type_error: 'Currency type should be either USD, EUR or GBP',
  }),
});

export function CreateCardButton({
  className,
  variant,
  token,
  ...props
}: CreateCardButtonProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [showAlert, setShowAlert] = React.useState(false);

  const cardForm = useForm<CreateCardSchema>({
    defaultValues: {
      brand: 'visa',
      currency: 'USD',
    },
    resolver: zodResolver(createCardSchema),
  });

  async function onSubmit(values: CreateCardSchema) {
    setIsLoading(true);

    // TODO: mv api url to env
    const response = await fetch('http://localhost:3000/v1/cards/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data = await response.json();
    setIsLoading(false);
    const parsedError = errorSchema.safeParse(data);

    if (parsedError.success) {
      return toast({
        title: 'Error',
        description: parsedError.data.message[0],
      });
    }

    await fetch(`/api/revalidate?tag=${tags.cards}`).catch(console.error);
    setShowAlert(false);
    return toast({
      title: 'Success',
      description: 'Card created successfully',
    });
  }

  return (
    <Dialog open={showAlert} onOpenChange={setShowAlert}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setShowAlert(true)}
          variant={variant}
          className={className}
          disabled={isLoading}
          {...props}
        >
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.add className="mr-2 h-4 w-4" />
          )}
          New Card
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new card</DialogTitle>
          <DialogDescription>
            Choose a brand and currency for your new card.
          </DialogDescription>
        </DialogHeader>
        <Form {...cardForm}>
          <form
            onSubmit={cardForm.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <FormField
              control={cardForm.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="visa">Visa</SelectItem>
                        <SelectItem value="mastercard">Mastercard</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={cardForm.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Currency</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="GPB">GPB</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button>
                {isLoading ? (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Icons.billing className="mr-2 h-4 w-4" />
                )}
                <span>Create card</span>
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
