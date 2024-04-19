"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Typography } from "@/components/ui/typography"
import { useForm } from "react-hook-form"
import { EventSchema, EventValues } from "../../../src/components/schemas/shcemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import LoadingButton from "@/components/ui/LoadingButton"
import { createEventPosting } from "./actions"

export default function NewEventForm(userId) {

    const user1 = userId.userId

    const form = useForm<EventValues>({
        resolver: zodResolver(EventSchema)
    })

    const {
        handleSubmit,
        watch,
        trigger,
        control,
        setValue,
        setFocus,
        formState: { isSubmitting },
    } = form;



    async function onSubmit(values: EventValues) {

        console.log(JSON.stringify(values.date))
        const data = new Date(values.date)
        console.log(data.toISOString())

        const formData = new FormData();
        Object.entries(values).forEach(([key, value])=>{
            if(value){
                formData.append(key, value);
            }
        })

        try {
            await createEventPosting(formData, user1, data);
        } catch (error) {
            console.log("Something went wrong, please try again.", error);
        }
    }


    return (
        <main className=" mx-5 mt-8 md:mx-24 flex flex-col gap-4">
            <div className=" flex flex-col items-center">
                <h1 className="text-3xl md:text-6xl">Creer votre evenement</h1>
                <Typography variant='p' className=" text-muted-foreground md:text-3xl "> Get your event posting seen by thousands of people </Typography>
            </div>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                    <h2 className="text-xl md:text-2xl">Event details</h2>
                    <h2 className=" text-muted-foreground text-[1rem] md:text-2xl">Provide a event description and details</h2>
                </div>
                <div className="">
                    <Form {...form}>
                        <form
                            noValidate
                            onSubmit={handleSubmit(onSubmit)}
                        >
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
                </div>
            </div>
        </main>
    )
}
