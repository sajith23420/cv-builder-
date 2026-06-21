import { useState, useCallback, useRef } from 'react';
import { parseCVFile, mapParsedDataToCVData, type ParsedCVData } from '@/utils/cvParser';
import { useCVStore } from '@/store/useCVStore';
import { useRouter } from 'next/navigation';

export type UploadStatus = 'idle' | 'parsing' | 'success' | 'error';

export function useCVParser(onSuccessRoute?: string) {
  const { loadImportedData } = useCVStore();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [status, setStatus] = useState<UploadStatus>('idle');
  const [fileName, setFileName] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [parsedSummary, setParsedSummary] = useState<string | null>(null);

  const handleFile = useCallback(async (file: File) => {
    const validTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
    ];
    const validExtensions = ['.pdf', '.docx', '.doc'];
    const ext = '.' + file.name.split('.').pop()?.toLowerCase();

    if (!validTypes.includes(file.type) && !validExtensions.includes(ext)) {
      setStatus('error');
      setErrorMessage('Unsupported file type. Please upload a PDF or DOCX file.');
      return;
    }

    setFileName(file.name);
    setStatus('parsing');
    setErrorMessage(null);

    try {
      const parsed: ParsedCVData = await parseCVFile(file);
      const cvData = mapParsedDataToCVData(parsed);
      loadImportedData(cvData);

      const parts: string[] = [];
      if (parsed.name) parts.push(`Name: ${parsed.name}`);
      if (parsed.experience?.length) parts.push(`${parsed.experience.length} roles`);
      setParsedSummary(parts.join(' · '));

      setStatus('success');

      if (onSuccessRoute) {
        // Small delay for UI to show success state before routing
        setTimeout(() => {
          router.push(onSuccessRoute);
        }, 800);
      }
    } catch (err) {
      console.error('CV parsing failed:', err);
      setStatus('error');
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'Something went wrong while parsing your CV. Please try again.'
      );
    }
  }, [loadImportedData, router, onSuccessRoute]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = '';
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  const resetUpload = () => {
    setStatus('idle');
    setFileName(null);
    setErrorMessage(null);
    setParsedSummary(null);
  };

  return {
    status,
    fileName,
    errorMessage,
    parsedSummary,
    fileInputRef,
    handleInputChange,
    triggerUpload,
    resetUpload
  };
}
