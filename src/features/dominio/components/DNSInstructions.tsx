'use client';
import { Info } from 'lucide-react';

interface Props {
  domain: string;
  verificationToken: string;
}

interface RecordRowProps {
  type: string;
  name: string;
  value: string;
}

function RecordRow({ type, name, value }: RecordRowProps) {
  return (
    <tr className="border-t border-gray-100 dark:border-gray-700">
      <td className="py-2 pr-4 text-xs font-mono font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
        {type}
      </td>
      <td className="py-2 pr-4 text-xs font-mono text-gray-700 dark:text-gray-300 whitespace-nowrap">
        {name}
      </td>
      <td className="py-2 text-xs font-mono text-gray-700 dark:text-gray-300 break-all">
        {value}
      </td>
    </tr>
  );
}

export function DNSInstructions({ domain, verificationToken }: Props) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Agrega los siguientes registros DNS en tu proveedor de dominio:
      </p>

      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800/60">
              <th className="px-0 py-2 pr-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Tipo
              </th>
              <th className="py-2 pr-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Nombre
              </th>
              <th className="py-2 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Valor
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700 px-0">
            <RecordRow type="CNAME" name="@" value="vista.tudominio.app" />
            <RecordRow type="CNAME" name="www" value="vista.tudominio.app" />
            <RecordRow
              type="TXT"
              name={`_vista-verify.${domain}`}
              value={verificationToken}
            />
          </tbody>
        </table>
      </div>

      <div className="flex items-start gap-2 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-3">
        <Info size={16} className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-400" />
        <p className="text-xs text-amber-700 dark:text-amber-300">
          Los cambios DNS pueden tardar hasta 48 horas en propagarse.
        </p>
      </div>
    </div>
  );
}
