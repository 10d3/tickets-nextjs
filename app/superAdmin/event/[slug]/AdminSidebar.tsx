"use client";
import { useFormState } from "react-dom";
import FormSubmitButton from "../../../create-event/new/FormSubmitButton";
import { approveSubmission, deleteEvent } from "../../action";

// interface AdminSidebarProps {
//   job: Job;
// }

interface EventType {
    id: string;
    name: string;
    slug: string;
    description: string;
    date: Date;
    location: string;
    image: string | null;
    vipTicketPrice: number | null;
    standardTicketPrice: number;
    vipTicketCapacity: number | null;
    standardTicketCapacity: number;
    createdById: string;
    approved: boolean;
}

export default function AdminSidebar({ event }:{event:EventType}) {
    return (
        <aside className="flex w-[200px] flex-none flex-row items-center gap-2 md:flex-col md:items-stretch">
          {event.approved ? (
            <span className="text-center font-semibold text-green-500">
              Approved
            </span>
          ) : (
            <ApproveSubmissionButton jobId={event.id} />
          )}
          <DeleteJobButton jobId={event.id} />
        </aside>
    );
}

interface AdminButtonProps {
  jobId: string;
}

function ApproveSubmissionButton({ jobId }: AdminButtonProps) {
  const [formState, formAction] = useFormState(approveSubmission, undefined);

  console.log(jobId)

  return (
    <form action={formAction} className="space-y-1">
      <input hidden name="jobId" value={jobId} />
      <FormSubmitButton className="w-full bg-green-500 hover:bg-green-600">
        Approve
      </FormSubmitButton>
      {formState?.error && (
        <p className="text-sm text-red-500">{formState.error}</p>
      )}
    </form>
  );
}

function DeleteJobButton({ jobId }: AdminButtonProps) {
  const [formState, formAction] = useFormState(deleteEvent, undefined);


  return (
    <form action={formAction} className="space-y-1">
      <input hidden name="jobId" value={jobId} />
      <FormSubmitButton className="w-full bg-red-500 hover:bg-red-600">
        Delete
      </FormSubmitButton>
      {formState?.error && (
        <p className="text-sm text-red-500">{formState.error}</p>
      )}
    </form>
  );
}