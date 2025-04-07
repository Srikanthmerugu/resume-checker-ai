// components/ApplyModal.js
import React, { useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import { toast } from 'react-toastify';

const ApplyModal = ({ isOpen, onClose, jobTitle, onApply, alreadyApplied }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size exceeds 5MB limit');
        return;
      }
      // Check file type
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(file.type)) {
        toast.error('Please upload a PDF or DOC/DOCX file');
        return;
      }
      setSelectedFile(file);
      toast.success('File selected successfully');
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      toast.error('Please upload your resume');
      return;
    }

    setIsLoading(true);
    try {
      await onApply(selectedFile);
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full space-y-4">
        <h3 className="text-xl font-bold text-sky-900">Apply for {jobTitle}</h3>
        
        <div className="border-2 border-dashed border-sky-200 rounded-xl p-6 text-center">
          <label className="cursor-pointer">
            <input
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
              className="hidden"
              disabled={alreadyApplied || isLoading}
            />
            <div className="space-y-2">
              <FiUpload className="w-8 h-8 text-sky-600 mx-auto" />
              <p className="text-sky-600 font-medium">
                {selectedFile ? selectedFile.name : 'Click to upload resume'}
              </p>
              <p className="text-sm text-sky-500">PDF or DOCX (Max 5MB)</p>
            </div>
          </label>
        </div>

        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sky-600 hover:bg-sky-50 rounded-lg"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={alreadyApplied || isLoading}
            className="px-4 py-2 bg-sky-600 text-white rounded-lg disabled:opacity-50 hover:bg-sky-700 transition-colors"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Applying...
              </span>
            ) : alreadyApplied ? (
              'Already Applied'
            ) : (
              'Submit Application'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplyModal;