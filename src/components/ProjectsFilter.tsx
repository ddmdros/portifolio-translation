import { useState, useEffect, useRef } from "react";
import { FormattedMessage } from "react-intl";
import { type ProjectCategory } from "../types/projectType";
import { PROJECTS_DATA } from "../content/ProjectsData";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Configurações e constantes para rolagem horizontal
const SCROLL_OFFSET_PX = 200;
const SCROLL_TOLERANCE_PX = 2; // Tolerância para diferenças de renderização de sub-pixels

interface FilterProps {
  activeCategory: ProjectCategory;
  onFilterChange: (category: ProjectCategory) => void;
}

const ProjectFilter = ({ activeCategory, onFilterChange }: FilterProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [isTouch] = useState(
    () =>
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0),
  );

  const categories: { id: string; value: ProjectCategory }[] = [
    { id: "projects.filter.all", value: "all" },
    { id: "projects.filter.inhouse", value: "inhouse" },
    { id: "projects.filter.freelance", value: "freelance" },
    { id: "projects.filter.volunteer", value: "volunteer" },
  ];

  // Filtra as categorias ativas com base nos dados do projeto
  const activeCategoriesInData = new Set(
    PROJECTS_DATA.flatMap((project) =>
      Array.isArray(project.category) ? project.category : [project.category],
    ),
  );

  const availableCategories = categories.filter(
    (cat) => cat.value === "all" || activeCategoriesInData.has(cat.value),
  );

  // Função para contar quantos projetos pertencem a uma categoria
  const getCategoryCount = (value: ProjectCategory) => {
    if (value === "all") return PROJECTS_DATA.length;
    return PROJECTS_DATA.filter((p) => {
      if (Array.isArray(p.category)) {
        return p.category.includes(value);
      }
      return p.category === value;
    }).length;
  };

  const checkScroll = () => {
    const el = scrollRef.current;
    if (el) {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      setShowLeftArrow(scrollLeft > SCROLL_TOLERANCE_PX);
      setShowRightArrow(
        scrollLeft < scrollWidth - clientWidth - SCROLL_TOLERANCE_PX,
      );
    }
  };

  useEffect(() => {
    // Verifica a capacidade de scroll inicialmente e ao redimensionar a tela
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [availableCategories]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (el) {
      el.scrollBy({
        left: direction === "left" ? -SCROLL_OFFSET_PX : SCROLL_OFFSET_PX,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="mb-8 border-b border-white/10 pb-2 relative group/scroll-container">
      {/* Seta e gradiente da esquerda */}
      {!isTouch && showLeftArrow && (
        <div className="absolute left-0 top-0 bottom-2 w-16 bg-linear-to-r from-card-bg to-transparent pointer-events-none flex items-center z-10">
          <button
            onClick={() => scroll("left")}
            className="pointer-events-auto bg-black/60 hover:bg-accent hover:text-black text-white p-1.5 rounded-full border border-white/10 hover:border-accent transition-all duration-300 ml-1 shadow-md hover:scale-105 hover:cursor-pointer flex items-center justify-center"
            aria-label="Scroll Left"
          >
            <ChevronLeft size={16} />
          </button>
        </div>
      )}

      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto pb-2 flex-nowrap [-ms-overflow-style:none] [scrollbar-none] [&::-webkit-scrollbar]:hidden"
        onScroll={checkScroll}
      >
        {availableCategories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => onFilterChange(cat.value)}
            className={`uppercase text-xs px-5 py-2 rounded-lg font-medium transition-all duration-300 whitespace-nowrap border ${
              activeCategory === cat.value
                ? "bg-accent text-black border-accent shadow-[0_0_15px_rgba(16,185,129,0.3)] animate-glow-pulse"
                : "bg-transparent text-gray-400 border-white/10 hover:border-accent/50 hover:text-white"
            }`}
          >
            <FormattedMessage id={cat.id} />{" "}
            <span className="opacity-70 font-mono text-[10px] ml-1">
              ({getCategoryCount(cat.value)})
            </span>
          </button>
        ))}
      </div>

      {/* Seta e gradiente da direita */}
      {!isTouch && showRightArrow && (
        <div className="absolute right-0 top-0 bottom-2 w-16 bg-linear-to-l from-card-bg to-transparent pointer-events-none flex items-center justify-end z-10">
          <button
            onClick={() => scroll("right")}
            className="pointer-events-auto bg-black/60 hover:bg-accent hover:text-black text-white p-1.5 rounded-full border border-white/10 hover:border-accent transition-all duration-300 mr-1 shadow-md hover:scale-105 hover:cursor-pointer flex items-center justify-center"
            aria-label="Scroll Right"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectFilter;
