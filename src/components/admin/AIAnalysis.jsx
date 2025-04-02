import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

const AIAnalysis = ({ apiData }) => {
    const [question, setQuestion] = useState("");
    const [aiResponse, setAiResponse] = useState("");
    const [loading, setLoading] = useState(false);
    const API_KEY = "AIzaSyBICsJNJtpqefwgPQ2dPAGO7w6uMCFAYzg"; // Ganti dengan API key-mu

    const analyzeData = async () => {
        if (!question.trim()) {
            alert("Silakan masukkan pertanyaan terlebih dahulu.");
            return;
        }

        setLoading(true);
        setAiResponse("");

        try {
            const res = await axios.post(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
                {
                    contents: [{ parts: [{ text: `${question} \n\nData: ${JSON.stringify(apiData)}` }] }]
                }
            );

            setAiResponse(res.data.candidates[0]?.content?.parts[0]?.text || "Tidak ada jawaban.");
        } catch (error) {
            console.error("Error calling Gemini AI:", error);
            setAiResponse("Terjadi kesalahan saat memproses permintaan.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <h5 className="mb-3">Tanya AI</h5>
            
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Ketik pertanyaan Anda..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />
                <button className="btn btn-primary" onClick={analyzeData} disabled={loading}>
                    {loading ? (
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    ) : (
                        "Tanya"
                    )}
                </button>
            </div>

            {aiResponse && (
                <div className="card">
                    <div className="card-header bg-primary text-white">Jawaban AI</div>
                    <div className="card-body">
                    <ReactMarkdown>{aiResponse}</ReactMarkdown>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AIAnalysis;