"use client";
import { CheckIcon } from "lucide-react";
// import { sendEmail } from "@/actions/email";
import { Dialog } from "@/components/radix";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { TContactSchema, contactSchema } from "@/schema";

export default function EmailDialogBtn({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting, isLoading },
  } = useForm<TContactSchema>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit: SubmitHandler<TContactSchema> = async (formData) => {
    const response = await fetch("/api/send/contact", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    const data = await response.json();

    if (data.ok) {
      reset();
      toast(() => {
        return (
          <div className="p-2 rounded bg-white">
            <div className="flex items-center gap-2">
              <CheckIcon size={20} />
              <p className="font-bold">Email sent successfully</p>
            </div>
            <p>I will get back to you ASAP.</p>
          </div>
        );
      });
      setOpen(false);
    } else {
      toast(() => {
        return (
          <div className="p-2 rounded bg-white">
            <div className="flex items-center gap-2">
              <CheckIcon size={20} />
              <p className="font-bold">Email failed to send</p>
            </div>
            <p>Something went wrong, try reaching out via socials.</p>
          </div>
        );
      });
    }
  };
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content asChild>
          <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 px-2 sm:px-0 max-w-lg w-full bg-white rounded-xl border">
            {isSubmitting ? (
              <div className="flex flex-col p-4 rounded-lg items-center gap-4">
                <Dialog.Title className="font-semibold text-xl">
                  Sending email
                </Dialog.Title>
                <div className="h-10 w-10 border-4 border-gray-400 border-t-blue-500 rounded-full animate-spin" />
              </div>
            ) : (
              <form
                className="p-4 flex flex-col gap-2 w-full relative overflow-clip"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Dialog.Title className="text-lg font-semibold">
                  Contact
                </Dialog.Title>
                <div className="flex gap-2">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <label>First Name</label>
                      {errors?.firstName && (
                        <p className="text-xs text-red-500">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>
                    <input
                      className="rounded outline-none border-2 p-1 w-full"
                      {...register("firstName", { required: true })}
                    />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2">
                      <label>Last Name</label>
                      {errors?.lastName && (
                        <p className="text-xs text-red-500">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                    <input
                      className="rounded outline-none border-2 p-1 w-full"
                      {...register("lastName", { required: true })}
                    />
                  </div>
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex items-baseline gap-2">
                    <label>Email</label>
                    {errors?.email && (
                      <p className="text-xs text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <input
                    className="rounded outline-none border-2 p-1"
                    {...register("email", { required: true })}
                  />
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex items-baseline gap-2">
                    <label>Company</label>
                    {errors?.company && (
                      <p className="text-xs text-red-500">
                        {errors.company.message}
                      </p>
                    )}
                  </div>
                  <input
                    className="rounded outline-none border-2 p-1"
                    {...register("company", { required: true })}
                  />
                </div>

                <div className="flex flex-col mb-2">
                  <div className="flex items-baseline gap-2">
                    <label>Message</label>
                    {errors?.message && (
                      <p className="text-xs text-red-500">
                        {errors.message.message}
                      </p>
                    )}
                  </div>
                  <textarea
                    rows={8}
                    className="rounded outline-none border-2 p-1 resize-none"
                    {...register("message", { required: true })}
                  />
                </div>
                <button
                  type="submit"
                  disabled={!isValid || isSubmitting || isLoading}
                  className=" disabled:bg-neutral-900 disabled:text-neutral-300 bg-blue-500 text-white font-semibold w-full py-2 rounded"
                >
                  Send
                </button>
              </form>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
