'use client'

import { useFormState } from "react-dom";
import FormSubmitButton from "../../../app/create-event/new/FormSubmitButton";
import { deleteEvent } from "../../../app/superAdmin/action";
import { Trash2 } from "lucide-react";
import { deleteEventAction } from "@/func/event-action";


interface AdminButtonProps {
    jobId: string;
  }
export function DeleteJobButton({ jobId }: AdminButtonProps) {
    const [formState, formAction] = useFormState(deleteEventAction, undefined);

    return (
      <form action={formAction} className="space-y-1">
        <input hidden name="jobId" value={jobId} />
        <FormSubmitButton className="w-full bg-red-500 hover:bg-red-600">
          <Trash2 size={16}/>
        </FormSubmitButton>
        {formState?.error && (
          <p className="text-sm text-red-500">{formState.error}</p>
        )}
      </form>
    );
  }