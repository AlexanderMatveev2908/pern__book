import type { SVGProps } from "react";
const SvgHappyGhost = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 3C7.02944 3 3 7.02944 3 12V19.0093C3 20.7408 5.05088 21.6542 6.33793 20.4959L6.98682 19.9119C7.59805 19.3618 8.48368 19.2418 9.21918 19.6096L11.1056 20.5528C11.6686 20.8343 12.3314 20.8343 12.8944 20.5528L14.7808 19.6096C15.5163 19.2418 16.402 19.3618 17.0132 19.9119L17.6621 20.4959C18.9491 21.6542 21 20.7408 21 19.0093V12C21 7.02944 16.9706 3 12 3Z"
      stroke="#2563eb"
      strokeWidth={2}
    />
    <path
      d="M8 14C8.91221 15.2144 10.3645 16 12.0004 16C13.6362 16 15.0885 15.2144 16.0007 14"
      stroke="#2563eb"
      strokeWidth={2}
      strokeLinecap="round"
    />
    <path
      d="M9 10.0112V10"
      stroke="#2563eb"
      strokeWidth={2}
      strokeLinecap="round"
    />
    <path
      d="M15 10.0112V10"
      stroke="#2563eb"
      strokeWidth={2}
      strokeLinecap="round"
    />
  </svg>
);
export default SvgHappyGhost;
