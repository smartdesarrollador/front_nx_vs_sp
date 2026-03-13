'use client';
import { useState } from 'react';
import { Pencil, Trash2, Check, X } from 'lucide-react';
import type { PortfolioItem } from '../types';

export const CARD_GRADIENTS = [
  'from-blue-500 to-indigo-600',
  'from-purple-500 to-pink-600',
  'from-emerald-500 to-teal-600',
  'from-orange-500 to-red-600',
  'from-cyan-500 to-blue-600',
  'from-rose-500 to-pink-600',
];

interface Props {
  item: PortfolioItem;
  index: number;
  onEdit: (item: PortfolioItem) => void;
  onDelete: (uuid: string) => void;
  canDelete: boolean;
}

export function ProjectCard({ item, index, onEdit, onDelete, canDelete }: Props) {
  const [confirming, setConfirming] = useState(false);
  const gradient = CARD_GRADIENTS[index % CARD_GRADIENTS.length];

  return (
    <div className="group rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow">
      {/* Cover */}
      <div className={`relative h-36 bg-gradient-to-br ${gradient}`}>
        {item.cover_image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.cover_image_url}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        {item.is_featured && (
          <span className="absolute top-2 left-2 flex items-center gap-1 rounded-full bg-yellow-400 px-2 py-0.5 text-xs font-bold text-yellow-900">
            ★ Destacado
          </span>
        )}
        {!item.is_published && (
          <span className="absolute top-2 right-2 rounded-full bg-gray-600/80 px-2 py-0.5 text-xs font-medium text-gray-100">
            Borrador
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-gray-900 dark:text-white text-sm leading-tight">
          {item.title}
        </h3>
        {item.description_short && (
          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
            {item.description_short}
          </p>
        )}

        {/* Tags */}
        {item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {item.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gray-100 dark:bg-gray-700 px-2 py-0.5 text-xs text-gray-600 dark:text-gray-300"
              >
                {tag}
              </span>
            ))}
            {item.tags.length > 3 && (
              <span className="text-xs text-gray-400">+{item.tags.length - 3}</span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-end gap-1 pt-1">
          {confirming ? (
            <>
              <span className="text-xs text-gray-500 dark:text-gray-400 mr-1">¿Eliminar?</span>
              <button
                type="button"
                onClick={() => {
                  onDelete(item.id);
                  setConfirming(false);
                }}
                className="rounded p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                title="Confirmar eliminación"
              >
                <Check size={14} />
              </button>
              <button
                type="button"
                onClick={() => setConfirming(false)}
                className="rounded p-1 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                title="Cancelar"
              >
                <X size={14} />
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => onEdit(item)}
                className="rounded p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                title="Editar"
              >
                <Pencil size={14} />
              </button>
              {canDelete && (
                <button
                  type="button"
                  onClick={() => setConfirming(true)}
                  className="rounded p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                  title="Eliminar"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
