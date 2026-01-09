import {z} from 'zod';

export const createComplaintSchema=z.object({
    roomNumber:z.string().min(1,"Room number is required"),

    category:z.enum([
        "water",
        "electricity",
        "internet",
        "cleaning",
        "other"
    ]),

    description:z
    .string()
    .min(10,"Description must be atleast 10 characters"),

    otherCategoryDescription:z
    .string()
    .optional()
}).refine((data)=>data.category!=="other" || 
(data.otherCategoryDescription && data.otherCategoryDescription.trim().length>0),
{
    message:"Please specify the content",
    path:["otherCategoryDescription"]
}
);

export const updateComplaintSchema=z.object({
    status:z.enum(
        ["open","in-progress","resolved"],
        {
            errorMap:()=>({message:"Invalid status value"})
        }
    )
});