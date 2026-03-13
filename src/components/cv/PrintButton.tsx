'use client';
import { useState } from 'react';
import { Printer } from 'lucide-react';

interface Props {
  label: string;
  loadingLabel: string;
}

export function PrintButton({ label, loadingLabel }: Props) {
  const [printing, setPrinting] = useState(false);

  const handlePrint = () => {
    setPrinting(true);
    setTimeout(() => {
      window.print();
      setPrinting(false);
    }, 300);
  };

  return (
    <button
      onClick={handlePrint}
      disabled={printing}
      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-60 transition-colors print:hidden"
    >
      <Printer size={15} />
      {printing ? loadingLabel : label}
    </button>
  );
}
