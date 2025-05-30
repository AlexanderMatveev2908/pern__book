/// <reference types="vite/client" />

import React from "react";

declare module "react" {
  interface SVGProps<T> extends React.HTMLAttributes<T> {
    artist?: string;
    source?: string;
  }
}
