"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { FileText, Download, ChevronRight } from "lucide-react";

const UNIVERSITIES = ["Mumbai University", "Delhi Technological University", "IIT Bombay", "Anna University"];
const BRANCHES = ["Computer Engineering", "Information Technology", "Electronics & Telecom", "Mechanical", "Civil"];
const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8];

export default function SyllabusPage() {
    const [university, setUniversity] = useState("");
    const [branch, setBranch] = useState("");
    const [semester, setSemester] = useState<number | "">("");
    const [syllabus, setSyllabus] = useState<any[]>([]);

    const handleSearch = () => {
        // Mock Data Fetching
        if (university && branch && semester) {
            setSyllabus([
                { title: "Applied Mathematics - I", code: "FEC101", pdfUrl: "#" },
                { title: "Engineering Physics - I", code: "FEC102", pdfUrl: "#" },
                { title: "Basic Electrical Engineering", code: "FEC105", pdfUrl: "#" },
            ]);
        }
    };

    return (
        <div className="container" style={{ padding: "2rem 1rem" }}>
            <h1 className="text-3xl font-bold mb-8">Syllabus Viewer</h1>

            <Card className="mb-8">
                <CardContent className="p-6">
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <select
                            className="p-2 border rounded"
                            value={university}
                            onChange={(e) => setUniversity(e.target.value)}
                        >
                            <option value="">Select University</option>
                            {UNIVERSITIES.map(u => <option key={u} value={u}>{u}</option>)}
                        </select>

                        <select
                            className="p-2 border rounded"
                            value={branch}
                            onChange={(e) => setBranch(e.target.value)}
                        >
                            <option value="">Select Branch</option>
                            {BRANCHES.map(b => <option key={b} value={b}>{b}</option>)}
                        </select>

                        <select
                            className="p-2 border rounded"
                            value={semester}
                            onChange={(e) => setSemester(Number(e.target.value))}
                        >
                            <option value="">Select Semester</option>
                            {SEMESTERS.map(s => <option key={s} value={s}>Semester {s}</option>)}
                        </select>
                    </div>
                    <Button onClick={handleSearch} disabled={!university || !branch || !semester} className="w-full md:w-auto">
                        View Syllabus
                    </Button>
                </CardContent>
            </Card>

            {syllabus.length > 0 && (
                <div className="grid gap-4">
                    {syllabus.map((subject, idx) => (
                        <Card key={idx}>
                            <CardContent className="p-4 flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-blue-100 rounded text-blue-600">
                                        <FileText className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold">{subject.title}</h3>
                                        <p className="text-sm text-muted-foreground">{subject.code}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm">View</Button>
                                    <Button size="sm"><Download className="w-4 h-4 mr-2" /> Download</Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
