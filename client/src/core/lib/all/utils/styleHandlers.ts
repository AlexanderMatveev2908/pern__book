import { tailwindBreak } from "@/core/config/breakpoints";
import { SideFieldType } from "@/features/common/SideBar/fields/sidebar";

export const handleSideLinkStyle = ({
  path,
  el,
}: {
  path: string;
  el: SideFieldType;
}) => new RegExp(path).test(el.path);

export const getSizeSearchbarBtns = (label: boolean) =>
  label ? "max-w-[200px]" : "max-w-[75px]";

export const getNumBtns = () =>
  window.innerWidth > tailwindBreak.xl
    ? 10
    : window.innerWidth > tailwindBreak.lg
    ? 8
    : window.innerWidth > tailwindBreak.md
    ? 6
    : window.innerWidth > tailwindBreak.sm
    ? 5
    : window.innerWidth > 500
    ? 4
    : window.innerWidth > 400
    ? 3
    : 2;

export const setLimitCards = () =>
  window.innerWidth > 1200 ? 4 : window.innerWidth > 1000 ? 2 : 1;

export const calcCurrBlock = ({
  i,
  block,
  limit,
}: {
  i: number;
  block: number;
  limit: number;
}) => i + 1 + block * limit;

export const calcBlockBySize = (page: number, blockSize: number) =>
  Math.floor(page / blockSize);

export const clampBy = (num: number) => ({
  style: {
    WebkitLineClamp: num,
  },
});
