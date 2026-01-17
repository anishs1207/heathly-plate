"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Trash2, Pencil, Plus, Bug, Briefcase } from "lucide-react";

export default function WorkerView({ goBack }: any) {
    const [tasks, setTasks] = useState([
        { title: "Fix login redirect", type: "bug", priority: "high", status: "todo", desc: "Redirect issue on login" },
        { title: "Improve dashboard UI", type: "task", priority: "medium", status: "todo", desc: "Better layout & charts" },
    ]);

    const [dragged, setDragged] = useState(null);
    const [dropHover, setDropHover] = useState(null);

    const [modalOpen, setModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    const emptyTask = { title: "", type: "task", priority: "low", status: "todo", desc: "" };
    const [form, setForm] = useState(emptyTask);

    const openAddModal = () => {
        setEditingTask(null);
        setForm(emptyTask);
        setModalOpen(true);
    };

    const submitTask = () => {
        if (editingTask !== null) {
            const updated = [...tasks];
            updated[editingTask] = form;
            setTasks(updated);
        } else {
            setTasks([...tasks, form]);
        }
        setModalOpen(false);
    };

    const deleteTask = (i) => {
        const updated = [...tasks];
        updated.splice(i, 1);
        setTasks(updated);
    };

    const onDrop = (status) => {
        if (dragged === null) return;
        const updated = [...tasks];
        updated[dragged].status = status;
        setTasks(updated);
        setDragged(null);
        setDropHover(null);
    };

    const Column = ({ title, status }) => (
        <div
            onDragOver={(e) => { e.preventDefault(); setDropHover(status); }}
            onDragLeave={() => setDropHover(null)}
            onDrop={() => onDrop(status)}
            className={`rounded-xl p-4 border min-h-[380px] transition-all bg-[#0d0d0e]/70 backdrop-blur-md 
        ${dropHover === status
                    ? "border-gray-400 bg-[#1b1b1d]/70 shadow-[0_0_12px_rgba(200,200,200,0.35)]"
                    : "border-[#2c2c2e]"}`}
        >
            <h3 className="font-semibold text-gray-200 text-lg mb-3">{title}</h3>

            {tasks.filter((t) => t.status === status).map((t, i) => (
                <div
                    draggable
                    key={i}
                    onDragStart={() => setDragged(tasks.indexOf(t))}
                    className="p-3 rounded-xl cursor-grab active:cursor-grabbing bg-[#1b1b1d] shadow-md hover:shadow-xl 
            transition-all border mt-4 border-[#2f2f32] flex flex-col gap-1"
                >
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="font-semibold">{t.title}</p>
                            <p className="text-xs opacity-70">{t.desc}</p>
                        </div>

                        <div className="flex gap-2">
                            <Pencil
                                size={15}
                                className="cursor-pointer opacity-60 hover:text-gray-300"
                                onClick={() => { setEditingTask(tasks.indexOf(t)); setForm(t); setModalOpen(true); }}
                            />
                            <Trash2
                                size={15}
                                className="cursor-pointer opacity-60 hover:text-red-400"
                                onClick={() => deleteTask(tasks.indexOf(t))}
                            />
                        </div>
                    </div>

                    <div className="flex gap-2 mt-2">
                        <Badge variant="outline" className={t.type === "bug" ? "border-red-500 text-red-400" : "border-gray-500 text-gray-300"}>
                            {t.type === "bug" ? <Bug size={12} /> : <Briefcase size={12} />}
                            &nbsp;{t.type}
                        </Badge>
                        <Badge variant="outline" className="border-gray-500 text-gray-300">
                            {t.priority}
                        </Badge>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="space-y-6 text-white">


            <Button
                onClick={openAddModal}
                className="bg-[#1e1e20] hover:bg-[#2a2a2d] border border-[#2d2d2f] text-gray-200 flex gap-2"
            >
                <Plus size={16} /> Add Task
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Column title="📝 To-Do" status="todo" />
                <Column title="⚙️ In-Progress" status="doing" />
                <Column title="✅ Done" status="done" />
            </div>

            <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                <DialogContent className="bg-[#0f0f10] text-white border-gray-700">
                    <DialogHeader><DialogTitle>{editingTask !== null ? "Edit Task" : "New Task"}</DialogTitle></DialogHeader>

                    <div className="space-y-3 mt-3">
                        <Label>Title</Label>
                        <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="bg-[#1a1a1c] border-[#2c2c2f]" />

                        <Label>Description</Label>
                        <Textarea value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} className="bg-[#1a1a1c] border-[#2c2c2f]" />

                        <Label>Type</Label>
                        <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                            <SelectTrigger className="bg-[#1a1a1c] border-[#2c2c2f]"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="task">Task</SelectItem>
                                <SelectItem value="bug">Bug</SelectItem>
                            </SelectContent>
                        </Select>

                        <Label>Priority</Label>
                        <Select value={form.priority} onValueChange={(v) => setForm({ ...form, priority: v })}>
                            <SelectTrigger className="bg-[#1a1a1c] border-[#2c2c2f]"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <DialogFooter>
                        <Button onClick={submitTask} className="bg-[#222] hover:bg-[#2b2b2e] border border-[#2f2f32] text-gray-200">
                            {editingTask !== null ? "Save Changes" : "Create Task"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
