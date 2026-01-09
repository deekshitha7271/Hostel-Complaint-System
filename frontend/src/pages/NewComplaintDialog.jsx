import { useState } from "react";
import { complaintSchema } from "@/schemas/complaint.schema";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function NewComplaintDialog({ open, onClose, onSubmit }) {

  const [form, setForm] = useState({
    roomNumber: "",
    category: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = async () => {
    const result = complaintSchema.safeParse(form);

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }

    setErrors({});

    await onSubmit(result.data); 


    setForm({ roomNumber: "", category: "", description: "" });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white shadow-lg">
        <DialogHeader>
          <DialogTitle>New Complaint</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Room Number</Label>
            <Input
              value={form.roomNumber}
              onChange={(e) =>
                setForm({ ...form, roomNumber: e.target.value })
              }
            />
            {errors.roomNumber && (
              <p className="text-xs text-red-500">{errors.roomNumber[0]}</p>
            )}
          </div>

          <div>
            <Label>Category</Label>
            <Select
              onValueChange={(value) =>
                setForm({ ...form, category: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="water">Water</SelectItem>
                <SelectItem value="electricity">Electricity</SelectItem>
                <SelectItem value="internet">Internet</SelectItem>
                <SelectItem value="cleaning">Cleaning</SelectItem>
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-xs text-red-500">{errors.category[0]}</p>
            )}
          </div>

          <div>
            <Label>Description</Label>
            <Textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
            {errors.description && (
              <p className="text-xs text-red-500">
                {errors.description[0]}
              </p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

