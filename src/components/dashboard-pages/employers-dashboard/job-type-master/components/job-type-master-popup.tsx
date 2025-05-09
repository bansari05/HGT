import React, { useState, useEffect } from "react";

const Jobtypemasterpopup = ({ onClose, onSave, initialData }) => {
    const [jobType, setJobType] = useState("");
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        if (initialData) {
            setJobType(initialData.job_type || "");
            setIsActive(initialData.is_active !== false); 
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!jobType.trim()) {
            alert("Job Type Name is required");
            return;
        }
        onSave({ jobType, isActive });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6 border-t-4 border-blue-500" style={{ padding: '20px' }}>

                {/* Title */}
                <div className="mb-6 text-center">
                    <h5 className="text-sm font-bold text-gray-800 mb-3">
                        {initialData ? "Edit Job Type" : "Add New Job Type"}
                    </h5>
                </div>

                {/* Form Fields */}
                <div className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Job Type Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={jobType}
                            onChange={(e) => setJobType(e.target.value)}
                            placeholder="Enter job type name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Status
                        </label>
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="activeStatus"
                                checked={isActive}
                                onChange={(e) => setIsActive(e.target.checked)}
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label htmlFor="activeStatus" className="ml-2 text-sm text-gray-700">
                                Active
                            </label>
                        </div>
                    </div>

                    <div style={{ paddingTop: "16px", display: "flex", gap: "12px", justifyContent: "end" }}>
                        <button
                            type="button"
                            onClick={onClose}
                            style={{
                                padding: "10px 20px",
                                height: "40px",
                                borderRadius: "4px",
                                backgroundColor: "#ebf5ff",
                                color: "#04598b",
                                border: "none",
                                cursor: "pointer",
                                transition: "background-color 0.2s ease-in-out",
                            }}
                            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#047d3e")}
                            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#ebf5ff")}
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            onClick={handleSubmit}
                            style={{
                                padding: "10px 24px",
                                height: "40px",
                                borderRadius: "4px",
                                backgroundColor: "#ebf5ff",
                                color: "#04598b",
                                border: "none",
                                cursor: "pointer",
                                transition: "background-color 0.2s ease-in-out",
                            }}
                            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#047d3e")}
                            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#ebf5ff")}
                        >
                            {initialData ? "Update" : "Save"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Jobtypemasterpopup;