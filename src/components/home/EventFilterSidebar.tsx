
import { Input } from "../ui/input";
import { Label } from "../ui/label";

async function filterEvent(formData: FormData) {
  'use server'

}

export default function EventFilterSidebar() {
  return (
    <aside>
      <form action={filterEvent}>
        <div>
          {/* <Label htmlFor='q'>Search</Label> */}
          <Input id="q" name="q" placeholder="Search event" />
        </div>
      </form>
    </aside>
  )
}
