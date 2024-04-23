'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Typography } from "@/components/ui/typography";
import { useForm } from "react-hook-form";
import { EventSchema, EventValues } from "../../../src/components/schemas/shcemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/ui/LoadingButton";
import SelectCustom from "@/components/ui/selectCustom";
import { eventTypes } from "@/lib/event-type";
import { createEventPosting, editEventPosting } from "./actions";

type EditEventFormProps = {
    event: EventValues; // Pass the event object to the form
    onSubmit: (values: EventValues) => void; // Function to handle form submission
};

export default function EditEventForm({ events }: EditEventFormProps) {
    console.log(events)
    const eventID = events.id
    const form = useForm<EventValues>({
        defaultValues: events, // Populate form fields with the existing event data
        resolver: zodResolver(EventSchema)
    });

    const {
        handleSubmit,
        control,
        formState: { isSubmitting }
    } = form;

    const onSubmit = async (values,) => {
        const data = new Date(values.date);
        console.log(data.toISOString());

        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
            if (value) {
                formData.append(key, value);
            }
        });

        try {
            // Here you can perform any actions you need, such as sending the form data to your server
            await editEventPosting(formData, data, eventID);
            // If the submission was successful, you might want to show a success message or redirect the user
        } catch (error) {
            console.log("Something went wrong, please try again.", error);
            // If an error occurs during submission, you can handle it here, for example, by displaying an error message to the user
        }
    };

    return (
        <Form {...form}>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <FormField
                    control={control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Event Title </FormLabel>
                            <FormControl>
                                <Input placeholder="e.g Dj Flash" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Event Description </FormLabel>
                            <FormControl>
                                <Input placeholder="Provide a description for your event" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="eventType"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Type Event</FormLabel>
                            <FormControl>
                                <SelectCustom {...field} defaultValue="">
                                    <option value="" hidden>Select event type</option>
                                    {eventTypes.map(eventTyp => (
                                        <option key={eventTyp} value={eventTyp}>{eventTyp}</option>
                                    ))}
                                </SelectCustom>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="date"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Date de evenement</FormLabel>
                            <FormControl>
                                <Input type="datetime-local" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Event Location </FormLabel>
                            <FormControl>
                                <Input type="locationType" placeholder="e.g CSEM" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="image"
                    render={({ field: { value, ...fieldValues } }) => (
                        <FormItem>
                            <FormLabel>Event flyer </FormLabel>
                            <FormControl>
                                <Input {...fieldValues}
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0]
                                        fieldValues.onChange(file)
                                    }} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="vipTicketPrice"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>VIP Ticket Price </FormLabel>
                            <FormControl>
                                <Input placeholder="Leave blank if you don't have vip Ticket (e.g 1000)" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="standardTicketPrice"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel> Standard Ticket Price </FormLabel>
                            <FormControl>
                                <Input placeholder="e.g 1000" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="vipTicketCapacity"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>VIP Ticket Capacity </FormLabel>
                            <FormControl>
                                <Input placeholder="Leave blank if you don't have vip Ticket (e.g 100 )" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="standardTicketCapacity"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Capacity </FormLabel>
                            <FormControl>
                                <Input placeholder="e.g 1000" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <LoadingButton className="my-4" type="submit" loading={isSubmitting}>
                    Submit
                </LoadingButton>
            </form>
        </Form>
    );
}
