import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Função utilitária para mesclar classes do Tailwind
 * Útil para componentes condicionais
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formata data para pt-BR
 */
export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/**
 * Retorna cor baseada na categoria
 */
export function getCategoryColor(category: string): {
  bg: string;
  text: string;
  badge: string;
} {
  const colors: Record<string, { bg: string; text: string; badge: string }> = {
    Trabalho: {
      bg: "bg-blue-50",
      text: "text-blue-700",
      badge: "bg-blue-600",
    },
    Pessoal: {
      bg: "bg-purple-50",
      text: "text-purple-700",
      badge: "bg-purple-600",
    },
    Estudos: {
      bg: "bg-indigo-50",
      text: "text-indigo-700",
      badge: "bg-indigo-600",
    },
  };

  return colors[category] || colors.Trabalho;
}

/**
 * Retorna ícone baseado na categoria
 */
export function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    Trabalho: "💼",
    Pessoal: "🏠",
    Estudos: "📚",
  };

  return icons[category] || "📋";
}

